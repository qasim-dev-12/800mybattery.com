const HeroIllustration = () => {
  return (
    <div className="hi-wrap">
      <svg
        className="hi-svg"
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Technician replacing a car battery"
      >
        <line x1="20" y1="360" x2="620" y2="360" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

        {/* Car */}
        <g>
          <rect x="130" y="235" width="90" height="40" rx="10" fill="#334155" />
          <rect x="90" y="270" width="190" height="60" rx="14" fill="#334155" />
          <circle cx="130" cy="336" r="18" fill="#1d2430" />
          <circle cx="130" cy="336" r="7" fill="#cbd5e1" />
          <circle cx="250" cy="336" r="18" fill="#1d2430" />
          <circle cx="250" cy="336" r="7" fill="#cbd5e1" />
          <rect x="105" y="248" width="52" height="38" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
        </g>

        {/* Charge gauge */}
        <rect x="108" y="222" width="70" height="14" rx="7" fill="none" stroke="#94a3b8" strokeWidth="2" />
        <rect
          className="hi-fill"
          x="110"
          y="224"
          width="66"
          height="10"
          rx="5"
          fill="#22c55e"
          style={{ transformOrigin: "110px 229px" }}
        />
        <path
          className="hi-bolt"
          d="M196,214 L186,230 L194,230 L190,246 L204,226 L195,226 Z"
          fill="#FFC933"
          style={{ transformOrigin: "195px 230px" }}
        />

        {/* Battery, drawn at its final resting spot inside the engine bay */}
        <g className="hi-battery" style={{ transformOrigin: "132px 269px" }}>
          <rect x="118" y="256" width="28" height="26" rx="3" fill="#1f2937" />
          <rect x="122" y="251" width="20" height="6" rx="2" fill="#FFC933" />
          <circle cx="126" cy="251" r="1.6" fill="#0f172a" />
          <circle cx="138" cy="251" r="1.6" fill="#0f172a" />
        </g>

        {/* Van, drawn at its final resting position beside the car */}
        <g className="hi-van">
          <rect x="330" y="200" width="220" height="110" rx="18" fill="#1d2430" />
          <rect x="330" y="255" width="220" height="14" fill="#FFC933" />
          <rect x="478" y="213" width="58" height="46" rx="8" fill="#cbd5e1" />
          <rect x="338" y="228" width="52" height="40" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="380" cy="336" r="22" fill="#1d2430" />
          <circle cx="380" cy="336" r="9" fill="#cbd5e1" />
          <circle cx="500" cy="336" r="22" fill="#1d2430" />
          <circle cx="500" cy="336" r="9" fill="#cbd5e1" />
        </g>

        {/* Technician */}
        <g>
          <rect x="392" y="330" width="8" height="35" fill="#1d2430" />
          <rect x="406" y="330" width="8" height="35" fill="#1d2430" />
          <rect x="386" y="290" width="34" height="45" rx="10" fill="#FFC933" />
          <g className="hi-arm" style={{ transformOrigin: "400px 296px" }}>
            <rect x="396" y="296" width="10" height="40" rx="5" fill="#f1c27d" />
          </g>
          <g className="hi-head" style={{ transformOrigin: "403px 284px" }}>
            <circle cx="403" cy="278" r="14" fill="#f1c27d" />
            <path d="M389,276 a14,12 0 0,1 28,0 Z" fill="#1d2430" />
          </g>
        </g>

        {/* Trust badges */}
        <g className="hi-badge-scale" style={{ transformOrigin: "109px 60px" }}>
          <rect x="50" y="40" width="118" height="40" rx="20" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
          <g className="hi-badge-star" style={{ transformOrigin: "109px 60px" }}>
            <path
              className="hi-twinkle"
              d="M70,52 L72.35,57.5 L78,58 L73.5,61.5 L75,67.5 L70,64 L65,67.5 L66.5,61.5 L62,58 L67.65,57.5 Z"
              fill="#FFC933"
              style={{ transformOrigin: "70px 60px" }}
            />
            <text x="88" y="64" fontSize="13" fontWeight="700" fill="#1d2430">5.0 Rated</text>
          </g>
        </g>

        <g className="hi-badge-scale" style={{ transformOrigin: "505px 60px" }}>
          <rect x="420" y="40" width="170" height="40" rx="20" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
          <g className="hi-badge-check" style={{ transformOrigin: "505px 60px" }}>
            <circle className="hi-check-glow" cx="452" cy="60" r="16" fill="#22c55e" opacity="0.18" style={{ transformOrigin: "452px 60px" }} />
            <circle cx="452" cy="60" r="12" fill="#22c55e" />
            <path d="M446,60 L450,65 L458,53" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="470" y="64" fontSize="12" fontWeight="700" fill="#1d2430">Same-day install</text>
          </g>
        </g>

        <g className="hi-badge-scale" style={{ transformOrigin: "82px 170px" }}>
          <rect x="30" y="150" width="104" height="40" rx="20" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
          <g className="hi-badge-247" style={{ transformOrigin: "82px 170px" }}>
            <text x="48" y="175" fontSize="14" fontWeight="700" fill="#1d2430">24/7</text>
          </g>
        </g>

        <g className="hi-badge-scale" style={{ transformOrigin: "320px 428px" }}>
          <rect x="195" y="408" width="250" height="40" rx="20" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
          <g className="hi-badge-100k" style={{ transformOrigin: "320px 428px" }}>
            <text x="212" y="432" fontSize="12" fontWeight="700" fill="#1d2430">100,000+ batteries served</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroIllustration;
