import * as THREE from 'three/build/three.module';
import * as HELPER from './helper.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function main() {
    const canvas = HELPER.getCanvas('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setClearColor(0xAAAAAA);
    renderer.shadowMap.enabled = true;

    const camera = HELPER.makeCamera(45, 2, 0.1, 100);
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);
    HELPER.setScene(scene);

    {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 2, 4);
        scene.add(light);
    }

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const cubes = [];
    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);

    const materials = [
        new THREE.MeshBasicMaterial({ map: loader.load('./images/hissing_cat.gif') }),
        new THREE.MeshBasicMaterial({ map: loader.load('./images/hissing_cat_2.gif') }),
        new THREE.MeshBasicMaterial({ map: loader.load('./images/hissing_cat_3.gif') }),
        new THREE.MeshBasicMaterial({ map: loader.load('./images/hissing_cat.gif') }),
        new THREE.MeshBasicMaterial({ map: loader.load('./images/hissing_cat_2.gif') }),
        new THREE.MeshBasicMaterial({ map: loader.load('./images/hissing_cat_3.gif') }),
    ];
    // loader.load('images/hissing_cat.gif', (texture) => {
    //     const material = new THREE.MeshBasicMaterial({
    //         map: texture,
    //     });
    //     const cube = new THREE.Mesh(geometry, material);
    //     scene.add(cube);
    //     cubes.push(cube);
    // });

    const loadingElem = document.querySelector('#loading');
    const progressBarElem = loadingElem.querySelector('.progressbar');

    loadManager.onLoad = () => {
        loadingElem.getElementsByClassName.display = 'none';
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        cubes.push(cube);
    };

    loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
        const progress = itemsLoaded / itemsTotal;
        progressBarElem.transform = `scaleX(${progress})`;
    };

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

    function render(time) {
        time *= 0.001;  // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvasElm = renderer.domElement;
            camera.aspect = canvasElm.clientWidth / canvasElm.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = 0.2 + ndx * 0.1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
