import { useEffect, useRef } from 'react';

import * as THREE from 'three';

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const M_1 = textureLoader.load('/matcap/M_1.png');
const M_2 = textureLoader.load('/matcap/M_2.png');
const M_3 = textureLoader.load('/matcap/M_3.png');
const M_4 = textureLoader.load('/matcap/M_4.png');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

export default function Three() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    renderer.setSize(window.innerWidth, window.innerHeight);

    canvas.appendChild(renderer.domElement);

    return () => canvas.removeChild(renderer.domElement);
  }, []);

  useEffect(() => {
    const geometryI = new THREE.IcosahedronGeometry(10, 0);
    const geometryT = new THREE.TetrahedronGeometry(3, 0);

    const materialI = new THREE.MeshMatcapMaterial();
    const materialT = new THREE.MeshMatcapMaterial();

    materialI.matcap = M_4;
    materialT.matcap = M_2;

    const ico = new THREE.Mesh(geometryI, materialI);
    const tetra = new THREE.Mesh(geometryT, materialT);
    tetra.position.y = 20;

    scene.add(ico);
    scene.add(tetra);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    camera.position.z = 32;

    let tick = function () {
      requestAnimationFrame(tick);
      ico.rotation.x += 0.003;
      ico.rotation.y += 0.003;
      tetra.rotation.x += 0.0013;
      tetra.rotation.y += 0.0013;
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
    });

    tick();

    return () => scene.remove(ico, tetra);
  }, []);

  return <div id="canvas" className="m-2" ref={canvasRef}></div>;
}
