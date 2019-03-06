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
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    return { scene, camera, renderer }
  }

  spot = () => {
    // 添加一个聚光灯
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-4000, 4000, 1500);
    return spotLight;
  }

  circular = () => {
    // 创建圆形
    const sphereGeometry = new THREE.SphereGeometry(30, 40, 400);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // 设置位置
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;
    
    return sphere;
  }

  componentDidMount () {
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
    renderer.render(scene, camera);
  }

  render () {
    return (
      <section id="WebGL-output"></section>
    );
  }
}

export default App;
