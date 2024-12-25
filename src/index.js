import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // 카메라
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 4000)
  camera.position.set(0, 20, 100)
  camera.lookAt(0, 0, 0)

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // OrbitControls 추가
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 20
  controls.maxDistance = 800
  controls.update()

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)
  
  // 텍스처
  const skyMaterialArray = []
  const texture_ft = new THREE.TextureLoader().load('../static/img/bay_ft.jpg')
  const texture_bk = new THREE.TextureLoader().load('../static/img/bay_bk.jpg')
  const texture_up = new THREE.TextureLoader().load('../static/img/bay_up.jpg')
  const texture_dn = new THREE.TextureLoader().load('../static/img/bay_dn.jpg')
  const texture_rt = new THREE.TextureLoader().load('../static/img/bay_rt.jpg')
  const texture_lf = new THREE.TextureLoader().load('../static/img/bay_lf.jpg')
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_ft
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_bk
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_up
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_dn
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_rt
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_lf
    })
  )
  for (let i = 0; i < 6; i++){
    skyMaterialArray[i].side = THREE.BackSide
  }

  // 도형
  const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400)
  // const skyMaterial = new THREE.MeshStandardMaterial({ 
  //   // color: 0x333333,
  //   map: texture
  // })
  // skyMaterial.side = THREE.BackSide // = 안쪽에 texture를 입히겠다
  const sky = new THREE.Mesh(skyGeometry, skyMaterialArray)
  scene.add(sky)
  
  function render(time) {
    time *= 0.001

    // obj01.rotation.y = time

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  function animate() {
    requestAnimationFrame(animate)
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
