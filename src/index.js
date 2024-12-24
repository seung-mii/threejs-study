import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'


if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()

  // 카메라
  const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 1, 1.8)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true

  document.body.appendChild(renderer.domElement)

  // OrbitControls 추가
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 1
  controls.maxPolarAngle = Math.PI / 2  // 중간 이상 내려가지 않음
  controls.update()

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // 전역에서 비추는 빛이라 안보임
  scene.add(ambientLight)
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(-1.5, 2, 1)
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2, 0x0000ff) // 빛이 어디서 쏘는 지 알려줌
  scene.add(directionalLight)
  scene.add(dlHelper)
  directionalLight.castShadow = true // 그림자 O
  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024
  directionalLight.shadow.radius = 8 // 그림자 블러

  // 도형
  const geometry = new THREE.IcosahedronGeometry(0.5, 0)
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x004fff
  })
  const obj = new THREE.Mesh(geometry, material)
  obj.rotation.y = 0.5
  obj.position.y = 0.2
  scene.add(obj)
  obj.castShadow = true
  
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
  scene.add(plane)
  plane.receiveShadow = true

  function render(time) {
    time *= 0.001

    // obj01.rotation.y = time

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  function animate() {
    requestAnimationFrame(animate)

    obj.rotation.y += 0.04 
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

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
