import { Button } from "@/components/shared/button";
import { LayoutIcon, LockClosedIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 space-y-8">
        <div className="text-center space-y-8 max-w-2xl text-balance">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            You've never made a website this
            <span className="text-blue-600"> fast before</span>
            </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A meticulously crafted template for your next SaaS application, with
            a modern design and the perfect starting point to build your next
            big thing.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="rounded-full">Get started - for free</Button>
          <Button variant="outline" className="rounded-full">
            Discover Octave
          </Button>
        </div>
        <FeaturesSection />
      </div>
    </>
  );
}

function FeaturesSection() {
  return (
    <section className="pt-16 container mx-auto max-w-screen-lg">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-primary mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    icon: <LayoutIcon className="h-6 w-6" />,
    title: "Next.js",
    description: "App dir, Routing, Layouts, Loading UI and API routes.",
  },
  {
    icon: <LockClosedIcon className="h-6 w-6" />,
    title: "Components",
    description:
      "UI components built using Radix UI and styled with Tailwind CSS.",
  },
  {
    icon: <LockClosedIcon className="h-6 w-6" />,
    title: "Authentication",
    description: "Authentication using NextAuth.js and middlewares.",
  },
];
