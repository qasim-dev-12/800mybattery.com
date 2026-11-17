"use client";

import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import { useInView } from "@/hooks/useInView";
import ResponseScene from "../illustrations/ResponseScene";
import TechnicianScene from "../illustrations/TechnicianScene";
import PricingScene from "../illustrations/PricingScene";
import CoverageScene from "../illustrations/CoverageScene";

const items = [
  {
    title: "30-Minute Emergency Response",
    paragraph:
      "Don't get stranded. Our technicians arrive within 30-45 minutes anywhere in Dubai.",
    Scene: ResponseScene,
  },
  {
    title: "Certified Technicians, Fully Equipped",
    paragraph:
      "Trained for every vehicle type. Diagnose batteries accurately and fit them correctly.",
    Scene: TechnicianScene,
  },
  {
    title: "Transparent, No-Surprise Pricing",
    paragraph:
      "No call-out fee. The price you see is the price you pay, with no hidden charges.",
    Scene: PricingScene,
  },
  {
    title: "Complete Dubai Coverage",
    paragraph:
      "From Al Quoz to Palm Jumeirah, our mobile units cover every neighborhood and highway.",
    Scene: CoverageScene,
  },
];

const CARD_STAGGER_MS = 150;
const REPLAY_CYCLE_MS = 5000;

const NumberMarker = ({ n, active }: { n: number; active: boolean }) => (
  <svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true" className="wcu-marker">
    <circle cx="20" cy="20" r="17" fill="none" stroke="#FFC933" strokeWidth="2" opacity="0.25" />
    <circle
      className={active ? "wcu-marker-ring" : ""}
      cx="20"
      cy="20"
      r="17"
      fill="none"
      stroke="#FFC933"
      strokeWidth="2"
      strokeDasharray="106.8"
      strokeDashoffset={active ? undefined : 0}
    />
    <circle cx="20" cy="20" r="12" fill="#FFC933" />
    <text x="20" y="25" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1d2430">
      {n}
    </text>
  </svg>
);

const WhyChooseUs = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [replayKeys, setReplayKeys] = useState([0, 0, 0, 0]);
  const [cycle, setCycle] = useState(0);

  const replay = (i: number) => {
    setReplayKeys((keys) => keys.map((v, idx) => (idx === i ? v + 1 : v)));
  };

  // Re-triggers every card's one-shot animation sequence on a timer, since
  // touch devices have no hover to replay it and the section would otherwise
  // look frozen after the first play-through.
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCycle((c) => c + 1), REPLAY_CYCLE_MS);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section className="py-10 md:py-20 lg:py-28">
      <div className="container">
        <div className={inView ? "wcu-heading" : ""}>
          <SectionTitle title="Why Choose Us" paragraph="" center />
        </div>
        <div ref={ref} className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Scene = item.Scene;
            const baseDelay = i * CARD_STAGGER_MS + 300;
            return (
              <div
                key={item.title}
                style={inView ? { animationDelay: `${i * CARD_STAGGER_MS}ms` } : undefined}
                onMouseEnter={() => replay(i)}
                className={`group rounded-lg bg-white p-6 shadow-one ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1.5 hover:ring-primary hover:shadow-[0_8px_30px_rgba(255,201,51,0.18)] dark:bg-dark dark:shadow-three ${
                  inView ? "wcu-card-in" : ""
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <NumberMarker n={i + 1} active={inView} />
                </div>
                <Scene key={`${i}-${replayKeys[i]}-${cycle}`} active={inView} baseDelay={baseDelay} />
                <h3 className="mb-3 mt-4 text-lg font-bold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-base text-body-color">{item.paragraph}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
