import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SelectedFocusItem } from './types';

interface CameraRigProps {
  scrollProgressRef: React.MutableRefObject<number>;
  selectedItem: SelectedFocusItem;
  prefersReducedMotion: boolean;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  scrollProgressRef,
  selectedItem,
  prefersReducedMotion,
}) => {
  const { camera, pointer, size } = useThree();

  const positionCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 3.2, 36.5), // 01 Intro: Before Gunungan
          new THREE.Vector3(0.4, 3.4, 24.5), // 01->02 Passing through Gunungan
          new THREE.Vector3(2.8, 4.7, 11.5), // 02 Solo Entrance / Gapura Gladag
          new THREE.Vector3(-2.6, 4.8, -14.0), // 02 Solo Landmarks Corridor
          new THREE.Vector3(0.0, 5.0, -47.0), // 03 Discover IOMU Main Pavilion
          new THREE.Vector3(0.0, 6.2, -88.0), // 04 Workshop & Conference Zone
          new THREE.Vector3(0.0, 3.5, -131.0), // 05 Speakers Exhibition Gallery
          new THREE.Vector3(0.0, 5.2, -168.0), // 06 Conference Agenda Bridge
          new THREE.Vector3(2.0, 5.0, -199.0), // 07 Experience Surakarta Landmarks
          new THREE.Vector3(1.5, 5.4, -225.0), // 08 Accommodation: Hotel Alila Solo
          new THREE.Vector3(0.0, 3.8, -250.0), // 09 Registration Gateway
        ],
        false,
        'catmullrom',
        0.5
      ),
    []
  );

  const lookAtCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 2.8, 22),
          new THREE.Vector3(0, 2.4, 6),
          new THREE.Vector3(0, 2.2, -12),
          new THREE.Vector3(0.5, 2.4, -36),
          new THREE.Vector3(0, 2.6, -68),
          new THREE.Vector3(0, 2.0, -110),
          new THREE.Vector3(0, 2.3, -152),
          new THREE.Vector3(0, 2.2, -186),
          new THREE.Vector3(0, 2.8, -218),
          new THREE.Vector3(-4.5, 3.8, -236),
          new THREE.Vector3(0, 3.1, -268),
        ],
        false,
        'catmullrom',
        0.5
      ),
    []
  );

  const currentPos = useRef(new THREE.Vector3(0, 3.2, 36.5));
  const currentTarget = useRef(new THREE.Vector3(0, 2.8, 22));
  const splinePos = useRef(new THREE.Vector3());
  const splineTarget = useRef(new THREE.Vector3());
  const focusPosVec = useRef(new THREE.Vector3());
  const focusLookVec = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    const lerpAlpha = prefersReducedMotion ? 0.35 : 1 - Math.exp(-4.5 * safeDelta);

    if (camera instanceof THREE.PerspectiveCamera) {
      const aspect = size.width / Math.max(1, size.height);
      const targetFov = aspect < 0.75 ? 66 : aspect < 1.2 ? 56 : 46;
      if (Math.abs(camera.fov - targetFov) > 0.1) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
    }

    const t = THREE.MathUtils.clamp(scrollProgressRef.current, 0, 1);
    positionCurve.getPointAt(t, splinePos.current);
    lookAtCurve.getPointAt(t, splineTarget.current);

    if (size.width < 768 && !selectedItem) {
      splinePos.current.z += 3.2;
    }

    // Subtle interactive pointer parallax when not locked onto a hotspot
    if (!prefersReducedMotion && !selectedItem) {
      splinePos.current.x += pointer.x * 0.65;
      splinePos.current.y += pointer.y * 0.35;
    }

    const hasFocusVectors =
      selectedItem &&
      'cameraFocusPos' in selectedItem.data &&
      selectedItem.data.cameraFocusPos &&
      selectedItem.data.cameraLookAt;

    if (hasFocusVectors && selectedItem.data.cameraFocusPos && selectedItem.data.cameraLookAt) {
      focusPosVec.current.set(...selectedItem.data.cameraFocusPos);
      focusLookVec.current.set(...selectedItem.data.cameraLookAt);
      currentPos.current.lerp(focusPosVec.current, lerpAlpha);
      currentTarget.current.lerp(focusLookVec.current, lerpAlpha);
    } else {
      currentPos.current.lerp(splinePos.current, lerpAlpha);
      currentTarget.current.lerp(splineTarget.current, lerpAlpha);
    }

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
};
