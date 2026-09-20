import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface Cake3DProps {
  onExtinguish: () => void;
}

export const Cake3D = ({ onExtinguish }: Cake3DProps) => {
  const [lit, setLit] = useState(true);
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (lit && flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(clock.elapsedTime * 10) * 0.1;
      flameRef.current.scale.x = 1 + Math.sin(clock.elapsedTime * 15) * 0.05;
      flameRef.current.scale.z = 1 + Math.sin(clock.elapsedTime * 15) * 0.05;
    }
  });

  const handlePointerDown = () => {
    if (lit) {
      setLit(false);
      onExtinguish();
    }
  };

  return (
    <group onClick={handlePointerDown}>
      {/* Plate */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.8, 0.2, 32]} />
        <meshStandardMaterial color="#333" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Cake Base */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2, 1.4, 32]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.8} />
      </mesh>

      {/* Frosting layer */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[2.05, 2.05, 0.2, 32]} />
        <meshStandardMaterial color="#f0d5c9" roughness={0.5} />
      </mesh>

      {/* Candle */}
      <group position={[0, 1.2, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
          <meshStandardMaterial color="#d1d1d1" roughness={0.4} />
        </mesh>
        
        {/* Flame */}
        {lit && (
          <group position={[0, 0.6, 0]}>
            <pointLight intensity={2} distance={5} color="#ffaa00" castShadow />
            <mesh ref={flameRef}>
              <coneGeometry args={[0.15, 0.4, 16]} />
              <meshBasicMaterial color="#ffcc00" transparent opacity={0.8} />
            </mesh>
            <mesh position={[0, -0.1, 0]}>
               <sphereGeometry args={[0.12, 16, 16]} />
               <meshBasicMaterial color="#ff5500" />
            </mesh>
          </group>
        )}

        {/* Smoke after extinguishing */}
        {!lit && (
          <Sparkles 
            position={[0, 0.8, 0]} 
            count={20} 
            scale={0.5} 
            size={4} 
            speed={0.5} 
            opacity={0.5} 
            color="#aaa"
          />
        )}
      </group>
    </group>
  );
};
