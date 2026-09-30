import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6">
      <h1 className="text-lg font-medium">Not found</h1>
      <p className="mt-2 text-muted">
        That page doesn&rsquo;t exist.{" "}
        <Link
          href="/"
          className="text-foreground underline decoration-2 underline-offset-6 transition-colors hover:text-accent"
        >
          Back home
        </Link>
        .
      </p>
    </main>
  );
}
