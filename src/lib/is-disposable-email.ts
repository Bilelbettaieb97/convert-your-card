// eslint-disable-next-line @typescript-eslint/no-require-imports
const disposableDomains: string[] = require("disposable-email-domains");

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return disposableDomains.includes(domain);
}
