type SceneProps = {
  active: boolean;
  baseDelay: number;
};

const RecoveryScene = ({ active, baseDelay }: SceneProps) => {
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
          {/* sand mound */}
          <path d="M10,134 Q70,110 140,134 T270,134 L270,140 L10,140 Z" fill="#92764f" opacity="0.55" />

          {/* recovery truck */}
          <rect x="18" y="92" width="58" height="32" rx="6" fill="#1d2430" />
          <rect x="26" y="98" width="20" height="14" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1.2" />
          <circle cx="36" cy="128" r="12" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
          <circle cx="36" cy="128" r="5" fill="#cbd5e1" />
          <circle cx="68" cy="128" r="12" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
          <circle cx="68" cy="128" r="5" fill="#cbd5e1" />
          <rect x="72" y="96" width="8" height="8" rx="2" fill="#FFC933" />

          {/* winch cable */}
          <line
            className={cls("svc-cable-tighten")}
            style={{ transformOrigin: "80px 100px", ...delay(0) }}
            x1="80"
            y1="100"
            x2="168"
            y2="112"
            stroke="#64748b"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* stuck car, rocks then pulls free */}
          <g className={cls("svc-rock")} style={{ transformOrigin: "198px 118px", ...delay(350) }}>
            <g className={cls("svc-pull-free")} style={delay(950)}>
              <rect x="168" y="100" width="72" height="26" rx="8" fill="#FFC933" />
              <path d="M176,100 L186,84 L222,84 L232,100 Z" fill="#1d2430" opacity="0.85" />
              <circle cx="186" cy="126" r="10" fill="#1d2430" opacity="0.9" />
              <circle cx="222" cy="126" r="10" fill="#1d2430" opacity="0.9" />
            </g>
          </g>

          {/* dust puffs */}
          <circle className={cls("svc-dust-1")} cx="168" cy="132" r="6" fill="#c2a878" style={delay(0)} />
          <circle className={cls("svc-dust-2")} cx="182" cy="136" r="5" fill="#c2a878" style={delay(0)} />
          <circle className={cls("svc-dust-3")} cx="156" cy="136" r="4.5" fill="#c2a878" style={delay(0)} />

          {/* 45 min badge */}
          <g className={cls("svc-badge-pop")} style={{ transformOrigin: "232px 46px", ...delay(0) }}>
            <circle cx="232" cy="46" r="24" fill="#1d2430" stroke="#FFC933" strokeWidth="2.5" />
            <text x="232" y="42" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFC933">45</text>
            <text x="232" y="54" textAnchor="middle" fontSize="8" fontWeight="600" fill="#ffffff">min</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default RecoveryScene;
