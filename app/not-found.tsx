import Link from "next/link";
import { PageShell } from "@/components/chrome/PageShell";
import { Kiss } from "@/components/ui/Stickers";

export default function NotFound() {
  return (
    <PageShell>
      <div className="container-show flex min-h-[80svh] flex-col items-start justify-center pt-[var(--header-h)]">
        <p className="eyebrow text-muted">Error 404</p>
        <h1 className="font-display soft mt-3 text-display font-black">
          Wrong stage, <em className="text-accent">darling.</em>
        </h1>
        <p className="mt-6 max-w-md text-lede text-muted">
          This page took an early bow. Let&apos;s get you back to the show.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-accent px-6 py-3.5 font-semibold text-on-accent no-underline"
        >
          Back to the show
        </Link>
        <Kiss className="mt-12 w-32" tilt={-10} />
      </div>
    </PageShell>
  );
}
