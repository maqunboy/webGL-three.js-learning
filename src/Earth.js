import React from 'react';
import * as THREE from 'three';
import './Earth.css';
import OrbitControls from 'three-orbitcontrols';


// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

class Earth extends React.Component {
  
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

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // 设置位置
    sphere.position.set(0, 0, 0);
    return sphere;
  }

  componentDidMount () {
    // 设置背景图片
    const sphere = this.circular();
    const spotLight = this.spot();
    const controls_canera = new OrbitControls(camera);
    const controls_spotlight = new OrbitControls(spotLight);

    // 添加圆形
    scene.add(sphere);

    // 添加聚光灯
    scene.add(spotLight);

    // 设置相机的位置
    camera.position.set(-30, 40, 30);
    controls_canera.update();
    controls_spotlight.update();
    camera.lookAt(scene.position);

    // 绑定元素
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    // 绘制
    function render () {
      // 添加旋转
      sphere.rotation.y -= 0.01;
      requestAnimationFrame(render); 
      controls_canera.update();
      controls_spotlight.update();
      renderer.setSize( window.innerWidth, window.innerHeight );
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

export default Earth;
