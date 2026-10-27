import { PageTransition } from "@/components/page-transition";

// Animates switching between tutorials while the sidebar stays put.
export default function DocsTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
