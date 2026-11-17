"use client";

import { useInView } from "@/hooks/useInView";
import CountUpStat from "./CountUpStat";

const stats = [
  {
    value: "100K+",
    label: "Happy Clients",
    icon: <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8 M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />,
    isClock: false,
    motion: "stats-icon-bob",
    targets: [100],
    format: (v: number[]) => `${v[0]}K+`,
  },
  {
    value: "15+",
    label: "Years Experience",
    icon: <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z M8.5 13.5 6 22l6-3.5 6 3.5-2.5-8.5" />,
    isClock: false,
    motion: "stats-icon-wiggle",
    targets: [15],
    format: (v: number[]) => `${v[0]}+`,
  },
  {
    value: "20-30 Min",
    label: "Avg. Response",
    icon: null,
    isClock: true,
    motion: undefined,
    targets: [20, 30],
    format: (v: number[]) => `${v[0]}-${v[1]} Min`,
  },
  {
    value: "500+",
    label: "Monthly Services",
    icon: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2 2-2-2 2-2Z" />,
    isClock: false,
    motion: "stats-icon-rotate",
    targets: [500],
    format: (v: number[]) => `${v[0]}+`,
  },
];

const StatsBar = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="bg-gray-light py-10 dark:bg-bg-color-dark">
      <div className="container">
        <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={inView ? { animationDelay: `${i * 150}ms` } : undefined}
              className={`group relative flex flex-col items-center gap-2 rounded-2xl bg-white p-3 text-center ring-1 ring-black/5 transition-all duration-[250ms] hover:-translate-y-1.5 hover:ring-primary hover:shadow-[0_8px_30px_rgba(255,201,51,0.15)] dark:bg-dark dark:ring-stroke-dark sm:p-6 ${
                inView ? "stats-card-in" : ""
              }`}
            >
              <span className="stats-sweep-mask rounded-2xl">
                <span
                  className={`stats-sweep ${inView ? "stats-sweep-play" : ""}`}
                  style={inView ? { animationDelay: `${i * 150 + 450}ms` } : undefined}
                />
              </span>

              <span
                className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30 transition-colors duration-300 group-hover:bg-primary/20 sm:h-12 sm:w-12 ${
                  inView ? "stats-icon-pop" : ""
                }`}
                style={inView ? { animationDelay: `${i * 150 + 250}ms` } : undefined}
              >
                <span
                  className={`stats-ring ${inView ? "stats-ring-play" : ""}`}
                  style={inView ? { animationDelay: `${i * 150 + 650}ms` } : undefined}
                />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-5 w-5 text-primary sm:h-6 sm:w-6 ${
                    inView && stat.motion ? stat.motion : ""
                  }`}
                  style={
                    inView && stat.motion
                      ? { animationDelay: `${i * 150 + 650}ms` }
                      : undefined
                  }
                >
                  {stat.isClock ? (
                    <>
                      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      <path
                        className={`stats-clock-hand ${inView ? "stats-clock-hand-play" : ""}`}
                        d="M12 8v4l3 3"
                        style={{
                          transformOrigin: "12px 12px",
                          animationDelay: inView ? `${i * 150 + 650}ms` : undefined,
                        }}
                      />
                    </>
                  ) : (
                    stat.icon
                  )}
                </svg>
              </span>

              <h3
                className="stats-number text-lg font-bold text-primary transition-transform duration-[250ms] group-hover:scale-[1.04] sm:text-3xl md:text-4xl"
                style={{ minWidth: `${stat.value.length}ch` }}
                aria-label={stat.value}
              >
                <CountUpStat
                  start={inView}
                  targets={stat.targets}
                  format={stat.format}
                  finalText={stat.value}
                />
              </h3>

              <p className="text-xs font-medium text-body-color sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
