import { useEffect, useRef, useState } from 'react';

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

export default function Three({ color }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);

    return () => canvas.removeChild(renderer.domElement);
  }, []);

  useEffect(() => {
    const geometryC = new THREE.BoxGeometry(1, 1, 1);
    const materialC = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometryC, materialC);

    const geometryS = new THREE.SphereGeometry(1, 32, 32);
    const materialS = new THREE.MeshBasicMaterial({ color: `#${color}`, wireframe: true });
    const sphere = new THREE.Mesh(geometryS, materialS);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    scene.add(cube);
    scene.add(sphere);
    camera.position.z = 15;

    let tick = function () {
      requestAnimationFrame(tick);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      sphere.rotation.x += 0.05;
      sphere.rotation.y += 0.05;

      camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
      camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
      camera.position.y = cursor.y * 3;
      camera.lookAt(cube.position);
      camera.lookAt(sphere.position);
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

    return () => scene.remove(cube, sphere);
  }, [color]);

  return <div id="canvas" className="m-2" ref={canvasRef}></div>;
}
