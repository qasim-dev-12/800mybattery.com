type SceneProps = {
  active: boolean;
  baseDelay: number;
};

const JumpstartScene = ({ active, baseDelay }: SceneProps) => {
  const delay = (ms: number) =>
    active ? { animationDelay: `${baseDelay + ms}ms` } : undefined;
  const cls = (name: string) => (active ? name : "");

  return (
    <div className="svc-scene-wrap">
      <svg
        viewBox="0 0 280 160"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="svc-scene-svg"
      >
        <g className={cls("svc-scene-float")} style={delay(0)}>
          <line x1="12" y1="132" x2="268" y2="132" stroke="#94a3b8" strokeWidth="2" opacity="0.4" />

          {/* donor battery (left) */}
          <rect x="30" y="94" width="40" height="32" rx="4" fill="#1d2430" />
          <rect x="38" y="88" width="24" height="7" rx="2" fill="#64748b" />

          {/* car with headlight (right) */}
          <rect x="150" y="96" width="100" height="30" rx="10" fill="#1d2430" />
          <path d="M150,96 L166,72 L214,72 L230,96 Z" fill="#334155" stroke="#1d2430" strokeWidth="2" />
          <circle cx="244" cy="110" r="7" className={cls("svc-flicker")} fill="#FFC933" style={delay(0)} />
          <circle cx="172" cy="132" r="13" fill="#1d2430" />
          <circle cx="172" cy="132" r="5" fill="#cbd5e1" />
          <circle cx="228" cy="132" r="13" fill="#1d2430" />
          <circle cx="228" cy="132" r="5" fill="#cbd5e1" />

          {/* dashboard gauge */}
          <g transform="translate(176,98)">
            <path d="M-10,8 A10,10 0 0,1 -2,0.3" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M-2,0.3 A10,10 0 0,1 10,8" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
            <line
              className={cls("svc-needle-jump")}
              style={{ transformOrigin: "0px 8px", ...delay(0) }}
              x1="0"
              y1="8"
              x2="0"
              y2="0"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* jumper cables with clamps */}
          <path
            d="M70,100 C95,70 125,70 150,100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="6 6"
            className={cls("svc-cable-pulse")}
            style={delay(0)}
          />
          <path
            d="M70,112 C95,138 125,138 150,112"
            fill="none"
            stroke="#1d2430"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="6 6"
            className={cls("svc-cable-pulse")}
            style={delay(100)}
          />

          <g className={cls("svc-clamp-close")} style={{ transformOrigin: "70px 100px", ...delay(0) }}>
            <path d="M64,94 L74,94 L70,106 Z" fill="#ef4444" />
          </g>
          <g className={cls("svc-clamp-close")} style={{ transformOrigin: "150px 100px", ...delay(80) }}>
            <path d="M144,94 L156,94 L150,106 Z" fill="#ef4444" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default JumpstartScene;
