import React from 'react';
import * as THREE from 'three';
import './App.css';

class App extends React.Component {

  common = () => {
    // 创建场景
    const scene = new THREE.Scene();
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // 创建一个获取环境贴图的cubeCamera
    const cubeCamera = new THREE.CubeCamera(0.1, 1000, 256);
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    return { scene, camera, renderer, cubeCamera }
  }

  spot = () => {
    // 添加一个聚光灯
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-4000, 4000, 1500);
    spotLight.target.position.set(1000, 3800, 1000);
    // spotLight.castShadow = true;
    return spotLight;
  }

  circular = () => {
    // 创建圆形
    const sphereGeometry = new THREE.SphereGeometry(30, 40, 400);
    // wireframe: true
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x666666
    });
    // 贴图
    sphereMaterial.specularMap = new THREE.TextureLoader().load(require('./earth_img.jpeg'));

    sphereMaterial.specular = new THREE.Color(0x00ffff);

    sphereMaterial.shininess = 20;

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // 设置位置
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;
    
    return sphere;
  }

  componentDidMount () {
    const { scene, camera, renderer, cubeCamera } = this.common();
    const sphere = this.circular();
    const spotLight = this.spot();

    // 添加圆形
    scene.add(sphere);

    // 添加聚光灯
    scene.add(spotLight);

    // 添加场景贴图相机
    // scene.add(cubeCamera);

    // 设置相机的位置
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // 绑定元素
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    // 绘制
    function render () {
      // 添加旋转
      sphere.rotation.y -= 0.01;
      requestAnimationFrame(render); 
      renderer.render(scene, camera);
    }
    render();
  }

  render () {
    return (
      <section id="WebGL-output"></section>
    );
  }
}

export default App;
