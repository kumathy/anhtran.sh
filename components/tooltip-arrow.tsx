export function TooltipArrow({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 14 9"
      aria-hidden="true"
      className={`absolute -top-2.25 h-2.25 w-3.5 -translate-x-1/2 overflow-hidden ${className}`}
    >
      <polygon points="0,9 7,2 14,9" className="fill-surface" />
      <polyline
        points="-1,10 7,2 15,10"
        fill="none"
        strokeWidth="2"
        className="stroke-border"
      />
    </svg>
  );
}
