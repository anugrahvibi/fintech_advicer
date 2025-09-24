'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { useUser } from "@clerk/nextjs"

export default function Profile() {
  const { user, isLoaded } = useUser()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div>
          <SignedOut>
            <SignInButton/>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </div>
      </div>

      <SignedIn>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-[rgba(20,20,20,.8)] border border-white/10 rounded-xl p-6 flex flex-col items-center text-center">
            {isLoaded && user && (
              <>
                <img
                  src={user.imageUrl}
                  alt={user.fullName ?? 'User avatar'}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-medium">{user.fullName ?? 'Anonymous'}</h2>
                <p className="text-sm text-slate-400 mt-1">{user?.primaryEmailAddress?.emailAddress}</p>
              </>
            )}
          </div>

          <div className="md:col-span-2 grid grid-cols-1 gap-6">
            <div className="bg-[rgba(20,20,20,.8)] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Account Details</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-slate-400 text-sm">User ID</dt>
                  <dd className="mt-1 break-all">{user?.id}</dd>
                </div>
                <div>
                  <dt className="text-slate-400 text-sm">Created</dt>
                  <dd className="mt-1">{user?.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</dd>
                </div>
                <div>
                  <dt className="text-slate-400 text-sm">First name</dt>
                  <dd className="mt-1">{user?.firstName ?? '-'}</dd>
                </div>
                <div>
                  <dt className="text-slate-400 text-sm">Last name</dt>
                  <dd className="mt-1">{user?.lastName ?? '-'}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-[rgba(20,20,20,.8)] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Security</h3>
              <p className="text-sm text-slate-400">Manage your session and authentication from the avatar menu in the top right.</p>
            </div>
          </div>
        </section>
      </SignedIn>

      <SignedOut>
        <div className="bg-[rgba(20,20,20,.8)] border border-white/10 rounded-xl p-8 text-center">
          <h2 className="text-xl font-medium mb-2">You are not signed in</h2>
          <p className="text-slate-400 mb-4">Sign in to view and manage your profile.</p>
          <SignInButton />
        </div>
      </SignedOut>
    </main>
  )
}