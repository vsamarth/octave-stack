import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { getSession, google } from "@/lib/auth";

type UserInfo = {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  picture: string;
};

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google-oauth-state")?.value ?? null;
  const storedCodeVerifier =
    cookies().get("google-oauth-code-verifier")?.value ?? null;

  if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );
    const accessToken = tokens.accessToken();

    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-cache",
      },
    );
    const user = (await response.json()) as UserInfo;

    const session = await getSession();
    session.status = "active";
    session.user = {
      name: user.name,
      email: user.email,
      email_verified: user.email_verified,
      picture: user.picture,
    };
    await session.save();

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      console.error(error);
      return new Response(null, {
        status: 400,
      });
    }
    throw error;
  }
}
