import * as THREE from 'three'
import { WEBGL } from './webgl'

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

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // 전역에서 비추는 빛이라 안보임
  // scene.add(ambientLight)
  // ambientLight.castShadow = true  // 그림자 X

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(-0.5, 1.5, -0.5)
  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5, 0x0000ff) // 빛이 어디서 쏘는 지 알려줌
  scene.add(directionalLight)
  scene.add(dlHelper)
  directionalLight.castShadow = true // 그림자 O
  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024
  directionalLight.shadow.radius = 8 // 그림자 블러

  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1) // 하늘색과 지상색 설정
  // scene.add(hemisphereLight)

  const pointLight = new THREE.PointLight(0xffffff, 1)
  // scene.add(pointLight)
  pointLight.position.set(-2, 0.5, 0.5)
  const plHelper = new THREE.PointLightHelper(pointLight, 0.1) 
  // scene.add(plHelper)
  // pointLight.castShadow = true // 그림자 O

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5)
  // scene.add(rectLight)
  rectLight.position.set(0.5, 0.5, 1)
  // rectLight.castShadow = true // 그림자 X

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  spotLight.position.set(1, 2, 1)
  // scene.add(spotLight)
  // spotLight.castShadow = true // 그림자 O


  // 도형
  // const geometry = new THREE.SphereGeometry(0.5, 32, 16)
  const geometry = new THREE.ConeGeometry(0.4, 0.7, 6)
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
