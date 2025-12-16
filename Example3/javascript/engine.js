/*

License

(The MIT License)

Copyright (c) 2025 Simon Andercats

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/

let canvas;
let gl;
let mvMatrixNew;
let shaderProgram;
let vertexPositionAttribute;
let textureCoordAttribute;
let mvMatrixStackNew = [];
let timing_loop_count = 0;
let phase_of_game = "menu";
let score = 0;
let level = 0;
var difficulty = 'easy';

window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyUnPressed, false);

function start() { // called on the index.html page to start the game

  canvas = document.getElementById("glcanvas");
  canvas.width = window.innerWidth - 10;
  canvas.height = window.innerHeight - 10;
  
  initWebGL(canvas); // Initialize the GL context. Let the magic begin!
 
  // Only continue if WebGL is available and working in this browser
  if (gl) {
	  
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Blue sky, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
    
    // Initialize the shaders. Determines how the vertices will be rendered    
    initShaders();

    // Create all the verteces for things we are going to draw
    generateVerteces();
    
    // Everything drawn in WebGL will be in a buffer. Create those buffers here.
    initBuffers();
    
    // Load and set up the textures we'll be using.
    initTextures();

    // Set the scenes perspective for the viewer by generating a 4x4 matrix
    // The CreatePerspective() function just makes creating that matrix simpler
    let perspectiveMatrix = createPerspective(45, 640.0/480.0, 0.1, 2000.0);
    let pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix));
    
    // Set an interval to re-draw the scene periodically
    setInterval(GraphicsLoop, 1); 

    // Set another interval to handle gameplay
    setInterval(function() { GameplayLoop() }, 1);
  }
}


function GraphicsLoop() {

  // Clear the canvas before we start drawing on it
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Set the drawing position to the "identity" matrix, which is the center of the scene.
  loadIdentity();

  // Position the scene so the player sees it from the angle we wish
	mvRotate(0, [1, 0, 0]);
  mvRotate(y_camera_angle, [1, 0, 0]);
  mvRotate(camera_angle, [0, 1, 0]);

  // Now position everything we are about to render into the correct location
  mvTranslate([x_location, y_location, z_location]);

  DrawScenery();
  DisplayFloorCeiling();
}

function GameplayLoop() {

  if (phase_of_game == "game") {

    ControlPlayerMovement();
    
    if (timing_loop_count >= 5 ) {
      UpdateStats();
      timing_loop_count = 0;
    }
    timing_loop_count++;
  }
}


