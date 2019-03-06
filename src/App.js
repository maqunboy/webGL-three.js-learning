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

  circular = () => {
    // 创建圆形
    const sphereGeometry = new THREE.SphereGeometry(30, 40, 400);
    // MeshBasicMaterial
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xffff00,
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

    // const spotLight = new THREE.SpotLight( 0xffffff );
    // spotLight.position.set( 100, 1000, 100 );

    // spotLight.castShadow = true;

    // spotLight.shadow.mapSize.width = 1024;
    // spotLight.shadow.mapSize.height = 1024;

    // spotLight.shadow.camera.near = 500;
    // spotLight.shadow.camera.far = 4000;
    // spotLight.shadow.camera.fov = 30;

    // scene.add( spotLight );

    // 添加圆形
    scene.add(sphere);

    // 设置相机的位置
    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = -100;
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
