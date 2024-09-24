import { Button } from "@/components/shared/button";
import * as Form from "@radix-ui/react-form";
import Link from "next/link";
import Image from "next/image";

import appleLogo from "@assets/icons/apple-logo.svg";
import googleLogo from "@assets/icons/google-logo.svg";
import { signIn } from "@/lib/actions";

export default function Login() {
  return (
    <div className="min-h-svh grid place-items-center">
      <div className="max-w-md md:p-6 p-8  w-full space-y-6">
        <h2 className="text-2xl font-semibold mb-10 text-gray-800 text-center">
          Sign in to your account
        </h2>
        <LoginForm />
        <Separator />
        <SocialSignIn />
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="px-2 bg-white text-zinc-400 uppercase">
          or continue with
        </span>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <Form.Root action={signIn} className="w-full space-y-8">
      <Form.Field name="email" className="flex flex-col gap-2">
        <Form.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-700">
          Email
        </Form.Label>
        <Form.Control
          type="email"
          required
          placeholder="you@example.com"
          className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:border-border focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </Form.Field>
      <Form.Submit asChild>
        <Button className="w-full" size="lg">
          Continue
        </Button>
      </Form.Submit>
    </Form.Root>
  );
}

function SocialSignIn() {
  const providers = [
    { name: "Google", logo: googleLogo, url: "/oauth/google" },
    { name: "Apple", logo: appleLogo, url: "/oauth/apple" },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {providers.map((provider) => (
        <Button
          key={provider.name}
          variant="outline"
          className="w-full"
          size="lg"
          asChild
        >
          <Link href={provider.url}>
            <Image
              src={provider.logo}
              alt={`${provider.name} Logo`}
              className="size-4 mr-2"
            />
            {provider.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}
