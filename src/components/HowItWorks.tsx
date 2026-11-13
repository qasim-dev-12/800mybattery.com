"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const STEP_DURATION = 6000;

const steps = [
  { title: "Call or Book Online", text: "Tell us your location and vehicle details." },
  { title: "Drop Your Location", text: "Share your live location, nearest technician is dispatched." },
  { title: "Diagnose & Install", text: "We diagnose first, then fit a genuine battery." },
  { title: "Drive Away", text: "Ready to go, with full warranty documentation." },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const rafRef = useRef<number | null>(null);
  const cycleStartRef = useRef(0);
  const pausedAtRef = useRef<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEnteredView(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const goToStep = useCallback((i: number) => {
    setActiveStep(i);
    setProgress(0);
    cycleStartRef.current = performance.now();
    pausedAtRef.current = null;
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const shouldRun = inView && !hovered;

    if (!shouldRun) {
      if (pausedAtRef.current === null) pausedAtRef.current = performance.now();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    if (pausedAtRef.current !== null) {
      cycleStartRef.current += performance.now() - pausedAtRef.current;
      pausedAtRef.current = null;
    } else if (cycleStartRef.current === 0) {
      cycleStartRef.current = performance.now();
    }

    const tick = (now: number) => {
      const elapsed = now - cycleStartRef.current;
      if (elapsed >= STEP_DURATION) {
        setActiveStep((s) => (s + 1) % steps.length);
        cycleStartRef.current = now;
        setProgress(0);
      } else {
        setProgress((elapsed / STEP_DURATION) * 100);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, hovered, reducedMotion]);

  const playing = !reducedMotion && hasEnteredView;

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-[#0B1120] py-16 md:py-24"
    >
      <style>{HIW_CSS}</style>
      <div className="container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">Back on the Road in 4 Steps</h2>
          <p className="mt-3 text-sm text-white/60 sm:text-base">Getting a car battery replaced in Dubai has never been this simple.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start lg:gap-10">
          <div className="hidden flex-col gap-3 lg:flex">
            {steps.map((step, i) => {
              const active = i === activeStep;
              const done = i < activeStep;
              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => goToStep(i)}
                  className={`relative overflow-hidden rounded-xl border px-5 py-4 text-left transition-colors ${
                    active ? "border-[#FFC933]/50 bg-[#141C2E]" : "border-white/5 bg-[#141C2E]/60 hover:bg-[#141C2E]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        active || done ? "bg-[#FFC933] text-[#0B1120]" : "bg-white/10 text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{step.title}</h3>
                      <p className="mt-1 text-sm text-white/60">{step.text}</p>
                    </div>
                  </div>
                  <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/5">
                    <span
                      className="block h-full bg-[#FFC933]"
                      style={{ width: active ? `${reducedMotion ? 100 : progress}%` : done ? "100%" : "0%" }}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hiw-stage relative min-h-[320px] w-full overflow-hidden rounded-2xl border border-white/5 bg-[#141C2E] sm:min-h-[420px]">
            <div key={activeStep} className="absolute inset-0 hiw-scene-in">
              <div
                className={`absolute left-3 top-3 z-10 rounded-full bg-[#0B1120]/80 px-3 py-1 text-xs font-semibold text-[#FFC933] ring-1 ring-white/10 lg:hidden ${
                  playing ? "hiw-step-label" : ""
                }`}
              >
                Step {activeStep + 1}: {steps[activeStep].title}
              </div>
              {activeStep === 0 && <SceneCall playing={playing} />}
              {activeStep === 1 && <SceneLocation playing={playing} />}
              {activeStep === 2 && <SceneDiagnose playing={playing} />}
              {activeStep === 3 && <SceneDrive playing={playing} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonFallback({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 120 220" className="h-full w-full" role="img" aria-label={label}>
      <circle cx="60" cy="48" r="30" fill="#2A3650" stroke="#FFC933" strokeWidth="3" />
      <path d="M20,210 Q20,120 60,110 Q100,120 100,210 Z" fill="#2A3650" stroke="#FFC933" strokeWidth="3" />
    </svg>
  );
}

function PhotoOrFallback({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="h-full w-full">
        <PersonFallback label={label} />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={220}
      height={320}
      loading="lazy"
      onError={() => setError(true)}
      className="h-full w-full object-contain"
    />
  );
}

function SceneCall({ playing }: { playing: boolean }) {
  const a = playing ? "hiw-incoming-show" : "";
  const b = playing ? "hiw-connected-show" : "";
  return (
    <div className="flex h-full w-full items-center justify-center gap-6 p-4 sm:gap-10 sm:p-6">
      <div className="hidden h-56 w-36 shrink-0 animate-[float_6s_ease-in-out_infinite] sm:block">
        <PhotoOrFallback src="/how-it-works/customer.webp" alt="Customer holding a phone" label="Customer" />
      </div>

      <div className="relative h-[280px] w-[180px] shrink-0 rounded-[28px] border-4 border-white/10 bg-[#0B1120] shadow-xl sm:h-[320px] sm:w-[200px]">
        <div className="absolute inset-2 overflow-hidden rounded-[20px] bg-[#101828]">
          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 ${a}`}>
            <div className="relative flex h-20 w-20 items-center justify-center">
              <span className="hiw-ripple absolute inset-0 rounded-full border-2 border-[#FFC933]/70" />
              <span className="hiw-ripple absolute inset-0 rounded-full border-2 border-[#FFC933]/70 [animation-delay:0.5s]" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#FFC933] text-[#0B1120]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
                </svg>
              </span>
            </div>
            <p className="text-xs uppercase tracking-wide text-white/50">Incoming call</p>
            <p className="text-lg font-semibold text-white">800 Speedy</p>
          </div>

          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 ${b}`}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
              </svg>
            </span>
            <p className="text-sm font-semibold text-white">Connected</p>
            <div className="relative h-5 w-16 text-center font-mono text-sm text-[#FFC933]">
              {playing ? (
                <>
                  <span className="hiw-tick absolute inset-0">00:01</span>
                  <span className="hiw-tick absolute inset-0 [animation-delay:0.9s]">00:02</span>
                  <span className="hiw-tick-stay absolute inset-0 [animation-delay:1.8s]">00:03</span>
                </>
              ) : (
                <span className="absolute inset-0">00:03</span>
              )}
            </div>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 ${
              playing ? "hiw-fade-in-stay" : ""
            }`}
            style={playing ? { animationDelay: "3.3s" } : undefined}
          >
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-white/50">
              Reach us instantly
            </p>

            <div
              className={`flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-sm font-bold text-white ${
                playing ? "hiw-tap" : ""
              }`}
              style={playing ? { animationDelay: "4.3s" } : undefined}
            >
              <WhatsAppIcon />
              WhatsApp
              <span className={`relative ${playing ? "hiw-pop" : ""}`} style={playing ? { animationDelay: "4.55s" } : undefined}>
                <CheckIcon />
              </span>
            </div>

            <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFC933] py-2.5 text-sm font-bold text-[#0B1120]">
              <PhoneIcon />
              Call Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18.1a8 8 0 01-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 1112 20.1zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.3-.7-2.2-1.2-3.1-2.8-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4C10.3 9.9 10 9 9.8 8.6c-.2-.4-.4-.3-.5-.3h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 4 3.4 2.3.9 2.3.6 2.7.5.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SceneLocation({ playing }: { playing: boolean }) {
  const routePath = "M70,150 C120,130 150,110 190,75";
  return (
    <div className="relative h-full w-full p-4 sm:p-6">
      <svg viewBox="0 0 320 220" className="h-full w-full">
        <rect x="0" y="0" width="320" height="220" rx="16" fill="#101828" />
        <g stroke="#223049" strokeWidth="6" fill="none" opacity="0.8">
          <path d="M0,60 H320" />
          <path d="M0,140 H320" />
          <path d="M60,0 V220" />
          <path d="M230,0 V220" />
        </g>
        <g stroke="#FFC933" strokeWidth="2" strokeDasharray="6 6" opacity="0.4">
          <path d="M0,100 H320" />
        </g>

        <path
          d={routePath}
          pathLength={1}
          fill="none"
          stroke="#FFC933"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1"
          className={playing ? "hiw-route-draw" : ""}
          style={!playing ? { strokeDashoffset: 0 } : undefined}
        />

        <g transform="translate(40,150)" opacity="0.9">
          <rect x="-16" y="-10" width="32" height="18" rx="4" fill="#2A3650" stroke="#4A5A7A" />
          <circle cx="-9" cy="9" r="4" fill="#0B1120" />
          <circle cx="9" cy="9" r="4" fill="#0B1120" />
        </g>
        <g
          transform="translate(70,150)"
          className={playing ? "hiw-van-move" : ""}
          style={!playing ? { offsetDistance: "100%" } : undefined}
        >
          <rect x="-16" y="-12" width="32" height="20" rx="4" fill="#FFC933" stroke="#0B1120" strokeWidth="1.5" />
          <circle cx="-9" cy="9" r="4" fill="#0B1120" />
          <circle cx="9" cy="9" r="4" fill="#0B1120" />
        </g>

        <g
          transform="translate(190,75)"
          className={playing ? "hiw-pin-drop" : ""}
          style={!playing ? { transform: "translate(190px,75px)" } : undefined}
        >
          <circle r="16" fill="#FFC933" opacity="0.25" className={playing ? "hiw-pulse" : ""} />
          <path d="M0,-18 C10,-18 16,-10 16,-2 C16,10 0,22 0,22 C0,22 -16,10 -16,-2 C-16,-10 -10,-18 0,-18 Z" fill="#FFC933" />
          <circle r="5" fill="#0B1120" />
        </g>
      </svg>

      <div className={`absolute left-3 top-11 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white lg:left-6 lg:top-6 ${playing ? "hiw-fade-in-stay" : ""}`} style={playing ? { animationDelay: "0.9s" } : undefined}>
        Share live location
      </div>

      <div
        className={`absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#0B1120] px-4 py-2 text-xs font-medium text-white shadow-lg ring-1 ring-white/10 ${
          playing ? "hiw-fade-in-stay" : ""
        }`}
        style={playing ? { animationDelay: "2.6s" } : undefined}
      >
        <span className="h-2 w-2 rounded-full bg-[#FFC933]" />
        Nearest technician dispatched
        <span className="relative ml-1 inline-block h-4 w-10 text-[#FFC933]">
          {playing ? (
            <>
              <span className="hiw-tick absolute inset-0" style={{ animationDelay: "2.6s" }}>12 min</span>
              <span className="hiw-tick absolute inset-0" style={{ animationDelay: "3.7s" }}>8 min</span>
              <span className="hiw-tick-stay absolute inset-0" style={{ animationDelay: "4.8s" }}>3 min</span>
            </>
          ) : (
            <span className="absolute inset-0">3 min</span>
          )}
        </span>
      </div>
    </div>
  );
}

function SceneDiagnose({ playing }: { playing: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 p-3 sm:gap-4 sm:p-6 md:gap-8">
      <div className="hidden h-60 w-32 shrink-0 md:block">
        <PhotoOrFallback src="/how-it-works/technician.webp" alt="Technician beside the car" label="Technician" />
      </div>

      <svg viewBox="0 0 260 180" className="h-32 w-40 shrink-0 sm:h-48 sm:w-56 md:h-64 md:w-72">
        <ellipse cx="150" cy="150" rx="90" ry="10" fill="#0B1120" opacity="0.6" />
        <path
          d="M40,140 L40,100 Q40,80 60,76 L80,74 L100,40 Q104,34 114,34 L190,34 Q206,34 212,48 L222,100 Q226,120 222,140 Z"
          fill="#1C2740"
          stroke="#2A3650"
          strokeWidth="2"
        />
        <circle cx="80" cy="140" r="18" fill="#0B1120" />
        <circle cx="190" cy="140" r="18" fill="#0B1120" />
        <path d="M40,100 L80,96 L72,50 L48,54 Z" fill="#232f4a" opacity="0.9" />

        <g transform="translate(60,90)">
          <rect
            x="0"
            y="0"
            width="34"
            height="26"
            rx="4"
            fill="#56627A"
            className={playing ? "hiw-battery-out" : ""}
            style={!playing ? { opacity: 0 } : undefined}
          />
        </g>
        <g transform="translate(60,90)">
          <rect
            x="0"
            y="0"
            width="34"
            height="26"
            rx="4"
            fill="#FFC933"
            stroke="#0B1120"
            className={playing ? "hiw-battery-in" : ""}
            style={!playing ? { opacity: 1, transform: "translateY(0)" } : undefined}
          />
          <rect x="6" y="-4" width="6" height="6" rx="1" fill="#0B1120" />
          <rect x="22" y="-4" width="6" height="6" rx="1" fill="#0B1120" />
          <rect
            x="4"
            y="8"
            width="8"
            height="4"
            rx="1"
            fill="#0B1120"
            className={playing ? "hiw-clamp" : ""}
            style={!playing ? { transform: "rotate(0deg)" } : undefined}
          />
          <rect
            x="22"
            y="8"
            width="8"
            height="4"
            rx="1"
            fill="#0B1120"
            className={playing ? "hiw-clamp" : ""}
            style={!playing ? { transform: "rotate(0deg)", animationDelay: "0.1s" } : { animationDelay: "0.1s" }}
          />
        </g>
      </svg>

      <div className="flex w-28 shrink-0 flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-[#0B1120] p-2 sm:w-32 sm:gap-2 sm:p-3 md:w-36">
        <svg viewBox="0 0 100 60" className="h-12 w-20 sm:h-16 sm:w-24">
          <path d="M10,55 A40,40 0 0 1 90,55" fill="none" stroke="#2A3650" strokeWidth="6" />
          <line
            x1="50"
            y1="55"
            x2="50"
            y2="18"
            stroke="#FFC933"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transformOrigin: "50px 55px" }}
            className={playing ? "hiw-needle" : ""}
          />
          {!playing && (
            <line x1="50" y1="55" x2="50" y2="18" stroke="#FFC933" strokeWidth="3" strokeLinecap="round" style={{ transformOrigin: "50px 55px", transform: "rotate(68deg)" }} />
          )}
        </svg>

        <div className="relative h-4 w-full text-center sm:h-5">
          {playing ? (
            <>
              <span className="hiw-tick absolute inset-0 whitespace-nowrap text-[10px] font-semibold text-red-400 sm:text-xs" style={{ animationDelay: "1.3s" }}>
                9.1V - Weak
              </span>
              <span className="hiw-fade-in-stay absolute inset-0 whitespace-nowrap text-[10px] font-semibold text-green-400 sm:text-xs" style={{ animationDelay: "4.1s" }}>
                12.6V - Healthy
              </span>
            </>
          ) : (
            <span className="absolute inset-0 whitespace-nowrap text-[10px] font-semibold text-green-400 sm:text-xs">12.6V - Healthy</span>
          )}
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full bg-green-400 ${playing ? "hiw-health-fill" : ""}`}
            style={!playing ? { width: "100%" } : undefined}
          />
        </div>
      </div>
    </div>
  );
}

function SceneDrive({ playing }: { playing: boolean }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden p-4 sm:p-6">
      <div
        className={`absolute right-3 top-3 w-32 rounded-lg border border-[#FFC933]/40 bg-[#0B1120] p-2 text-[10px] text-white shadow-lg sm:right-6 sm:top-6 sm:w-40 sm:p-3 sm:text-xs ${
          playing ? "hiw-fade-in-stay" : ""
        }`}
        style={playing ? { animationDelay: "1.0s" } : undefined}
      >
        <div className="flex items-center gap-2 font-semibold">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-400 ${
              playing ? "hiw-pop" : ""
            }`}
            style={playing ? { animationDelay: "1.6s" } : undefined}
          >
            <CheckIcon />
          </span>
          24 months warranty
        </div>
        <p className="mt-1 text-white/50">Warranty documentation included</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden h-24 w-16 sm:block">
          <PhotoOrFallback src="/how-it-works/customer.webp" alt="Happy customer giving a thumbs up" label="Customer" />
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`text-[#FFC933] ${playing ? "hiw-star" : ""}`}
              style={playing ? { animationDelay: `${2.2 + i * 0.2}s` } : undefined}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="relative h-32 w-full max-w-md">
        <div className="absolute bottom-6 left-0 right-0 h-1 overflow-hidden">
          <div className={`h-full w-[200%] bg-[repeating-linear-gradient(90deg,#FFC933_0_20px,transparent_20px_40px)] ${playing ? "hiw-road-move" : ""}`} />
        </div>

        <div
          className={`absolute bottom-6 left-1/2 w-40 -translate-x-1/2 ${playing ? "hiw-car-drive" : ""}`}
          style={!playing ? { transform: "translateX(-50%)" } : undefined}
        >
          <svg viewBox="0 0 160 70" className="w-full">
            <path d="M10,60 L10,40 Q10,30 22,28 L34,26 L46,12 Q50,8 58,8 L118,8 Q130,8 134,18 L142,40 Q146,50 142,60 Z" fill="#1C2740" stroke="#2A3650" strokeWidth="2" />
            <circle cx="40" cy="60" r="10" fill="#0B1120" />
            <circle cx="120" cy="60" r="10" fill="#0B1120" />
            <circle
              cx="12"
              cy="38"
              r="5"
              fill="#FFC933"
              className={playing ? "hiw-headlight" : ""}
              style={!playing ? { opacity: 1 } : { animationDelay: "0.2s" }}
            />
            <g
              transform="translate(150,45)"
              className={playing ? "hiw-puff" : ""}
              style={!playing ? { opacity: 0 } : { animationDelay: "0.6s" }}
            >
              <circle r="4" fill="#4A5A7A" opacity="0.6" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

const HIW_CSS = `
.hiw-scene-in { animation: hiwSceneIn .45s ease-out both; }
@keyframes hiwSceneIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }

.hiw-step-label { opacity:0; animation: hiwStepLabel 6s ease-in-out both; }
@keyframes hiwStepLabel { 0%{opacity:0; transform: translateY(-4px);} 8%{opacity:1; transform: translateY(0);} 88%{opacity:1;} 100%{opacity:0;} }

.hiw-incoming-show { opacity:0; animation: hiwShowHide 1.8s ease-in-out 0s both; }
.hiw-connected-show { opacity:0; animation: hiwShowHide 1.8s ease-in-out 1.8s both; }
@keyframes hiwShowHide { 0%{opacity:0;} 8%{opacity:1;} 85%{opacity:1;} 100%{opacity:0;} }
@keyframes hiwFadeInStay { 0%{opacity:0; transform: translateY(6px);} 20%{opacity:1; transform: translateY(0);} 100%{opacity:1;} }

.hiw-ripple { animation: hiwRipple 1.6s ease-out infinite; }
@keyframes hiwRipple { 0%{ transform: scale(0.6); opacity: .8; } 100%{ transform: scale(1.8); opacity: 0; } }

.hiw-tick { opacity:0; animation: hiwTextSlot .9s ease both; }
.hiw-tick-stay { opacity:0; animation: hiwFadeInStay .6s ease both; }
@keyframes hiwTextSlot { 0%{opacity:0;} 15%{opacity:1;} 85%{opacity:1;} 100%{opacity:0;} }

.hiw-tap { animation: hiwPress .25s ease-in-out both; }
@keyframes hiwPress { 0%{transform:scale(1);} 50%{transform:scale(.94);} 100%{transform:scale(1);} }
@keyframes hiwPop { 0%{opacity:0; transform: scale(.4);} 70%{opacity:1; transform: scale(1.15);} 100%{opacity:1; transform: scale(1);} }

.hiw-route-draw { stroke-dashoffset:1; animation: hiwDash 1.6s ease-in-out 2.4s both; }
@keyframes hiwDash { to { stroke-dashoffset:0; } }

.hiw-van-move {
  offset-path: path("M70,150 C120,130 150,110 190,75");
  offset-rotate: auto;
  animation: hiwVanMove 1.6s ease-in-out 2.4s both;
}
@keyframes hiwVanMove { from{ offset-distance:0%; } to{ offset-distance:100%; } }

.hiw-pin-drop { animation: hiwPinDrop .7s cubic-bezier(.34,1.56,.64,1) 0s both; transform-origin: center; }
@keyframes hiwPinDrop {
  0%{ transform: translate(190px,75px) translateY(-50px); opacity:0; }
  60%{ transform: translate(190px,75px) translateY(4px); opacity:1; }
  100%{ transform: translate(190px,75px) translateY(0); opacity:1; }
}
.hiw-pulse { animation: hiwPulse 1.6s ease-out .8s infinite; }
@keyframes hiwPulse { 0%{ transform: scale(.6); opacity:.6; } 100%{ transform: scale(2.2); opacity:0; } }

.hiw-fade-in-stay { opacity:0; animation: hiwFadeInStay .6s ease both; }

.hiw-battery-out { animation: hiwBatteryOut .6s ease-in-out 2.2s both; }
@keyframes hiwBatteryOut { 0%{ opacity:1; transform: translate(0,0) rotate(0);} 100%{ opacity:0; transform: translate(-10px,-30px) rotate(-10deg);} }
.hiw-battery-in { opacity:0; animation: hiwBatteryIn .7s ease-in-out 2.8s both; }
@keyframes hiwBatteryIn { 0%{ opacity:0; transform: translateY(40px);} 100%{ opacity:1; transform: translateY(0);} }
.hiw-clamp { animation: hiwClamp .4s ease-in-out 3.6s both; transform-origin: center; }
@keyframes hiwClamp { 0%{ transform: rotate(25deg);} 100%{ transform: rotate(0deg);} }

.hiw-needle { animation: hiwNeedle1 1.2s ease-out .3s both, hiwNeedle2 1s ease-out 4.1s both; }
@keyframes hiwNeedle1 { 0%{ transform: rotate(-80deg);} 100%{ transform: rotate(68deg);} }
@keyframes hiwNeedle2 { 0%{ transform: rotate(68deg);} 100%{ transform: rotate(10deg);} }
.hiw-health-fill { width:0; animation: hiwHealth 1s ease-out 4.1s both; }
@keyframes hiwHealth { to { width:100%; } }

.hiw-pop { opacity:0; animation: hiwPop .3s ease-out both; }
.hiw-star { display:inline-block; opacity:0; animation: hiwStarPop .35s ease-out both; }
@keyframes hiwStarPop { 0%{opacity:0; transform: scale(0);} 70%{opacity:1; transform: scale(1.3);} 100%{opacity:1; transform: scale(1);} }

.hiw-headlight { opacity:0; animation: hiwFadeInStay .3s ease both; }
.hiw-puff { opacity:0; animation: hiwPuff .7s ease-out both; }
@keyframes hiwPuff { 0%{ opacity:.7; transform: translate(0,0) scale(.6);} 100%{ opacity:0; transform: translate(14px,4px) scale(1.6);} }
.hiw-car-drive { animation: hiwCarDrive 2s ease-in 3.6s both; }
@keyframes hiwCarDrive { 0%{ transform: translateX(-50%);} 100%{ transform: translateX(260%);} }
.hiw-road-move { animation: hiwRoadMove 1.4s linear infinite; }
@keyframes hiwRoadMove { from{ transform: translateX(0);} to{ transform: translateX(-40px);} }

@media (prefers-reduced-motion: reduce) {
  .hiw-stage * { animation: none !important; }
}
`;
