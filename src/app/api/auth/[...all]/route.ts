import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "~/lib/auth";
import { rateLimit } from "~/lib/rate-limit";

const handlers = toNextJsHandler(auth);

export const GET = handlers.GET;

export async function POST(request: Request) {
  const limited = await rateLimit(request, "auth");

  if (!limited.ok) {
    return limited.response;
  }

  return handlers.POST(request);
}
