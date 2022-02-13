import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
export default function Three() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    let iw = window.innerWidth;

    if (iw >= 768) {
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    } else {
      renderer.setSize(window.innerWidth, window.innerHeight / 2);
    }
    scene.background = new THREE.Color('0xffffff');
    canvas.appendChild(renderer.domElement);

    return () => canvas.removeChild(renderer.domElement);
  }, []);

  useEffect(() => {
    const geometryS = new THREE.DodecahedronGeometry(10, 1);
    const materialS = new THREE.MeshStandardMaterial({ color: `0xffffff`, wireframe: true });
    materialS.roughness = 0.4;
    const sphere = new THREE.Mesh(geometryS, materialS);

    const ambientLight = new THREE.AmbientLight('0xffffff', 0.5);
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

    scene.add(sphere);
    camera.position.z = 2;
    sphere.position.x = 1;

    let tick = function () {
      requestAnimationFrame(tick);

      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.003;

      renderer.render(scene, camera);
    };

    window.addEventListener('resize', () => {
      let iw = window.innerWidth;

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

    return () => scene.remove(sphere);
  }, []);

  return <div id="canvas" className="m-2" ref={canvasRef}></div>;
}
