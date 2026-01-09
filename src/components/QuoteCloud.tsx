"use client"

import type React from "react"

import { useEffect, useState, useRef, useCallback } from "react"
import { getQuotesForMood } from "@/lib/quotes"
import type { MoodType, Quote } from "@/types"

interface QuoteCloudProps {
  mood: MoodType
  onSelectQuote: (quote: Quote) => void
}

export function QuoteCloud({ mood, onSelectQuote }: QuoteCloudProps) {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moodQuotes = getQuotesForMood(mood)
    setQuotes(moodQuotes)
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [mood])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePosition({ x, y })
    }
  }, [])

  const handleQuoteClick = (quote: Quote) => {
    setSelectedQuote(quote)
    setTimeout(() => {
      onSelectQuote(quote)
    }, 800)
  }

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="min-h-screen overflow-hidden relative">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-slate-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(236,72,153,0.1)_0%,_transparent_40%)]" />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center pt-12 pb-8 relative z-10 px-4">
        <h2 className="text-3xl md:text-4xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-purple-300">
          Choose the quote that resonates with you
        </h2>
        <p className="text-slate-400 text-lg">Click to reveal your destiny numbers</p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {quotes.map((quote, index) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              index={index}
              isSelected={selectedQuote?.id === quote.id}
              isVisible={isVisible}
              mousePosition={mousePosition}
              onClick={() => handleQuoteClick(quote)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface QuoteCardProps {
  quote: Quote
  index: number
  isSelected: boolean
  isVisible: boolean
  mousePosition: { x: number; y: number }
  onClick: () => void
}

function QuoteCard({ quote, index, isSelected, isVisible, mousePosition, onClick }: QuoteCardProps) {
  // Subtle parallax effect on desktop only
  const parallaxIntensity = 3
  const parallaxX = mousePosition.x * parallaxIntensity
  const parallaxY = mousePosition.y * parallaxIntensity

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-5 md:p-6 rounded-2xl text-left
        transition-all duration-500 ease-out
        backdrop-blur-md border
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${
          isSelected
            ? "bg-gradient-to-br from-purple-500/40 to-fuchsia-500/40 scale-105 border-purple-400/60 shadow-[0_0_60px_rgba(168,85,247,0.5)]"
            : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-400/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-2"
        }
        cursor-pointer group
      `}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
        // Subtle parallax transform on hover for desktop
        transform: isSelected ? "scale(1.05)" : `translate(${parallaxX}px, ${parallaxY}px)`,
      }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-fuchsia-500/0 group-hover:from-purple-500/10 group-hover:to-fuchsia-500/10 transition-all duration-500" />

      <p
        className={`
        text-sm md:text-base leading-relaxed italic relative z-10
        transition-all duration-500
        ${isSelected ? "text-white" : "text-slate-200 group-hover:text-white"}
      `}
      >
        &ldquo;{quote.text}&rdquo;
      </p>
      {quote.author && (
        <p
          className={`
          text-xs md:text-sm mt-3 md:mt-4 text-right relative z-10 transition-colors duration-500
          ${isSelected ? "text-purple-200" : "text-slate-400 group-hover:text-slate-300"}
        `}
        >
          — {quote.author}
        </p>
      )}
    </button>
  )
}
