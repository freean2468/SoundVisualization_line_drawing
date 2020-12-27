// eslint-disable-next-line import/extensions
import * as THREE from './node_modules/three/build/three.module.js';
// eslint-disable-next-line import/extensions
import * as HELPER from './helper.js';

export default function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 40;   // field of view
    const aspect = 2; // the canvas defualt
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(_geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(_geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ];

    const spread = 15;
    const objects = [];

    const width = 8;
    const height = 8;
    const depth = 8;

    HELPER.addSolidGeometry(THREE, scene, objects, spread, -2, -2, new THREE.BoxBufferGeometry(width, height, depth));

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    function render(time) {
        const seconds = time * 0.001;  // convert time to seconds

        function resizeRendererToDisplaySize(_renderer) {
            const canvasElm2 = _renderer.domElement;
            const pixelRatio = window.devicePixelRatio;
            const newWidth = (canvas.clientWidth * pixelRatio) | 0;
            const newHeight = (canvas.clientHeight * pixelRatio) | 0;
            const needResize = canvasElm2.width !== newWidth || canvasElm2.height !== newHeight;
            if (needResize) {
                renderer.setSize(newWidth, newHeight, false);
            }
            return needResize;
        }

        if (resizeRendererToDisplaySize(renderer)) {
            const canvasElm = renderer.domElement;
            camera.aspect = canvasElm.clientWidth / canvasElm.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const val = cube;
            const speed = 1 + ndx * 0.1;
            const rot = seconds * speed;
            val.rotation.x = rot;
            val.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
