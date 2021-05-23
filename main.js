import './style.css'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import earthnight from "./earth_nightmap.jpg";
import earthday from "./earth_daymap.jpg";
import earthclouds from "./earth_clouds.png";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75 , window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);


const EarthTextureNight = new THREE.TextureLoader().load(earthnight);
const EarthTextureDay = new THREE.TextureLoader().load(earthday);
const EarthGeometry = new THREE.SphereGeometry(5 , 32 , 32);
const EarthMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: EarthTextureDay
});
const Earth = new THREE.Mesh(EarthGeometry,EarthMaterial);
scene.add(Earth);



const EarthCloudTexture = new THREE.TextureLoader().load(earthclouds)
const EarthCloudGeometry = new THREE.SphereGeometry(5.1,32,32)
const EarthCloudMaterial = new THREE.MeshStandardMaterial({
  map: EarthCloudTexture,
  transparent: true
})
const EarthCloud = new THREE.Mesh(EarthCloudGeometry,EarthCloudMaterial);
EarthCloud.receiveShadow = true;
EarthCloud.castShadow = true;
scene.add(EarthCloud);




const light = new THREE.PointLight( 0xffffff );
light.position.set(0,0,0)
scene.add( light );


const Biglight = new THREE.DirectionalLight(0xffffff)
Biglight.position.set(-15 , 0 , 0)
Biglight.rotation.set(0,80,0)
scene.add(Biglight);

const SceneBackground = new THREE.TextureLoader().load("./Space.jpg")
scene.background = SceneBackground;

const controller = new OrbitControls(camera , renderer.domElement);



function AddStars() {
  const geometry = new THREE.SphereGeometry(0.15 ,10,10);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const star = new THREE.Mesh(geometry,material);
  const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z)
  const PointLight = new THREE.PointLight(0xffffff , 5 ,5)
  PointLight.position.set(x,y,z);
  scene.add(star , PointLight);
}

Array(200).fill().forEach(AddStars);



function animate() {
  requestAnimationFrame(animate);
  Earth.rotation.y += 0.001;
  EarthCloud.rotation.y += 0.002;
  controller.update();
  renderer.render(scene,camera);
}


animate();