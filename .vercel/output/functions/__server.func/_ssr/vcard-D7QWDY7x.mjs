function esc(value) {
  if (!value) return "";
  return String(value).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}
function normalizePhone(raw) {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const plus = trimmed.startsWith("+") ? "+" : "";
  return plus + trimmed.replace(/[^\d]/g, "");
}
function normalizeUrl(raw) {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}
function buildVCard(d) {
  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  const parts = (d.name ?? "").trim().split(/\s+/);
  const given = parts[0] ?? "";
  const family = parts.slice(1).join(" ");
  lines.push(`N:${esc(family)};${esc(given)};;;`);
  lines.push(`FN:${esc(d.name)}`);
  if (d.agency) lines.push(`ORG:${esc(d.agency)}`);
  if (d.title) lines.push(`TITLE:${esc(d.title)}`);
  const phone = normalizePhone(d.phone);
  if (phone) lines.push(`TEL;TYPE=CELL,VOICE:${phone}`);
  const whatsapp = normalizePhone(d.whatsapp);
  if (whatsapp && whatsapp !== phone) {
    lines.push(`TEL;TYPE=WORK,TEXT:${whatsapp}`);
  }
  if (d.email) lines.push(`EMAIL;TYPE=INTERNET,PREF:${esc(d.email)}`);
  const website = normalizeUrl(d.website);
  if (website) lines.push(`URL:${esc(website)}`);
  if (d.linkedin) lines.push(`URL;TYPE=LinkedIn:${esc(normalizeUrl(d.linkedin))}`);
  if (d.instagram) lines.push(`URL;TYPE=Instagram:${esc(normalizeUrl(d.instagram))}`);
  if (d.area) lines.push(`ADR;TYPE=WORK:;;${esc(d.area)};;;;`);
  if (d.bio) lines.push(`NOTE:${esc(d.bio)}`);
  if (d.photo && d.photo.startsWith("data:image/")) {
    const match = d.photo.match(/^data:image\/(\w+);base64,(.+)$/);
    if (match) {
      const [, kind, b64] = match;
      lines.push(`PHOTO;ENCODING=b;TYPE=${kind.toUpperCase()}:${b64}`);
    }
  }
  lines.push(`REV:${(/* @__PURE__ */ new Date()).toISOString()}`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}
function downloadVCard(d) {
  const blob = new Blob([buildVCard(d)], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const slug = (d.name || "contact").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  a.download = `${slug || "contact"}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
export {
  downloadVCard as d
};
