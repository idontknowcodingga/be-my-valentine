
"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

function YayContent() {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: number; delay: string }[]>([]);
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const yayGif = PlaceHolderImages.find(img => img.id === 'yay-gif');

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-15),
        { 
          id: Date.now(), 
          left: `${Math.random() * 100}%`, 
          size: Math.random() * 25 + 10,
          delay: `${Math.random() * 2}s`
        }
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center overflow-hidden">
      {/* Floating hearts container */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart text-primary"
            style={{
              left: heart.left,
              bottom: '-50px',
              animationDelay: heart.delay,
              fontSize: `${heart.size}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="z-10 space-y-4 md:space-y-6 animate-in fade-in zoom-in duration-700 max-w-lg w-full">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-6xl font-headline text-primary drop-shadow-md">
            YAY{name ? ` ${name.toUpperCase()}` : ""}!!
          </h1>
          <p className="text-lg md:text-xl text-accent font-body italic">
            Best decision ever ❤️ 💖
          </p>
        </div>

        <div className="relative inline-block">
          {yayGif && (
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white animate-bounce-slow transform hover:rotate-1 transition-transform">
              <Image 
                src={yayGif.imageUrl} 
                alt={yayGif.description}
                width={150} // Reduced size by 50%
                height={150}
                unoptimized
                className="object-cover"
                data-ai-hint={yayGif.imageHint}
              />
            </div>
          )}
          <div className="absolute -top-2 -right-2 text-3xl animate-pulse">💖</div>
          <div className="absolute -bottom-2 -left-2 text-3xl animate-pulse delay-75">💝</div>
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-headline text-primary drop-shadow-sm">
            i love you
          </h2>
          <div className="flex justify-center gap-3 text-2xl">
            <span>🥰</span>
            <span>🌹</span>
            <span>✨</span>
          </div>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="link" className="text-accent underline-offset-4 opacity-40 hover:opacity-100 transition-opacity">
              Start over?
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function YayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <YayContent />
    </Suspense>
  );
}
