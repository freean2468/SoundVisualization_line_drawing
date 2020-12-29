// eslint-disable-next-line import/no-unresolved
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
import * as THREE from './node_modules/three/build/three.module.js';
import AxisGridHelper from './AxisGridHelper.js';
import CustomSinCurve from './CustomSinCurve.js';
import ColorGUIHelper from './ColorGUIHelper.js';

let spread = 15;
let scene;
const objects = [];
const gui = new GUI();

export function setScene(val) { scene = val; }
export function setSpread(val) { spread = val; }
export function getObjects() { return objects; }
export function getCanvas(id) { return document.querySelector(id); }

export function makeCamera(fov = 40, aspect = 2, zNear = 0.1, zFar = 100) {
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
}

export function addObject(x, y, obj) {
    const copy = obj;
    copy.position.x = x * spread;
    copy.position.y = y * spread;

    scene.add(copy);
    objects.push(copy);
}

export function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}

export function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial(THREE));
    addObject(x, y, mesh);
}

export function addLineGeometry(x, y, geometry) {
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const mesh = new THREE.LineSegments(geometry, material);
    addObject(x, y, mesh);
}

export function klein(v, u, target) {
    u *= 2 * Math.PI;
    v *= 2 * Math.PI;

    let x;
    let z;

    if (u < Math.PI) {
        // eslint-disable-next-line max-len
        x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
        z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
    } else {
        // eslint-disable-next-line max-len
        x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
        z = -8 * Math.sin(u);
    }

    const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

    target.set(x, y, z).multiplyScalar(0.75);
}

export function loadFont(url) {
    const loader = new THREE.FontLoader();
    return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
    });
}

export function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
}
