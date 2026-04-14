import BookingClient from "./BookingClient";

// ✅ SAME IDS (must match tests)
const tests = [
  { id: "full-body-essential" },
  { id: "full-body-advanced" },
];

// ✅ REQUIRED (STATIC EXPORT FIX)
export function generateStaticParams() {
  return tests.map((t) => ({
    id: t.id,
  }));
}

// ✅ SERVER COMPONENT
export default async function Page({ params }: any) {
  const { id } = await params;

  return <BookingClient testId={id} />;
}