
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface ValentineInterfaceProps {
  name?: string;
}

export function ValentineInterface({ name }: ValentineInterfaceProps) {
  const router = useRouter();
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const moveButton = () => {
    if (typeof window === 'undefined') return;
    
    const maxX = window.innerWidth - (noButtonRef.current?.offsetWidth || 100);
    const maxY = window.innerHeight - (noButtonRef.current?.offsetHeight || 50);
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setPosition({ x: newX, y: newY });
  };

  const handleYes = () => {
    const query = name ? `?name=${encodeURIComponent(name)}` : '';
    router.push(`/yay${query}`);
  };

  if (!isClient) return null;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart 
            key={i} 
            className="absolute text-primary" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 2 + 0.5}) rotate(${Math.random() * 360}deg)`
            }} 
          />
        ))}
      </div>

      <div className="z-10 text-center space-y-8 max-w-xl">
        <h1 className="text-5xl md:text-7xl font-headline text-primary animate-bounce-slow drop-shadow-sm leading-tight">
          {name ? `${name}, ` : ""}Will you be my Valentine?
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            size="lg" 
            onClick={handleYes}
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-2xl px-12 py-8 rounded-full shadow-xl transition-transform hover:scale-110 active:scale-95"
          >
            Yes! <Heart className="ml-2 fill-current" />
          </Button>

          <Button
            ref={noButtonRef}
            variant="outline"
            size="lg"
            onMouseEnter={moveButton}
            onClick={moveButton}
            style={{
              position: (position.x || position.y) ? 'fixed' : 'relative',
              left: position.x || 'auto',
              top: position.y || 'auto',
              transition: 'all 0.2s ease-out',
              zIndex: 50
            }}
            className="border-accent text-accent hover:bg-accent/10 text-xl px-10 py-6 rounded-full shadow-md"
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
