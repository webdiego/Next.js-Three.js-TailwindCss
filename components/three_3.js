import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const M_1 = textureLoader.load('/matcap/M_1.png');
const M_2 = textureLoader.load('/matcap/M_2.png');
const M_3 = textureLoader.load('/matcap/M_3.png');
const M_4 = textureLoader.load('/matcap/M_4.png');

const renderer = new THREE.WebGLRenderer();
let controls;

export default function Three_3() {
  const canvasRef = useRef(null);
  const [_document, set_document] = React.useState(null)
  React.useEffect(() => {
    set_document(document)
}, [])
  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(
      95,
      window.innerWidth / (window.innerHeight / 2),
      0.1,
      1000
    );
    const canvas = canvasRef.current;

    renderer.setSize(window.innerWidth, window.innerHeight / 2);

    canvas.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, canvas);
    const geometryI = new THREE.IcosahedronGeometry(10, 0);
    const geometryT = new THREE.TetrahedronGeometry(3, 0);

    const materialI = new THREE.MeshMatcapMaterial();
    const materialT = new THREE.MeshMatcapMaterial();

    const geometry = new THREE.TorusGeometry(14, 0.8, 16, 100);
    const materialK = new THREE.MeshMatcapMaterial();

    materialI.matcap = M_4;
    materialT.matcap = M_2;
    materialK.matcap = M_3;

    const ico = new THREE.Mesh(geometryI, materialI);
    const tetra = new THREE.Mesh(geometryT, materialT);
    const tetra_2 = new THREE.Mesh(geometryT, materialT);
    const tetra_3 = new THREE.Mesh(geometryT, materialT);
    const tetra_4 = new THREE.Mesh(geometryT, materialT);
    const torus = new THREE.Mesh(geometry, materialK);

    tetra.position.y = 20;
    tetra_2.position.y = -20;
    tetra_3.position.x = -20;
    tetra_4.position.x = 20;
    torus.position.y = -1;

    let obj = [ico, tetra, tetra_2, tetra_3, tetra_4, torus];
    obj.forEach((o) => {
      scene.add(o);
    });

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight / 2,
    };

    camera.position.z = 32;
    let animation = gsap.timeline({ repeat: -1, yoyo: true });

    animation
      .to(tetra.position, { duration: 3, x: -20 })
      .to(tetra_2.position, { duration: 3, x: 20 }, 0)
      .to(tetra_3.position, { duration: 3, y: -20 }, 0)
      .to(tetra_4.position, { duration: 3, y: 20 }, 0);

    animation
      .to(tetra.position, { duration: 3, y: -20 }, 3)
      .to(tetra_2.position, { duration: 3, y: 20 }, 3)
      .to(tetra_3.position, { duration: 3, x: 20 }, 3)
      .to(tetra_4.position, { duration: 3, x: -20 }, 3);

    animation
      .to(tetra.position, { duration: 3, x: 20 }, 6)
      .to(tetra_2.position, { duration: 3, x: -20 }, 6)
      .to(tetra_3.position, { duration: 3, y: 20 }, 6)
      .to(tetra_4.position, { duration: 3, y: -20 }, 6);

    let tick = function () {
      requestAnimationFrame(tick);

      ico.rotation.x += 0.003;
      ico.rotation.y += 0.003;
      tetra.rotation.x += 0.05;
      tetra.rotation.y += 0.05;
      tetra_2.rotation.x += 0.03;
      tetra_2.rotation.y += 0.03;
      tetra_3.rotation.x += 0.04;
      tetra_3.rotation.y += 0.04;
      tetra_4.rotation.x += 0.06;
      tetra_4.rotation.y += 0.06;

      torus.rotation.x += 0.05;
      torus.rotation.y += 0.05;

      renderer.render(scene, camera);
    };

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight / 2;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
    });

    tick();

    return () => scene.remove(ico, tetra, tetra_2, tetra_3, tetra_4, torus);
  }, []);

  return <div id="canvas" className="m-2 cursor-grab" ref={canvasRef}></div>;
}
