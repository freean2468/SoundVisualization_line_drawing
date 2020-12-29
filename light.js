// eslint-disable-next-line import/no-unresolved
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
import * as THREE from './node_modules/three/build/three.module.js';
import * as HELPER from './helper.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import ColorGUIHelper from './ColorGUIHelper.js';

export default function main() {
    const canvas = HELPER.getCanvas('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const camera = HELPER.makeCamera(45, 2, 0.1, 100);
    camera.position.set(0, 10, 20);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    HELPER.setScene(scene);

    const loader = new THREE.TextureLoader();

    {
        // eslint-disable-next-line no-inner-declarations
        function makeXYZGUI(gui, vector3, name, onChangeFn) {
            const folder = gui.addFolder(name);
            folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
            folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
            folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
            folder.open();
        }

        const intensity = 1;

        // const skyColor = 0xB1E1FF;
        // const groundColor = 0xB97A20;
        // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);

        // const color = 0xFFFFFF;
        // const light = new THREE.AmbientLight(color, intensity);

        const color = 0xFFFFFF;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);

        scene.add(light);
        scene.add(light.target);

        // eslint-disable-next-line no-inner-declarations
        function updateLight() {
            light.target.updateMatrixWorld();
            helper.update();
        }

        const gui = new GUI();
        gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
        gui.add(light, 'intensity', 0, 2, 0.01);

        makeXYZGUI(gui, light.position, 'position', updateLight);
        makeXYZGUI(gui, light.target.position, 'target', updateLight);

        const helper = new THREE.DirectionalLightHelper(light);
        scene.add(helper);
    }

    {
        const planeSize = 40;

        const texture = loader.load('./images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -0.5;
        scene.add(mesh);
    }

    {
        const cubeSize = 4;
        const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
        const cubeMat = new THREE.MeshPhongMaterial({
            map: loader.load('./images/hissing_cat.gif'),
        });
        const mesh = new THREE.Mesh(cubeGeo, cubeMat);
        mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
        scene.add(mesh);
    }

    {
        const sphereRadius = 3;
        const sphereWidthDivisions = 32;
        const sphereHeightDivisions = 16;
        const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(-sphereRadius - 1, sphereRadius + 2.0);
        scene.add(mesh);
    }

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

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvasElm = renderer.domElement;
            camera.aspect = canvasElm.clientWidth / canvasElm.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
