import Link from "next/link";
import { Button } from "@/components/shared/button";

export default function NavMenu() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 transition-all bg-background">
      <div className="w-full max-w-screen-xl mx-auto px-8 ">
        <div className="flex justify-end h-16 items-center">
          <div className="flex items-center gap-4">
            <Button className="rounded-full" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}