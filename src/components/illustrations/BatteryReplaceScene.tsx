type SceneProps = {
  active: boolean;
  baseDelay: number;
};

const BatteryReplaceScene = ({ active, baseDelay }: SceneProps) => {
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

          {/* car with open bonnet */}
          <rect x="40" y="96" width="120" height="36" rx="10" fill="#1d2430" />
          <path d="M40,96 L60,66 L118,66 L136,96 Z" fill="#334155" stroke="#1d2430" strokeWidth="2" />
          <circle cx="68" cy="132" r="14" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
          <circle cx="68" cy="132" r="5" fill="#cbd5e1" />
          <circle cx="134" cy="132" r="14" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
          <circle cx="134" cy="132" r="5" fill="#cbd5e1" />

          {/* engine bay */}
          <rect x="68" y="92" width="52" height="30" rx="4" fill="#0f172a" />

          {/* old battery sliding out */}
          <g
            className={cls("svc-slide-out-left")}
            style={{ transformOrigin: "80px 106px", ...delay(0) }}
          >
            <rect x="66" y="96" width="26" height="22" rx="2" fill="#475569" />
            <rect x="70" y="92" width="18" height="5" rx="1.5" fill="#64748b" />
          </g>

          {/* robotic arm lowering the new battery */}
          <g className={cls("svc-arm-down")} style={{ transformOrigin: "100px 60px", ...delay(150) }}>
            <rect x="97" y="40" width="6" height="30" fill="#64748b" />
            <rect x="86" y="68" width="28" height="8" rx="3" fill="#64748b" />
            <rect x="89" y="76" width="22" height="20" rx="3" fill="#FFC933" stroke="#1d2430" strokeWidth="1.5" />
            <rect x="94" y="72" width="12" height="4" rx="1.5" fill="#1d2430" />
          </g>

          {/* charge gauge */}
          <rect x="150" y="80" width="56" height="12" rx="6" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <rect
            className={cls("svc-gauge-fill")}
            x="152"
            y="82"
            width="52"
            height="8"
            rx="4"
            fill="#22c55e"
            style={{ transformOrigin: "152px 86px", ...delay(0) }}
          />

          {/* spark */}
          <path
            className={cls("svc-spark")}
            d="M138,78 L130,92 L136,92 L132,106 L144,88 L137,88 Z"
            fill="#FFC933"
            style={{ transformOrigin: "136px 92px", ...delay(0) }}
          />
        </g>
      </svg>
    </div>
  );
};

export default BatteryReplaceScene;
