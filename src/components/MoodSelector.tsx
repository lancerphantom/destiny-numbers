"use client"

import { useMemo } from "react"
import { MOODS } from "@/lib/quotes"
import type { MoodType } from "@/types"

interface MoodSelectorProps {
  onSelectMood: (mood: MoodType) => void
}

export function MoodSelector({ onSelectMood }: MoodSelectorProps) {
  // Generate twinkling stars for cosmic background
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }))
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-slate-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1),transparent_50%)]" />

      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-center mb-4 relative">
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
              How are you feeling
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
              right now?
            </span>
          </h2>
          <p className="text-violet-300/60 text-lg">Select the energy that resonates with your soul</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {MOODS.map((mood, index) => (
            <button
              key={mood.type}
              onClick={() => onSelectMood(mood.type)}
              className="group relative p-6 rounded-2xl flex flex-col items-center gap-3 transition-all duration-500 hover:scale-105 animate-float"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: `${4 + index * 0.3}s`,
              }}
            >
              {/* Glassmorphism background */}
              <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20" />

              {/* Gradient glow on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mood.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl`}
              />

              {/* Inner gradient border glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mood.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{
                  padding: "1px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                  WebkitMaskComposite: "xor",
                }}
              />

              {/* Content */}
              <span className="relative text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                {mood.emoji}
              </span>
              <span className="relative text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                {mood.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
