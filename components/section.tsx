export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="border-b-2 border-border pb-4 text-sm font-medium text-muted">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
