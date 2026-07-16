import { notFound } from "next/navigation";

/** Catch-all inside the locale tree so unknown paths render the 404 page. */
export default function CatchAllPage() {
  notFound();
}
