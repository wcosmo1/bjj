import { TECHNIQUES } from "@/lib/data/techniques";
import TechniqueDetailClient from "./TechniqueDetailClient";

export function generateStaticParams() {
  return TECHNIQUES.map((t) => ({ id: t.id }));
}

export default function TechniqueDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <TechniqueDetailClient id={params.id} />;
}
