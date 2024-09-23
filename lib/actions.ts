"use server";

import { getSession } from "./auth";

export async function signOut() {
  const session = await getSession();
  session.destroy();
}
