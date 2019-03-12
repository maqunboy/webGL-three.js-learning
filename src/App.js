import React from 'react';
import * as THREE from 'three';
import './App.css';

class App extends React.Component {

  common = () => {
    // 创建场景
    const scene = new THREE.Scene();
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    return { scene, camera, renderer }
  }

  spot = () => {
    // 添加一个聚光灯
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-4000, 4000, 1500);
    spotLight.target.position.set(1000, 3800, 1000);
    return spotLight;
  }

  circular = () => {
    // 创建圆形
    const sphereGeometry = new THREE.SphereGeometry(30, 40, 400);
    // wireframe: true
    const sphereMaterial = new THREE.MeshPhongMaterial();
    // 贴图
    sphereMaterial.map = new THREE.TextureLoader().load(require('./earth_living.jpg'));

    console.log(sphereMaterial.map, '--1--');

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // 设置位置
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;
    
    return sphere;
  }

  background = () => {
    // 创建星空
    
  }

  componentDidMount () {
    // 设置背景图片
    const { scene, camera, renderer } = this.common();
    const sphere = this.circular();
    const spotLight = this.spot();

    // 添加圆形
    scene.add(sphere);

    // 添加聚光灯
    scene.add(spotLight);

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
      renderer.setClearAlpha(0);
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
