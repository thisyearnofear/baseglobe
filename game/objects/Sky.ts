import * as THREE from "three";
import { Colors } from "../utils/colors";

class Cloud extends THREE.Object3D {
  constructor() {
    super();

    const geom = new THREE.BoxGeometry(20, 20, 20);
    const mat = new THREE.MeshPhongMaterial({
      color: Colors.white,
    });

    const nBlocs = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < nBlocs; i++) {
      const m = new THREE.Mesh(geom, mat);
      m.position.x = i * 15;
      m.position.y = Math.random() * 10;
      m.position.z = Math.random() * 10;
      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;

      const s = 0.1 + Math.random() * 0.9;
      m.scale.set(s, s, s);

      m.castShadow = true;
      m.receiveShadow = true;

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
