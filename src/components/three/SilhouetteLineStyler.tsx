import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Applies an architectural 3D silhouette line aesthetic across all non-textured
 * building & monument meshes in the R3F scene: deep Keraton occlusion volumes
 * paired with crisp Kawung Gold & Light Gold EdgesGeometry contour lines.
 */
export const SilhouetteLineStyler: React.FC = () => {
  const { scene } = useThree();

  useEffect(() => {
    const silhouetteOcclusionMat = new THREE.MeshBasicMaterial({
      color: '#0B1E1A',
      transparent: true,
      opacity: 0.92,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    const primaryLineMat = new THREE.LineBasicMaterial({
      color: '#DDBE82',
      transparent: true,
      opacity: 0.94,
    });

    const secondaryLineMat = new THREE.LineBasicMaterial({
      color: '#C69C54',
      transparent: true,
      opacity: 0.42,
    });

    const addedLines: { parent: THREE.Object3D; child: THREE.Object3D; geo: THREE.BufferGeometry }[] = [];

    scene.traverse((obj) => {
      if (
        obj instanceof THREE.Mesh &&
        !(obj instanceof THREE.InstancedMesh) &&
        !obj.userData.skipSilhouette &&
        !obj.userData.isSilhouetteLine
      ) {
        const mat = obj.material as THREE.MeshBasicMaterial | THREE.MeshStandardMaterial;
        const hasTextureMap = Boolean(mat && 'map' in mat && mat.map);
        if (hasTextureMap) return;

        obj.material = silhouetteOcclusionMat;
        obj.castShadow = false;
        obj.receiveShadow = false;

        const edgesGeo = new THREE.EdgesGeometry(obj.geometry, 12);
        const lineSeg = new THREE.LineSegments(edgesGeo, primaryLineMat);
        lineSeg.userData.isSilhouetteLine = true;
        obj.add(lineSeg);

        const glowSeg = new THREE.LineSegments(edgesGeo, secondaryLineMat);
        glowSeg.scale.setScalar(1.003);
        glowSeg.userData.isSilhouetteLine = true;
        obj.add(glowSeg);

        addedLines.push({ parent: obj, child: lineSeg, geo: edgesGeo });
        addedLines.push({ parent: obj, child: glowSeg, geo: edgesGeo });
      }
    });

    return () => {
      addedLines.forEach(({ parent, child, geo }) => {
        parent.remove(child);
        geo.dispose();
      });
      silhouetteOcclusionMat.dispose();
      primaryLineMat.dispose();
      secondaryLineMat.dispose();
    };
  }, [scene]);

  return null;
};
