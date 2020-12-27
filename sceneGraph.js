import * as THREE from './node_modules/three/build/three.module.js';
import * as HELPER from './helper.js';

export default function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 40;   // field of view
    const aspect = 2; // the canvas defualt
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);
    HELPER.setScene(scene);

    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);

    {
        const solarSystem = new THREE.Object3D();
        HELPER.addObject(0, 0, solarSystem);

        const radius = 1;
        const widthSegments = 6;
        const heightSegments = 6;
        const sphereGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);

        const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 });
        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.scale.set(5, 5, 5);
        solarSystem.add(sunMesh);
        HELPER.getObjects().push(sunMesh);

        const earthOrbit = new THREE.Object3D();
        earthOrbit.position.x = 10;
        solarSystem.add(earthOrbit);
        HELPER.getObjects().push(earthOrbit);

        const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 });
        const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
        earthOrbit.add(earthMesh);
        HELPER.getObjects().push(earthMesh);

        const moonOrbit = new THREE.Object3D();
        moonOrbit.position.x = 2;
        earthOrbit.add(moonOrbit);

        const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x22222 });
        const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
        moonMesh.scale.set(0.5, 0.5, 0.5);
        moonOrbit.add(moonMesh);
        HELPER.getObjects().push(moonMesh);

        HELPER.makeAxisGrid(solarSystem, 'solarSystem', 25);
        HELPER.makeAxisGrid(sunMesh, 'sunMesh');
        HELPER.makeAxisGrid(earthOrbit, 'earthOrbit');
        HELPER.makeAxisGrid(earthMesh, 'earthMesh');
        HELPER.makeAxisGrid(moonOrbit, 'moonOrbit');
        HELPER.makeAxisGrid(moonMesh, 'moonMesh');
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

    function render(time) {
        const seconds = time * 0.001;  // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvasElm = renderer.domElement;
            camera.aspect = canvasElm.clientWidth / canvasElm.clientHeight;
            camera.updateProjectionMatrix();
        }

        HELPER.getObjects().forEach((obj, ndx) => {
            obj.rotation.y = seconds;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
