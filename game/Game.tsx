import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { MainScene } from "./scenes/MainScene";
import { Colors, fogColor } from "./utils/colors";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(fogColor, 50, 500); // Brings the fog closer and makes it denser

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.set(0, 100, 200); // Adjusted camera position
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    // Orbit controls (for pausing)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enabled = isPaused;

    const raycaster = new THREE.Raycaster(); // Raycaster to track mouse in 3D
    const mouse = new THREE.Vector2(); // To store normalized mouse coordinates

    // Main scene setup
    const mainScene = new MainScene(scene, camera);
    mainScene.init();

    // Event listeners
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const tx = -1 + (event.clientX / window.innerWidth) * 2;
      const ty = 1 - (event.clientY / window.innerHeight) * 2;
      mousePosRef.current = { x: tx, y: ty };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isPaused) {
        camera.fov = isPaused ? 40 : 85; // Increase the fov to zoom out when not paused
        camera.updateProjectionMatrix();
        mainScene.update(mousePosRef.current);
      }
      if (controls.enabled) {
        controls.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
    };
  }, [isPaused]);

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
    if (controlsRef.current) {
      controlsRef.current.enabled = !isPaused;
    }
  };

  return (
    <div className="game-wrapper">
      <canvas ref={canvasRef} className="game-canvas" />
      <div className="game-ui">
        <button className="pause-button" onClick={handlePauseToggle}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        {!isPaused && (
          <div className="game-instructions">
            <p>Move your mouse to control the airplane</p>
          </div>
        )}
        {isPaused && (
          <div className="pause-instructions">
            <p>Use mouse to explore the 3D scene</p>
            <p>Click and drag to rotate</p>
            <p>Scroll to zoom</p>
          </div>
        )}
      </div>
    </div>
  );
}
