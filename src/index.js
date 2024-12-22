import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 3 // cube가 보이도록 카메라의 z 위치 조절

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  // 텍스처
  const textureLoader = new THREE.TextureLoader()
  const textureBaseMap = textureLoader.load('../static/img/stone_basecolor.png');
  const textureNormalMap = textureLoader.load('../static/img/stone_normal.png');
  const textureHeightMap = textureLoader.load('../static/img/stone_height.png');
  const textureRoughnessMap = textureLoader.load('../static/img/stone_roughness.png');

  // 도형
  const geometry01 = new THREE.SphereGeometry(0.3, 32, 16)
  const material01 = new THREE.MeshStandardMaterial({ 
    map: textureBaseMap
  })
  const obj01 = new THREE.Mesh(geometry01, material01)
  obj01.position.x = -1.5
  scene.add(obj01)
  
  const geometry02 = new THREE.SphereGeometry(0.3, 32, 16)
  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseMap,
    normalMap: textureNormalMap
  })
  const obj02 = new THREE.Mesh(geometry02, material02)
  obj02.position.x = -0.5
  scene.add(obj02)

  const geometry03 = new THREE.SphereGeometry(0.3, 32, 16)
  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseMap,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.05
  })
  const obj03 = new THREE.Mesh(geometry03, material03)
  obj03.position.x = 0.5
  scene.add(obj03)

  const geometry04 = new THREE.SphereGeometry(0.3, 32, 16)
  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseMap,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.05,
    roughnessMap: textureRoughnessMap,
    roughness: 0.5
  })
  const obj04 = new THREE.Mesh(geometry04, material04)
  obj04.position.x = 1.5
  scene.add(obj04)

  function render(time) {
    time *= 0.001

    obj01.rotation.y = time
    obj02.rotation.y = time
    obj03.rotation.y = time
    obj04.rotation.y = time

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight // 도형의 종횡비 유지
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
