import { google } from "@/lib/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const scopes = ["email", "profile", "openid"];
  const authorizationUrl = google.createAuthorizationURL(
    state,
    codeVerifier,
    scopes,
  );

  cookies().set("google-oauth-state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  cookies().set("google-oauth-code-verifier", codeVerifier, {
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
  });

  return Response.redirect(authorizationUrl);
}
