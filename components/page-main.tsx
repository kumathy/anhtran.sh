import { ViewTransition } from "react";

export function PageMain({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <main className="mx-auto w-full max-w-2xl flex-1 px-6">{children}</main>
    </ViewTransition>
  );
}
