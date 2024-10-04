import * as THREE from "three";
import { MainScene } from "./scenes/MainScene";

export class GameEngine {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private mainScene: MainScene;
  private mousePos: { x: number; y: number };

  constructor(private canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.mainScene = new MainScene(this.scene, this.camera);
    this.mousePos = { x: 0, y: 0 };
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.camera.position.set(0, 100, 200);
    this.camera.lookAt(0, 0, 0);

    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    this.mainScene.init();

    window.addEventListener("resize", this.handleResize);
    document.addEventListener("mousemove", this.handleMouseMove);
  }

  update(mousePos: { x: number; y: number }) {
    this.mousePos = mousePos;
    this.mainScene.update(this.mousePos);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  cleanup() {
    window.removeEventListener("resize", this.handleResize);
    document.removeEventListener("mousemove", this.handleMouseMove);
    // Add any other cleanup logic here
  }

  private handleMouseMove = (event: MouseEvent) => {
    const tx = -1 + (event.clientX / this.renderer.domElement.clientWidth) * 2;
    const ty = 1 - (event.clientY / this.renderer.domElement.clientHeight) * 2;
    this.mousePos = { x: tx, y: ty };
  };

  private handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
