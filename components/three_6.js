import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

export default function Three_6() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.appendChild(renderer.domElement);
    let iw = window.innerWidth;
    let controls = new OrbitControls(camera, canvas);
    if (iw >= 768) {
      renderer.setSize(window.innerWidth, window.innerHeight);
    } else {
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    const pointLight = new THREE.PointLight('#828CDD', 1, 100);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    let envmaploader = new THREE.PMREMGenerator(renderer);

    new RGBELoader().setPath('/').load('a.hdr', function (hdrmap) {
      console.log(hdrmap);
      let envmap = envmaploader.fromCubemap(hdrmap);

      const ballMaterial = {
        clearcoat: 1.0,
        cleacoatRoughness: 0.1,
        metalness: 1.5,
        roughness: 1,
        normalMap: texture,
        color: '#e45959',
        envMap: envmap.texture,
        normalScale: new THREE.Vector2(0.15, 0.15),
      };
      const geometryS = new THREE.SphereGeometry(1, 32, 32);
      const materialS = new THREE.MeshPhysicalMaterial(ballMaterial);
      const sphere = new THREE.Mesh(geometryS, materialS);

      scene.add(sphere);

      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.5;

      let texture = new THREE.CanvasTexture(new FlakesTexture());
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.x = 10;
      texture.repeat.y = 6;
    });

    camera.position.z = 3;

    let tick = function () {
      controls.update();
      requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight / 2,
    };
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    controls.enableDamping = true;

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

    return () => scene.remove();
  }, []);

  return <div id="canvas" className="m-2" ref={canvasRef}></div>;
}
