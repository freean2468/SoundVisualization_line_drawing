import * as THREE from './node_modules/three/build/three.module.js';

export default class CustomSinCurve extends THREE.Curve {
    constructor(scale) {
        super();
        this.scale = scale;
    }

    getPoint(t) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin(2 * Math.PI * t);
        const tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    }
}
