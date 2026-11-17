type SceneProps = {
  active: boolean;
  baseDelay: number;
};

const TyreScene = ({ active, baseDelay }: SceneProps) => {
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

          {/* car body above the wheel */}
          <rect x="56" y="78" width="110" height="28" rx="10" fill="#1d2430" />
          <path d="M56,78 L72,56 L120,56 L136,78 Z" fill="#334155" />
          <circle cx="156" cy="106" r="15" fill="#1d2430" />
          <circle cx="156" cy="106" r="6" fill="#cbd5e1" />

          {/* flat tyre rolling off */}
          <g className={cls("svc-tyre-out")} style={{ transformOrigin: "88px 112px", ...delay(0) }}>
            <ellipse cx="88" cy="118" rx="18" ry="11" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
            <ellipse cx="88" cy="118" rx="7" ry="4.5" fill="#64748b" />
          </g>

          {/* new tyre rolling in */}
          <g className={cls("svc-tyre-in")} style={{ transformOrigin: "88px 112px", ...delay(250) }}>
            <circle cx="88" cy="112" r="18" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
            <circle cx="88" cy="112" r="7" fill="#cbd5e1" />
            <circle cx="88" cy="99" r="2" fill="#cbd5e1" />
            <circle cx="101" cy="112" r="2" fill="#cbd5e1" />
            <circle cx="88" cy="125" r="2" fill="#cbd5e1" />
            <circle cx="75" cy="112" r="2" fill="#cbd5e1" />
          </g>

          {/* wrench */}
          <g className={cls("svc-wrench-turn")} style={{ transformOrigin: "88px 112px", ...delay(0) }}>
            <rect x="85" y="86" width="6" height="26" rx="3" fill="#FFC933" />
            <circle cx="88" cy="86" r="7" fill="none" stroke="#FFC933" strokeWidth="5" />
          </g>

          {/* stopwatch */}
          <g transform="translate(220,90)">
            <circle r="22" fill="#1d2430" stroke="#FFC933" strokeWidth="3" />
            <rect x="-4" y="-28" width="8" height="6" rx="2" fill="#FFC933" />
            <circle r="17" fill="#0f172a" />
            <line
              className={cls("svc-stopwatch-sweep")}
              style={{ transformOrigin: "0px 0px", ...delay(0) }}
              x1="0"
              y1="0"
              x2="0"
              y2="-13"
              stroke="#FFC933"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text x="0" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFC933">30</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default TyreScene;
