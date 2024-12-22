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

  // 도형
  const geometry01 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material01 = new THREE.MeshBasicMaterial({ // MeshBasicMaterial은 빛 영향을 안받음
    color: 0xFF7F00
  })
  const obj01 = new THREE.Mesh(geometry01, material01)
  obj01.position.x = -2
  scene.add(obj01)
  
  const geometry02 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material02 = new THREE.MeshStandardMaterial({
    color: 0xFF7F00,
    metalness: 0.6,
    roughness: 0.4,
  })
  const obj02 = new THREE.Mesh(geometry02, material02)
  obj02.position.x = -1
  scene.add(obj02)

  const geometry03 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material03 = new THREE.MeshPhysicalMaterial({
    color: 0xFF7F00,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  })
  const obj03 = new THREE.Mesh(geometry03, material03)
  scene.add(obj03)

  const geometry04 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material04 = new THREE.MeshLambertMaterial({
    color: 0xFF7F00
  })
  const obj04 = new THREE.Mesh(geometry04, material04)
  obj04.position.x = 1
  scene.add(obj04)

  const geometry05 = new THREE.TorusGeometry(0.3, 0.15, 16, 40)
  const material05 = new THREE.MeshPhongMaterial({
    color: 0xFF7F00,
    shininess: 60,
    specular: 0x004fff
  })
  const obj05 = new THREE.Mesh(geometry05, material05)
  obj05.position.x = 2
  scene.add(obj05)

  function render(time) {
    time *= 0.001

    obj01.rotation.y = time
    obj02.rotation.y = time
    obj03.rotation.y = time
    obj04.rotation.y = time
    obj05.rotation.y = time

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
