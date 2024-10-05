import * as THREE from "three";
import { Colors } from "../utils/colors";

class Cloud extends THREE.Object3D {
  constructor() {
    super();
    const geometry = new THREE.SphereGeometry(15, 16, 16);
    const material = new THREE.MeshPhongMaterial({
      color: Colors.white,
      transparent: true,
      opacity: 0.8,
    });
    const nSpheres = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < nSpheres; i++) {
      const m = new THREE.Mesh(geometry, material);
      m.position.set(i * 15, Math.random() * 10, Math.random() * 10);
      m.scale.setScalar(0.8 + Math.random() * 0.3);
      this.add(m);
    }
  }
}

export class Sky extends THREE.Object3D {
  private nClouds: number;

  constructor() {
    super();
    this.nClouds = 20;
    this.createClouds();
  }

  private createClouds() {
    const stepAngle = (Math.PI * 2) / this.nClouds;

    for (let i = 0; i < this.nClouds; i++) {
      const c = new Cloud();

      const a = stepAngle * i;
      const h = 750 + Math.random() * 200;

      c.position.y = Math.sin(a) * h;
      c.position.x = Math.cos(a) * h;
      c.position.z = -400 - Math.random() * 400;

      c.rotation.z = a + Math.PI / 2;

      const s = 1 + Math.random() * 2;
      c.scale.set(s, s, s);

      this.add(c);
    }
  }

  // rotate the sky
  rotate(angle: number) {
    this.rotation.z += angle;
  }
}

export function createSky(): Sky {
  return new Sky();
}
