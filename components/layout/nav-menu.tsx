"use server";

import UserDropdown from "./user-dropdown";
import { getSession, SessionData } from "@/lib/auth";

export default async function NavMenu() {
  const session = await getSession();

  const sessionData: SessionData = {
    status: session.status,
    user: session.user,
  };
  return (
    <header className="fixed inset-x-0 top-0 z-30 transition-all bg-transparent">
      <div className="w-full max-w-screen-xl mx-auto px-8 ">
        <div className="flex justify-end h-16 items-center">
          <div className="flex items-center gap-4">
            <UserDropdown session={sessionData} />
          </div>
        </div>
      </div>
    </header>
  );
}
