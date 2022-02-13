import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const P_1 = textureLoader.load('/points/circle_05.png');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

export default function Three() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);

    let model;
    let controls = new OrbitControls(camera, canvas);
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.enableDamping = true;

    gltfLoader.load('/model/moon/scene.gltf', (gltf) => {
      console.log(gltf);
      model = gltf.scene;
      gltf.scene.scale.set(0.0075, 0.0075, 0.0075);
      scene.add(model);
    });

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let count = 400;
    const positions = new Float32Array(count * 3);
    const particlesGeometry = new THREE.BufferGeometry();

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    let particlesMaterial = new THREE.PointsMaterial();
    particlesMaterial.size = 0.01;
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    let z = 6;
    camera.position.z = z;

    let tick = function () {
      requestAnimationFrame(tick);
      camera.position.z -= 0.0005;
      camera.position.x += 0.0005;

      controls.update();
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
    });

    const cursor = {
      x: 0,
      y: 0,
    };

    window.addEventListener('mousemove', (event) => {
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = -(event.clientY / sizes.height - 0.5);
    });

    tick();

    return () => scene.remove(particles);
  }, []);

  return <div id="canvas" className="m-2" ref={canvasRef}></div>;
}
