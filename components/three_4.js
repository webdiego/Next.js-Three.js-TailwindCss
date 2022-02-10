import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

export default function Three_4({ lightsOn }) {
  const canvasRef = useRef(null);
  let bg = lightsOn ? '#ffff' : '#000000';

  useEffect(() => {
    const canvas = canvasRef.current;

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    scene.background = new THREE.Color(bg);
    canvas.appendChild(renderer.domElement);

    return () => canvas.removeChild(renderer.domElement);
  }, [bg]);

  useEffect(() => {
    const geometryS = new THREE.DodecahedronGeometry(4, 1);
    const geometryXs = new THREE.DodecahedronGeometry(1, 1);

    const materialS = new THREE.MeshToonMaterial({ color: `#c168fd` });
    materialS.metalness = 0.45;
    materialS.roughness = 0.65;

    const sphere = new THREE.Mesh(geometryS, materialS);
    const smallSphere = new THREE.Mesh(geometryXs, materialS);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
    directionalLight.position.set(-1, 0.25, 0);
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.7);
    scene.add(hemisphereLight);

    const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);
    spotLight.position.set(0, 4, 3);
    scene.add(spotLight);

    const sizes = {
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
    };

    for (let x = 0; x <= sizes.width; x += 20) {
      for (let y = 0; y <= sizes.height; y += 20) {
        const smallSphere = new THREE.Mesh(geometryXs, materialS);
        scene.add(smallSphere);
        smallSphere.position.x = x;
        smallSphere.position.y = y;
      }
    }
    scene.add(sphere);
    camera.position.z = 212;
    camera.lookAt(sizes.width, sizes.height);

    let tick = function () {
      requestAnimationFrame(tick);

      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.003;

      renderer.render(scene, camera);
    };

    window.addEventListener('resize', () => {
      let iw = window.innerWidth;
      camera.lookAt(sphere.position);
      if (iw >= 768) {
        sizes.width = window.innerWidth / 2;
        sizes.height = window.innerHeight / 2;
      } else {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight / 2;
      }

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
    });

    tick();

    return () => scene.remove(sphere, smallSphere);
  }, []);

  return <div id="canvas" className="m-2" ref={canvasRef}></div>;
}
