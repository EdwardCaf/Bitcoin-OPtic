import { useEffect, useRef } from "react";

const HEX_CHARS = "0123456789abcdef";
const HASH_SNIPPETS = [
  "000000000000000",
  "f7931a",
  "de18e2af",
  "21000000",
  "caf277c1",
  "ffa0",
  "0011",
  "a1b2c3",
  "bitcoin",
  "sha256",
];

export function HeroBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      const count = Math.min(Math.floor(width / 40), 35);
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(),
      );
    };

    const createParticle = () => {
      const isHash = Math.random() > 0.6;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.03 + Math.random() * 0.12,
        char: isHash
          ? HASH_SNIPPETS[Math.floor(Math.random() * HASH_SNIPPETS.length)]
          : Array.from(
              { length: 4 + Math.floor(Math.random() * 8) },
              () => HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)],
            ).join(""),
        fontSize: 10 + Math.random() * 4,
        drift: (Math.random() - 0.5) * 0.3,
      };
    };

    const draw = (timestamp) => {
      // Throttle to ~24fps for performance
      if (timestamp - lastFrameRef.current < 41) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameRef.current = timestamp;

      ctx.clearRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        ctx.font = `${p.fontSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(247, 147, 26, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);

        p.y += p.speed;
        p.x += p.drift;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
