import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { Q as QRCode } from "../_libs/qrcode.mjs";
import { B as Button } from "./router-CdkVxzFp.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { ae as Link2, a5 as Check, Q as QrCode, D as Download, M as MessageCircle, b2 as MessageSquare, r as Mail, aH as Linkedin, b3 as Twitter, aK as Facebook, an as Copy, ab as Share2 } from "../_libs/lucide-react.mjs";
function ShareGrid({ data, url, compact = false }) {
  const [copied, setCopied] = reactExports.useState(false);
  const shareText = `${data.name || "Ma carte"}${data.title ? " — " + data.title : ""}`;
  const enc = (s) => encodeURIComponent(s);
  const channels = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      color: "#25D366",
      href: `https://wa.me/?text=${enc(shareText + " " + url)}`
    },
    {
      id: "sms",
      label: "SMS",
      icon: MessageSquare,
      color: "#5856D6",
      href: `sms:?&body=${enc(shareText + " " + url)}`
    },
    {
      id: "email",
      label: "Email",
      icon: Mail,
      color: "#EA4335",
      href: `mailto:?subject=${enc(shareText)}&body=${enc(shareText + "%0A%0A" + url)}`
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      color: "#0A66C2",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`
    },
    {
      id: "twitter",
      label: "X",
      icon: Twitter,
      color: "#000000",
      href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(url)}`
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: Facebook,
      color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`
    }
  ];
  const visible = compact ? channels.slice(0, 4) : channels;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Lien copié dans le presse-papiers");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Impossible de copier");
    }
  };
  const handleNative = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: data.name || "Ma carte", text: shareText, url });
      } catch {
      }
    } else handleCopy();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-2", children: [
    visible.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: c.href,
        target: c.href.startsWith("http") ? "_blank" : void 0,
        rel: "noopener noreferrer",
        className: "group flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card/40 hover:bg-card hover:border-primary/40 px-2 py-3 transition-all hover:-translate-y-0.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "h-9 w-9 grid place-items-center rounded-lg text-white transition-transform group-hover:scale-110",
              style: { background: c.color },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-foreground/80", children: c.label })
        ]
      },
      c.id
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleCopy,
        className: "group flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card/40 hover:bg-card hover:border-primary/40 px-2 py-3 transition-all hover:-translate-y-0.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 grid place-items-center rounded-lg bg-foreground/10 text-foreground transition-transform group-hover:scale-110", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-foreground/80", children: copied ? "Copié" : "Copier" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleNative,
        className: "group flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card/40 hover:bg-card hover:border-primary/40 px-2 py-3 transition-all hover:-translate-y-0.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 grid place-items-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-foreground/80", children: "Autre…" })
        ]
      }
    )
  ] }) });
}
function QrCard({ url, name }) {
  const [qr, setQr] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!url) return;
    let cancelled = false;
    QRCode.toDataURL(url, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 640,
      color: { dark: "#0b0d12", light: "#ffffff" }
    }).then((d) => {
      if (!cancelled) setQr(d);
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, [url]);
  const download = (kind) => {
    if (kind === "png") {
      if (!qr) return;
      const a = document.createElement("a");
      a.href = qr;
      a.download = `${(name || "carte").toLowerCase().replace(/\s+/g, "-")}-qr.png`;
      a.click();
      return;
    }
    QRCode.toString(url, { type: "svg", errorCorrectionLevel: "H", margin: 1, color: { dark: "#0b0d12", light: "#ffffff" } }).then((svg) => {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = `${(name || "carte").toLowerCase().replace(/\s+/g, "-")}-qr.svg`;
      a.click();
      URL.revokeObjectURL(href);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-gradient-to-br from-card to-card/40 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-7 w-7 grid place-items-center rounded-md bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "QR code" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => download("png"), disabled: !qr, className: "h-7 px-2 text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3 mr-1" }),
          " PNG"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => download("svg"), className: "h-7 px-2 text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3 mr-1" }),
          " SVG"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-fit", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/30 to-transparent blur-xl opacity-50", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/10", children: qr ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qr, alt: "QR code", className: "h-44 w-44 sm:h-48 sm:w-48" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 w-44 sm:h-48 sm:w-48 grid place-items-center text-xs text-neutral-400", children: "Génération…" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground text-center mt-3", children: "Imprimez-le sur vos supports — chaque scan ouvre votre carte." })
  ] });
}
function PublicLinkBar({ url }) {
  const [copied, setCopied] = reactExports.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Lien copié");
      setTimeout(() => setCopied(false), 1500);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-4 w-4 text-primary shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono truncate flex-1", children: url.replace(/^https?:\/\//, "") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copy, className: "text-[11px] uppercase tracking-wider text-muted-foreground hover:text-primary px-2 py-1 rounded-md transition", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" }) : "Copier" })
  ] });
}
export {
  PublicLinkBar as P,
  QrCard as Q,
  ShareGrid as S
};
