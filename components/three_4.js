import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

const P_1 = textureLoader.load('/points/circle_05.png');
const P_2 = textureLoader.load('/points/window_02.png');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

export default function Three_4({ lightsOn }) {
  const canvasRef = useRef(null);

  let bg = lightsOn ? '#ffff' : '#000000';
  let randomValue = Math.round(Math.random());
  let color;

  if (lightsOn) {
    color = '#000';
  } else {
    if (randomValue === 1) {
      color = '#ae62af';
    } else {
      color = '#828CDD';
    }
  }

  let bgParticles = color;

  useEffect(() => {
    const canvas = canvasRef.current;
    let iw = window.innerWidth;

    if (iw >= 768) {
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    } else {
      renderer.setSize(window.innerWidth, window.innerHeight / 2);
    }

    scene.background = new THREE.Color(bg);
    canvas.appendChild(renderer.domElement);
    let controls = new OrbitControls(camera, canvas);

    const particlesGeometry = new THREE.BufferGeometry();

    let count;
    if (lightsOn) {
      count = 500;
    } else {
      count = 5000;
    }

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    //MATERIAL

    let particlesMaterial = new THREE.PointsMaterial({ color: bgParticles });
    particlesMaterial.size = 0.1;
    particlesMaterial.sizeAttenuation = true;
    particlesMaterial.transparent = true;
    particlesMaterial.depthTest = false;

    if (!lightsOn) {
      particlesMaterial.blending = THREE.AdditiveBlending;
      particlesMaterial.alphaMap = P_1;
    } else {
      particlesMaterial.alphaMap = P_2;
    }

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 3;

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight / 2,
    };

    let tick = function () {
      requestAnimationFrame(tick);
      particles.rotation.y += 0.005;
      particles.rotation.x += 0.005;

      controls.update();
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

    return () => scene.remove(particles);
  }, [bg, bgParticles, randomValue, lightsOn]);

  return <div id="canvas" className="m-2" ref={canvasRef}></div>;
}
