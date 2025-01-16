import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bacteria Taxonomy Lineage Finder",
  description: "Discover bacteria lineage, easily. Just search. No need to register",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col gap-10 p-8 font-[family-name:var(--font-geist-sans)]">
          <div className="flex flex-row items-center gap-4">
            <Link className="text-2xl" href="/"><h1>Taxonomy <span className="font-bold">Finder</span></h1></Link>
          </div>
          <div>
            <Suspense fallback={<p>Loading...</p>}>
              {children}
            </Suspense>
          </div>
        </div>

        <section className="-z-30">
          <div className='air air1 -z-30'></div>
          <div className='air air2 -z-30'></div>
          <div className='air air3 -z-30'></div>
          <div className='air air4 -z-30'></div>
        </section>

        <div className="text-white text-xs z-10 absolute bottom-0 right-0 p-2">
          <p>2025 &copy; Taxonomy Finder developed by alxkui | Powered by <a href="https://www.ebi.ac.uk/">ENA Portal API</a></p>
        </div>
      </body>
    </html>
  );
}
