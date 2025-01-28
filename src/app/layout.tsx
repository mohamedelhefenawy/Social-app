import { ClerkProvider } from "@clerk/nextjs";
import './globals.css';
import { ThemeProvider } from "@/src/app/components/ThemeProvider";
import Navbar from "@/src/app/components/Navbar";
import Sidebar from "./components/Sidebar";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Social App',
  description: 'A social media app built with Next.js and Prisma'
};

// Get the Clerk publishable key from environment variables
const clerkkey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!clerkkey) {
  throw new Error("Missing Clerk publishable key. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.");
}
console.log(clerkkey)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={clerkkey}>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="min-h-screen">
              <Navbar />
              <main className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="hidden lg:block lg:col-span-3">
                      <Sidebar />
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                      {children}
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
