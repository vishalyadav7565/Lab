import { notFound } from "next/navigation";
import TestClient from "./TestClient";

// ✅ DATA
const tests = [
  {
    id: "full-body-essential",
    name: "Full Body Essential",
    price: 1599,
    description: "This package includes 90+ parameters.",
    image: "/tests/full-body-essential.jpg",
    parameters: "91 parameters",
    reportTime: "6 hrs",
    includes: ["Hemoglobin", "RBC Count", "WBC Count"],
  },
  {
    id: "full-body-advanced",
    name: "Full Body Advanced",
    price: 2799,
    description: "Advanced screening with 100+ parameters.",
    image: "/tests/full-body-advanced.jpg",
    parameters: "100 parameters",
    reportTime: "6 hrs",
    includes: ["Liver Function", "Kidney Function"],
  },
];

// ✅ STATIC PARAMS (HARDCODE = safest)
export function generateStaticParams() {
  return [
    { id: "full-body-essential" },
    { id: "full-body-advanced" },
  ];
}

// ✅ FIXED
export default async function Page({ params }: any) {
  const { id } = await params; // ✅ IMPORTANT FIX

  const test = tests.find((t) => t.id === id);

  if (!test) return notFound();

  return <TestClient test={test} />;
}