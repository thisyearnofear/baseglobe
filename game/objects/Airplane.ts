import * as THREE from "three";
import { Colors } from "../utils/colors";

export class Airplane extends THREE.Object3D {
  propeller: THREE.Mesh;

  constructor() {
    super();
    this.propeller = new THREE.Mesh();
    this.createAirplane();
  }

  private createAirplane() {
    // Create the cabin
    const geomCockpit = new THREE.BoxGeometry(60, 50, 50);
    const matCockpit = new THREE.MeshPhongMaterial({ color: Colors.red });
    const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.add(cockpit);

    // Create the engine
    const geomEngine = new THREE.BoxGeometry(20, 50, 50);
    const matEngine = new THREE.MeshPhongMaterial({ color: Colors.white });
    const engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.add(engine);

    // Create the tail
    const geomTailPlane = new THREE.BoxGeometry(15, 20, 5);
    const matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.red });
    const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.add(tailPlane);

    // Create the wing
    const geomSideWing = new THREE.BoxGeometry(40, 8, 150);
    const matSideWing = new THREE.MeshPhongMaterial({ color: Colors.red });
    const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.add(sideWing);

    // Propeller
    const geomPropeller = new THREE.BoxGeometry(20, 10, 10);
    const matPropeller = new THREE.MeshPhongMaterial({ color: Colors.brown });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // Blades
    const geomBlade = new THREE.BoxGeometry(1, 100, 20);
    const matBlade = new THREE.MeshPhongMaterial({ color: Colors.brownDark });

    const blade1 = new THREE.Mesh(geomBlade, matBlade);
    blade1.position.set(8, 0, 0);
    blade1.castShadow = true;
    blade1.receiveShadow = true;

    const blade2 = blade1.clone();
    blade2.rotation.x = Math.PI / 2;

    this.propeller.add(blade1);
    this.propeller.add(blade2);
    this.propeller.position.set(50, 0, 0);
    this.add(this.propeller);
  }

  updatePropeller() {
    if (this.propeller) {
      this.propeller.rotation.x += 0.3;
    }
  }
}

export function createAirplane(): Airplane {
  return new Airplane();
}
