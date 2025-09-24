'use client'

import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { SignInButton, useUser } from "@clerk/nextjs";


export default function Home() {
  const {user,} = useUser()
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <img className="logo" src="logo.png" alt="" />
          <span className="text-lg font-semibold">FinTech</span>
        </div>
        <div>
           {/* <a
              href="#signin"
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
            Sign In
           </a> */}
          <SignedOut>
            <SignInButton  />
          </SignedOut> 
          <SignedIn>
            <UserButton/>
          </SignedIn>   
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-24 pt-12 md:grid-cols-2 md:gap-16">
        <div>
          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            {/* <span className="block tagline italic text-white/90">FinTech</span> */}
            <span className="block tagline italic text-white/90">Your Financial Advisor:</span>
          </h1>
          <p className="mt-8 max-w-xl text-zinc-300">
            Take Control of your Money. Today and Tommorow.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#get-started"
              className="rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className="relative">
          <img src="home_banner.png" alt="" />
        </div>
      </section>
    </main>
  );
}
