import { Edges } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { MathUtils, type Group } from "three";

import type { DeviceTier } from "../../hooks/useDeviceTier";

type ExplodedRoomCanvasProps = {
  active: boolean;
  onError: () => void;
  onReady: () => void;
  scrollProgress: MotionValue<number>;
  tier: Exclude<DeviceTier, "low">;
};

type ExplodedRoomProps = Pick<
  ExplodedRoomCanvasProps,
  "active" | "scrollProgress" | "tier"
>;

type PartProps = {
  args: [number, number, number];
  color: string;
  position: [number, number, number];
};

function Part({ args, color, position }: PartProps) {
  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} metalness={0.06} roughness={0.76} />
      <Edges color="#c4c5bf" opacity={0.28} transparent />
    </mesh>
  );
}

function ExplodedRoom({ active, scrollProgress, tier }: ExplodedRoomProps) {
  const roomRef = useRef<Group>(null);
  const ceilingRef = useRef<Group>(null);
  const lightingRef = useRef<Group>(null);
  const wallsRef = useRef<Group>(null);
  const furnitureRef = useRef<Group>(null);
  const floorRef = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(
    () => scrollProgress.on("change", () => invalidate()),
    [invalidate, scrollProgress],
  );

  useFrame(({ camera }) => {
    if (!active || !roomRef.current) {
      return;
    }

    const progress = MathUtils.smoothstep(scrollProgress.get(), 0.08, 0.9);
    const separation = 1 - progress;

    roomRef.current.rotation.y = MathUtils.lerp(-0.22, 0.1, progress);
    roomRef.current.position.y = MathUtils.lerp(-0.15, 0.05, progress);

    if (ceilingRef.current) {
      ceilingRef.current.position.y = separation * 3.25;
    }

    if (lightingRef.current) {
      lightingRef.current.position.y = separation * 2.2;
      lightingRef.current.position.z = separation * 0.8;
    }

    if (wallsRef.current) {
      wallsRef.current.position.z = separation * -2.4;
    }

    if (furnitureRef.current) {
      furnitureRef.current.position.x = separation * 2.4;
      furnitureRef.current.position.z = separation * 1.5;
    }

    if (floorRef.current) {
      floorRef.current.position.y = separation * -1.6;
    }

    camera.position.x = MathUtils.lerp(7.8, 6.15, progress);
    camera.position.y = MathUtils.lerp(5.8, 4.15, progress);
    camera.position.z = MathUtils.lerp(8.8, 7.25, progress);
    camera.lookAt(0, -0.1, 0);
  });

  return (
    <group ref={roomRef}>
      <group ref={floorRef}>
        <Part args={[5.8, 0.16, 4.6]} color="#252623" position={[0, -1, 0]} />
        <gridHelper
          args={[5.8, 12, "#595b56", "#30312d"]}
          position={[0, -0.9, 0]}
        />
      </group>

      <group ref={wallsRef}>
        <Part
          args={[5.8, 3.2, 0.16]}
          color="#30312d"
          position={[0, 0.52, -2.22]}
        />
        <Part
          args={[0.16, 3.2, 4.6]}
          color="#191a18"
          position={[-2.82, 0.52, 0]}
        />
        <Part
          args={[1.7, 2.25, 0.12]}
          color="#b95d39"
          position={[-1.65, 0.3, -2.08]}
        />
      </group>

      <group ref={furnitureRef}>
        <Part
          args={[2.55, 0.72, 0.95]}
          color="#858780"
          position={[0.45, -0.55, 0.55]}
        />
        <Part
          args={[1.15, 0.48, 1.15]}
          color="#f5f3ec"
          position={[1.5, -0.66, -0.95]}
        />
        <Part
          args={[0.62, 1.38, 0.62]}
          color="#595b56"
          position={[-1.85, -0.22, -1.45]}
        />
      </group>

      <group ref={lightingRef}>
        <Part
          args={[2.35, 0.08, 0.14]}
          color="#e8a182"
          position={[0.2, 1.75, -0.65]}
        />
        <pointLight color="#e8a182" intensity={7} position={[0.2, 1.3, -0.5]} />
      </group>

      <group ref={ceilingRef}>
        <Part args={[5.8, 0.12, 4.6]} color="#191a18" position={[0, 2.15, 0]} />
      </group>

      <hemisphereLight intensity={tier === "high" ? 1.2 : 0.95} />
      <directionalLight
        castShadow={tier === "high"}
        intensity={2.2}
        position={[4, 7, 5]}
        shadow-mapSize-height={tier === "high" ? 1024 : 512}
        shadow-mapSize-width={tier === "high" ? 1024 : 512}
      />
    </group>
  );
}

export default function ExplodedRoomCanvas({
  active,
  onError,
  onReady,
  scrollProgress,
  tier,
}: ExplodedRoomCanvasProps) {
  return (
    <div className="exploded-scene__canvas" aria-hidden="true">
      <Canvas
        camera={{ fov: 38, position: [7.8, 5.8, 8.8] }}
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
        <ExplodedRoom
          active={active}
          scrollProgress={scrollProgress}
          tier={tier}
        />
      </Canvas>
    </div>
  );
}
