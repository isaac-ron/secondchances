import type { APIContext } from "astro";
import { getEnv, verifyTurnstile, relay } from "../../lib/relay";

export const prerender = false;

export async function POST(ctx: APIContext): Promise<Response> {
  const env = getEnv(ctx.locals);
  const form = await ctx.request.formData();
  const message = String(form.get("message") ?? "").trim();
  const contact = String(form.get("contact") ?? "").trim();

  if (!message) return ctx.redirect("/get-involved#refer");

  const human = await verifyTurnstile(
    String(form.get("cf-turnstile-response") ?? ""),
    env.TURNSTILE_SECRET,
    ctx.clientAddress
  );
  if (!human) return ctx.redirect("/get-involved?error=verify#refer");

  await relay({
    env,
    subject: "Referral — a young person was referred to us",
    text: `A referral came through the website.\n\nSituation:\n${message}\n\nReferrer contact: ${contact || "(not provided)"}`,
    replyTo: contact.includes("@") ? contact : undefined,
  });

  return ctx.redirect("/get-involved?sent=refer#refer");
}
