import type { APIContext } from "astro";
import { getEnv, verifyTurnstile, relay } from "../../lib/relay";

export const prerender = false; // render on-demand (Cloudflare Worker)

export async function POST(ctx: APIContext): Promise<Response> {
  const env = getEnv(ctx.locals);
  const form = await ctx.request.formData();
  const message = String(form.get("message") ?? "").trim();
  const contact = String(form.get("contact") ?? "").trim();

  if (!message) return ctx.redirect("/get-help#form");

  const human = await verifyTurnstile(
    String(form.get("cf-turnstile-response") ?? ""),
    env.TURNSTILE_SECRET,
    ctx.clientAddress
  );
  if (!human) return ctx.redirect("/get-help?error=verify#form");

  await relay({
    env,
    subject: "Get Help — a young person reached out",
    text: `Someone reached out through the Get Help form.\n\nMessage:\n${message}\n\nContact (optional): ${contact || "(left anonymous)"}`,
    replyTo: contact.includes("@") ? contact : undefined,
  });

  return ctx.redirect("/get-help?sent=1#form");
}
