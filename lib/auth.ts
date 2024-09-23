import { Google } from "arctic";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import invariant from "tiny-invariant";

invariant(process.env.GOOGLE_CLIENT_ID, "Missing GOOGLE_CLIENT_ID");
invariant(process.env.GOOGLE_CLIENT_SECRET, "Missing GOOGLE_CLIENT_SECRET");
invariant(process.env.GOOGLE_REDIRECT_URI, "Missing GOOGLE_REDIRECT_URI");
invariant(process.env.SESSION_SECRET, "Missing SESSION_SECRET");

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!,
);

export type SessionData = {
  status: "active" | "inactive";
  user?: {
    name: string;
    email: string;
    email_verified: boolean;
    picture: string;
  };
};

const defaultSessionData: SessionData = {
  status: "inactive",
};

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), {
    cookieName: "session",
    password: process.env.SESSION_SECRET!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  });

  if (!session.status) {
    session.status = defaultSessionData.status;
  }

  return session;
}
