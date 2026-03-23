
import { useEffect, useRef } from 'react';
import './CurvedLoop.css';

export default function CurvedLoop() {
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    let offset = 0;
    const speed = 0.5;

    const animate = () => {
      offset += speed;
      if (offset >= 1400) {
        offset = 0;
      }
      if (text) {
        text.setAttribute('startOffset', `${offset}`);
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox="0 0 1200 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path
            id="curve"
            d="M-100,150 Q300,50 600,150 T1300,150"
            fill="none"
          />
        </defs>

        <text ref={textRef} className="curved-text font-caprasimo" fill="#1A1A1A" fontSize="72" fontWeight="400">
          <textPath href="#curve" startOffset="0">
            Powerful Features • Powerful Features • Powerful Features • Powerful Features • Powerful Features • Powerful Features • 
          </textPath>
        </text>
      </svg>
    </div>
  );
}
