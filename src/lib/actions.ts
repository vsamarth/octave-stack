"use server";

import { getSession } from "./auth";
import { signInSchema } from "./schema";
import { redirect } from "next/navigation";

export async function signOut() {
  const session = await getSession();
  session.destroy();
}

export async function signIn(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const schema = signInSchema;
  const data = schema.safeParse(values);

  if (!data.success) {
    return data.error;
  }

  const session = await getSession();
  session.status = "active";
  session.user = {
    name: "Michael Scott",
    email: data.data.email,
    email_verified: true,
    picture: "https://example.com/michael-scott.jpg",
  };

  await session.save();
  redirect("/");
}
