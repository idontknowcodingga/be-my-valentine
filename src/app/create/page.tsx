
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Copy, Check } from "lucide-react";

export default function CreatePage() {
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const proposalLink = `${baseUrl}/?name=${encodeURIComponent(name)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(proposalLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGo = () => {
    router.push(`/?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-primary/20 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Heart className="text-primary fill-primary animate-pulse" size={40} />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">Personalize Your Proposal</CardTitle>
          <CardDescription className="font-body text-lg italic">
            Enter their name to create a special surprise!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Input 
              placeholder="Enter their name (e.g. Shivani)" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg py-6 border-primary/30 focus-visible:ring-primary rounded-xl"
            />
          </div>

          {name && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-3 bg-muted rounded-lg break-all text-sm font-code flex items-center justify-between gap-2 border border-border">
                <span className="truncate">{proposalLink}</span>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
                  {copied ? <Check className="text-green-500" /> : <Copy size={18} />}
                </Button>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button onClick={handleGo} className="w-full text-lg py-6 rounded-xl shadow-lg">
                  Preview Proposal
                </Button>
                <p className="text-center text-sm text-muted-foreground italic">
                  Copy the link above and send it to them! ❤️
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
