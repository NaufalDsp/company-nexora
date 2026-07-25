import { Edges } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { MathUtils, type Group } from "three";

import type { DeviceTier } from "../../hooks/useDeviceTier";

type HeroRoomCanvasProps = {
  active: boolean;
  onError: () => void;
  onReady: () => void;
  scrollProgress: MotionValue<number>;
  tier: Exclude<DeviceTier, "low">;
};

type ModularRoomProps = {
  active: boolean;
  scrollProgress: MotionValue<number>;
  tier: Exclude<DeviceTier, "low">;
};

function RoomPart({
  args,
  color,
  position,
}: {
  args: [number, number, number];
  color: string;
  position: [number, number, number];
}) {
  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.72} metalness={0.08} />
      <Edges color="#858780" opacity={0.38} transparent />
    </mesh>
  );
}

function ModularRoom({ active, scrollProgress, tier }: ModularRoomProps) {
  const roomRef = useRef<Group>(null);
  const backWallRef = useRef<Group>(null);
  const sideWallRef = useRef<Group>(null);
  const accentRef = useRef<Group>(null);
  const furnitureRef = useRef<Group>(null);
  const objectRef = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(
    () => scrollProgress.on("change", () => invalidate()),
    [invalidate, scrollProgress],
  );

  useFrame(({ camera }) => {
    if (!active || !roomRef.current) {
      return;
    }

    const progress = MathUtils.smoothstep(scrollProgress.get(), 0.04, 0.92);
    const separation = 1 - progress;

    roomRef.current.position.y = MathUtils.lerp(-0.28, 0.16, progress);
    roomRef.current.rotation.y = MathUtils.lerp(-0.22, 0.08, progress);
    roomRef.current.rotation.x = MathUtils.lerp(-0.08, 0.015, progress);

    if (backWallRef.current) {
      backWallRef.current.position.y = separation * 1.15;
    }

    if (sideWallRef.current) {
      sideWallRef.current.position.x = separation * -1.1;
    }

    if (accentRef.current) {
      accentRef.current.position.y = separation * 0.85;
    }

    if (furnitureRef.current) {
      furnitureRef.current.position.z = separation * 1.35;
    }

    if (objectRef.current) {
      objectRef.current.position.x = separation * 0.9;
    }

    camera.position.x = MathUtils.lerp(6.3, 5.2, progress);
    camera.position.y = MathUtils.lerp(4.5, 3.65, progress);
    camera.position.z = MathUtils.lerp(7.8, 6.65, progress);
    camera.lookAt(0, -0.05, 0);
  });

  return (
    <group ref={roomRef}>
      <gridHelper
        args={[8, 16, "#595b56", "#252623"]}
        position={[0, -1.08, 0]}
      />
      <RoomPart args={[5.2, 0.16, 4.1]} color="#252623" position={[0, -1, 0]} />
      <group ref={backWallRef}>
        <RoomPart
          args={[5.2, 2.7, 0.16]}
          color="#30312d"
          position={[0, 0.28, -1.98]}
        />
      </group>
      <group ref={sideWallRef}>
        <RoomPart
          args={[0.16, 2.7, 4.1]}
          color="#191a18"
          position={[-2.52, 0.28, 0]}
        />
      </group>
      <group ref={accentRef}>
        <RoomPart
          args={[0.12, 1.9, 0.78]}
          color="#b95d39"
          position={[-2.36, 0.32, -0.65]}
        />
      </group>
      <group ref={furnitureRef}>
        <RoomPart
          args={[2.15, 0.68, 0.88]}
          color="#858780"
          position={[0.45, -0.6, 0.2]}
        />
      </group>
      <group ref={objectRef}>
        <RoomPart
          args={[0.72, 1.25, 0.72]}
          color="#f5f3ec"
          position={[1.55, -0.3, -1.48]}
        />
      </group>

      <hemisphereLight intensity={tier === "high" ? 1.4 : 1.1} />
      <directionalLight
        castShadow={tier === "high"}
        intensity={2.1}
        position={[4, 6, 4]}
        shadow-mapSize-height={tier === "high" ? 1024 : 512}
        shadow-mapSize-width={tier === "high" ? 1024 : 512}
      />
      <pointLight color="#e8a182" intensity={8} position={[-1.8, 1, 0]} />
    </group>
  );
}

export default function HeroRoomCanvas({
  active,
  onError,
  onReady,
  scrollProgress,
  tier,
}: HeroRoomCanvasProps) {
  return (
    <div className="hero-scene__canvas" aria-hidden="true">
      <Canvas
        camera={{ fov: 38, position: [6.3, 4.5, 7.8] }}
        dpr={tier === "high" ? [1, 1.5] : [1, 1.25]}
        frameloop={active ? "demand" : "never"}
        gl={{
          antialias: tier === "high",
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#111210", 0);
          gl.domElement.addEventListener("webglcontextlost", onError, {
            once: true,
          });
          onReady();
        }}
        shadows={tier === "high"}
      >
        <ModularRoom
          active={active}
          scrollProgress={scrollProgress}
          tier={tier}
        />
      </Canvas>
    </div>
  );
}
