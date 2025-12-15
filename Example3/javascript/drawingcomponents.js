/*

License

(The MIT License)

Copyright (c) 2025 Simon T.T.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/

// Load buffers
let sceneryVerticesBuffer;
let sceneryVerticesTextureCoordBuffer;
let sceneryVerticesIndexBuffer;
let floorVerticesBuffer;
let floorVerticesTextureCoordBuffer;
let floorVerticesIndexBuffer;
let ceilingVerticesBuffer;
let ceilingVerticesTextureCoordBuffer;
let ceilingVerticesIndexBuffer;
let game_texture = [];
let game_image = [];
let floorImage;
let ceilingImage;
let floorTexture;
let doorTexture;
let ceilingTexture;
let scenery_vertices = [];
let scenery_texture_coordinates = [];
let scenery_vertex_indices = [];
let num_cubes = 0;


let floor_vertices = [
    1500, 0, -200,
    -50500, 0, -200,
    -50500, 0, 2000,
    1500, 0,  2000,
];

let ceiling_vertices = [
    500, 500, -200,
    -50500, 500, -200,
    -50500, 500, 2000,
    500, 500,  2000,
    ];


let ceiling_vertex_indices = [
    0,  1,  2,      
    0,  2,  3,  
];

let ceiling_texture_coordinates = [
	0.0,  0.0,
    10,  0.0,
    10,  2,
    0.0,  2,
 ];
	
let floor_vertex_indices = [
    0,  1,  2,      
    0,  2,  3, 
];
	
let floor_texture_coordinates = [
	0.0,  0.0,
    10,  0.0,
    10,  2,
    0.0,  2,
 ];

var cube_texture_image = "images/square2.png";
var floor_texture_image = "images/sea.png";
var ceiling_texture_image = "images/sea.png";

function generateVerteces() {

  scenery_vertices = [];
  scenery_texture_coordinates = [];
  scenery_vertex_indices = [];
  let last_indeces = 0;
  num_cubes = 0;

  for (let cube in cube_location) {

    let coords = cube.split(","); 
    let x_draw = Number(coords[0]);
    let y_draw = Number(coords[1]);
    let z_draw = Number(coords[2]);

    let options = cube_location[cube].split(",");
    let width = Number(options[0]);
    let height = Number(options[1]);
    let length = Number(options[2]);
    let texture = Number(options[3]);

    if (texture > 0 ) {
    scenery_vertices.push(x_draw);
    scenery_vertices.push(y_draw); 
    scenery_vertices.push(z_draw);

    scenery_vertices.push(x_draw+width); 
    scenery_vertices.push(y_draw); 
    scenery_vertices.push(z_draw);

    scenery_vertices.push(x_draw+width); 
    scenery_vertices.push(y_draw+height); 
    scenery_vertices.push(z_draw);

    scenery_vertices.push(x_draw); 
    scenery_vertices.push(y_draw+height); 
    scenery_vertices.push(z_draw); 

    scenery_vertices.push(x_draw); 
    scenery_vertices.push(y_draw); 
    scenery_vertices.push(z_draw+length);

    scenery_vertices.push(x_draw+width); 
    scenery_vertices.push(y_draw); 
    scenery_vertices.push(z_draw+length);

    scenery_vertices.push(x_draw+width); 
    scenery_vertices.push(y_draw+height); 
    scenery_vertices.push(z_draw+length);

    scenery_vertices.push(x_draw); 
    scenery_vertices.push(y_draw+height); 
    scenery_vertices.push(z_draw+length);

    scenery_vertices.push(x_draw+width); 
    scenery_vertices.push(y_draw); 
    scenery_vertices.push(z_draw+length);

    scenery_vertices.push(x_draw+width); 
    scenery_vertices.push(y_draw); 
    scenery_vertices.push(z_draw);

    scenery_vertices.push(x_draw+width); 
    scenery_vertices.push(y_draw+height);
    scenery_vertices.push(z_draw);

    scenery_vertices.push(x_draw+width); 
    scenery_vertices.push(y_draw+height); 
    scenery_vertices.push(z_draw+length);

    scenery_vertices.push(x_draw); 
    scenery_vertices.push(y_draw); 
    scenery_vertices.push(z_draw+length);

    scenery_vertices.push(x_draw); 
    scenery_vertices.push(y_draw); 
    scenery_vertices.push(z_draw);

    scenery_vertices.push(x_draw); 
    scenery_vertices.push(y_draw+height);
    scenery_vertices.push(z_draw);

    scenery_vertices.push(x_draw); 
    scenery_vertices.push(y_draw+height);
    scenery_vertices.push(z_draw+length);

    scenery_vertices.push(x_draw); 
    scenery_vertices.push(y_draw+height);
    scenery_vertices.push(z_draw+length);

    scenery_vertices.push(x_draw+width); 
    scenery_vertices.push(y_draw+height);
    scenery_vertices.push(z_draw+length);

    scenery_vertices.push(x_draw+width); 
    scenery_vertices.push(y_draw+height);
    scenery_vertices.push(z_draw);
    
    scenery_vertices.push(x_draw); 
    scenery_vertices.push(y_draw+height);
    scenery_vertices.push(z_draw);

    for (let t = 0; t <= 4; t++ ) {
      if (texture == 1) {
        scenery_texture_coordinates.push(0.0);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(0.0);
        scenery_texture_coordinates.push(0.0);
        scenery_texture_coordinates.push(0.0);
      }
      else if (texture == 2) {
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(1.0);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(1.0);
        scenery_texture_coordinates.push(0.0);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(0.0);
      }
      else if (texture == 3) {

        scenery_texture_coordinates.push(0.0);
        scenery_texture_coordinates.push(1.0);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(1.0);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(0.0);
        scenery_texture_coordinates.push(0.5);      
      }
      else if (texture == 4) {
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(1.0);
        scenery_texture_coordinates.push(1.0);
        scenery_texture_coordinates.push(1.0);
        scenery_texture_coordinates.push(1.0);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(0.5);
        scenery_texture_coordinates.push(0.5);
      }
    }

    scenery_vertex_indices.push(last_indeces+0);
    scenery_vertex_indices.push(last_indeces+1);
    scenery_vertex_indices.push(last_indeces+2);
    scenery_vertex_indices.push(last_indeces+0)
    scenery_vertex_indices.push(last_indeces+2);
    scenery_vertex_indices.push(last_indeces+3);
    scenery_vertex_indices.push(last_indeces+4);
    scenery_vertex_indices.push(last_indeces+5);
    scenery_vertex_indices.push(last_indeces+6);
    scenery_vertex_indices.push(last_indeces+4)
    scenery_vertex_indices.push(last_indeces+6);
    scenery_vertex_indices.push(last_indeces+7);
    scenery_vertex_indices.push(last_indeces+8);
    scenery_vertex_indices.push(last_indeces+9);
    scenery_vertex_indices.push(last_indeces+10);
    scenery_vertex_indices.push(last_indeces+8)
    scenery_vertex_indices.push(last_indeces+10);
    scenery_vertex_indices.push(last_indeces+11);
    scenery_vertex_indices.push(last_indeces+12);
    scenery_vertex_indices.push(last_indeces+13);
    scenery_vertex_indices.push(last_indeces+14);
    scenery_vertex_indices.push(last_indeces+12)
    scenery_vertex_indices.push(last_indeces+14);
    scenery_vertex_indices.push(last_indeces+15);
    scenery_vertex_indices.push(last_indeces+16);
    scenery_vertex_indices.push(last_indeces+17);
    scenery_vertex_indices.push(last_indeces+18);
    scenery_vertex_indices.push(last_indeces+16)
    scenery_vertex_indices.push(last_indeces+18);
    scenery_vertex_indices.push(last_indeces+19);

    last_indeces += 20;   
    num_cubes++;   
  }
  }
}

function generateBuffers(data,data_type) {
  let buffer_object = gl.createBuffer(); 
  
  if (data_type == "ARRAY_BUFFER") {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_object);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  }
  else {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer_object);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
  }
  return buffer_object;
}

function initBuffers() { // Load scenery data ( from models.js and level_*.js files ) into the various buffers to make the 3D models

  sceneryVerticesBuffer = generateBuffers(scenery_vertices,"ARRAY_BUFFER");
  sceneryVerticesTextureCoordBuffer = generateBuffers(scenery_texture_coordinates,"ARRAY_BUFFER");
  sceneryVerticesIndexBuffer = generateBuffers(scenery_vertex_indices,"ELEMENT_ARRAY_BUFFER");
  floorVerticesBuffer = generateBuffers(floor_vertices,"ARRAY_BUFFER"); 
  floorVerticesTextureCoordBuffer = generateBuffers(floor_texture_coordinates,"ARRAY_BUFFER");
  floorVerticesIndexBuffer = generateBuffers(floor_vertex_indices,"ELEMENT_ARRAY_BUFFER");
  ceilingVerticesBuffer = generateBuffers(ceiling_vertices,"ARRAY_BUFFER"); 
  ceilingVerticesTextureCoordBuffer = generateBuffers(ceiling_texture_coordinates,"ARRAY_BUFFER");
  ceilingVerticesIndexBuffer = generateBuffers(ceiling_vertex_indices,"ELEMENT_ARRAY_BUFFER");
}

function PrepareGameTextures(image_to_use,texture_image_number) {

  game_texture[texture_image_number] = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, game_texture[texture_image_number]);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255])); // red
  game_image[texture_image_number] = new Image();
  game_image[texture_image_number].src = image_to_use;
  game_image[texture_image_number].onload = function() { handleTextureLoaded(game_image[texture_image_number], game_texture[texture_image_number]); }
}

function initTextures() {
  PrepareGameTextures(cube_texture_image,5);
  PrepareGameTextures(floor_texture_image,6);
  PrepareGameTextures(ceiling_texture_image,11);  
}

function handleTextureLoaded(image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

function initWebGL() {

//
// initWebGL
//
// Initialize WebGL, returning the GL context or null if
// WebGL isn't available or could not be initialized.
//

  gl = null;
  
  try {   

    gl = canvas.getContext("webgl2", {
      alpha: false,  // true could potentially slow down some browsers
      antialias: true, // true can cause flicker on some browsers
      preserveDrawingBuffer: false, // true is expensive and might hurt browser performance
      premultipliedAlpha: true,
      desynchronized: true, // hint; Safari may ignore
    });

  }
  catch(e) {
  }
  
  // If we don't have a GL context, give up now
  
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
  }
}

// Loads a shader program by scouring the current document,
// looking for a script with the specified ID.
//
function getShader(gl, id) {
  let shaderScript = document.getElementById(id);
  
  // Didn't find an element with the specified ID; abort.
  
  if (!shaderScript) {
    return null;
  }
  
  // Walk through the source elements building the shader source string.
  
  let theSource = "";
  let currentChild = shaderScript.firstChild;
  
  while(currentChild) {
    if (currentChild.nodeType == 3) {
      theSource += currentChild.textContent;
    }
    
    currentChild = currentChild.nextSibling;
  }
  
  // Now figure out what type of shader script we have based on its MIME type.
  
  let shader;
  
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;  // Unknown shader type
  }
  
  // Send the source to the shader object
  
  gl.shaderSource(shader, theSource);
  
  // Compile the shader program
  
  gl.compileShader(shader);
  
  // See if it compiled successfully
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    return null;
  }
  
  return shader;
}

// Initialize the shaders, so WebGL knows how to light our scene.
function initShaders() {
  let fragmentShader = getShader(gl, "shader-fs");
  let vertexShader = getShader(gl, "shader-vs");
  
  // Create the shader program
  
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  
  // If creating the shader program failed, alert
  
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }
  
  gl.useProgram(shaderProgram);
  
  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);
  
  textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
  gl.enableVertexAttribArray(textureCoordAttribute);
}


function DrawScenery() {

  mvPushMatrix();
  
  var x = 0;
  var z = 0;
  
  mvTranslate([x,0,z]);

  gl.bindBuffer(gl.ARRAY_BUFFER, sceneryVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, game_texture[5]); // was cubeTexture
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, sceneryVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sceneryVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 30 * num_cubes, gl.UNSIGNED_SHORT, 0);

  mvPopMatrix();
}

function DisplayFloorCeiling() {

  mvPushMatrix();
  
  mvTranslate([0,0,0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, floorVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, game_texture[6]);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, floorVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, floorVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, ceilingVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, game_texture[6]);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, ceilingVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ceilingVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  mvPopMatrix();
}

function DrawMessage(id) { 

  mvPushMatrix();
  mvTranslate([0, -10, 50]);
  gl.bindBuffer(gl.ARRAY_BUFFER, spriteVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, powerupTexture);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, powerupVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, spriteVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 30, gl.UNSIGNED_SHORT, 0);
  mvPopMatrix();
}
