import { redirect } from "next/navigation";
import { experiments } from "@/data/experiments";

export function generateStaticParams() {
  return experiments.map((exp) => ({ id: exp.id }));
}

export default async function ExperimentRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/experiments/${id}/`);
}
