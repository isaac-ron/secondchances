import type { APIContext } from "astro";
import { getEnv, verifyTurnstile, relay } from "../../lib/relay";

export const prerender = false;

export async function POST(ctx: APIContext): Promise<Response> {
  const env = getEnv(ctx.locals);
  const form = await ctx.request.formData();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const topic = String(form.get("topic") ?? "General enquiry").trim();
  const message = String(form.get("message") ?? "").trim();

  if (!email || !message) return ctx.redirect("/contact");

  const human = await verifyTurnstile(
    String(form.get("cf-turnstile-response") ?? ""),
    env.TURNSTILE_SECRET,
    ctx.clientAddress
  );
  if (!human) return ctx.redirect("/contact?error=verify");

  await relay({
    env,
    subject: `Contact form: ${topic}`,
    text: `Topic: ${topic}\nName: ${name || "(not given)"}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email,
  });

  return ctx.redirect("/contact?sent=1");
}
