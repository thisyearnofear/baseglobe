import * as THREE from "three";
import { Airplane } from "./objects/Airplane";
import { createAirplaneMesh } from "./objects/createAirplaneMesh";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let airplane: Airplane;
let animationFrameId: number;

export function initGame(canvas: HTMLCanvasElement) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const [airplaneMesh] = createAirplaneMesh();
  airplane = new Airplane(airplaneMesh);
  scene.add(airplane.mesh);

  camera.position.z = 5;

  animate();

  window.addEventListener("resize", onWindowResize);
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);
  airplane.tick(0.016); // Assuming 60 FPS
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function cleanupGame() {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("resize", onWindowResize);

  // Dispose of Three.js objects
  scene.remove(airplane.mesh);
  airplane.mesh.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      if (child.material instanceof THREE.Material) {
        child.material.dispose();
      } else if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose());
      }
    }
  });

  renderer.dispose();
}
