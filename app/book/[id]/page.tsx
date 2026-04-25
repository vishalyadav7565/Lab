import BookingClient from "./BookingClient";
import { tests } from "@/app/data/tests";

// ✅ ALL ROUTES GENERATE
export function generateStaticParams() {
  return tests.map((t) => ({
    id: t.id,
  }));
}

// ✅ SERVER COMPONENT
export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <BookingClient testId={params.id} />;
}