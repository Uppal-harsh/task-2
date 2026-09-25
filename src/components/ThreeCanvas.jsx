import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeCanvas: Fullscreen 3D Ambient Parallax Ocean Column
 * Features:
 * - 3D Camera depth navigation synchronized with scrollY
 * - Procedural 3D Submersible ("Nautilus-3D") with 3D spotlight beams and thruster particles
 * - 3D Multi-colored particle fields (Solar caustics, marine snow, bioluminescent plankton, hydrothermal embers)
 * - Mouse parallax tilt reaction in real 3D space
 */
export default function ThreeCanvas({ scrollProgress, currentDepth, is3DSubVisible = true }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const subGroupRef = useRef(null);
  const searchLightConeRef = useRef(null);
  const pointLightRef = useRef(null);
  const ambientLightRef = useRef(null);
  const is3DSubVisibleRef = useRef(is3DSubVisible);
  const targetScrollYRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    is3DSubVisibleRef.current = is3DSubVisible;
    if (subGroupRef.current) {
      subGroupRef.current.visible = is3DSubVisible;
    }
  }, [is3DSubVisible]);

  useEffect(() => {
    targetScrollYRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0284c7, 0.012);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 24);
    cameraRef.current = camera;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 1.2);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const pointLight = new THREE.PointLight(0x06b6d4, 3, 60);
    pointLight.position.set(6, 8, 16);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // --- 3D Multi-Zone Particle Cloud (4,000 Depth Particles) ---
    const particleCount = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const cSun = new THREE.Color(0x38bdf8);    // Sunlight Cyan
    const cTwi = new THREE.Color(0x818cf8);    // Twilight Indigo
    const cMid = new THREE.Color(0x06b6d4);    // Midnight Bioluminescent
    const cAby = new THREE.Color(0xc084fc);    // Abyssal Violet
    const cHad = new THREE.Color(0xf59e0b);    // Hadal Magma Amber

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 70;
      const y = (Math.random() - 0.5) * 180;
      const z = (Math.random() - 0.5) * 55;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color mapping by depth zone height
      let pColor = cSun;
      if (y > 40) {
        pColor = cSun;
      } else if (y > 10) {
        pColor = cTwi;
      } else if (y > -25) {
        pColor = cMid;
      } else if (y > -60) {
        pColor = cAby;
      } else {
        pColor = cHad;
      }

      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;

      scales[i] = Math.random() * 2.2 + 0.6;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Glow Canvas Texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(56,189,248,0.9)');
    grad.addColorStop(0.7, 'rgba(6,182,212,0.3)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // --- Procedural 3D Submersible ("Nautilus-3D") ---
    const subGroup = new THREE.Group();

    // Hull (Titanium Ellipsoid)
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.88,
      roughness: 0.2,
      emissive: 0x0369a1,
      emissiveIntensity: 0.2,
    });

    const bodyGeo = new THREE.SphereGeometry(2.3, 32, 32);
    bodyGeo.scale(1.4, 0.95, 0.95);
    const body = new THREE.Mesh(bodyGeo, hullMat);
    subGroup.add(body);

    // Front Observation Glass Dome
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.92,
      thickness: 1.5,
      transparent: true,
      opacity: 0.8,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
    });
    const domeGeo = new THREE.SphereGeometry(1.3, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const dome = new THREE.Mesh(domeGeo, glassMat);
    dome.rotation.z = -Math.PI * 0.5;
    dome.position.set(2.3, 0, 0);
    subGroup.add(dome);

    // Internal Glowing Core
    const coreGeo = new THREE.IcosahedronGeometry(0.55, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(1.6, 0, 0);
    subGroup.add(core);

    // Volumetric 3D Searchlight Cone
    const coneGeo = new THREE.ConeGeometry(4.2, 16, 32, 1, true);
    coneGeo.rotateZ(-Math.PI * 0.5);
    coneGeo.translate(8, 0, 0);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lightCone = new THREE.Mesh(coneGeo, coneMat);
    lightCone.position.set(2.0, 0, 0);
    subGroup.add(lightCone);
    searchLightConeRef.current = lightCone;

    // Thrusters
    const thrusterGeo = new THREE.CylinderGeometry(0.55, 0.65, 1.3, 16);
    thrusterGeo.rotateZ(Math.PI * 0.5);
    const thrusterMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 });
    
    const thrusterL = new THREE.Mesh(thrusterGeo, thrusterMat);
    thrusterL.position.set(-2.8, 0, 1.3);
    subGroup.add(thrusterL);

    const thrusterR = new THREE.Mesh(thrusterGeo, thrusterMat);
    thrusterR.position.set(-2.8, 0, -1.3);
    subGroup.add(thrusterR);

    // Initial Sub Placement
    subGroup.position.set(8.5, -2, 4);
    subGroup.scale.set(0.95, 0.95, 0.95);
    subGroup.rotation.y = -0.4;
    subGroup.visible = is3DSubVisibleRef.current;
    scene.add(subGroup);
    subGroupRef.current = subGroup;

    // --- Mouse Move Listener for 3D Parallax Tilt ---
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Resize Listener ---
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Main 3D Animation Loop ---
    let animationFrameId;
    let startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const p = targetScrollYRef.current; // 0 to 1

      // 3D Camera Follows Depth (-90 units down)
      const targetCamY = -p * 90;
      camera.position.y += (targetCamY - camera.position.y) * 0.09;
      camera.position.x = mouseRef.current.x * 3.5;
      camera.position.z = 24 + mouseRef.current.y * 2.5;
      camera.lookAt(mouseRef.current.x * 2, camera.position.y, 0);

      // Submersible Accompanying Depth Navigation
      if (subGroupRef.current) {
        const subTargetY = camera.position.y - 1.2 + Math.sin(elapsedTime * 1.6) * 0.5;
        subGroupRef.current.position.y = subTargetY;
        
        // Gentle swimming / diving rotation reacting to mouse and depth
        subGroupRef.current.rotation.x = Math.sin(elapsedTime * 1.2) * 0.06 + mouseRef.current.y * 0.2;
        subGroupRef.current.rotation.y = -0.4 + mouseRef.current.x * 0.35;
        subGroupRef.current.rotation.z = Math.cos(elapsedTime * 1.0) * 0.05 - mouseRef.current.x * 0.15;

        // Internal core spin
        core.rotation.x = elapsedTime * 2.2;
        core.rotation.y = elapsedTime * 1.8;

        // Sweeping Searchlight animation in dark zones
        if (searchLightConeRef.current) {
          if (p > 0.3) {
            searchLightConeRef.current.rotation.y = Math.sin(elapsedTime * 1.5) * 0.2;
            searchLightConeRef.current.rotation.z = Math.cos(elapsedTime * 1.2) * 0.15;
          }
        }
      }

      // Dynamic 3D Fog, Light & Particle color transitions based on zone progress
      if (scene.fog && ambientLightRef.current && pointLightRef.current) {
        if (p < 0.2) {
          // Level 1: Sunlight
          scene.fog.color.setHex(0x0284c7);
          ambientLightRef.current.color.setHex(0x38bdf8);
          ambientLightRef.current.intensity = 1.0;
          pointLightRef.current.color.setHex(0x06b6d4);
          if (searchLightConeRef.current) searchLightConeRef.current.material.opacity = 0.08;
        } else if (p < 0.4) {
          // Level 2: Twilight
          scene.fog.color.setHex(0x1e1b4b);
          ambientLightRef.current.color.setHex(0x818cf8);
          ambientLightRef.current.intensity = 0.7;
          pointLightRef.current.color.setHex(0xa855f7);
          if (searchLightConeRef.current) searchLightConeRef.current.material.opacity = 0.15;
        } else if (p < 0.65) {
          // Level 3: Midnight
          scene.fog.color.setHex(0x020617);
          ambientLightRef.current.color.setHex(0x06b6d4);
          ambientLightRef.current.intensity = 0.45;
          pointLightRef.current.color.setHex(0x22d3ee);
          if (searchLightConeRef.current) searchLightConeRef.current.material.opacity = 0.22;
        } else if (p < 0.85) {
          // Level 4: Abyssal
          scene.fog.color.setHex(0x090514);
          ambientLightRef.current.color.setHex(0xc084fc);
          ambientLightRef.current.intensity = 0.38;
          pointLightRef.current.color.setHex(0xe879f9);
          if (searchLightConeRef.current) searchLightConeRef.current.material.opacity = 0.2;
        } else {
          // Level 5: Hadal
          scene.fog.color.setHex(0x05030a);
          ambientLightRef.current.color.setHex(0xf59e0b);
          ambientLightRef.current.intensity = 0.35;
          pointLightRef.current.color.setHex(0xfbbf24);
          if (searchLightConeRef.current) searchLightConeRef.current.material.opacity = 0.18;
        }
      }

      // Rotate particle cloud & drift vertically
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.025;
        // Dynamic speed based on depth
        particlesRef.current.position.y = Math.sin(elapsedTime * 0.5) * 1.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      particleMat.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
