export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-5 w-5 rounded-sm bg-white" />
          <span className="text-lg font-semibold">Fintech</span>
        </div>
        <div>
          <a
            href="#signin"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Sign In
          </a>
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-24 pt-12 md:grid-cols-2 md:gap-16">
        <div>
          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            <span className="block font-serif italic text-white/90">Financial</span>
            <span className="block font-serif italic text-white/90">Advisor App:</span>
            <span className="block font-serif italic text-white">Transforming</span>
          </h1>
          <p className="mt-8 max-w-xl text-zinc-300">
            Streamline your financial journey with our intuitive app. Dive into clear charts
            and insights.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#get-started"
              className="rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Get Started
            </a>
            <a
              href="#learn-more"
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/40"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-10 top-16 hidden h-44 w-72 rounded-2xl bg-white/5 backdrop-blur md:block" />
          <div className="relative mx-auto flex max-w-md items-end justify-center md:max-w-none">
            <div className="mr-6 hidden w-56 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 md:block">
              <div className="aspect-[9/19] w-full rounded-2xl bg-zinc-900" />
            </div>
            <div className="w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl">
              <div className="aspect-[9/19] w-full rounded-2xl bg-zinc-900" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
