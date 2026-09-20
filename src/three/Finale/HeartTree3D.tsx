import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const HeartTree3D = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate heart shape points
  const particleCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Math for a 3D heart shape
      const t = Math.PI * 2 * Math.random();
      const u = Math.PI * Math.random() - Math.PI / 2;
      
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      const z = Math.sin(u) * 4;

      // Scale down and add noise
      const scale = 0.15;
      pos[i * 3] = x * scale + (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = y * scale + (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = z + (Math.random() - 0.5) * 0.5;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.5;
      // Slight pulsing effect
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.05;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#F7E7CE"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
