import * as THREE from 'three';
import { Colors } from '../../src/utils/Colors'

export function createAirplaneMesh(): [THREE.Object3D, THREE.Object3D, any] {
  const airplane = new THREE.Object3D();
  const geomCockpit = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
  const matCockpit = new THREE.MeshPhongMaterial({
    color: 0x555555,
    flatShading: true, // Correct property
  });
  const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
  airplane.add(cockpit);

  return [airplane, new THREE.Object3D(), {}]; // Placeholder for propeller and pilot
}