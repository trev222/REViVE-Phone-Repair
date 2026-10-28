import Link from "next/link";
import { PageTitle } from "@/components/page-title";

export default function NotFound() {
  return <><PageTitle>Page not found</PageTitle><div className="about-content"><p>We couldn’t find that page.</p><Link href="/">Back to home</Link></div></>;
}
