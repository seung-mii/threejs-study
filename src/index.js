import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

if (WEBGL.isWebGLAvailable()) {
  
  const FogColor = 0x004fff
  const objColor = 0xffffff
  const FloorColor = 0x555555

  // 장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(FogColor)
  // 안개
  // 1번 : 안개와의 거리로 조절하는 방법
  // scene.fog = new THREE.Fog(FogColor, 1, 8)
  // 2번 : 안개의 밀도로 조절하는 방법
  scene.fog = new THREE.FogExp2(FogColor, 0.5)

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
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  // 도형
  const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80)
  const material = new THREE.MeshStandardMaterial({ 
    color: objColor
  })
  const obj = new THREE.Mesh(geometry, material)
  obj.position.y = 0.8
  obj.position.z = 0
  scene.add(obj)
  
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ 
    color: FloorColor
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
