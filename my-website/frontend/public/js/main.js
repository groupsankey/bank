//üç boyutlu bir dünyanın içinde gezme fikri

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

  // Add ground
  const groundGeometry = new THREE.PlaneGeometry(500, 500);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Grey color
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
  ground.position.y = -0.5; // Position ground slightly below the default y position
  scene.add(ground);

  // Load GLTF model
  const loader = new THREE.GLTFLoader();
  loader.load(
    //'../models/bench/scene.gltf',
    '../models/city/scene.gltf',
    function (gltf) {
      const bench = gltf.scene;
      scene.add(bench);

      // Adjust model position and scale
      bench.position.y = 0; // Place model on top of the ground
      //bench.scale.set(0.085, 0.085, 0.085); // Make model smaller
      bench.scale.set(0.1, 0.1, 0.1);

      console.log('Model loaded successfully'); // Verify model load

      animate();
    },
    undefined,
    function (error) {
      console.error('Error loading model:', error);
    }
  );

  // Adjust camera position
  camera.position.set(0, 20, 30); // Moved camera higher and further from the model

  // Movement controls
  const controls = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  };

  let velocity = new THREE.Vector3();
  let canJump = false;

  document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyW':
        controls.forward = true;
        break;
      case 'KeyS':
        controls.backward = true;
        break;
      case 'KeyD': // Switch 'A' and 'D' functionality
        controls.left = true;
        break;
      case 'KeyA': // Switch 'A' and 'D' functionality
        controls.right = true;
        break;
      case 'Space':
        if (canJump) {
          velocity.y = 0.5; // Jump force
          canJump = false;
        }
        break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyW':
        controls.forward = false;
        break;
      case 'KeyS':
        controls.backward = false;
        break;
      case 'KeyD': // Switch 'A' and 'D' functionality
        controls.left = false;
        break;
      case 'KeyA': // Switch 'A' and 'D' functionality
        controls.right = false;
        break;
    }
  });

  const moveSpeed = 0.05;
  const gravity = -0.02;

  // Pointer Lock Functionality
  function lockMouse() {
    const onMouseMove = (event) => {
      const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      // Rotate camera based on mouse movement
      camera.rotation.y -= movementX * 0.002; // Adjust sensitivity
      camera.rotation.x -= movementY * 0.002; // Adjust sensitivity
      camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x)); // Clamp up/down rotation
    };

    document.addEventListener('mousemove', onMouseMove);
    
    document.addEventListener('click', () => {
      document.body.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === document.body) {
        console.log('Pointer locked');
      } else {
        console.log('Pointer unlocked');
        document.removeEventListener('mousemove', onMouseMove);
      }
    });
  }

  lockMouse();

  const animate = function () {
    requestAnimationFrame(animate);

    // Calculate forward direction based on camera orientation
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Ignore vertical direction
    direction.normalize(); // Normalize direction vector

    // Horizontal movement based on direction
    if (controls.forward) camera.position.add(direction.clone().multiplyScalar(moveSpeed));
    if (controls.backward) camera.position.add(direction.clone().negate().multiplyScalar(moveSpeed));
    if (controls.left) {
      direction.cross(new THREE.Vector3(0, 1, 0)); // Get left direction
      camera.position.add(direction.clone().multiplyScalar(moveSpeed));
    }
    if (controls.right) {
      direction.cross(new THREE.Vector3(0, 1, 0)); // Get right direction
      camera.position.add(direction.clone().negate().multiplyScalar(moveSpeed));
    }

    // Vertical movement
    velocity.y += gravity;
    camera.position.y += velocity.y;

    // Check if on the ground
    if (camera.position.y <= 0.5) {
      camera.position.y = 0.5;
      canJump = true;
      velocity.y = 0;
    }

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
