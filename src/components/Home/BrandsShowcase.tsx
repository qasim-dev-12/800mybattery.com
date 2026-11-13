"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ========================= Types & data ========================= */

type Brand = {
  name: string;
  slug: string;
  image: string;
  description: string;
  tag?: string;
  bestFor?: string;
  warrantyMonths?: 12 | 18 | 24;
  priceFrom?: number;
  sizeCode?: string;
  models?: string[];
};

const brands: Brand[] = [
  {
    name: "Amaron",
    slug: "amaron",
    image: "/images/battery-brands/amaron.png",
    description: "Zero-maintenance, long-lasting starting power trusted by drivers across the UAE.",
  },
  {
    name: "Bosch",
    slug: "bosch",
    image: "/images/battery-brands/bosch.png",
    description: "German engineering with high cranking power for reliable starts in any weather.",
  },
  {
    name: "Varta",
    slug: "varta",
    image: "/images/battery-brands/varta.png",
    description: "Premium AGM and calcium technology for vehicles with high electrical demand.",
  },
  {
    name: "Dynex",
    slug: "dynex",
    image: "/images/battery-brands/dynex.png",
    description: "Dependable everyday performance at a competitive price point.",
  },
  {
    name: "Max Gold",
    slug: "max-gold",
    image: "/images/battery-brands/max-gold.png",
    description: "Built for durability and consistent performance in extreme temperatures.",
  },
  {
    name: "Max Part",
    slug: "max-part",
    image: "/images/battery-brands/max-part.png",
    description: "Reliable starting power with a full manufacturer warranty.",
  },
];

const PHONE_TEL = "+971543170355";
const WHATSAPP_NUMBER = "971543170355";
const AUTOPLAY_MS = 2500;
const HOVER_RESUME_DELAY_MS = 3000;

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function track(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: unknown }).gtag === "function") {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", event, params);
  }
}

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function nextIndexForKey(key: string, current: number, count: number): number | null {
  if (key === "ArrowRight" || key === "ArrowDown") return (current + 1) % count;
  if (key === "ArrowLeft" || key === "ArrowUp") return (current - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return null;
}

/* ========================= Hooks ========================= */

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

function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    setTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return touch;
}

function useIsMobileViewport() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

/* ========================= Main component ========================= */

const BrandsShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayStopped, setAutoplayStopped] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const isMobileViewport = useIsMobileViewport();

  const active = brands[activeIndex];

  /* --- in-view (autoplay gate, stagger-in, sticky bar, count-up) --- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEnteredView(true);
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* --- initial brand from ?brand=<slug>, client-only to avoid hydration mismatch --- */
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("brand");
    const idx = brands.findIndex((b) => b.slug === slug);
    if (idx >= 0) setActiveIndex(idx);
  }, []);

  /* --- keep ?brand=<slug> in sync --- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("brand", brands[activeIndex].slug);
    const url = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState(null, "", url);
  }, [activeIndex]);

  /* --- preload next image --- */
  useEffect(() => {
    const next = brands[(activeIndex + 1) % brands.length];
    const img = new window.Image();
    img.src = next.image;
  }, [activeIndex]);

  /* --- haptics on brand change --- */
  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate(10);
    }
  }, [activeIndex]);

  const stopAutoplay = useCallback(() => {
    setAutoplayStopped(true);
    setHoverPaused(false);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, []);

  const selectBrand = useCallback(
    (i: number) => {
      stopAutoplay();
      setActiveIndex(((i % brands.length) + brands.length) % brands.length);
      track("brand_select", { brand: brands[((i % brands.length) + brands.length) % brands.length].slug });
    },
    [stopAutoplay],
  );

  const autoAdvance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % brands.length);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    setHoverPaused(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setHoverPaused(false), HOVER_RESUME_DELAY_MS);
  }, []);

  useEffect(() => () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, []);

  const autoplayActive = !reducedMotion && inView && !autoplayStopped && !hoverPaused;

  const stickyBarVisible = isMobileViewport && inView;

  useEffect(() => {
    document.body.classList.toggle("bb-hide-scrolltop", stickyBarVisible);
    return () => document.body.classList.remove("bb-hide-scrolltop");
  }, [stickyBarVisible]);

  const whatsappMessage = `Hi, I need a ${active.name} battery`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0B1120] py-10 md:py-20 lg:py-28"
      style={stickyBarVisible ? { paddingBottom: "calc(56px + env(safe-area-inset-bottom) + 2.5rem)" } : undefined}
    >
      <style>{BS_CSS}</style>
      <div className="container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <h2
            className="mb-4 font-bold leading-tight text-white"
            style={{ fontSize: "clamp(24px, 5vw, 36px)" }}
          >
            Not Your Average Battery Shop in Dubai — We Install On-Site
          </h2>
          <p className="text-base leading-relaxed text-white/60 md:text-lg">
            As a trusted battery shop in Dubai, we supply only certified, authentic batteries from the world&apos;s
            leading automotive brands. Every purchase includes a full manufacturer warranty and professional
            installation at your location.
          </p>
        </div>

        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={stopAutoplay}>
          {/* ---------- Mobile (<768px): tile grid + card deck ---------- */}
          <div className="md:hidden">
            <MobileBrandGrid
              activeIndex={activeIndex}
              onSelect={selectBrand}
              onFocusTab={stopAutoplay}
              autoplayActive={autoplayActive}
              onAutoAdvance={autoAdvance}
              reducedMotion={reducedMotion}
              hasEnteredView={hasEnteredView}
            />
            <div className="mt-4">
              <MobileCardDeck
                active={active}
                peek={brands[(activeIndex + 1) % brands.length]}
                onSwipe={(dir) => selectBrand(activeIndex + dir)}
                reducedMotion={reducedMotion}
                whatsappMessage={whatsappMessage}
              />
            </div>
          </div>

          {/* ---------- Tablet/Desktop (>=768px): pill tabs + split card ---------- */}
          <div className="hidden md:block">
            <DesktopTabs
              activeIndex={activeIndex}
              onSelect={selectBrand}
              onFocusTab={stopAutoplay}
              autoplayActive={autoplayActive}
              onAutoAdvance={autoAdvance}
              reducedMotion={reducedMotion}
            />
            <DesktopCard
              active={active}
              reducedMotion={reducedMotion}
              isTouch={isTouch}
              whatsappMessage={whatsappMessage}
            />
          </div>
        </div>

        <TrustStrip />

        <p className="mt-8 text-center text-sm text-white/50">
          All batteries provided by Battery Store come with 12, 18, or 24 months warranty with 1 time replacement.{" "}
          <Link href="/warranty" className="text-[#FFC933]">
            Terms and conditions apply.
          </Link>
        </p>
      </div>

      {isMobileViewport && (
        <StickyActionBar visible={stickyBarVisible} whatsappMessage={whatsappMessage} />
      )}
    </section>
  );
};

/* ========================= Shared bits ========================= */

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4 shrink-0">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChargingIndicator({ onComplete }: { onComplete: () => void }) {
  return (
    <svg width="28" height="14" viewBox="0 0 28 14" className="bb-charge absolute -right-1.5 -top-1.5" aria-hidden="true">
      <rect x="1" y="2" width="22" height="10" rx="2" fill="none" stroke="#FFC933" strokeWidth="1.5" />
      <rect x="23.5" y="5" width="2" height="4" rx="1" fill="#FFC933" />
      <rect x="2.5" y="3.5" width="0" height="7" rx="1" fill="#FFC933" className="bb-charge-fill" onAnimationEnd={onComplete} />
      <path d="M13 2 L9 8 H12.5 L11 13 L17 6 H13.5 Z" fill="#0B1120" className="bb-charge-bolt" />
    </svg>
  );
}

function WarrantyMeter({ months }: { months: 12 | 18 | 24 }) {
  const segments = [12, 18, 24] as const;
  return (
    <div className="flex items-center gap-2" aria-label={`${months} month warranty`}>
      {segments.map((seg, i) => (
        <div key={seg} className="flex flex-col items-center gap-1">
          <span
            className={cx("bb-meter-seg h-1.5 w-10 rounded-full", months >= seg ? "bg-[#FFC933]" : "bg-white/10")}
            style={months >= seg ? { animationDelay: `${i * 150}ms` } : undefined}
          />
          <span className="text-[10px] text-white/40">{seg}</span>
        </div>
      ))}
    </div>
  );
}

function BrandBullets({ brand }: { brand: Brand }) {
  return (
    <ul className="flex flex-col gap-2 text-sm text-white/80">
      <li className="bb-stagger flex items-center gap-2" style={{ animationDelay: "0ms" }}>
        <CheckIcon /> 100% genuine, manufacturer-certified battery
      </li>
      {brand.warrantyMonths && (
        <li className="bb-stagger flex items-center gap-2" style={{ animationDelay: "40ms" }}>
          <CheckIcon /> {brand.warrantyMonths} month warranty with 1-time replacement
        </li>
      )}
      <li className="bb-stagger flex items-center gap-2" style={{ animationDelay: "80ms" }}>
        <CheckIcon /> Free installation at your location, 24/7
      </li>
    </ul>
  );
}

function BrandButtons({
  brand,
  whatsappMessage,
  stacked,
}: {
  brand: Brand;
  whatsappMessage: string;
  stacked?: boolean;
}) {
  return (
    <div className={cx("mt-2 flex gap-3", stacked ? "flex-col" : "flex-wrap")}>
      <Link
        href={`/battery-brands/${brand.slug}`}
        onClick={() => track("brand_select", { brand: brand.slug, via: "view_models" })}
        className={cx(
          "bb-btn-hover flex min-h-11 items-center justify-center rounded-lg bg-[#FFC933] px-5 text-sm font-bold text-[#0B1120]",
          stacked && "h-12 w-full",
        )}
      >
        View Models →
      </Link>
      <a
        href={waLink(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { brand: brand.slug })}
        className={cx(
          "bb-btn-hover flex min-h-11 items-center justify-center rounded-lg bg-[#25D366] px-5 text-sm font-bold text-white",
          stacked && "h-12 w-full",
        )}
      >
        WhatsApp
      </a>
    </div>
  );
}

function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      setCount(500);
      return;
    }
    const start = performance.now();
    const duration = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCount(Math.round(t * 500));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, reducedMotion]);

  const items = [
    { icon: <StarIcon />, label: `${count}+ Google reviews` },
    { icon: <TruckIcon />, label: "Free delivery" },
    { icon: <ClockIcon />, label: "24/7 service" },
  ];

  return (
    <div ref={ref} className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-[#141C2E] px-2 py-3 text-center sm:flex-row sm:justify-center sm:gap-2 sm:px-4"
        >
          <span className="text-[#FFC933]">{item.icon}</span>
          <span className="text-xs font-medium text-white sm:text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2l2.9 6.3 6.9.9-5 4.8 1.3 6.9L12 17.8 5.9 20.9l1.3-6.9-5-4.8 6.9-.9z" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M3 16l1.5-6c.3-1.2 1.4-2 2.6-2h9.8c1.2 0 2.3.8 2.6 2L21 16v3H3v-3zm2 2a2 2 0 104 0 2 2 0 00-4 0zm10 0a2 2 0 104 0 2 2 0 00-4 0z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" />
    </svg>
  );
}

/* ========================= Desktop / tablet ========================= */

function DesktopTabs({
  activeIndex,
  onSelect,
  onFocusTab,
  autoplayActive,
  onAutoAdvance,
  reducedMotion,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
  onFocusTab: () => void;
  autoplayActive: boolean;
  onAutoAdvance: () => void;
  reducedMotion: boolean;
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = nextIndexForKey(e.key, i, brands.length);
    if (next === null) return;
    e.preventDefault();
    onSelect(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label="Battery brands" className="flex flex-wrap justify-center gap-2">
      {brands.map((b, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={b.slug}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`brand-tab-${b.slug}`}
            aria-selected={isActive}
            aria-controls="brand-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            onFocus={onFocusTab}
            className={cx(
              "bb-tab relative min-h-11 overflow-hidden rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC933]",
              isActive ? "border-[#FFC933]/60 bg-[#141C2E] text-[#FFC933]" : "border-white/10 bg-[#141C2E]/50 text-white/70",
            )}
          >
            {b.name}
            {isActive && autoplayActive && <ChargingIndicator key={activeIndex} onComplete={onAutoAdvance} />}
            {isActive && !reducedMotion && (
              <span key={`bar-${activeIndex}`} className={cx("absolute inset-x-0 bottom-0 h-[2px] bg-[#FFC933]/70", autoplayActive && "bb-tabline")} />
            )}
          </button>
        );
      })}
    </div>
  );
}

function DesktopCard({
  active,
  reducedMotion,
  isTouch,
  whatsappMessage,
}: {
  active: Brand;
  reducedMotion: boolean;
  isTouch: boolean;
  whatsappMessage: string;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -12, y: px * 12 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#141C2E] sm:mt-8">
      <div className="grid grid-cols-1 md:grid-cols-[45%_55%] min-[1024px]:grid-cols-2">
        <div className="relative p-4 md:p-6">
          <div className="pointer-events-none absolute inset-6 -z-10 rounded-2xl bg-[#FFC933] opacity-0 blur-2xl min-[1024px]:opacity-10" aria-hidden="true" />
          <div
            key={`img-${active.slug}`}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={cx("bb-image-in relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#1b2740]", !reducedMotion && "transition-transform duration-150")}
            style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            {active.tag && (
              <span className="absolute left-2 top-2 z-10 max-w-[60%] truncate rounded-full bg-[#0B1120]/80 px-2.5 py-1 text-xs font-semibold text-[#FFC933] ring-1 ring-white/10">
                {active.tag}
              </span>
            )}
            <Image
              src={active.image}
              alt={`${active.name} car battery`}
              fill
              priority={active === brands[0]}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div
          key={`text-${active.slug}`}
          id="brand-panel"
          role="tabpanel"
          aria-labelledby={`brand-tab-${active.slug}`}
          className="bb-text-in flex flex-col justify-center gap-4 p-6 sm:p-8 min-[1024px]:p-10"
        >
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            {active.name} <span className="text-[#FFC933]">Battery</span>
          </h3>
          <p className="text-sm text-white/60 sm:text-base">{active.description}</p>

          <BrandBullets brand={active} />

          {active.bestFor && <p className="text-sm text-white/70">Best for: {active.bestFor}</p>}

          {active.models && active.models.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">Popular models</p>
              <div className="flex flex-wrap gap-2">
                {active.models.map((m) => (
                  <span key={m} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {active.warrantyMonths && <WarrantyMeter months={active.warrantyMonths} />}

          <BrandButtons brand={active} whatsappMessage={whatsappMessage} />
        </div>
      </div>
    </div>
  );
}

/* ========================= Mobile ========================= */

function MobileBrandGrid({
  activeIndex,
  onSelect,
  onFocusTab,
  autoplayActive,
  onAutoAdvance,
  reducedMotion,
  hasEnteredView,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
  onFocusTab: () => void;
  autoplayActive: boolean;
  onAutoAdvance: () => void;
  reducedMotion: boolean;
  hasEnteredView: boolean;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const tile = tileRefs.current[activeIndex];
    if (!grid || !tile) return;
    const g = grid.getBoundingClientRect();
    const t = tile.getBoundingClientRect();
    setIndicator({ x: t.left - g.left, y: t.top - g.top, w: t.width, h: t.height });
  }, [activeIndex]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = nextIndexForKey(e.key, i, brands.length);
    if (next === null) return;
    e.preventDefault();
    onSelect(next);
    tileRefs.current[next]?.focus();
  };

  return (
    <div ref={gridRef} role="tablist" aria-label="Battery brands" className="bb-grid relative grid grid-cols-3 gap-2">
      {indicator && (
        <div
          aria-hidden="true"
          className={cx("pointer-events-none absolute z-0 rounded-xl border-2 border-[#FFC933]", !reducedMotion && "bb-indicator")}
          style={{ transform: `translate(${indicator.x}px, ${indicator.y}px)`, width: indicator.w, height: indicator.h }}
        />
      )}
      {brands.map((b, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={b.slug}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            role="tab"
            id={`brand-tab-${b.slug}`}
            aria-selected={isActive}
            aria-controls="brand-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            onFocus={onFocusTab}
            style={!reducedMotion && hasEnteredView ? { animationDelay: `${i * 60}ms` } : undefined}
            className={cx(
              "bb-tile relative z-10 flex min-h-11 flex-col items-center gap-1 rounded-xl border border-transparent bg-[#141C2E] p-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC933]",
              !reducedMotion && hasEnteredView && "bb-tile-pop",
            )}
          >
            <span className="relative h-9 w-9 overflow-hidden rounded-lg bg-[#0B1120]">
              <Image src={b.image} alt="" fill sizes="36px" className="object-cover" />
            </span>
            <span className="text-xs font-semibold text-white">{b.name}</span>
            {isActive && autoplayActive && <ChargingIndicator key={activeIndex} onComplete={onAutoAdvance} />}
          </button>
        );
      })}
    </div>
  );
}

function MobileCardDeck({
  active,
  peek,
  onSwipe,
  reducedMotion,
  whatsappMessage,
}: {
  active: Brand;
  peek: Brand;
  onSwipe: (dir: 1 | -1) => void;
  reducedMotion: boolean;
  whatsappMessage: string;
}) {
  const [dragX, setDragX] = useState(0);
  const [exiting, setExiting] = useState<1 | -1 | 0>(0);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if (exiting) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY };
    draggingRef.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!startRef.current || exiting) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    if (!draggingRef.current) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        startRef.current = null;
        return;
      }
      draggingRef.current = true;
    }
    setDragX(dx);
  };
  const onPointerUp = () => {
    if (!draggingRef.current) {
      startRef.current = null;
      return;
    }
    if (Math.abs(dragX) > 50 && !reducedMotion) {
      setExiting(dragX < 0 ? 1 : -1);
    } else if (Math.abs(dragX) > 50) {
      onSwipe(dragX < 0 ? 1 : -1);
      setDragX(0);
    } else {
      setDragX(0);
    }
    startRef.current = null;
    draggingRef.current = false;
  };

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => {
      onSwipe(exiting);
      setExiting(0);
      setDragX(0);
    }, 180);
    return () => clearTimeout(t);
  }, [exiting, onSwipe]);

  const transform = exiting
    ? `translateX(${exiting * 420}px) rotate(${exiting * 10}deg)`
    : dragX
      ? `translateX(${dragX}px) rotate(${dragX / 20}deg)`
      : undefined;

  return (
    <div className="relative min-h-[560px]">
      <div className="absolute inset-0 origin-top translate-y-2.5 scale-[.94] opacity-60" aria-hidden="true">
        <BrandCardContent brand={peek} reducedMotion={reducedMotion} whatsappMessage={whatsappMessage} interactive={false} />
      </div>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cx("relative touch-pan-y", exiting ? "transition-transform duration-150 ease-in" : !dragX && "transition-transform duration-200 ease-out")}
        style={{ transform, opacity: exiting ? 0 : 1 }}
      >
        <BrandCardContent brand={active} reducedMotion={reducedMotion} whatsappMessage={whatsappMessage} interactive />
      </div>
    </div>
  );
}

function BrandCardContent({
  brand,
  reducedMotion,
  whatsappMessage,
  interactive,
}: {
  brand: Brand;
  reducedMotion: boolean;
  whatsappMessage: string;
  interactive: boolean;
}) {
  return (
    <div
      key={interactive ? brand.slug : `peek-${brand.slug}`}
      id={interactive ? "brand-panel" : undefined}
      role={interactive ? "tabpanel" : undefined}
      aria-labelledby={interactive ? `brand-tab-${brand.slug}` : undefined}
      className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141C2E]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1b2740]">
        {brand.tag && (
          <span className="absolute left-2 top-2 z-10 max-w-[60%] truncate rounded-full bg-[#0B1120]/80 px-2.5 py-1 text-xs font-semibold text-[#FFC933] ring-1 ring-white/10">
            {brand.tag}
          </span>
        )}
        <Image
          src={brand.image}
          alt={`${brand.name} car battery`}
          fill
          priority={brand === brands[0]}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cx("object-cover", interactive && !reducedMotion && "bb-zoom")}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-xl font-bold text-white">
          {brand.name} <span className="text-[#FFC933]">Battery</span>
        </h3>
        <p className="text-sm text-white/60">{brand.description}</p>

        <BrandBullets brand={brand} />

        {brand.bestFor && <p className="text-sm text-white/70">Best for: {brand.bestFor}</p>}

        {brand.models && brand.models.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {brand.models.map((m) => (
              <span key={m} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                {m}
              </span>
            ))}
          </div>
        )}

        {brand.warrantyMonths && <WarrantyMeter months={brand.warrantyMonths} />}

        <div className="mt-auto pt-2">
          <BrandButtons brand={brand} whatsappMessage={whatsappMessage} stacked />
        </div>
      </div>
    </div>
  );
}

/* ========================= Sticky mobile action bar ========================= */

function StickyActionBar({ visible, whatsappMessage }: { visible: boolean; whatsappMessage: string }) {
  return (
    <div
      className={cx(
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0B1120]/90 backdrop-blur transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-14 items-stretch gap-2 px-3 py-2">
        <a
          href={`tel:${PHONE_TEL}`}
          onClick={() => track("call_click", {})}
          className="flex flex-1 items-center justify-center rounded-lg bg-[#FFC933] text-sm font-bold text-[#0B1120]"
        >
          Call
        </a>
        <a
          href={waLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", {})}
          className="flex flex-1 items-center justify-center rounded-lg bg-[#25D366] text-sm font-bold text-white"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ========================= Styles ========================= */

const BS_CSS = `
body.bb-hide-scrolltop #scroll-to-top-btn { display: none; }

@media (hover: hover) {
  .bb-tab:hover { color: #fff; }
  .bb-btn-hover:hover { transform: scale(1.04); }
}
.bb-btn-hover { transition: transform 150ms ease; }

.bb-charge-fill { animation: bbChargeFill ${AUTOPLAY_MS}ms linear forwards; }
@keyframes bbChargeFill { from { width: 0; } to { width: 19px; } }
.bb-charge-bolt { opacity: 0; animation: bbBoltFlash 300ms ease ${Math.max(AUTOPLAY_MS - 280, 0)}ms; }
@keyframes bbBoltFlash { 0%, 100% { opacity: 0; } 40%, 70% { opacity: 1; } }

.bb-tabline { animation: bbTabline ${AUTOPLAY_MS}ms linear forwards; transform-origin: left; }
@keyframes bbTabline { from { transform: scaleX(0); } to { transform: scaleX(1); } }

.bb-image-in { animation: bbFadeIn .35s ease both; }
@keyframes bbFadeIn { from { opacity: 0; } to { opacity: 1; } }
.bb-text-in { animation: bbSlideIn .35s ease both; }
@keyframes bbSlideIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }

.bb-meter-seg { animation: bbMeterFill .4s ease both; transform-origin: left; }
@keyframes bbMeterFill { from { transform: scaleX(0); } to { transform: scaleX(1); } }

.bb-stagger { animation: bbStaggerIn .3s ease both; }
@keyframes bbStaggerIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

.bb-indicator { transition: transform 420ms cubic-bezier(.34,1.56,.64,1); }
.bb-tile-pop { animation: bbTilePop .35s cubic-bezier(.34,1.56,.64,1) both; }
@keyframes bbTilePop { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }

.bb-zoom { animation: bbZoom 2.5s ease-in-out infinite alternate; }
@keyframes bbZoom { from { transform: scale(1); } to { transform: scale(1.05); } }

@media (prefers-reduced-motion: reduce) {
  .bb-charge-fill, .bb-charge-bolt, .bb-tabline, .bb-image-in, .bb-text-in, .bb-meter-seg,
  .bb-stagger, .bb-tile-pop, .bb-zoom, .bb-btn-hover {
    animation: none !important;
    transition: none !important;
  }
}
`;

export default BrandsShowcase;
