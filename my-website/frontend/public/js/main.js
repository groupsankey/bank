document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('three-container');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 4); // Increased intensity
  directionalLight.position.set(10, 20, 10); // Adjusted position
  scene.add(directionalLight);

  // Load GLTF model
  const loader = new THREE.GLTFLoader();
  loader.load(
    '../models/bench/scene.gltf', 
    function (gltf) {
      const bench = gltf.scene;
      scene.add(bench);

      // Optional: Adjust model position and scale
      bench.position.y = -1; // Lowered model position
      bench.scale.set(0.5, 0.5, 0.5);

      console.log('Model loaded successfully'); // Verify model load

      animate();
    },
    undefined,
    function (error) {
      console.error('Error loading model:', error);
    }
  );

  // Adjust camera position
  camera.position.set(0, 2, 12); // Moved camera up and further from the model

  const animate = function () {
    requestAnimationFrame(animate);

    // Optional: Rotate the scene for a better view
    scene.rotation.y += 0.005;

    renderer.render(scene, camera);
  };

  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});
