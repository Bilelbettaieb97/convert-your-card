import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/lib/auth-store";
import { useCardStore } from "@/lib/card-store";
import { loadMyCard, updateCard } from "@/lib/card-actions";
import { getProfileMeta } from "@/lib/profile-store";
import type { CardData } from "@/lib/card-types";
import { BusinessCard } from "@/components/card/BusinessCard";
import { PhoneFrame } from "@/components/card/PhoneFrame";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, ImageIcon, Loader2, Copy, Check, UserCircle2, LayoutTemplate } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/media")({
  component: MediaPage,
});

const BUCKET = "user-photos";
const MAX_SIZE = 5 * 1024 * 1024;

type Photo = { name: string; path: string; url: string };

function MediaPage() {
  const { user } = useAuthStore();
  const { data, setData, update, hydrated } = useCardStore();
  const profile = getProfileMeta();
  const [supabaseReady, setSupabaseReady] = useState(false);
  const skipNextSave = useRef(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<"profile" | "cover" | "library" | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const libraryRef = useRef<HTMLInputElement>(null);

  // Hydration
  useEffect(() => {
    if (!hydrated) return;
    if (!profile) { setSupabaseReady(true); return; }
    loadMyCard().then((row) => {
      if ((row as any)?.card_data) {
        skipNextSave.current = true;
        setData((row as any).card_data as CardData);
      }
    }).catch(console.error).finally(() => setSupabaseReady(true));
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save
  useEffect(() => {
    if (!hydrated || !supabaseReady || !profile) return;
    if (skipNextSave.current) { skipNextSave.current = false; return; }
    const timer = setTimeout(() => {
      updateCard(profile.id, data).catch(console.error);
    }, 1500);
    return () => clearTimeout(timer);
  }, [data, hydrated, supabaseReady]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load library
  const loadLibrary = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data: files } = await supabase.storage.from(BUCKET).list(user.id, {
      sortBy: { column: "created_at", order: "desc" },
      limit: 100,
    });
    const items: Photo[] = (files ?? [])
      .filter((f) => f.name && !f.name.startsWith("."))
      .map((f) => {
        const path = `${user.id}/${f.name}`;
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
        return { name: f.name, path, url: pub.publicUrl };
      });
    setPhotos(items);
    setLoading(false);
  }, [user]);

  useEffect(() => { loadLibrary(); }, [loadLibrary]);

  async function uploadFile(file: File, slot: "profile" | "cover" | "library"): Promise<string | null> {
    if (!user) return null;
    if (!file.type.startsWith("image/")) { toast.error("Fichier non supporté"); return null; }
    if (file.size > MAX_SIZE) { toast.error("Fichier trop lourd (5 Mo max)"); return null; }
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) { toast.error("Échec de l'upload"); return null; }
    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return pub.publicUrl;
  }

  async function handleProfileUpload(files: FileList | null) {
    if (!files?.[0]) return;
    setUploading("profile");
    const url = await uploadFile(files[0], "profile");
    if (url) {
      update("photo", url);
      toast.success("Photo de profil mise à jour");
      loadLibrary();
    }
    setUploading(null);
    if (profileRef.current) profileRef.current.value = "";
  }

  async function handleCoverUpload(files: FileList | null) {
    if (!files?.[0]) return;
    setUploading("cover");
    const url = await uploadFile(files[0], "cover");
    if (url) {
      update("coverPhoto", url);
      toast.success("Photo de cover mise à jour");
      loadLibrary();
    }
    setUploading(null);
    if (coverRef.current) coverRef.current.value = "";
  }

  async function handleLibraryUpload(files: FileList | null) {
    if (!files || !user) return;
    setUploading("library");
    let ok = 0;
    for (const file of Array.from(files)) {
      const url = await uploadFile(file, "library");
      if (url) ok++;
    }
    setUploading(null);
    if (ok > 0) { toast.success(`${ok} photo(s) ajoutée(s)`); loadLibrary(); }
    if (libraryRef.current) libraryRef.current.value = "";
  }

  async function remove(path: string) {
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) return toast.error("Suppression impossible");
    toast.success("Photo supprimée");
    setPhotos((p) => p.filter((x) => x.path !== path));
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    toast.success("Lien copié");
    setTimeout(() => setCopied(null), 1500);
  }

  if (!hydrated || !supabaseReady) {
    return <div className="p-8 text-muted-foreground">Chargement…</div>;
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-8 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 items-start">
      <section className="space-y-8">
        <div>
          <h2 className="font-display text-2xl font-medium">Médias</h2>
          <p className="text-sm text-muted-foreground mt-1">Gérez vos photos et appliquez-les directement à votre carte.</p>
        </div>

        {/* Photos de la carte */}
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Photos de la carte</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Photo de profil */}
            <div className="rounded-2xl border border-border bg-card/40 p-4">
              <div className="flex items-center gap-2 mb-4">
                <UserCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Photo de profil</span>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="h-20 w-20 rounded-full border-2 border-border bg-muted/30 overflow-hidden shrink-0 cursor-pointer hover:border-primary/50 transition"
                  onClick={() => profileRef.current?.click()}
                >
                  {data.photo ? (
                    <img src={data.photo} alt="Profil" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full grid place-items-center">
                      <UserCircle2 className="h-8 w-8 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <input ref={profileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleProfileUpload(e.target.files)} />
                  <Button size="sm" variant="outline" className="w-full h-8 text-xs" onClick={() => profileRef.current?.click()} disabled={uploading === "profile"}>
                    {uploading === "profile" ? <><Loader2 className="h-3 w-3 mr-1.5 animate-spin" /> Upload…</> : <><Upload className="h-3 w-3 mr-1.5" /> Changer</>}
                  </Button>
                  {data.photo && (
                    <Button size="sm" variant="ghost" className="w-full h-8 text-xs text-muted-foreground hover:text-destructive" onClick={() => update("photo", "")}>
                      Supprimer
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Photo de cover */}
            <div className="rounded-2xl border border-border bg-card/40 p-4">
              <div className="flex items-center gap-2 mb-4">
                <LayoutTemplate className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Photo de cover</span>
              </div>
              <div
                className="h-20 w-full rounded-xl border-2 border-border bg-muted/30 overflow-hidden cursor-pointer hover:border-primary/50 transition mb-2"
                onClick={() => coverRef.current?.click()}
              >
                {data.coverPhoto ? (
                  <img src={data.coverPhoto} alt="Cover" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full grid place-items-center">
                    <LayoutTemplate className="h-7 w-7 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleCoverUpload(e.target.files)} />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs" onClick={() => coverRef.current?.click()} disabled={uploading === "cover"}>
                  {uploading === "cover" ? <><Loader2 className="h-3 w-3 mr-1.5 animate-spin" /> Upload…</> : <><Upload className="h-3 w-3 mr-1.5" /> Changer</>}
                </Button>
                {data.coverPhoto && (
                  <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground hover:text-destructive px-3" onClick={() => update("coverPhoto", "")}>
                    Suppr.
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bibliothèque */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Bibliothèque ({photos.length})</p>
            <div>
              <input ref={libraryRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleLibraryUpload(e.target.files)} />
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => libraryRef.current?.click()} disabled={uploading === "library"}>
                {uploading === "library" ? <Loader2 className="h-3 w-3 mr-1.5 animate-spin" /> : <Upload className="h-3 w-3 mr-1.5" />}
                Ajouter
              </Button>
            </div>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleLibraryUpload(e.dataTransfer.files); }}
            className="min-h-[4px]"
          >
            {loading ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square rounded-xl bg-muted/30 animate-pulse" />)}
              </div>
            ) : photos.length === 0 ? (
              <div
                onClick={() => libraryRef.current?.click()}
                className="text-center py-12 border-2 border-dashed border-border rounded-2xl bg-card/20 cursor-pointer hover:border-primary/40 transition"
              >
                <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Glissez vos photos ici ou cliquez pour en ajouter</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                {photos.map((p) => (
                  <div key={p.path} className="group relative rounded-xl overflow-hidden border border-border bg-muted/20 aspect-square">
                    <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-1.5 gap-1">
                      <div className="grid grid-cols-2 gap-1">
                        <button
                          className="text-[10px] font-medium text-white bg-white/20 hover:bg-primary rounded-md py-1 transition"
                          onClick={() => { update("photo", p.url); toast.success("Photo de profil appliquée"); }}
                        >
                          Profil
                        </button>
                        <button
                          className="text-[10px] font-medium text-white bg-white/20 hover:bg-primary rounded-md py-1 transition"
                          onClick={() => { update("coverPhoto", p.url); toast.success("Cover appliquée"); }}
                        >
                          Cover
                        </button>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="secondary" className="h-6 flex-1 text-[10px] px-1" onClick={() => copyUrl(p.url)}>
                          {copied === p.url ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                        <Button size="sm" variant="destructive" className="h-6 px-2" onClick={() => remove(p.path)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <aside className="hidden xl:block">
        <div className="sticky top-20">
          <p className="text-xs uppercase tracking-[0.18em] text-primary flex items-center gap-1.5 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Aperçu live
          </p>
          <PhoneFrame><BusinessCard data={data} /></PhoneFrame>
        </div>
      </aside>
    </div>
  );
}
