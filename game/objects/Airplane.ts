import * as THREE from 'three';

export class Airplane {
  mesh: THREE.Object3D;

  constructor(mesh: THREE.Object3D) {
    this.mesh = mesh;
  }

  tick(deltaTime: number) {
    // Basic movement
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }
}