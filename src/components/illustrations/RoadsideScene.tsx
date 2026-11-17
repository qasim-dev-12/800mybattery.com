type SceneProps = {
  active: boolean;
  baseDelay: number;
};

const RoadsideScene = ({ active, baseDelay }: SceneProps) => {
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

          {/* sun / moon cycle */}
          <g transform="translate(40,38)">
            <circle className={cls("svc-sun")} r="13" fill="#FFC933" style={delay(0)} />
            <g className={cls("svc-sun")} style={delay(0)}>
              <line x1="0" y1="-20" x2="0" y2="-26" stroke="#FFC933" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="14" y1="-14" x2="18" y2="-18" stroke="#FFC933" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="-14" y1="-14" x2="-18" y2="-18" stroke="#FFC933" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <path
              className={cls("svc-moon")}
              d="M4,-11 A11,11 0 1 0 4,11 A8.5,9 0 0 1 4,-11 Z"
              fill="#cbd5e1"
              style={delay(0)}
            />
          </g>

          {/* stranded car */}
          <rect x="70" y="100" width="70" height="24" rx="8" fill="#334155" />
          <circle cx="86" cy="124" r="10" fill="#1d2430" />
          <circle cx="124" cy="124" r="10" fill="#1d2430" />
          <circle cx="140" cy="106" r="4" className={cls("svc-hazard")} fill="#ef4444" style={delay(0)} />
          <circle cx="70" cy="106" r="4" className={cls("svc-hazard")} fill="#ef4444" style={delay(100)} />

          {/* map pin */}
          <g className={cls("svc-pin-drop")} style={{ transformOrigin: "212px 70px", ...delay(200) }}>
            <circle className={cls("svc-pin-pulse")} cx="212" cy="70" r="14" fill="#FFC933" style={delay(700)} />
            <path d="M212,56 C224,56 230,66 212,88 C194,66 200,56 212,56 Z" fill="#FFC933" stroke="#1d2430" strokeWidth="1.5" />
            <circle cx="212" cy="67" r="4.5" fill="#1d2430" />
          </g>

          {/* service van with beacon */}
          <rect x="188" y="100" width="60" height="30" rx="8" fill="#1d2430" />
          <rect x="188" y="116" width="60" height="7" fill="#FFC933" />
          <circle cx="202" cy="132" r="9" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
          <circle cx="234" cy="132" r="9" fill="#1d2430" stroke="#0f172a" strokeWidth="2" />
          <g className={cls("svc-beacon-spin")} style={{ transformOrigin: "218px 96px", ...delay(0) }}>
            <circle cx="218" cy="96" r="6" fill="#FFC933" />
            <path d="M218,90 L218,86 M224,96 L228,96 M212,96 L208,96" stroke="#FFC933" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default RoadsideScene;
