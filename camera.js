// eslint-disable-next-line import/no-unresolved
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
import * as THREE from './node_modules/three/build/three.module.js';
import * as HELPER from './helper.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import MinMaxGUIHelper from './MinMaxGUIHelper.js';

export default function main() {
    const canvas = document.querySelector('#c');
    const view1Elem = document.querySelector('#view1');
    const view2Elem = document.querySelector('#view2');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        logarithmicDepthBuffer: true,
    });

    const camera = HELPER.makeCamera(45, 2, 0.0001, 100);
    camera.position.set(0, 10, 20);

    const cameraHelper = new THREE.CameraHelper(camera);

    const gui = new GUI();
    gui.add(camera, 'fov', 1, 180);
    const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
    gui.add(minMaxGUIHelper, 'min', 0.00001, 50, 0.00001).name('near');
    gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far');

    const controls = new OrbitControls(camera, view1Elem);
    controls.target.set(0, 5, 0);
    controls.update();

    const camera2 = new THREE.PerspectiveCamera(
        60, // fov
        2,  // aspect
        0.1,    // near
        500, // far
    );
    camera2.position.set(40, 10, 30);
    camera2.lookAt(0, 5, 0);

    const controls2 = new OrbitControls(camera2, view2Elem);
    controls2.target.set(0, 5, 0);
    controls2.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.add(cameraHelper);

    function setScissorForElement(elem) {
        const canvasRect = canvas.getBoundingClientRect();
        const elemRect = elem.getBoundingClientRect();

        // compute a canvas relative rectangle
        const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
        const left = Math.max(0, elemRect.left - canvasRect.left);
        const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
        const top = Math.max(0, elemRect.top - canvasRect.top);

        const width = Math.min(canvasRect.width, right - left);
        const height = Math.min(canvasRect.height, bottom - top);

        // setup the scissor to only render to that part of the canvas
        const positiveYUpBottom = canvasRect.height - bottom;
        renderer.setScissor(left, positiveYUpBottom, width, height);
        renderer.setViewport(left, positiveYUpBottom, width, height);

        // return the aspect
        return width / height;
    }

    const loader = new THREE.TextureLoader();

    {
        const intensity = 1;
        const color = 0xFFFFFF;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
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
        const numSpheres = 20;
        for (let i = 0; i < numSpheres; ++i) {
            const sphereMat = new THREE.MeshPhongMaterial();
            sphereMat.color.setHSL(i * 0.73, 1, 0.5);
            const mesh = new THREE.Mesh(sphereGeo, sphereMat);
            mesh.position.set(-sphereRadius - 1, sphereRadius + 2, i * sphereRadius * -2.2);
            scene.add(mesh);
        }

        const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(-sphereRadius - 1, sphereRadius + 2.0);
        scene.add(mesh);
    }

    // eslint-disable-next-line no-shadow
    function resizeRendererToDisplaySize(renderer) {
        // eslint-disable-next-line no-shadow
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

    function render() {
        // if (resizeRendererToDisplaySize(renderer)) {
        //     const canvasElm = renderer.domElement;
        //     camera.aspect = canvasElm.clientWidth / canvasElm.clientHeight;
        //     camera.updateProjectionMatrix();
        // }
        resizeRendererToDisplaySize(renderer);

        // turn on the scissor
        renderer.setScissorTest(true);

        // render the original view
        {
            const aspect = setScissorForElement(view1Elem);

            // adjust the camera for this aspect
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            cameraHelper.update();

            // don't draw the camera helper in the original view
            cameraHelper.visible = false;

            scene.background.set(0x000000);

            // render
            renderer.render(scene, camera);
        }

        // render from the 2nd camera
        {
            const aspect = setScissorForElement(view2Elem);

            // adjust the camera for this aspect
            camera2.aspect = aspect;
            camera2.updateProjectionMatrix();

            // draw the camera helper in the 2nd view
            cameraHelper.visible = true;

            scene.background.set(0x00000040);

            renderer.render(scene, camera2);
        }

        // renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
