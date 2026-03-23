import { useEffect, useRef } from 'react';

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
}

export default function Antigravity({
  count = 300,
  magnetRadius = 6,
  ringRadius = 7,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 1.5,
  lerpSpeed = 0.05,
  color = '#FF9FFC',
  autoAnimate = true,
  particleVariance = 1,
}: AntigravityProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -9999; // Initialize far off-screen
    let mouseY = -9999;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    interface Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;
      angle: number;
    }

    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        size: particleSize + (Math.random() - 0.5) * particleVariance,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += waveSpeed * 0.01;

      particles.forEach((particle) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = particle.baseX;
        let targetY = particle.baseY;

        if (autoAnimate) {
          targetX += Math.sin(time + particle.angle) * waveAmplitude * 20;
          targetY += Math.cos(time + particle.angle) * waveAmplitude * 20;
        }

        if (distance < magnetRadius * 50 && mouseX > 0 && mouseY > 0) {
          const force = (magnetRadius * 50 - distance) / (magnetRadius * 50);
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * ringRadius * 10;
          const pushY = Math.sin(angle) * force * ringRadius * 10;
          targetX = particle.x - pushX;
          targetY = particle.y - pushY;
        }

        particle.vx += (targetX - particle.x) * lerpSpeed;
        particle.vy += (targetY - particle.y) * lerpSpeed;
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, magnetRadius, ringRadius, waveSpeed, waveAmplitude, particleSize, lerpSpeed, color, autoAnimate, particleVariance]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'blur(1px)' }}
    />
  );
}
