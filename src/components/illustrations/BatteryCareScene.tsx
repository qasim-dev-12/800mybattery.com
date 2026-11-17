import type { CSSProperties } from "react";

type SceneProps = {
  activeBeat: number | null;
};

const BEAT_S = 2;

const BatteryCareScene = ({ activeBeat }: SceneProps) => {
  const beatStyle = (i: number): CSSProperties =>
    activeBeat !== null
      ? { animation: "none", opacity: activeBeat === i ? 1 : 0 }
      : { animationDelay: `${-(i * BEAT_S)}s` };

  const childStyle = (i: number, extra?: CSSProperties): CSSProperties => ({
    animationDelay: `${-(i * BEAT_S)}s`,
    ...extra,
  });

  return (
    <div className="bc-scene-wrap">
      <svg
        viewBox="0 0 520 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="bc-scene-svg"
      >
        {/* ambient: sun, heat waves, skyline, ground */}
        <circle className="bc-sun bc-anim" cx="470" cy="40" r="22" fill="#FFB400" opacity="0.5" />
        <circle cx="470" cy="40" r="12" fill="#FFB400" />
        <path
          className="bc-heatwave bc-anim"
          d="M430,65 Q440,55 450,65 Q460,75 470,65"
          stroke="#FFB400"
          strokeWidth="2"
          fill="none"
          opacity="0.25"
        />
        <path
          className="bc-heatwave bc-anim"
          d="M420,78 Q432,66 444,78 Q456,90 468,78"
          stroke="#FFB400"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
        />
        <g className="bc-skyline bc-anim">
          <rect x="20" y="215" width="18" height="35" fill="#1d2430" opacity="0.55" />
          <rect x="42" y="200" width="22" height="50" fill="#1d2430" opacity="0.55" />
          <rect x="68" y="222" width="16" height="28" fill="#1d2430" opacity="0.55" />
          <rect x="420" y="210" width="20" height="40" fill="#1d2430" opacity="0.5" />
          <rect x="444" y="195" width="18" height="55" fill="#1d2430" opacity="0.5" />
        </g>
        <line x1="10" y1="250" x2="510" y2="250" stroke="#334155" strokeWidth="2" opacity="0.5" />

        {/* Beat 0: car start */}
        <g className="bc-beat bc-anim" style={beatStyle(0)}>
          <rect x="70" y="150" width="90" height="34" rx="10" fill="#1d2430" />
          <path d="M70,150 L88,122 L132,122 L150,150 Z" fill="#334155" />
          <circle cx="92" cy="186" r="11" fill="#0f172a" />
          <circle cx="138" cy="186" r="11" fill="#0f172a" />
          <circle className="bc-b0-flash bc-anim" style={childStyle(0)} cx="156" cy="162" r="5" fill="#FFB400" />
          <circle className="bc-b0-puff bc-anim" style={childStyle(0)} cx="66" cy="178" r="7" fill="#94a3b8" />

          <rect x="210" y="150" width="46" height="34" rx="4" fill="#1d2430" />
          <rect x="222" y="145" width="22" height="6" rx="2" fill="#475569" />
          <rect
            className="bc-b0-fill bc-anim"
            style={childStyle(0, { transformOrigin: "213px 167px" })}
            x="213"
            y="153"
            width="40"
            height="28"
            rx="2"
            fill="#FFB400"
          />
          <rect x="213" y="153" width="40" height="28" rx="2" fill="none" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* Beat 1: switch off */}
        <g className="bc-beat bc-anim" style={beatStyle(1)}>
          <rect x="150" y="110" width="140" height="80" rx="10" fill="#1d2430" stroke="#334155" strokeWidth="1.5" />
          <g className="bc-b1-off-1 bc-anim" style={childStyle(1)} transform="translate(182,150)">
            <circle r="11" fill="#FFB400" />
            <path d="M11,0 L19,0 M9,-8 L15,-13 M9,8 L15,13" stroke="#FFB400" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g className="bc-b1-off-2 bc-anim" style={childStyle(1)} transform="translate(220,150)">
            <circle r="11" fill="#FFB400" />
            <path d="M-7,0 L7,0 M0,-7 L0,7 M-5,-5 L5,5 M-5,5 L5,-5" stroke="#1d2430" strokeWidth="1.6" />
          </g>
          <g className="bc-b1-off-3 bc-anim" style={childStyle(1)} transform="translate(258,150)">
            <rect x="-11" y="-9" width="22" height="15" rx="2" fill="#FFB400" />
            <rect x="-5" y="8" width="10" height="3" fill="#FFB400" />
          </g>
        </g>

        {/* Beat 2: clean terminals */}
        <g className="bc-beat bc-anim" style={beatStyle(2)}>
          <rect x="190" y="130" width="70" height="60" rx="6" fill="#1d2430" stroke="#334155" strokeWidth="1.5" />
          <rect
            className="bc-b2-corroded-out bc-anim"
            style={childStyle(2)}
            x="198"
            y="118"
            width="18"
            height="16"
            rx="3"
            fill="#7c8a6e"
          />
          <rect
            className="bc-b2-clean-in bc-anim"
            style={childStyle(2)}
            x="198"
            y="118"
            width="18"
            height="16"
            rx="3"
            fill="#FFB400"
          />
          <rect x="234" y="118" width="18" height="16" rx="3" fill="#FFB400" />
          <g className="bc-b2-brush bc-anim" style={childStyle(2)}>
            <rect x="190" y="112" width="26" height="8" rx="3" fill="#94a3b8" />
            <rect x="200" y="104" width="6" height="12" fill="#64748b" />
          </g>
          <path
            className="bc-b2-sparkle bc-anim"
            style={childStyle(2)}
            d="M207,98 l2,5 l5,2 l-5,2 l-2,5 l-2,-5 l-5,-2 l5,-2 Z"
            fill="#FFF3C4"
          />
          <circle className="bc-b2-sparkle bc-anim" style={childStyle(2)} cx="226" cy="102" r="2.5" fill="#FFF3C4" />
        </g>

        {/* Beat 3: full charge */}
        <g className="bc-beat bc-anim" style={beatStyle(3)}>
          <line x1="40" y1="205" x2="140" y2="205" stroke="#475569" strokeWidth="3" strokeDasharray="6 5" />
          <g className="bc-b3-shuttle bc-anim" style={childStyle(3)} transform="translate(90,190)">
            <rect x="-16" y="0" width="32" height="14" rx="5" fill="#64748b" />
            <circle cx="-8" cy="15" r="4" fill="#1d2430" />
            <circle cx="8" cy="15" r="4" fill="#1d2430" />
          </g>
          <rect x="60" y="160" width="60" height="22" rx="3" fill="#1d2430" stroke="#334155" strokeWidth="1.2" />
          <rect x="62" y="162" width="28" height="18" rx="2" fill="#FFB400" opacity="0.9" />

          <line x1="170" y1="205" x2="470" y2="205" stroke="#475569" strokeWidth="3" />
          <g className="bc-b3-highway-car bc-anim" style={childStyle(3)} transform="translate(190,190)">
            <rect x="-16" y="0" width="34" height="15" rx="5" fill="#FFB400" />
            <circle cx="-8" cy="16" r="4.5" fill="#1d2430" />
            <circle cx="10" cy="16" r="4.5" fill="#1d2430" />
          </g>
          <rect x="380" y="150" width="70" height="26" rx="3" fill="none" stroke="#334155" strokeWidth="1.5" />
          <rect
            className="bc-b3-fill bc-anim"
            style={childStyle(3, { transformOrigin: "380px 163px" })}
            x="382"
            y="152"
            width="66"
            height="22"
            rx="2"
            fill="#FFB400"
          />
          <path
            className="bc-b3-bolt bc-anim"
            style={childStyle(3)}
            d="M460,148 L452,164 L458,164 L452,180 L466,160 L459,160 Z"
            fill="#FFF3C4"
          />
        </g>

        {/* Beat 4: health test */}
        <g className="bc-beat bc-anim" style={beatStyle(4)}>
          <g transform="translate(220,170)">
            <path d="M-50,0 A50,50 0 0,1 50,0" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
            <path d="M15,-47 A50,50 0 0,1 50,0" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
            <line
              className="bc-b4-needle bc-anim"
              style={childStyle(4, { transformOrigin: "0px 0px" })}
              x1="0"
              y1="0"
              x2="0"
              y2="-40"
              stroke="#FFB400"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle r="6" fill="#FFB400" />
          </g>

          <g transform="translate(330,140)">
            <rect x="-24" y="-20" width="48" height="40" rx="4" fill="#1d2430" stroke="#334155" strokeWidth="1.5" />
            <rect x="-24" y="-20" width="48" height="10" fill="#475569" />
            <g className="bc-b4-flip bc-anim" style={childStyle(4, { transformOrigin: "0px -5px" })}>
              <rect x="-20" y="-10" width="40" height="22" rx="2" fill="#0f172a" />
            </g>
            <text
              className="bc-b4-text bc-anim"
              style={childStyle(4)}
              x="0"
              y="8"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#FFB400"
            >
              6 MO
            </text>
          </g>

          <g
            className="bc-b4-stamp bc-anim"
            style={childStyle(4, { transformOrigin: "410px 150px" })}
            transform="translate(410,150)"
          >
            <circle r="22" fill="none" stroke="#22c55e" strokeWidth="3" />
            <path d="M-10,0 L-2,9 L12,-10" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default BatteryCareScene;
