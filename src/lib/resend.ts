import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function sendWelcomeEmail({
  email,
  nom,
  slug,
  plan,
}: {
  email: string;
  nom: string;
  slug: string;
  plan: string;
}) {
  const appUrl = process.env.VITE_APP_URL ?? "https://convert-your-card.vercel.app";
  const cardUrl = `${appUrl}/${slug}`;
  const dashboardUrl = `${appUrl}/dashboard`;
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  await resend.emails.send({
    from: "Bilel · ConvertiLab <bilel@convertilab.com>",
    to: email,
    subject: `🎉 Ta carte OneTap est prête, ${nom.split(" ")[0]} !`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #1a1a2e; font-size: 28px; margin-bottom: 8px;">Ta carte est prête ! 🚀</h1>
        <p style="color: #6b7280; font-size: 16px; margin-bottom: 32px;">
          Salut ${nom.split(" ")[0]}, bienvenue sur OneTap. Ton plan <strong>${planLabel}</strong> est actif.
        </p>

        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <p style="font-weight: 600; margin: 0 0 8px; color: #1a1a2e;">Ta carte de visite digitale :</p>
          <a href="${cardUrl}" style="color: #c026d3; font-size: 16px; word-break: break-all;">${cardUrl}</a>
        </div>

        <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #c026d3, #7c3aed); color: white; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; margin-bottom: 32px;">
          Accéder à mon dashboard →
        </a>

        <p style="color: #9ca3af; font-size: 13px; border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 16px;">
          Des questions ? Réponds directement à cet email ou contacte-nous à
          <a href="mailto:bilel@convertilab.com" style="color: #c026d3;">bilel@convertilab.com</a>
        </p>
      </div>
    `,
  });
}
