import type { MetaFunction } from "@remix-run/node";

import { Button } from "~/components/ui/button";
import {
   ArrowRight,
   ShoppingBag,
   Globe,
   CreditCard,
   BarChart,
   ShieldCheck,
   Rocket,
} from "lucide-react";

export const meta: MetaFunction = () => {
   return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

const features = [
   {
      title: "Global Reach",
      description:
         "Sell to customers worldwide with multi-currency support and localized payment methods.",
      icon: <Globe className="h-6 w-6" />,
   },
   {
      title: "Instant Payouts",
      description:
         "Get paid instantly when you make a sale, with support for multiple payment gateways.",
      icon: <CreditCard className="h-6 w-6" />,
   },
   {
      title: "Sales Analytics",
      description:
         "Track your performance with detailed analytics and insights about your customers.",
      icon: <BarChart className="h-6 w-6" />,
   },
   {
      title: "Secure Platform",
      description: "Your products and customer data are protected with enterprise-grade security.",
      icon: <ShieldCheck className="h-6 w-6" />,
   },
   {
      title: "Digital Storefront",
      description: "Create a professional storefront with customizable themes and branding.",
      icon: <ShoppingBag className="h-6 w-6" />,
   },
   {
      title: "Quick Setup",
      description: "Get started in minutes with our intuitive dashboard and setup wizard.",
      icon: <Rocket className="h-6 w-6" />,
   },
];

const stats = [
   { value: "10K+", label: "Active Creators" },
   { value: "$2M+", label: "Monthly Sales" },
   { value: "50K+", label: "Products Sold" },
   { value: "99.9%", label: "Uptime" },
];

const footerSections = [
   {
      title: "Platform",
      links: ["Features", "Pricing", "Integrations", "Enterprise"],
   },
   {
      title: "Company",
      links: ["About", "Careers", "Blog", "Press"],
   },
   {
      title: "Resources",
      links: ["Documentation", "Help Center", "Guides", "API Status"],
   },
   {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "Cookies"],
   },
];

export default function Index() {
   return (
      <div className="min-h-screen bg-white">
         {/* Hero Section */}
         <header className="relative overflow-hidden bg-black text-white">
            <div
               style={{ backgroundImage: "url('/grid.svg')" }}
               className="absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-20"
            ></div>
            <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
                  <div className="max-w-lg">
                     <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        Turn Your Digital Products into Revenue
                     </h1>
                     <p className="mt-6 text-lg leading-8 text-gray-300">
                        Launch your digital storefront in minutes. Sell courses, ebooks, software,
                        and more with a powerful, minimalist platform.
                     </p>
                     <div className="mt-10 flex gap-x-6">
                        <Button
                           size="lg"
                           className="bg-white text-black hover:bg-gray-100"
                        >
                           <a
                              href="/register"
                              className="flex items-center gap-x-6"
                           >
                              Start Selling Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                           </a>
                        </Button>
                        <Button
                           variant="outline"
                           className="text-black border-white hover:bg-white/10"
                        >
                           <a
                              href=""
                              className="flex items-center gap-x-6"
                           >
                              View Demo Store
                           </a>
                        </Button>
                     </div>
                  </div>
                  <div className="relative">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                     </div>
                     <img
                        src="/api/placeholder/600/400"
                        alt="Dashboard preview"
                        className="relative rounded-xl shadow-2xl border border-gray-800"
                     />
                  </div>
               </div>
            </div>
         </header>

         {/* Features Section */}
         <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                     Everything You Need to Succeed
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                     Built for creators, designed for growth
                  </p>
               </div>

               <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature) => (
                     <div
                        key={feature.title}
                        className="group relative"
                     >
                        <div className="absolute inset-0 rounded-2xl bg-white border border-gray-100 shadow-sm transition-colors group-hover:border-black"></div>
                        <div className="relative p-8">
                           <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                              {feature.icon}
                           </div>
                           <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                           <p className="mt-2 text-gray-600">{feature.description}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* CTA Section */}
         <section className="relative bg-black text-white">
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                  <div>
                     <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Start Building Your Digital Empire Today
                     </h2>
                     <p className="mt-6 text-lg text-gray-300">
                        Join thousands of creators who are building successful digital businesses
                        with Markely.
                     </p>
                     <div className="mt-10 flex items-center gap-x-6">
                        <Button
                           size="lg"
                           className="bg-white text-black hover:bg-gray-100"
                        >
                           Create Your Store
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                     </div>
                  </div>
                  <div className="relative">
                     <img
                        src="/api/placeholder/500/300"
                        alt="Creator dashboard"
                        className="rounded-xl shadow-2xl border border-gray-800"
                     />
                  </div>
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section className="border-y border-gray-200">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat) => (
                     <div
                        key={stat.label}
                        className="text-center"
                     >
                        <p className="text-4xl font-bold">{stat.value}</p>
                        <p className="mt-2 text-gray-600">{stat.label}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Footer */}
         <footer className="bg-black text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {footerSections.map((section) => (
                     <div key={section.title}>
                        <h3 className="text-lg font-semibold">{section.title}</h3>
                        <ul className="mt-4 space-y-2">
                           {section.links.map((link) => (
                              <li
                                 key={link}
                                 className="text-gray-300 hover:text-white cursor-pointer"
                              >
                                 {link}
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
               <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
                  <p>© 2025 Markely. All rights reserved.</p>
               </div>
            </div>
         </footer>
      </div>
   );
}

const resources = [
   {
      href: "https://remix.run/start/quickstart",
      text: "Quick Start (5 min)",
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
         >
            <path
               d="M8.51851 12.0741L7.92592 18L15.6296 9.7037L11.4815 7.33333L12.0741 2L4.37036 10.2963L8.51851 12.0741Z"
               strokeWidth="1.5"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      ),
   },
   {
      href: "https://remix.run/start/tutorial",
      text: "Tutorial (30 min)",
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
         >
            <path
               d="M4.561 12.749L3.15503 14.1549M3.00811 8.99944H1.01978M3.15503 3.84489L4.561 5.2508M8.3107 1.70923L8.3107 3.69749M13.4655 3.84489L12.0595 5.2508M18.1868 17.0974L16.635 18.6491C16.4636 18.8205 16.1858 18.8205 16.0144 18.6491L13.568 16.2028C13.383 16.0178 13.0784 16.0347 12.915 16.239L11.2697 18.2956C11.047 18.5739 10.6029 18.4847 10.505 18.142L7.85215 8.85711C7.75756 8.52603 8.06365 8.21994 8.39472 8.31453L17.6796 10.9673C18.0223 11.0653 18.1115 11.5094 17.8332 11.7321L15.7766 13.3773C15.5723 13.5408 15.5554 13.8454 15.7404 14.0304L18.1868 16.4767C18.3582 16.6481 18.3582 16.926 18.1868 17.0974Z"
               strokeWidth="1.5"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      ),
   },
   {
      href: "https://remix.run/docs",
      text: "Remix Docs",
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
         >
            <path
               d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
               strokeWidth="1.5"
               strokeLinecap="round"
            />
         </svg>
      ),
   },
   {
      href: "https://rmx.as/discord",
      text: "Join Discord",
      icon: (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
         >
            <path
               d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
               strokeWidth="1.5"
            />
         </svg>
      ),
   },
];
