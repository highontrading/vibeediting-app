import { LegalPage, legalMetadata } from "@/components/legal-page";

export const metadata = legalMetadata("delivery");

export default function Page() {
  return <LegalPage slug="delivery" />;
}
