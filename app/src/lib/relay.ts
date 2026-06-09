// Form-relay helpers. Sensitive submissions are relayed to a controlled inbox
// over TLS and never persisted (data minimisation). All secrets come from the
// runtime environment (Cloudflare) and are optional in dev.

export interface RelayEnv {
  POSTMARK_TOKEN?: string;
  RELAY_TO?: string;
  RELAY_FROM?: string;
  TURNSTILE_SECRET?: string;
}

/** Read env from the Cloudflare runtime, falling back to import.meta.env in dev. */
export function getEnv(locals: unknown): RelayEnv {
  const runtimeEnv = (locals as { runtime?: { env?: RelayEnv } })?.runtime?.env;
  return { ...(import.meta.env as unknown as RelayEnv), ...(runtimeEnv ?? {}) };
}

/** Verify a Cloudflare Turnstile token. Skips (returns true) if not configured. */
export async function verifyTurnstile(token: string, secret?: string, ip?: string): Promise<boolean> {
  if (!secret) return true; // not configured locally
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token ?? "", remoteip: ip ?? "" }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

interface MailArgs {
  env: RelayEnv;
  subject: string;
  text: string;
  replyTo?: string;
}

/** Relay a submission to the monitored inbox via Postmark. No-ops in dev if unset. */
export async function relay({ env, subject, text, replyTo }: MailArgs): Promise<boolean> {
  if (!env.POSTMARK_TOKEN) {
    console.warn("[relay] POSTMARK_TOKEN unset — logging instead of sending:\n", subject, "\n", text);
    return false;
  }
  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Postmark-Server-Token": env.POSTMARK_TOKEN,
    },
    body: JSON.stringify({
      From: env.RELAY_FROM ?? "site@secondchances.co.ke",
      To: env.RELAY_TO ?? "hello@secondchances.org",
      Subject: subject,
      TextBody: text,
      ReplyTo: replyTo,
      MessageStream: "outbound",
    }),
  });
  return res.ok;
}
