import * as THREE from "three";
import { Airplane, createAirplane } from "../objects/Airplane";
import { Sea, createSea } from "../objects/Sea";
import { Sky, createSky } from "../objects/Sky";
import { Colors } from "../utils/colors";

export class MainScene {
  private airplane!: Airplane;
  private sea!: Sea;
  private sky!: Sky;
  private camera: THREE.Camera;

  constructor(private scene: THREE.Scene, camera: THREE.Camera) {
    if (!camera) {
      throw new Error("Camera must be provided to MainScene");
    }
    this.camera = camera;
  }

  init() {
    // Add a fog effect to the scene
    this.scene.fog = new THREE.Fog(Colors.blue, 100, 950);

    // Create the sea
    this.sea = createSea();
    this.scene.add(this.sea);

    // Create the sky
    this.sky = createSky();
    this.scene.add(this.sky);

    // Create the airplane
    this.airplane = createAirplane();
    this.airplane.scale.set(0.25, 0.25, 0.25);
    this.airplane.position.y = 100;
    this.scene.add(this.airplane);

    // Add lights
    this.createLights();
  }

  update(mousePos: { x: number; y: number }) {
    // Update airplane
    this.airplane.updatePropeller();
    this.updatePlanePosition(mousePos);

    // Update sea
    this.sea.moveWaves();

    // Update sky
    if (this.sky) {
      this.sky.rotate(0.01);
    } else {
      console.error("Sky is not initialized");
    }
  }

  private updatePlanePosition(mousePos: { x: number; y: number }) {
    const targetX = normalize(mousePos.x, -1, 1, -100, 100);
    const targetY = normalize(mousePos.y, -1, 1, 25, 175);

    // Move the plane at each frame by adding a fraction of the remaining distance
    this.airplane.position.x += (targetX - this.airplane.position.x) * 0.1;
    this.airplane.position.y += (targetY - this.airplane.position.y) * 0.1;

    // Rotate the plane proportionally to the remaining distance
    this.airplane.rotation.z = (targetY - this.airplane.position.y) * 0.0128;
    this.airplane.rotation.x = (this.airplane.position.y - targetY) * 0.0064;
  }

  private createLights() {
    const hemisphereLight = new THREE.HemisphereLight(
      Colors.white,
      Colors.brownDark,
      0.9
    );
    this.scene.add(hemisphereLight);

    const shadowLight = new THREE.DirectionalLight(Colors.white, 0.9);
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;
    this.scene.add(shadowLight);

    // Adjust shadow properties
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;
  }
}

// Helper function to normalize a value from one range to another
function normalize(
  v: number,
  vmin: number,
  vmax: number,
  tmin: number,
  tmax: number
): number {
  const nv = Math.max(Math.min(v, vmax), vmin);
  const dv = vmax - vmin;
  const pc = (nv - vmin) / dv;
  const dt = tmax - tmin;
  return tmin + pc * dt;
}
