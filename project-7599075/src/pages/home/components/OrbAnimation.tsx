import './OrbAnimation.css';

export default function OrbAnimation() {
  const particles = Array.from({ length: 300 }, (_, i) => i + 1);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600">
      <div className="orb-wrap">
        {particles.map((i) => (
          <div key={i} className="orb-particle" />
        ))}
      </div>
    </div>
  );
}
