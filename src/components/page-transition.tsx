import { ViewTransition } from "react";

// Soft fade-and-rise between pages (in browsers with the View Transitions API).
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
