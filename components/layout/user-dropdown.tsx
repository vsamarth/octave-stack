"use client";

import { Button } from "@/components/shared/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu";
import { SessionData } from "@/lib/auth";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/avatar";

import Link from "next/link";
import { signOut } from "@/lib/actions";
import { ExitIcon } from "@radix-ui/react-icons";

interface UserDropdownProps {
  session: SessionData;
}

export default function UserDropdown({ session }: UserDropdownProps) {
  if (session.status === "active" && session.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full focus-visible:outline-none focus-visible:ring-2 ring-offset-1 ring-ring">
          <Avatar className="size-8">
            <AvatarImage src={session.user.picture} alt={session.user?.name} />
            <AvatarFallback>{session.user.name[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent collisionPadding={16} align="end" sideOffset={8}>
          <DropdownMenuLabel className="flex flex-col pr-6 gap-1">
            <span>{session.user.name}</span>
            <span className="text-sm font-normal text-zinc-800">
              {session.user.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            <ExitIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button className="rounded-full gap-1" asChild>
      <Link href="/login">
        <span>Sign In</span>
      </Link>
    </Button>
  );
}
