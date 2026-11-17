import type { CSSProperties } from "react";

type SceneProps = {
  activeBeat: number | null;
};

const BEAT_S = 2;

const WarningSignsScene = ({ activeBeat }: SceneProps) => {
  const beatStyle = (i: number): CSSProperties =>
    activeBeat !== null
      ? { animation: "none", opacity: activeBeat === i ? 1 : 0 }
      : undefined;

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
        {/* ambient: sun, skyline, road glow */}
        <circle className="bc-sun bc-anim" cx="470" cy="40" r="22" fill="#FFB400" opacity="0.5" />
        <circle cx="470" cy="40" r="12" fill="#FFB400" />
        <g className="bc-skyline bc-anim">
          <rect x="20" y="215" width="18" height="35" fill="#1d2430" opacity="0.55" />
          <rect x="42" y="200" width="22" height="50" fill="#1d2430" opacity="0.55" />
          <rect x="68" y="222" width="16" height="28" fill="#1d2430" opacity="0.55" />
          <rect x="420" y="210" width="20" height="40" fill="#1d2430" opacity="0.5" />
          <rect x="444" y="195" width="18" height="55" fill="#1d2430" opacity="0.5" />
        </g>
        <line x1="10" y1="250" x2="510" y2="250" stroke="#334155" strokeWidth="2" opacity="0.5" />
        <ellipse className="bc-heatwave bc-anim" cx="260" cy="250" rx="180" ry="6" fill="#FFB400" opacity="0.15" />

        {/* Beat 0: slow turnover */}
        <g className="ws-beat ws-anim" style={beatStyle(0)}>
          <rect x="90" y="110" width="340" height="130" rx="14" fill="#1d2430" stroke="#334155" strokeWidth="1.5" />

          <circle cx="140" cy="175" r="20" fill="#0f172a" stroke="#FFB400" strokeWidth="2" />
          <path d="M140,163 v10 M132,170 a11,11 0 1,0 16,0" stroke="#FFB400" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle
            className="ws-b0-ring ws-anim"
            style={childStyle(0, { transformOrigin: "140px 175px" })}
            cx="140"
            cy="175"
            r="20"
            fill="none"
            stroke="#FFB400"
            strokeWidth="2"
            opacity="0.6"
          />

          <g transform="translate(190,185)">
            <g className="ws-b0-wave ws-anim" style={childStyle(0, { transformOrigin: "0px 0px" })}>
              <rect x="0" y="-4" width="6" height="8" fill="#94a3b8" />
              <rect x="12" y="-8" width="6" height="16" fill="#94a3b8" />
              <rect x="24" y="-5" width="6" height="10" fill="#94a3b8" />
              <rect x="36" y="-9" width="6" height="18" fill="#94a3b8" />
              <rect x="48" y="-4" width="6" height="8" fill="#94a3b8" />
            </g>
          </g>

          <g transform="translate(340,175)">
            <path d="M-30,10 A30,30 0 0,1 30,10" fill="none" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <line
              className="ws-b0-needle ws-anim"
              style={childStyle(0, { transformOrigin: "0px 10px" })}
              x1="0"
              y1="10"
              x2="0"
              y2="-25"
              stroke="#FFB400"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="0" cy="10" r="4" fill="#FFB400" />
          </g>

          <g transform="translate(400,175)">
            <rect x="-18" y="-14" width="36" height="28" rx="3" fill="none" stroke="#334155" strokeWidth="1.5" />
            <rect x="-4" y="-18" width="8" height="5" fill="#334155" />
            <rect
              className="ws-b0-battery ws-anim"
              style={childStyle(0, { transformOrigin: "-16px 0px" })}
              x="-16"
              y="-10"
              width="10"
              height="20"
              fill="#ef4444"
            />
          </g>
        </g>

        {/* Beat 1: dim headlights */}
        <g className="ws-beat ws-anim" style={beatStyle(1)}>
          <path
            className="ws-b1-beam-l ws-anim"
            style={childStyle(1, { transformOrigin: "190px 175px" })}
            d="M190,175 L130,150 L130,200 Z"
            fill="#FFB400"
            opacity="0.25"
          />
          <path
            className="ws-b1-beam-r ws-anim"
            style={childStyle(1, { transformOrigin: "330px 175px" })}
            d="M330,175 L390,150 L390,200 Z"
            fill="#FFB400"
            opacity="0.25"
          />

          <rect x="170" y="165" width="180" height="40" rx="14" fill="#1d2430" />
          <rect x="190" y="145" width="140" height="26" rx="10" fill="#273040" />

          <circle className="ws-b1-light-l ws-anim" style={childStyle(1)} cx="190" cy="175" r="12" fill="#FFF3C4" />
          <circle className="ws-b1-light-r ws-anim" style={childStyle(1)} cx="330" cy="175" r="12" fill="#FFF3C4" />

          <circle className="ws-b1-spark ws-anim" style={childStyle(1)} cx="205" cy="158" r="2.5" fill="#FFF3C4" />
          <circle className="ws-b1-spark ws-anim" style={childStyle(1, { animationDelay: "-3.1s" })} cx="315" cy="160" r="2" fill="#FFF3C4" />
        </g>

        {/* Beat 2: morning trouble */}
        <g className="ws-beat ws-anim" style={beatStyle(2)}>
          <path d="M120,210 A70,70 0 0,1 260,210" fill="none" stroke="#FFB400" strokeWidth="3" opacity="0.5" />
          <circle cx="190" cy="210" r="20" fill="#FFB400" opacity="0.8" />

          <g className="ws-b2-cloud ws-anim" style={childStyle(2)}>
            <ellipse cx="90" cy="110" rx="26" ry="10" fill="#334155" opacity="0.4" />
            <ellipse cx="115" cy="105" rx="18" ry="8" fill="#334155" opacity="0.4" />
          </g>

          <g transform="translate(190,180)">
            <rect x="-40" y="-10" width="80" height="26" rx="10" fill="#334155" />
            <circle cx="-20" cy="16" r="9" fill="#0f172a" />
            <circle cx="20" cy="16" r="9" fill="#0f172a" />
            <path d="M-28,-14 q6,-4 12,0 M8,-14 q6,-4 12,0" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
          <text className="ws-b2-zzz ws-anim" style={childStyle(2)} x="235" y="150" fontSize="16" fontWeight="700" fill="#94a3b8">
            Z z z
          </text>

          <g transform="translate(330,165)">
            <rect x="-5" y="-30" width="10" height="45" rx="5" fill="#1d2430" stroke="#334155" strokeWidth="1.5" />
            <circle cx="0" cy="18" r="9" fill="#1d2430" stroke="#334155" strokeWidth="1.5" />
            <rect
              className="ws-b2-mercury ws-anim"
              style={childStyle(2, { transformOrigin: "0px 18px" })}
              x="-2.5"
              y="-10"
              width="5"
              height="28"
              fill="#60a5fa"
            />
            <circle cx="0" cy="18" r="5" fill="#60a5fa" />
          </g>

          <g transform="translate(410,170)">
            <g className="ws-b2-key ws-anim" style={childStyle(2, { transformOrigin: "0px 0px" })}>
              <circle r="7" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
              <rect x="6" y="-2" width="20" height="4" fill="#94a3b8" />
              <rect x="22" y="2" width="3" height="5" fill="#94a3b8" />
              <rect x="28" y="2" width="3" height="5" fill="#94a3b8" />
            </g>
          </g>
        </g>

        {/* Beat 3: dashboard warning lights */}
        <g className="ws-beat ws-anim" style={beatStyle(3)}>
          <rect x="120" y="120" width="280" height="100" rx="12" fill="#1d2430" stroke="#334155" strokeWidth="1.5" />

          <g transform="translate(180,170)">
            <g className="ws-b3-icon1 ws-anim" style={childStyle(3)}>
              <rect x="-14" y="-11" width="28" height="22" rx="2" fill="none" stroke="#ef4444" strokeWidth="2" />
              <rect x="-3" y="-15" width="6" height="4" fill="#ef4444" />
              <rect x="-10" y="-7" width="8" height="14" fill="#ef4444" />
            </g>
          </g>

          <g transform="translate(260,170)">
            <g className="ws-b3-icon2 ws-anim" style={childStyle(3)}>
              <rect x="-13" y="-8" width="26" height="18" rx="2" fill="none" stroke="#FFB400" strokeWidth="2" />
              <path d="M-13,-8 l6,-6 h14 l6,6" fill="none" stroke="#FFB400" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          <g transform="translate(340,170)">
            <g className="ws-b3-icon3 ws-anim" style={childStyle(3)}>
              <path d="M0,-14 C8,-2 12,4 0,14 C-12,4 -8,-2 0,-14 Z" fill="none" stroke="#f59e0b" strokeWidth="2" />
            </g>
          </g>
        </g>

        {/* Beat 4: battery age */}
        <g className="ws-beat ws-beat-final ws-anim" style={beatStyle(4)}>
          <g transform="translate(160,170)">
            <rect x="-40" y="-26" width="80" height="52" rx="4" fill="none" stroke="#334155" strokeWidth="2" />
            <rect x="-8" y="-32" width="16" height="7" fill="#334155" />
            <rect
              className="ws-b4-charge ws-anim"
              style={childStyle(4, { transformOrigin: "-38px 0px" })}
              x="-38"
              y="-24"
              width="74"
              height="48"
              fill="#FFB400"
            />
          </g>

          <g transform="translate(290,150)">
            <rect x="-28" y="-24" width="56" height="48" rx="4" fill="#1d2430" stroke="#334155" strokeWidth="1.5" />
            <rect x="-28" y="-24" width="56" height="12" fill="#475569" />
            <g
              className="ws-b4-flip ws-anim"
              style={childStyle(4, { transformOrigin: "0px 1px" })}
            >
              <rect x="-24" y="-12" width="48" height="26" rx="2" fill="#0f172a" />
            </g>
            <text
              className="ws-b4-text ws-anim"
              style={childStyle(4)}
              x="0"
              y="8"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="#FFB400"
            >
              2-3 YR
            </text>
          </g>

          <g transform="translate(400,160)">
            <circle cx="0" cy="0" r="22" fill="none" stroke="#334155" strokeWidth="2" />
            <line
              className="ws-b4-hand-min ws-anim"
              style={childStyle(4, { transformOrigin: "0px 0px" })}
              x1="0"
              y1="0"
              x2="0"
              y2="-18"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              className="ws-b4-hand-hr ws-anim"
              style={childStyle(4, { transformOrigin: "0px 0px" })}
              x1="0"
              y1="0"
              x2="12"
              y2="0"
              stroke="#94a3b8"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </g>

          <g transform="translate(260,230)">
            <g className="ws-b4-tag ws-anim" style={childStyle(4, { transformOrigin: "0px 0px" })}>
              <rect x="-62" y="-14" width="124" height="28" rx="14" fill="#FFB400" />
              <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d2430">
                Time to replace
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default WarningSignsScene;
