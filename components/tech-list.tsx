export function TechList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border-2 border-border px-2.5 py-0.5 text-xs text-muted transition-colors hover:border-muted hover:text-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
