import { defineEventHandler, readBody, getHeader } from "h3";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  if (event.path !== "/api/send-magic-link" || event.method !== "POST") return;

  // CORS for same-origin calls
  const origin = getHeader(event, "origin") ?? "";
  const appUrl = process.env.VITE_APP_URL ?? "https://convert-your-card.vercel.app";

  const body = await readBody(event);
  const { email, redirectTo, createUser = true } = body ?? {};

  if (!email || typeof email !== "string") {
    return new Response(JSON.stringify({ error: "Email requis" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const resendKey = process.env.RESEND_API_KEY ?? "";

  if (!serviceKey || !resendKey) {
    return new Response(JSON.stringify({ error: "Misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const adminSupabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Generate magic link via Supabase Admin (no email sent by Supabase)
  const { data, error } = await adminSupabase.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: {
      redirectTo: redirectTo ?? `${appUrl}/dashboard`,
      data: body.userData ?? {},
    },
  });

  if (error || !data?.properties?.action_link) {
    console.error("[magic-link] generateLink error:", error);
    // If user doesn't exist and createUser=false, return error
    return new Response(JSON.stringify({ error: error?.message ?? "Impossible de générer le lien" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const magicLink = data.properties.action_link;
  const firstName = email.split("@")[0];

  // Wrap the Supabase link in our own redirect page so email scanners (Gmail/Outlook)
  // don't consume the one-time token before the user clicks.
  const safeLink = `${appUrl}/auth/redirect?to=${encodeURIComponent(magicLink)}`;

  // Send via Resend (no rate limits)
  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "OneTap <bilel@convertilab.com>",
      to: email,
      subject: "Ton lien de connexion OneTap",
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:40px 20px;background:#fff">
          <div style="text-align:center;margin-bottom:32px">
            <div style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#c026d3,#7c3aed);padding:10px 20px;border-radius:50px">
              <span style="color:white;font-weight:700;font-size:18px">OneTap</span>
            </div>
          </div>
          <h1 style="color:#0f0f0f;font-size:24px;font-weight:700;margin:0 0 8px">Connecte-toi à OneTap</h1>
          <p style="color:#6b7280;font-size:15px;margin:0 0 32px;line-height:1.6">
            Clique sur le bouton ci-dessous pour te connecter. Ce lien expire dans 1 heure.
          </p>
          <a href="${safeLink}" style="display:block;text-align:center;background:linear-gradient(135deg,#c026d3,#7c3aed);color:white;padding:16px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:16px;margin-bottom:24px">
            Se connecter →
          </a>
          <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0">
            Si tu n'as pas demandé ce lien, ignore cet email.<br/>
            Ce lien est valable une seule fois.
          </p>
        </div>
      `,
    }),
  });

  if (!emailRes.ok) {
    const resendError = await emailRes.text();
    console.error("[magic-link] Resend error:", resendError);
    return new Response(JSON.stringify({ error: "Impossible d'envoyer l'email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("[magic-link] Sent to:", email);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
