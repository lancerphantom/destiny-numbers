"use client"

import type React from "react"

import { useEffect, useState, useMemo } from "react"
import type { Quote, DayScenario } from "@/types"

interface NumberRevealProps {
  quote: Quote
  onRestart: () => void
}

interface DestinyData {
  pool1: number[] | null
  pool2: number[] | null
  scenario: DayScenario
  day: string
  isRestDay: boolean
}

export function NumberReveal({ quote, onRestart }: NumberRevealProps) {
  const [data, setData] = useState<DestinyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [visiblePool1Count, setVisiblePool1Count] = useState(0)
  const [visiblePool2Count, setVisiblePool2Count] = useState(0)
  const [showParticleBurst, setShowParticleBurst] = useState(false)

  // Generate static star positions once
  const stars = useMemo(() => {
    return [...Array(60)].map((_, i) => ({
      id: i,
      left: `${(i * 17 + 7) % 100}%`,
      top: `${(i * 23 + 11) % 100}%`,
      size: (i % 3) + 1,
      delay: (i % 5) * 0.8,
      duration: 2 + (i % 3),
    }))
  }, [])

  // Generate particle burst positions
  const particles = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      angle: (i * 9) % 360,
      distance: 80 + (i % 4) * 40,
      size: 3 + (i % 4) * 2,
      delay: (i % 8) * 0.05,
      duration: 0.8 + (i % 3) * 0.3,
    }))
  }, [])

  useEffect(() => {
    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote: quote.text }),
    })
      .then((res) => res.json())
      .then((responseData) => {
        setData({
          pool1: responseData.pool1,
          pool2: responseData.pool2,
          scenario: responseData.scenario,
          day: responseData.day,
          isRestDay: responseData.isRestDay,
        })
        setLoading(false)
      })
  }, [quote])

  // Pool 1 reveal animation
  useEffect(() => {
    if (!loading && data && data.pool1 && visiblePool1Count < data.pool1.length) {
      const timer = setTimeout(() => {
        setVisiblePool1Count((prev) => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [loading, visiblePool1Count, data])

  // Pool 2 reveal animation (starts after Pool 1)
  useEffect(() => {
    if (!loading && data && data.pool1 && data.pool2 && visiblePool1Count === data.pool1.length && visiblePool2Count < data.pool2.length) {
      const timer = setTimeout(() => {
        setVisiblePool2Count((prev) => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [loading, visiblePool1Count, visiblePool2Count, data])

  // Particle burst when all revealed
  useEffect(() => {
    if (!loading && data && data.pool1 && data.pool2 && visiblePool1Count === data.pool1.length && visiblePool2Count === data.pool2.length) {
      setShowParticleBurst(true)
      const timer = setTimeout(() => setShowParticleBurst(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [loading, visiblePool1Count, visiblePool2Count, data])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-950 via-slate-950 to-black text-white">
      {/* Cosmic background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(236,72,153,0.1)_0%,_transparent_40%)]" />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Title with glow effect */}
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent animate-glow-pulse">
              Your Destiny Numbers
            </h2>
            <div className="mt-2 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>

          {/* Selected Quote - glass card */}
          <div className="relative mx-auto max-w-2xl mb-12 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs text-purple-300 uppercase tracking-wider">
              Your Chosen Quote
            </div>
            <p className="text-lg md:text-xl italic text-slate-200 text-center leading-relaxed">"{quote.text}"</p>
            {quote.author && <p className="text-sm text-purple-300/70 mt-3 text-center">— {quote.author}</p>}
          </div>

          {/* Loading State with mystical spinner */}
          {loading && (
            <div className="text-center">
              <div className="relative inline-block">
                <div className="h-16 w-16 rounded-full border-4 border-purple-500/30 border-t-purple-400 animate-spin" />
                <div
                  className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-b-fuchsia-400/50 animate-spin"
                  style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                />
              </div>
              <p className="mt-6 text-purple-300 animate-pulse">Consulting the cosmos...</p>
            </div>
          )}

          {/* Sunday Rest Day Message */}
          {!loading && data?.isRestDay && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="text-8xl md:text-9xl mb-6">🌙</div>
              <h3 className="text-3xl md:text-5xl font-serif font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Rest Day
              </h3>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                No numbers today — take time to relax and recharge your cosmic energy
              </p>
              <div className="pt-8">
                <button
                  onClick={onRestart}
                  className="group relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative text-white">Start Over</span>
                </button>
              </div>
            </div>
          )}

          {/* Numbers Display */}
          {!loading && !data?.isRestDay && data && (
            <div className="relative">
              {/* Particle burst effect */}
              {showParticleBurst && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {particles.map((particle) => (
                    <div
                      key={particle.id}
                      className="absolute rounded-full"
                      style={
                        {
                          width: `${particle.size}px`,
                          height: `${particle.size}px`,
                          background: `linear-gradient(135deg, #a855f7, #f472b6, #fbbf24)`,
                          boxShadow: "0 0 10px rgba(168, 85, 247, 0.8)",
                          animation: `particle-burst ${particle.duration}s ease-out forwards`,
                          animationDelay: `${particle.delay}s`,
                          "--angle": `${particle.angle}deg`,
                          "--distance": `${particle.distance}px`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              )}

              {/* Day and Scenario Info */}
              <div className="text-center mb-6">
                <p className="text-sm text-slate-400">
                  {data.day} · Scenario {data.scenario}
                </p>
              </div>

              {/* Pool 1 - Main Numbers (Purple/Pink) */}
              {data.pool1 && (
                <div className="mb-10">
                  <div className="text-center mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      Main Numbers
                    </h3>
                  </div>
                  <div className="grid grid-cols-5 gap-3 md:gap-4 mb-8">
                    {data.pool1.map((number, index) => (
                      <NumberOrb
                        key={`pool1-${index}`}
                        number={number}
                        index={index}
                        isVisible={index < visiblePool1Count}
                        variant="purple"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Pool 2 - Bonus Numbers (Gold/Amber) */}
              {data.pool2 && (
                <div className="mb-10">
                  <div className="text-center mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                      Bonus Number{data.pool2.length > 1 ? 's' : ''}
                    </h3>
                  </div>
                  <div className={`grid gap-3 md:gap-4 mb-8 ${data.pool2.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' : 'grid-cols-2 max-w-md mx-auto'}`}>
                    {data.pool2.map((number, index) => (
                      <NumberOrb
                        key={`pool2-${index}`}
                        number={number}
                        index={index}
                        isVisible={index < visiblePool2Count}
                        variant="gold"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {data.pool1 && data.pool2 && visiblePool1Count === data.pool1.length && visiblePool2Count === data.pool2.length && (
                <div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  style={{
                    animation: "fade-in-up 0.6s ease-out forwards",
                  }}
                >
                  <button
                    onClick={onRestart}
                    className="group relative px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: "inset 0 0 20px rgba(255,255,255,0.3)" }}
                    />
                    <span className="relative text-white">Start Over</span>
                  </button>

                  <button
                    onClick={() => {
                      const pool1Text = data.pool1 ? `Main: ${data.pool1.join(", ")}` : ""
                      const pool2Text = data.pool2 ? `Bonus: ${data.pool2.join(", ")}` : ""
                      const text = `My Destiny Numbers (${data.day})\n${pool1Text}\n${pool2Text}\n"${quote.text}"`
                      navigator.clipboard.writeText(text)
                    }}
                    className="group px-8 py-3 rounded-full font-semibold bg-white/5 border border-white/20 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
                      Copy Numbers
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface NumberOrbProps {
  number: number
  index: number
  isVisible: boolean
  variant: "purple" | "gold"
}

function NumberOrb({ number, index, isVisible, variant }: NumberOrbProps) {
  const purpleStyles = {
    glow: "from-purple-500 to-pink-500",
    gradient: "from-purple-600 via-fuchsia-500 to-pink-500",
    bg: "from-purple-900/80 to-slate-900/80",
    text: "from-white via-purple-100 to-purple-300",
  }

  const goldStyles = {
    glow: "from-amber-500 to-orange-500",
    gradient: "from-amber-500 via-orange-500 to-yellow-600",
    bg: "from-amber-900/80 to-slate-900/80",
    text: "from-white via-amber-100 to-amber-300",
  }

  const styles = variant === "purple" ? purpleStyles : goldStyles

  return (
    <div
      className="relative group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1) rotateY(0deg)" : "scale(0.5) rotateY(180deg)",
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Glow backdrop */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${styles.glow} blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300`}
        style={{
          animation: isVisible ? `glow-pulse 3s ease-in-out infinite ${index * 0.2}s` : "none",
        }}
      />

      {/* Number orb */}
      <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${styles.gradient} p-[2px] overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <div className={`relative h-full w-full rounded-2xl bg-gradient-to-br ${styles.bg} backdrop-blur-sm flex items-center justify-center`}>
          {/* Slot machine spin effect */}
          <div
            className="overflow-hidden"
            style={{
              animation: isVisible ? `slot-spin 0.5s ease-out ${index * 0.1}s` : "none",
            }}
          >
            <span className={`text-3xl md:text-5xl font-bold bg-gradient-to-b ${styles.text} bg-clip-text text-transparent drop-shadow-lg`}>
              {number}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
