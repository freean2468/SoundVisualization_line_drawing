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
    camera.position.z = 120;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);
    HELPER.setScene(scene);

    {
        const width = 8;
        const height = 8;
        const depth = 8;

        HELPER.addSolidGeometry(-2, -2, new THREE.BoxBufferGeometry(width, height, depth));
    }
    {
        const radius = 7;
        const segments = 24;
        HELPER.addSolidGeometry(-1, 2, new THREE.CircleBufferGeometry(radius, segments));
    }
    {
        const radius = 6;
        const height = 8;
        const segments = 16;
        HELPER.addSolidGeometry(0, 2, new THREE.ConeBufferGeometry(radius, height, segments));
    }
    {
        const radiusTop = 4;
        const radiusBottom = 4;
        const height = 8;
        const radialSegments = 12;
        // eslint-disable-next-line max-len
        HELPER.addSolidGeometry(1, 2, new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments));
    }
    {
        const radius = 7;
        HELPER.addSolidGeometry(2, 2, new THREE.DodecahedronBufferGeometry(radius));
    }
    {
        const shape = new THREE.Shape();
        const x = -2.5;
        const y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        const extrudeSettings = {
            steps: 2,
            depth: 2,
            bevelEnabled: true,
            bevelSize: 1,
            bevelSegments: 2,
        };

        HELPER.addSolidGeometry(-2, 1, new THREE.ExtrudeBufferGeometry(shape, extrudeSettings));
    }
    {
        const points = [];
        for (let i = 0; i < 10; i += 1) {
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8));
        }
        HELPER.addSolidGeometry(0, 1, new THREE.LatheBufferGeometry(points));
    }
    {
        const radius = 7;
        HELPER.addSolidGeometry(1, 1, new THREE.OctahedronBufferGeometry(radius));
    }
    {
        const slices = 25;
        const stacks = 25;
        // eslint-disable-next-line max-len
        HELPER.addSolidGeometry(2, 1, new THREE.ParametricBufferGeometry(HELPER.klein, slices, stacks));
    }
    {
        const width = 9;
        const height = 9;
        const widthSegments = 2;
        const heightSegments = 2;
        // eslint-disable-next-line max-len
        HELPER.addSolidGeometry(-2, 0, new THREE.PlaneBufferGeometry(width, height, widthSegments, heightSegments));
    }
    {
        const verticesOfCube = [
            -1, -1, -1,     1, -1, -1,      1, 1, -1,       -1, 1, -1,
            -1, -1, 1,      1, -1, 1,       1, 1, 1,        -1, 1, 1,
        ];
        const indicesOfFaces = [
            2, 1, 0,    0, 3, 2,
            0, 4, 7,    7, 3, 0,
            0, 1, 5,    5, 4, 0,
            1, 2, 6,    6, 5, 1,
            2, 3, 7,    7, 6, 2,
            4, 5, 6,    6, 7, 4,
        ];
        const radius = 7;
        const detail = 2;
        // eslint-disable-next-line max-len
        HELPER.addSolidGeometry(-1, 0, new THREE.PolyhedronBufferGeometry(verticesOfCube, indicesOfFaces, radius, detail));
    }
    {
        const innerRadius = 2;
        const outerRadius = 7;
        const segments = 18;
        // eslint-disable-next-line max-len
        HELPER.addSolidGeometry(0, 0, new THREE.RingBufferGeometry(innerRadius, outerRadius, segments));
    }
    {
        const shape = new THREE.Shape();

        const x = -2.5;
        const y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        HELPER.addSolidGeometry(1, 0, new THREE.ShapeBufferGeometry(shape));
    }
    {
        const radius = 7;
        const widthSegments = 12;
        const heightSegments = 8;
        // eslint-disable-next-line max-len
        HELPER.addSolidGeometry(-2, 0, new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments));
    }
    {
        const radius = 7;
        HELPER.addSolidGeometry(-2, -1, new THREE.TetrahedronBufferGeometry(radius));
    }
    {
        // eslint-disable-next-line no-inner-declarations
        async function doit() {
            const font = await HELPER.loadFont('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json');
            const geometry = new THREE.TextBufferGeometry('three.js', {
                font,
                size: 3.0,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.15,
                bevelSize: 0.3,
                bevelSegments: 5,
            });
            const mesh = new THREE.Mesh(geometry, HELPER.createMaterial(THREE));
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);

            const parent = new THREE.Object3D();
            parent.add(mesh);

            HELPER.addObject(-1, -1, parent);
        }
        doit();
    }
    {
        const radius = 5;
        const tubeRadius = 2;
        const radialSegments = 8;
        const tubularSegments = 24;
        // eslint-disable-next-line max-len
        HELPER.addSolidGeometry(0, -1, new THREE.TorusBufferGeometry(radius, tubeRadius, radialSegments, tubularSegments));
    }
    {
        const radius = 3.5;
        const tube = 1.5;
        const radialSegments = 8;
        const tubularSegments = 64;
        const p = 2;
        const q = 3;
        // eslint-disable-next-line max-len
        HELPER.addSolidGeometry(1, -1, new THREE.TorusKnotBufferGeometry(radius, tube, tubularSegments, radialSegments, p, q));
    }
    {
        const path = new HELPER.CustomSinCurve(4);
        const tubularSegments = 20;
        const radius = 1;
        const radialSegments = 8;
        const closed = false;
        // eslint-disable-next-line max-len
        HELPER.addSolidGeometry(2, -1, new THREE.TubeBufferGeometry(path, tubularSegments, radius, radialSegments, closed));
    }
    {
        const width = 8;
        const height = 8;
        const depth = 8;
        const thresholdAngle = 15;
        // eslint-disable-next-line max-len
        HELPER.addLineGeometry(-1, -2, new THREE.EdgesGeometry(new THREE.BoxBufferGeometry(width, height, depth), thresholdAngle));
    }
    {
        const width = 8;
        const height = 8;
        const depth = 8;
        HELPER.addLineGeometry(1, -2, new THREE.WireframeGeometry(new THREE.BoxBufferGeometry(width, height, depth)));
    }
    {
        const radius = 7;
        const widthSegments = 12;
        const heightSegments = 8;
        const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
        const material = new THREE.PointsMaterial({
            color: 'red',
            size: 2,
            sizeAttenuation: false,
        });
        const points = new THREE.Points(geometry, material);
        HELPER.addObject(-2, 2, points);
    }

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

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
            const speed = 0.1 + ndx * 0.05;
            const rot = seconds * speed;
            obj.rotation.x = rot;
            obj.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
