import React from 'react';

// 获取顶点着色器源码
const vertexShaderSource = `void main(){
    //声明顶点位置
    //在JavaScript中你可以把它想象成 gl_Position = {x: 0, y: 0, z: 0, w: 0}。
    //属性默认值是0, 0, 0, 1，然后属性将会从缓冲中获取前两个值（ x 和 y ）。 z和w还是默认值 0 和 1 。
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    //声明要绘制的点的大小。
    gl_PointSize = 10.0;
}`


const fragmentShaderSource = `void main(){
    //设置像素颜色为红色
    //其中1代表红色值，0代表绿色值， 0.5代表蓝色值，最后一个1表示阿尔法通道值。
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
}`
class Webgl extends React.Component {
    componentDidMount () {
        const canvas = this.refs['canvas-gl'];
        /**
         * canvas起初是空白的。
         * 为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。
         * <canvas> 元素有一个叫做 getContext() 的方法，这个方法是用来获得渲染上下文和它的绘画功能。
         */
        const gl = canvas.getContext('webgl') || canvas.getContext("experimental-webgl");
        console.log(gl);

        /***************** 创建顶点着色器 *******************/
        // 创建顶点着色器对象
        // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        // 将源码分配给顶点着色器对象
        gl.shaderSource(vertexShader, vertexShaderSource);
        // 编译顶点着色器程序
        gl.compileShader(vertexShader);

        /***************** 创建片元着色器 *******************/
        // 创建片元着色器程序
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        // 将源码分配给片元着色器对象
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        // 编译片元着色器
        gl.compileShader(fragmentShader);

        /***************** 创建着色器程序 *******************/
        //创建着色器程序
        const program = gl.createProgram();
        //将顶点着色器挂载在着色器程序上。
        gl.attachShader(program, vertexShader); 
        //将片元着色器挂载在着色器程序上。
        gl.attachShader(program, fragmentShader);
        //链接着色器程序
        gl.linkProgram(program);

        /***************** 开始绘制 *******************/
        // 使用刚创建好的着色器程序。
        gl.useProgram(program);
        //设置清空画布颜色为黑色。
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        //用上一步设置的清空画布颜色清空画布。
        gl.clear(gl.COLOR_BUFFER_BIT);
        //绘制点。
        gl.drawArrays(gl.POINTS, 0, 1);
    }
    render () {
        return (
            <canvas id="canvas" ref="canvas-gl"></canvas>
        )
    }
}

export default Webgl;