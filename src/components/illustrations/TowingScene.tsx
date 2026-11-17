type SceneProps = {
  active: boolean;
  baseDelay: number;
};

const TowingScene = ({ active, baseDelay }: SceneProps) => {
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
          <line x1="12" y1="134" x2="268" y2="134" stroke="#94a3b8" strokeWidth="2" opacity="0.4" />

          <g className={cls("svc-drive-off")} style={delay(650)}>
            {/* tow truck cab */}
            <rect x="34" y="88" width="46" height="30" rx="6" fill="#1d2430" />
            <rect x="40" y="94" width="18" height="14" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1.2" />
            <circle cx="52" cy="124" r="12" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
            <circle className={cls("svc-wheel-spin")} cx="52" cy="124" r="5" fill="#cbd5e1" style={{ transformOrigin: "52px 124px", ...delay(0) }} />

            {/* flatbed (tilts down then levels) */}
            <g className={cls("svc-tilt-cycle")} style={{ transformOrigin: "86px 108px", ...delay(0) }}>
              <rect x="80" y="100" width="130" height="10" rx="3" fill="#334155" />
              <circle cx="100" cy="124" r="12" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
              <circle className={cls("svc-wheel-spin")} cx="100" cy="124" r="5" fill="#cbd5e1" style={{ transformOrigin: "100px 124px", ...delay(0) }} />
              <circle cx="180" cy="124" r="12" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
              <circle className={cls("svc-wheel-spin")} cx="180" cy="124" r="5" fill="#cbd5e1" style={{ transformOrigin: "180px 124px", ...delay(0) }} />

              {/* car on the flatbed */}
              <g className={cls("svc-roll-up")} style={delay(350)}>
                <rect x="110" y="68" width="76" height="28" rx="9" fill="#FFC933" />
                <path d="M118,68 L128,52 L168,52 L178,68 Z" fill="#1d2430" opacity="0.85" />
                <circle cx="128" cy="96" r="3" fill="#1d2430" />
                <circle cx="168" cy="96" r="3" fill="#1d2430" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default TowingScene;
