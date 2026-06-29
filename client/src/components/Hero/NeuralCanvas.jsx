import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_CATEGORIES = [
  { count: 70, color: '#00F5FF' },  // AI/ML
  { count: 60, color: '#7B2FFF' },  // Cloud
  { count: 50, color: '#FF2D78' },  // Web
  { count: 40, color: '#00FF88' },  // Research
];

function createNodes() {
  const nodes = [];
  NODE_CATEGORIES.forEach(({ count, color }) => {
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 6 + Math.random() * 6;
      nodes.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        color,
        speed: 0.3 + Math.random() * 0.7,
        offset: Math.random() * Math.PI * 2,
        offsetX: Math.random() * Math.PI * 2,
      });
    }
  });
  return nodes;
}

const initialNodes = createNodes();

function Nodes() {
  const meshRef = useRef([]);
  const linesRef = useRef(null);
  const nodesRef = useRef(initialNodes.map(n => ({ ...n })));

  const lineGeom = useMemo(() => {
    const positions = [];
    const colors = [];
    for (let i = 0; i < nodesRef.current.length; i++) {
      for (let j = i + 1; j < nodesRef.current.length; j++) {
        const a = nodesRef.current[i];
        const b = nodesRef.current[j];
        const dist = Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2+(a.z-b.z)**2);
        if (dist < 3.5) {
          positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
          const ca = new THREE.Color(a.color);
          const cb = new THREE.Color(b.color);
          colors.push(ca.r, ca.g, ca.b, cb.r, cb.g, cb.b);
        }
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geom;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    nodesRef.current.forEach((node, i) => {
      node.y += Math.sin(t * node.speed + node.offset) * 0.003;
      node.x += Math.cos(t * node.speed * 0.7 + node.offsetX) * 0.002;

      const mesh = meshRef.current[i];
      if (mesh) {
        mesh.position.set(node.x, node.y, node.z);
      }
    });
  });

  return (
    <>
      {nodesRef.current.map((node, i) => (
        <mesh key={i} ref={el => meshRef.current[i] = el} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      ))}
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial vertexColors opacity={0.18} transparent />
      </lineSegments>
    </>
  );
}

function CameraController() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const idleTimer = useRef(null);
  const isIdle = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 1.5;
      isIdle.current = false;
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => { isIdle.current = true; }, 3000);
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      clearTimeout(idleTimer.current);
    };
  }, []);

  useFrame(({ clock }) => {
    camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouseRef.current.y * 1.5 - camera.position.y) * 0.05;
    if (isIdle.current) {
      const t = clock.getElapsedTime();
      camera.position.x = Math.sin(t * 0.1) * 2;
      camera.position.z = 18 + Math.cos(t * 0.08) * 1;
    }
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default React.memo(function NeuralCanvas() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1
    }}>
      <Canvas
        camera={{ position: [0, 0, 18], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <ambientLight color="#7B2FFF" intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#00F5FF" intensity={2} />
        <pointLight position={[-5, -5, 5]} color="#FF2D78" intensity={1.5} />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
        <CameraController />
        <Nodes />
      </Canvas>
    </div>
  );
});
