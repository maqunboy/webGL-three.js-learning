import React from 'react';
import * as THREE from 'three';
import './App.css';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

class App extends React.Component {

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

  sphereRotate = (sphere, e) => {
    // 监听鼠标移动
    // sphere.rotateX(Math.PI/4);//绕x轴旋转π/4
    // console.log(e);
  }

  componentDidMount () {
    // 设置背景图片
    const sphere = this.circular();
    const spotLight = this.spot();

    // 添加圆形
    scene.add(sphere);

    // 添加聚光灯
    scene.add(spotLight);

    // 设置相机的位置
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    // 监听鼠标点击事件
    renderer.domElement.draggable = true;
    renderer.domElement.addEventListener('dragstart', e => {
      console.log(e, '----dragstart---');
    }, false);
    renderer.domElement.addEventListener('dragend', e => {
      console.log(e, '----dragend----');
    }, false);

    // 绑定元素
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    // 绘制
    function render () {
      // 添加旋转
      sphere.rotation.y -= 0.01;
      requestAnimationFrame(render); 
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

export default App;
