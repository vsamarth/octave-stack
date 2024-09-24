import NavMenu from "@/components/layout/nav-menu";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavMenu />
      <main className="px-8 gap-16 sm:p-20">{children}</main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="py-4 px-6">
      <div className="container mx-auto flex items-center justify-center text-sm text-gray-600">
        <p>
          Built by{" "}
          <a href="#" className="underline hover:text-gray-900">
            vsamarth
          </a>
          . Hosted on{" "}
          <a
            href="https://vercel.com"
            className="underline hover:text-gray-900"
          >
            Vercel
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com"
            className="underline hover:text-gray-900"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
