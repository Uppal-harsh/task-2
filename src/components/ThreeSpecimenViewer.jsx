import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Sparkles, Box } from 'lucide-react';

export default function ThreeSpecimenViewer({ specimen }) {
  const mountRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const wireframeRef = useRef(wireframe);
  const isRotatingRef = useRef(isRotating);

  useEffect(() => {
    wireframeRef.current = wireframe;
  }, [wireframe]);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dimensions
    const width = mount.clientWidth || 360;
    const height = 220;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 3, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 20);
    pointLight2.position.set(-5, -5, -3);
    scene.add(pointLight2);

    // Dynamic 3D Geometry based on specimen type
    const group = new THREE.Group();

    let mainMesh;
    const isSquid = specimen.id?.includes('squid');
    const isJelly = specimen.id?.includes('jelly');
    const isAngler = specimen.id?.includes('angler');
    const isTurtle = specimen.id?.includes('turtle');
    const isSub = specimen.id?.includes('sub');

    // Hologram Material
    const material = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: wireframeRef.current,
      metalness: 0.5,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
    });

    if (isJelly) {
      // Jelly bell + tentacles
      const bellGeo = new THREE.SphereGeometry(1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      mainMesh = new THREE.Mesh(bellGeo, material);
      group.add(mainMesh);

      // Trailing 3D rings
      for (let i = 0; i < 4; i++) {
        const ringGeo = new THREE.TorusGeometry(1.2 - i * 0.2, 0.04, 16, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xc084fc, wireframe: true });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI * 0.5;
        ring.position.y = -0.5 - i * 0.6;
        group.add(ring);
      }
    } else if (isSquid) {
      // Squid Torpedo body
      const coneGeo = new THREE.ConeGeometry(1.3, 4, 32);
      coneGeo.rotateZ(Math.PI * 0.5);
      mainMesh = new THREE.Mesh(coneGeo, material);
      group.add(mainMesh);

      // 3D Orbital Rings
      const ringGeo = new THREE.TorusGeometry(1.8, 0.03, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      group.add(ring);
    } else if (isAngler) {
      // Anglerfish Round body & Esca Lure
      const sphereGeo = new THREE.SphereGeometry(1.6, 24, 24);
      mainMesh = new THREE.Mesh(sphereGeo, material);
      group.add(mainMesh);

      // Esca glowing tip
      const escaGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const escaMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
      const esca = new THREE.Mesh(escaGeo, escaMat);
      esca.position.set(-1.8, 1.8, 0);
      group.add(esca);

      // Lure stalk
      const stalkGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 8);
      stalkGeo.rotateZ(Math.PI * 0.25);
      stalkGeo.translate(-0.8, 0.9, 0);
      const stalk = new THREE.Mesh(stalkGeo, material);
      group.add(stalk);
    } else if (isSub) {
      // Submersible
      const subBodyGeo = new THREE.SphereGeometry(1.6, 32, 32);
      subBodyGeo.scale(1.5, 1, 1);
      mainMesh = new THREE.Mesh(subBodyGeo, material);
      group.add(mainMesh);

      const ringGeo = new THREE.TorusGeometry(2.0, 0.04, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI * 0.5;
      group.add(ring);
    } else {
      // Default: Complex Bio-Torus Knot Hologram
      const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 100, 16);
      mainMesh = new THREE.Mesh(knotGeo, material);
      group.add(mainMesh);
    }

    // 3D Outer Bio-Ring Particle Field
    const orbitCount = 80;
    const orbitGeo = new THREE.BufferGeometry();
    const orbitPos = new Float32Array(orbitCount * 3);
    for (let i = 0; i < orbitCount; i++) {
      const angle = (i / orbitCount) * Math.PI * 2;
      const radius = 2.4 + (Math.random() - 0.5) * 0.4;
      orbitPos[i * 3] = Math.cos(angle) * radius;
      orbitPos[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      orbitPos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3));
    const orbitMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
    });
    const orbitParticles = new THREE.Points(orbitGeo, orbitMat);
    group.add(orbitParticles);

    scene.add(group);

    // Mouse drag rotation controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();

      if (isRotatingRef.current && !isDragging) {
        group.rotation.y += delta * 0.8;
        group.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
      }

      orbitParticles.rotation.y -= delta * 0.4;

      if (mainMesh) {
        mainMesh.material.wireframe = wireframeRef.current;
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [specimen]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-slate-950/80 border border-cyan-500/30">
      {/* Top 3D Telemetry Controls */}
      <div className="absolute top-2.5 left-3 right-3 z-10 flex items-center justify-between text-[11px] font-mono text-cyan-400">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/30 backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-cyan-300" />
          3D Specimen Hologram
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2 py-0.5 rounded border text-[10px] font-mono cursor-pointer transition-colors ${
              wireframe ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Toggle Wireframe"
          >
            <Box className="h-3 w-3 inline mr-1" />
            {wireframe ? 'Wireframe' : 'Solid'}
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2 py-0.5 rounded border text-[10px] font-mono cursor-pointer transition-colors ${
              isRotating ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className="h-3 w-3 inline mr-1" />
            {isRotating ? 'Auto Spin' : 'Hold'}
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-[220px] cursor-grab active:cursor-grabbing flex items-center justify-center" />

      {/* Helper text */}
      <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none text-[10px] font-mono text-cyan-300/60">
        ✦ Drag with mouse to orbit 3D model in real time
      </div>
    </div>
  );
}
