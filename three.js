<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>3D Goofy 67</title>
<style>
  body { margin: 0; overflow: hidden; background: #000; }
  canvas { display: block; }
</style>
</head>
<body>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/three.min.js"></script>

<script>
// --- Scene Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.2, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- Lighting ---
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);

const fillLight = new THREE.PointLight(0x4488ff, 1);
fillLight.position.set(-4, -3, 2);
scene.add(fillLight);

// --- Goofy Face Texture ---
const faceCanvas = document.createElement("canvas");
faceCanvas.width = 256;
faceCanvas.height = 256;
const ctx = faceCanvas.getContext("2d");

// draw goofy face :)
ctx.fillStyle = "#ffe066";
ctx.fillRect(0, 0, 256, 256);

ctx.fillStyle = "#fff";
ctx.beginPath(); ctx.arc(90, 100, 40, 0, Math.PI*2); ctx.fill();
ctx.beginPath(); ctx.arc(170, 100, 40, 0, Math.PI*2); ctx.fill();

ctx.fillStyle = "#000";
ctx.beginPath(); ctx.arc(90, 110, 20, 0, Math.PI*2); ctx.fill();
ctx.beginPath(); ctx.arc(170, 110, 20, 0, Math.PI*2); ctx.fill();

ctx.strokeStyle = "#000";
ctx.lineWidth = 6;
ctx.beginPath(); ctx.arc(130, 160, 60, 0, Math.PI); ctx.stroke();

const faceTexture = new THREE.CanvasTexture(faceCanvas);

// --- 3D “6” ---
const sixGeometry = new THREE.TorusGeometry(1.2, 0.35, 16, 100);
const sixMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff99, metalness: 0.3, roughness: 0.5 });
const sixMesh = new THREE.Mesh(sixGeometry, sixMaterial);
sixMesh.position.x = -1.7;
scene.add(sixMesh);

// --- 3D “7” With Goofy Face ---
const sevenGeometry = new THREE.BoxGeometry(2, 2.8, 0.6);
const sevenMaterial = new THREE.MeshStandardMaterial({
  map: faceTexture,
  metalness: 0.2,
  roughness: 0.6,
});
const sevenMesh = new THREE.Mesh(sevenGeometry, sevenMaterial);
sevenMesh.position.x = 1.7;
scene.add(sevenMesh);

// --- Animation Loop ---
function animate() {
  requestAnimationFrame(animate);

  sixMesh.rotation.x += 0.01;
  sixMesh.rotation.y += 0.015;

  sevenMesh.rotation.y += 0.015;
  sevenMesh.rotation.x += 0.01;

  renderer.render(scene, camera);
}

animate();

// --- Handle Resize ---
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
</script>

</body>
</html>
