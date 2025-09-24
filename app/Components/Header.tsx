'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { use } from "react"

export default function Header() {
  const pathname = usePathname()
    const {user} = useUser()
  return (
    <div className="flex items-center justify-between p-4 ">
        {user && (
          <h1 className="text-2xl font-semibold">
            {user.fullName}
          </h1>
        )}

        <nav className="flex items-center gap-2">
          {[
            // { label: "Home", href: "/" },
            { label: "Goals", href: "/goalsetting"},
            { label: "Expenditure", href: "/expenditure"},
            { label: "Profile", href: "/profile"},
          ].map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "bg-white-400 text-white shadow-lg shadow-blue-600/25" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div>
          <SignedOut>
            <SignInButton/>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
    </div>
  )
}

