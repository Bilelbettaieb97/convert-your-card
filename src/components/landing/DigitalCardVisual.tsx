import { Wifi, Mail, Phone, Globe, Linkedin, Instagram } from "lucide-react";

export function DigitalCardVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow */}
      <div className="absolute -inset-10 bg-gradient-brand opacity-30 blur-3xl rounded-full" aria-hidden />

      {/* Phone mockup */}
      <div className="relative mx-auto w-[280px] h-[560px] bg-foreground rounded-[3rem] p-3 shadow-glow">
        <div className="w-full h-full bg-background rounded-[2.4rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-full z-10" />

          {/* Card content */}
          <div className="pt-12 px-5 pb-5 h-full bg-gradient-soft flex flex-col">
            <div className="bg-gradient-brand rounded-2xl p-5 text-primary-foreground shadow-card relative overflow-hidden">
              <div className="absolute inset-0 animate-shine" aria-hidden />
              <div className="relative flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xl font-bold border border-white/30">
                  JD
                </div>
                <div>
                  <div className="font-display font-bold text-lg leading-tight">Julien Dubois</div>
                  <div className="text-xs opacity-90">CEO · OneTap Studio</div>
                </div>
              </div>
              <div className="relative mt-4 flex items-center gap-2 text-xs">
                <Wifi className="w-4 h-4" />
                <span>onetap.me/julien</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {[
                { icon: Phone, label: "Appeler" },
                { icon: Mail, label: "Email" },
                { icon: Globe, label: "Site web" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Instagram, label: "Instagram" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-card border border-border rounded-xl px-3 py-2.5 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            <button className="mt-auto bg-foreground text-background rounded-xl py-3 font-semibold text-sm">
              Ajouter à mes contacts
            </button>
          </div>
        </div>
      </div>

      {/* Floating physical card */}
      <div className="hidden md:block absolute -bottom-6 -right-8 w-56 h-32 rounded-2xl bg-gradient-brand shadow-glow animate-float p-4 text-primary-foreground">
        <div className="text-[10px] uppercase tracking-widest opacity-80">OneTap</div>
        <div className="font-display font-bold mt-1">Julien Dubois</div>
        <div className="text-xs opacity-90">Approchez votre téléphone</div>
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
          <Wifi className="w-4 h-4 rotate-90" />
        </div>
      </div>
    </div>
  );
}
