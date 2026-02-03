
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ValentineInterface } from "@/components/ValentineInterface";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ValentineContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || "";

  return (
    <main className="min-h-screen relative">
      <ValentineInterface name={name} />
      <div className="absolute bottom-4 right-4 z-20">
        <Link href="/create">
          <Button variant="ghost" size="sm" className="text-xs text-primary/40 hover:text-primary transition-colors">
            Create your own?
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ValentineContent />
    </Suspense>
  );
}
