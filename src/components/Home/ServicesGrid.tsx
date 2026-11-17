"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import services from "@/data/services";
import { useInView } from "@/hooks/useInView";
import BatteryReplaceScene from "../illustrations/BatteryReplaceScene";
import JumpstartScene from "../illustrations/JumpstartScene";
import TyreScene from "../illustrations/TyreScene";
import RoadsideScene from "../illustrations/RoadsideScene";
import TowingScene from "../illustrations/TowingScene";
import RecoveryScene from "../illustrations/RecoveryScene";

const featured = services.filter((s) =>
  [
    "car-battery-replacement",
    "battery-diagnostics-jumpstart",
    "emergency-fuel-delivery",
    "flat-tyre-replacement",
    "car-towing-recovery",
    "roadside-assistance",
    "car-recovery-dubai",
    "alternator-dynamo-repair",
  ].includes(s.slug),
);

const scenesBySlug: Record<string, typeof BatteryReplaceScene> = {
  "car-battery-replacement": BatteryReplaceScene,
  "battery-diagnostics-jumpstart": JumpstartScene,
  "flat-tyre-replacement": TyreScene,
  "roadside-assistance": RoadsideScene,
  "car-towing-recovery": TowingScene,
  "car-recovery-dubai": RecoveryScene,
};

const CARD_STAGGER_MS = 120;
const SEQUENCE_DELAY_MS = 300;
const REPLAY_CYCLE_MS = 5500;

const ServicesGrid = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [replayKeys, setReplayKeys] = useState<Record<string, number>>({});
  const [cycle, setCycle] = useState(0);

  const replay = (slug: string) => {
    setReplayKeys((keys) => ({ ...keys, [slug]: (keys[slug] ?? 0) + 1 }));
  };

  // Re-triggers every illustration's one-shot motion sequence on a timer, since
  // touch devices have no hover to replay it and the grid would otherwise
  // look frozen on its idle frame after the first play-through.
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCycle((c) => c + 1), REPLAY_CYCLE_MS);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className="bg-gray-light dark:bg-bg-color-dark py-10 md:py-20 lg:py-28">
      <div className="container">
        <div className={inView ? "svc-heading" : ""}>
          <SectionTitle
            title="Emergency Mobile Battery Replacement in Dubai & Roadside Services"
            paragraph="Battery Store provides complete roadside assistance across Dubai. Our mobile units are stocked for every common emergency, not just battery replacement."
            center
          />
        </div>
        <div ref={ref} className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((service, i) => {
            const Scene = scenesBySlug[service.slug];
            const baseDelay = i * CARD_STAGGER_MS + SEQUENCE_DELAY_MS;
            const replayKey = replayKeys[service.slug] ?? 0;

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onMouseEnter={() => replay(service.slug)}
                onFocus={() => replay(service.slug)}
                className="svc-card group block rounded-lg bg-white p-6 shadow-one ring-1 ring-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(255,201,51,0.18)] hover:ring-primary focus-visible:-translate-y-2 focus-visible:shadow-[0_8px_30px_rgba(255,201,51,0.18)] focus-visible:ring-primary dark:bg-dark dark:shadow-three"
              >
                <span className="svc-sweep-mask">
                  <span className="svc-sweep" />
                </span>

                <div
                  style={inView ? { animationDelay: `${i * CARD_STAGGER_MS}ms` } : undefined}
                  className={inView ? "svc-card-in" : ""}
                >
                  {Scene && (
                    <Scene
                      key={`${service.slug}-${replayKey}-${cycle}`}
                      active={inView}
                      baseDelay={baseDelay}
                    />
                  )}

                  <h3 className="mb-3 text-lg font-bold text-black dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm text-body-color">{service.description}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-primary">
                    Learn More <span className="svc-arrow ml-1">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
