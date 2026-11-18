import React, { useMemo } from 'react';
import { Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { EVENT_CONFIG } from '../../config/eventConfig';

interface WorldEnvironmentProps {
  particleCount: number;
  shadowsEnabled: boolean;
  prefersReducedMotion: boolean;
}

const TREE_POSITIONS: [number, number, number, number][] = [
  [-14, 0, 14, 1.1],
  [14, 0, 12, 1.0],
  [-13, 0, -2, 0.95],
  [13.5, 0, -6, 1.15],
  [-15, 0, -18, 1.25],
  [15.5, 0, -28, 1.05],
  [-14.5, 0, -45, 1.15],
  [14.5, 0, -52, 1.2],
  [-16, 0, -76, 1.1],
  [16, 0, -82, 1.3],
  [-15.5, 0, -126, 1.15],
  [15.5, 0, -130, 1.1],
  [-14, 0, -166, 1.2],
  [14, 0, -172, 1.05],
  [-15, 0, -198, 1.25],
  [15, 0, -204, 1.15],
  [-15.5, 0, -230, 1.2],
  [15.5, 0, -234, 1.15],
  [-13.5, 0, -264, 1.3],
  [13.5, 0, -264, 1.3],
];

const PLAZA_Z_POSITIONS = [22, 4, -22, -66, -109, -150, -184, -216, -236, -268];

export const WorldEnvironment: React.FC<WorldEnvironmentProps> = ({
  particleCount,
  prefersReducedMotion,
}) => {
  const kawungTexture = useTexture(EVENT_CONFIG.assets.kawungGold);
  kawungTexture.wrapS = kawungTexture.wrapT = THREE.RepeatWrapping;
  kawungTexture.repeat.set(36, 130);

  const skylineTexture = useTexture(EVENT_CONFIG.assets.skylineCream);

  const railLineObjects = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.04, 42),
      new THREE.Vector3(0, 0.04, 18),
      new THREE.Vector3(0.4, 0.04, -6),
      new THREE.Vector3(-0.6, 0.04, -36),
      new THREE.Vector3(0, 0.04, -66),
      new THREE.Vector3(0, 0.04, -108),
      new THREE.Vector3(0, 0.04, -150),
      new THREE.Vector3(0, 0.04, -184),
      new THREE.Vector3(0.5, 0.04, -216),
      new THREE.Vector3(0, 0.04, -238),
      new THREE.Vector3(0, 0.04, -274),
    ]);
    const pts = curve.getPoints(160);
    return [0, -1.7, 1.7, -3.4, 3.4].map((offsetX, idx) => {
      const geo = new THREE.BufferGeometry().setFromPoints(
        pts.map((p) => new THREE.Vector3(p.x + offsetX, 0.035, p.z))
      );
      const mat = new THREE.LineBasicMaterial({
        color: idx === 0 ? '#F4E9D7' : idx <= 2 ? '#DDBE82' : '#C69C54',
        transparent: true,
        opacity: idx <= 2 ? 0.85 : 0.45,
      });
      return new THREE.Line(geo, mat);
    });
  }, []);

  const canopyWireGeo = useMemo(() => {
    const base = new THREE.DodecahedronGeometry(1.35, 0);
    const edges = new THREE.EdgesGeometry(base, 5);
    base.dispose();
    return edges;
  }, []);

  return (
    <group>
      {/* Deep Keraton Night Silhouette Atmosphere */}
      <color attach="background" args={['#0C1F1B']} />
      <fogExp2 attach="fog" args={['#0C1F1B', 0.0155]} />

      <hemisphereLight args={['#F4E9D7', '#0B1E1A', 0.65]} />

      {/* Architectural Blueprint Ground Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.04, -120]}
        userData={{ skipSilhouette: true }}
      >
        <planeGeometry args={[240, 380]} />
        <meshBasicMaterial color="#091915" />
      </mesh>

      {/* Architectural Blueprint Grids */}
      {[-20, -220].map((gz) => (
        <gridHelper
          key={gz}
          args={[200, 80, '#C69C54', '#1A3D36']}
          position={[0, 0.0, gz]}
        />
      ))}

      {/* Subtle Batik Kawung Pattern Overlay (8% opacity) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.006, -120]}
        userData={{ skipSilhouette: true }}
      >
        <planeGeometry args={[120, 360]} />
        <meshBasicMaterial map={kawungTexture} transparent opacity={0.08} depthWrite={false} />
      </mesh>

      {/* Layered 3D Solo Skyline Silhouette Vista Planes */}
      {[-45, -135, -210].map((sz, idx) =>
        [-25, 25].map((sx, sideIdx) => (
          <mesh
            key={`${sz}-${sx}`}
            position={[sx, 6.4, sz - sideIdx * 12]}
            rotation={[0, sx < 0 ? Math.PI * 0.42 : -Math.PI * 0.42, 0]}
            userData={{ skipSilhouette: true }}
          >
            <planeGeometry args={[54, 14]} />
            <meshBasicMaterial
              map={skylineTexture}
              color="#DDBE82"
              transparent
              opacity={0.14 + (idx % 2) * 0.05}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        ))
      )}

      {/* Glowing Golden Contour Pathway Rails */}
      {railLineObjects.map((lineObj, idx) => (
        <primitive key={idx} object={lineObj} />
      ))}

      {/* Concentric Golden Line Chapter Plazas */}
      {PLAZA_Z_POSITIONS.map((pz) => (
        <group key={pz} position={[0, 0.03, pz]}>
          {[3.8, 5.6, 7.2].map((rad, rIdx) => (
            <mesh
              key={rad}
              rotation={[-Math.PI / 2, 0, 0]}
              userData={{ skipSilhouette: true }}
            >
              <ringGeometry args={[rad - 0.04, rad, 64]} />
              <meshBasicMaterial
                color={rIdx === 2 ? '#DDBE82' : '#C69C54'}
                transparent
                opacity={rIdx === 2 ? 0.85 : 0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Geometric Line-Art Botanical Silhouette Trees */}
      {TREE_POSITIONS.map(([x, y, z, s], idx) => (
        <group key={idx} position={[x, y, z]} scale={[s, s, s]}>
          <lineSegments position={[0, 2.35, 0]} scale={[1.25, 0.95, 1.25]} geometry={canopyWireGeo}>
            <lineBasicMaterial color="#C69C54" transparent opacity={0.62} />
          </lineSegments>
          <mesh position={[0, 0.9, 0]} userData={{ skipSilhouette: true }}>
            <cylinderGeometry args={[0.14, 0.22, 1.8, 6]} />
            <meshBasicMaterial color="#0B1E1A" wireframe />
          </mesh>
        </group>
      ))}

      {/* Floating Golden Fireflies */}
      {particleCount > 0 && !prefersReducedMotion && (
        <Sparkles
          count={particleCount}
          scale={[32, 16, 300]}
          position={[0, 6, -120]}
          size={3.2}
          speed={0.35}
          opacity={0.75}
          color="#DDBE82"
        />
      )}
    </group>
  );
};
