"use client"

import { useEffect, useState } from "react"

interface LandingProps {
  onStart: () => void
}

export function Landing({ onStart }: LandingProps) {
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>
  >([])
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate random stars
    const generatedStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
    setStars(generatedStars)

    // Generate floating particles
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 15,
    }))
    setParticles(generatedParticles)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-slate-950 to-black" />

      {/* Nebula overlay effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,50,180,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(80,40,150,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(100,60,200,0.08),transparent_40%)]" />

      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.5)`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-purple-400/40 animate-float-up"
            style={{
              left: `${particle.x}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              boxShadow: "0 0 6px rgba(168,85,247,0.4)",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center space-y-8 max-w-2xl relative z-10 px-4">
        {/* Glowing title */}
        <div className="relative">
          <h1 className="text-6xl md:text-8xl font-serif font-bold bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent animate-glow-pulse drop-shadow-2xl">
            Destiny Numbers
          </h1>
          {/* Title glow layer */}
          <h1 className="absolute inset-0 text-6xl md:text-8xl font-serif font-bold bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent blur-sm opacity-50">
            Destiny Numbers
          </h1>
        </div>

        {/* Mystical divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-lg shadow-purple-500/50" />
          <div
            className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse shadow-lg shadow-fuchsia-500/50"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50"
            style={{ animationDelay: "1s" }}
          />
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        </div>

        {/* Animated tagline */}
        <p className="text-xl md:text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-purple-200 to-slate-300 bg-[length:200%_100%] animate-shimmer">
          Discover the numbers written in your stars
        </p>

        {/* CTA Button with glow effect */}
        <button
          onClick={onStart}
          className="group relative mt-8 px-10 py-5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 rounded-full text-lg font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] shadow-lg shadow-purple-900/30 overflow-hidden"
        >
          {/* Button shimmer effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Button content */}
          <span className="relative flex items-center gap-2">
            Begin Your Journey
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        {/* Subtle bottom text */}
        <p className="text-sm text-slate-500 animate-pulse" style={{ animationDuration: "3s" }}>
          ✨ Let the cosmos guide you ✨
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  )
}
