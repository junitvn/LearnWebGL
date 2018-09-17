

var Sx = 0.5, Sy = 0.5, Sz = 1.0;

function main() {
    var canvas = document.getElementById("testCanvas");
    var gl = getWebGLContext(canvas);
    var VSHADER_SOURCE = document.getElementById('vertexShader').text;
    var FSHADER_SOURCE = document.getElementById('fragmentShader').text;
    if (!gl) {
        console.log("Failed");
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to init shaders.")
        return;
    }
    var n = initVertexBuffer(gl);
    if (n < 0) {
        console.log("Failed");
        return;
    }
    //get location of u_Scale
    var u_Scale = gl.getUniformLocation(gl.program, 'u_Scale');
    console.log(u_Scale);

    //
    gl.uniform4f(u_Scale, Sx, Sy, Sz, 0.0);
    gl.clearColor(0.0, 0.0, 1.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);


    gl.drawArrays(gl.LINE_LOOP, 0, n);
}

function initVertexBuffer(gl) {
    var vertices = new Float32Array([
        -0.5, 0.5  , -0.5, -0.5 , 0.5 , -0.5 
    ]);

    var n = 3;

    var vertexBuffer = gl.createBuffer();

    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0 , 0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}

