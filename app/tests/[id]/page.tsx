import { notFound } from "next/navigation";
import { tests } from "@/app/data/tests";
import { getTestContent } from "@/app/lib/getTestContent";
import TestClient from "./TestClient";

export async function generateStaticParams() {
  return tests.map((test) => ({
    id: test.id,
  }));
}

export default async function Page({ params }: any) {
  // ✅ FIX (Next.js 15)
  const { id } = await params;

  const test = tests.find((t) => t.id === id);

  if (!test) return notFound();

  const content = await getTestContent(id);

  return <TestClient test={test} content={content} />;
}