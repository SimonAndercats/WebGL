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

// Section 1: Define Game Variables
let canvas;
let gl;
let movementMatrix = [];
let matrixStack = [];
let shaderProgram;
let vertexPositionAttribute;
let textureCoordAttribute;
let phase_of_game = "game";
let score = 0;
let level = 0;
let character_image = ["images/sprite1.png","images/sprite2.png", "images/sprite3.png", "images/sprite3.png"];
let cube_texture_image = "images/floor.png";
let floor_texture_image = "images/sand.png";
let sea_texture_image = "images/sea.png";
let characters_x = [770,990,1010,1050,1290,1290,1320,1360,1500,1700,1900,1500,1500,1700,1900,1500,1500,1700,1900,1500,80,80];
var characters_y = [10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
var characters_z = [1170,1180,1380,1530,1210,1370,1370,970,600,800,1000,1400,1600,1800,2000,2200,100,200,300,400,1800,1600];
var characters_texture = [0,2,1,2,1,2,1,2,0,1,2,0,1,2,1,1,1,2,1,2,1,1];
var characters_health = [3,3,3,3,3,3,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var characters_direction = [102.497943080695,109.60901697381149,130.47990468322087,143.3175548244551,143.64302287796437,158.43356403394085,162.8587533471386,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0];
var cube_location = {"850,0,1000" : "400,10,400,4","530,0,1000" : "10,10,10,4","490,0,1000" : "10,10,10,4","410,0,1000" : "10,10,10,4","430,0,1000" : "10,10,10,4","450,0,1000" : "400,10,400,4","450,0,1400" : "400,10,400,4","850,0,1400" : "400,10,400,4","860,0,1400" : "10,10,10,4","550,0,1280" : "10,10,10,4","550,10,1270" : "400,30,400,4","800,0,1310" : "60,50,270,4","1540,0,930" : "220,10,400,4","1600,0,1000" : "130,30,240,4","20,0,1030" : "220,10,400,4","-30,0,610" : "400,30,320,4","260,0,710" : "10,10,10,0","170,0,710" : "170,60,200,4","80,0,710" : "10,10,10,0","200,0,710" : "10,10,10,0","190,0,710" : "10,10,10,0","150,0,710" : "10,10,10,0","210,0,710" : "10,10,10,0","230,0,710" : "10,10,10,0","250,0,710" : "10,10,10,0","250,0,740" : "60,90,120,4","890,0,450" : "10,10,10,0","660,0,450" : "400,10,400,4","730,0,540" : "250,30,240,4",};
let x_location = -1680;
let z_location = -1080;
let y_location = -20;
let camera_angle = 260;
let sceneryVerticesBuffer;
let sceneryVerticesTextureCoordBuffer;
let sceneryVerticesIndexBuffer;
let floorVerticesBuffer;
let seaVerticesBuffer;
let floorVerticesTextureCoordBuffer;
let floorVerticesIndexBuffer;
let spriteVerticesBuffer;
let spriteTallVerticesBuffer;
let spriteVerticesTextureCoordBuffer;
let spriteVerticesIndexBuffer;
let game_texture = [];
let game_image = [];
let floorImage;
let cubeImage;
let spriteImage = [];
let floorTexture;
let cubeTexture;
let spriteTexture = [];
let scenery_vertices = [];
let scenery_texture_coordinates = [];
let scenery_vertex_indices = [];
let num_cubes = 0;
let player_speed = 1.0;
let acceleration = 0;
let player_rotation_speed = 0.01;
let rotation_acceleration = 0;
let camera_rotation_direction = 1;
let y_camera_angle = 0;
let rotate_direction = 3;
let movement_direction = 0;
let level_just_loaded = true;
let frames = 0;
let fps = 0;

// Section 2: Define the simpler graphic models
let sprite_vertices = [
    // Front face
    -6, 0,  1,
     6, 0,  1,
     6,  34,  1,
    -6,  34,  1,
    // Back face
    -6, 0, -1,
    -6,  34, -1,
     6,  34, -1,
     6, -0, -1,
    // Right face
     6, 0, -1,
     6,  34, -1,
     6,  34,  1,
     6, 0,  1,
    // Left face
    -6, 0, -1,
    -6, 0,  1,
    -6,  34,  1,
    -6,  34, -1,
    // Top face
    -6, 34, -1,
    6, 34, -1,
    6, 34,  1,
    -6, 34,  1,
];

let sprite_texture_coordinates = [

    0.0,  1.0,
    0.5,  1.0,
    0.5,  0.0,
    0.0,  0.0,
    
    0.5,  1.0,
    0.5,  0.0,
    1.0,  0.0,
    1.0,  1.0,
	
    0.5,  1.0,
    0.5,  0.0,
    1.0,  0.0,
    1.0,  1.0,
	
    0.5,  1.0,
    1.0,  1.0,
    1.0,  0.0,
    0.5,  0.0,
	
    0.0,  0.0,
    0.1,  0.0,
    0.1,  0.1,
    0.0,  0.1,
 ];
 
 let sprite_vertex_indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,    // left
];

let floor_vertices = [
    -500, 0, 0,
    2000, 0, 0,
    2000, 0, 2600,
    -500, 0,  2600,
];

let sea_vertices = [
    -4500, -5, -1000,
    4500, -5, -1000,
    4500, -5, 4000,
    -4500, -5,  4000,
];

	
let floor_vertex_indices = [
    0,  1,  2,      
    0,  2,  3, 
];
	
let floor_texture_coordinates = [
	0.0,  0.0,
    12,  0.0,
    12,  12,
    0.0,  12,
 ];

// Section 3: Attach inputs such as keyboard ( we add mouse, etc here )
window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyUnPressed, false);

// Section 4: Initiate the game ( this start() function was called on the index.html page )
function start() { 

  canvas = document.getElementById("glcanvas");
  canvas.width = window.innerWidth - 10;
  canvas.height = window.innerHeight - 10;
  
  initWebGL(canvas); // Initialize the GL context. Let the magic begin!
 
  // Only continue if WebGL is available and working in this browser
  if (gl) {
	  
    gl.clearColor(0.5, 0.8, 0.9, 1.0);  // Blue sky, fully opaque
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
    setInterval(GraphicsLoop, 5); 

    // Set another interval to handle gameplay
    setInterval(function() { GameplayLoop() }, 4);

    setInterval(function() { FrameMonitor() }, 1000);
  }
}

// Section 5: for every frame refresh run this ( if we can handle 60 FPS then that is how many times this is called per second )
function GraphicsLoop() {

  // Clear the canvas before we start drawing on it
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Set the drawing position to the "identity" matrix, which is the center of the scene.
  loadIdentity();

  // Position the scene so the player sees it from the angle we wish
	moveRotate(0, [1, 0, 0]);
  moveRotate(y_camera_angle, [1, 0, 0]);
  moveRotate(camera_angle, [0, 1, 0]);
  moveTranslate([x_location, y_location, z_location]);
  DrawScenery();
  DrawCharacters();
  DisplayFloorCeiling();
  frames++;
}

function FrameMonitor() {
  fps = frames;
  frames = 0;
  UpdateStats();

  if (fps < 50) {
    phase_of_game = "pause";
    document.getElementById('framerate').style.visibility = 'visible';
    document.getElementById('gamemenu').style.visibility = 'hidden';
  }
  else {
    if (phase_of_game == "pause")
      phase_of_game = "game";
      document.getElementById('framerate').style.visibility = 'hidden';
  }
}

// Section 6: the game logic ( like moving characters around ) - put all game logic here
function GameplayLoop() {
  if (phase_of_game == "game") {
    ControlPlayerMovement();
    ControlCharacters(phase_of_game);
    AreYouOrSpriteStandingOnACube();
  }
}

// Section 7: player controls ( in this example we are just using keyboard controls )

function checkKeyUnPressed(e) {
  
  // Note the keyCodes are ASCII codes
  if (e.keyCode == "37") {
    rotate_direction = 0;
    player_rotation_speed = 0.01;
  }
  if (e.keyCode == "39") {
    rotate_direction = 0;
    player_rotation_speed = 0.01;
  }
  if (e.keyCode == "40") {
    movement_direction = 0;
  }
  if (e.keyCode == "38") {
    movement_direction = 0;
  }
  if (e.keyCode == "87") {
    movement_direction = 0;
  }
  if (e.keyCode == "83") {
    movement_direction = 0;
  } 
  if (e.keyCode == "41") {
    movement_direction = 0;
  }
  if (e.keyCode == "44") {
    movement_direction = 0;
  }
  if (e.keyCode == "65") {
    rotate_direction = 0;
    player_rotation_speed = 0.01;
  }
  if (e.keyCode == "68") {
    rotate_direction = 0;
    player_rotation_speed = 0.01;
  }
  if (e.keyCode == "188") {
    movement_direction = 0;
  }
  if (e.keyCode == "190") {
    movement_direction = 0;
  }
  if (e.keyCode == "79") {
    movement_direction = 0;
  }
  if (e.keyCode == "76") {
    movement_direction = 0;
  }
} 
  
function checkKeyPressed(e) {
  
  if (e.keyCode == "37") {
    rotate_direction = 1;
  }
  if (e.keyCode == "188") { // angled bracket key left
    movement_direction = 3;  // move left ( not rotate )
  }
  if (e.keyCode == "190") { // angled bracket key right
    movement_direction = 4; // move right ( not rotate )
  }
  if (e.keyCode == "79") {
    movement_direction = 5;
  }
  if (e.keyCode == "76") {
    movement_direction = 6;
  }
  if (e.keyCode == "65") {
    rotate_direction = 1;
  }
  if (e.keyCode == "68") {
    rotate_direction = 2;
  }
  if (e.keyCode == "87") {
    movement_direction = 1;
  }
  if (e.keyCode == "38") {
    movement_direction = 1;
  }
  if (e.keyCode == "40") {
    movement_direction = 2;
  }
  if (e.keyCode == "83") {
    movement_direction = 2;
  }
  if (e.keyCode == "39") {
    rotate_direction = 2;
  }
}

function ControlPlayerMovement() {

    if (movement_direction>0) {
      acceleration+=0.01;
      if (acceleration>1.5)
        acceleration=1.5;
    }
    else {
      acceleration-=0.1;
      if (acceleration<0)
        acceleration=0;
    }
    
    if (rotate_direction>0) {
      rotation_acceleration+=0.01;
      if (rotation_acceleration > 1.0)
        rotation_acceleration = 1.0;
    }
    else {
      rotation_acceleration-=0.2;
      if (rotation_acceleration<0)
        rotation_acceleration=0;
    }

    if (movement_direction == 2) {
    
      let camera_angle_in_radians = camera_angle * 0.0174532925;
      let x_probable = x_location;
      let z_probable = z_location;
    
      x_probable += Math.sin( camera_angle_in_radians ) * (player_speed+acceleration);
      z_probable -= Math.cos( camera_angle_in_radians ) * (player_speed+acceleration);
    
      if (CollisionDetection(x_probable*-1,(y_location+20)*-1,z_location*-1) == false)
        x_location = x_probable;
            
      if (CollisionDetection(x_location*-1,(y_location+20)*-1,z_probable*-1) == false)
        z_location = z_probable;
    }
    
    if (movement_direction == 1) {
    
      let camera_angle_in_radians = camera_angle * 0.0174532925;
      let x_probable = x_location;
      let z_probable = z_location;

      x_probable -= Math.sin( camera_angle_in_radians ) * (player_speed+acceleration);
      z_probable += Math.cos( camera_angle_in_radians ) * (player_speed+acceleration);
    
      if (CollisionDetection(x_probable*-1,(y_location+20)*-1,z_location*-1) == false)
        x_location = x_probable;
            
      if (CollisionDetection(x_location*-1,(y_location+20)*-1,z_probable*-1) == false)
        z_location = z_probable;
    } 

    if (movement_direction == 3) { // Move left
    
      let camera_angle_in_radians = (camera_angle-90) * 0.0174532925;
      let x_probable = x_location;
      let z_probable = z_location;
    
      x_probable -= Math.sin( camera_angle_in_radians ) * (player_speed+acceleration);
      z_probable += Math.cos( camera_angle_in_radians ) * (player_speed+acceleration);
    
      if (CollisionDetection(x_probable*-1,(y_location+20)*-1,z_location*-1) == false )
        x_location = x_probable;
            
      if (CollisionDetection(x_location*-1,(y_location+20)*-1,z_probable*-1) == false )
        z_location = z_probable;
    } 

    if (movement_direction == 4) { // move right
    
      let camera_angle_in_radians = (camera_angle + 90) * 0.0174532925;
      let x_probable = x_location;
      let z_probable = z_location;
    
      x_probable -= Math.sin( camera_angle_in_radians ) * (player_speed+acceleration);
      z_probable += Math.cos( camera_angle_in_radians ) * (player_speed+acceleration);
    
      if (CollisionDetection(x_probable*-1,(y_location+20)*-1,z_location*-1) == false )
        x_location = x_probable;
            
      if (CollisionDetection(x_location*-1,(y_location+20)*-1,z_probable*-1) == false )
        z_location = z_probable;
    } 

    if (rotate_direction == 1) {
      camera_angle-=(player_rotation_speed + rotation_acceleration);

      if (camera_angle < 0)
        camera_angle = 360;
    }
    else if (rotate_direction == 2) {
      camera_angle+=(player_rotation_speed + rotation_acceleration);
      if (camera_angle > 360)
        camera_angle = 0;
    }
}


// Section 8: deciding where to stuff is drawn on the screen ( the WebGL drawing mechanics which is in Section 14 )
function DrawCharacters() {

  for (var character_no = 0; character_no < characters_x.length; character_no++) { 

    if (characters_health[character_no] > -200 ) {

	    DrawSprite(characters_x[character_no],
                 characters_y[character_no], 
                 characters_z[character_no],
                 characters_texture[character_no],
                 characters_direction[character_no],
                 0);
    }
  }
}

function DrawScenery() {

  movePushMatrix();
  
  var x = 0;
  var z = 0;
  
  moveTranslate([x,0,z]);

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

  movePopMatrix();
}

function DisplayFloorCeiling() {

  movePushMatrix();
  
  moveTranslate([0,0,0]);

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


  gl.bindBuffer(gl.ARRAY_BUFFER, floorVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, game_texture[4]);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, seaVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, floorVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

  /*gl.bindBuffer(gl.ARRAY_BUFFER, floorVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, game_texture[6]);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);*/
 
  movePopMatrix();
}

function DrawSprite(x,y,z,texture,direction,spin) { 

  movePushMatrix();
  moveTranslate([x, y, z]);

  moveRotate(direction, [0, 1, 0]);
  moveRotate(spin, [1, 0, 0]);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, spriteVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);

  gl.bindTexture(gl.TEXTURE_2D, game_texture[texture]);

  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, spriteVerticesBuffer);

  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, spriteVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 30, gl.UNSIGNED_SHORT, 0);
 
  movePopMatrix();
}

// Section 9: game logic, such as moving characters around, handling collision detection, updating the stats and sound
function ControlCharacters(phase_of_game) {
  
  if (phase_of_game == "game" ) {
  
    for (var character_no = 0; character_no < characters_x.length; character_no++) {

      var angle_to_move_in = AngleToTarget(characters_x[character_no], characters_z[character_no], x_location*-1, z_location*-1);

      characters_direction[character_no] = angle_to_move_in - 180;
      if (characters_direction[character_no]<0)
        characters_direction[character_no] = 360 + characters_direction[character_no];
      }    
    }
  }

function AreYouOrSpriteStandingOnACube() {

  for (let sprite_no = 0; sprite_no < characters_x.length; sprite_no++) {

    characters_y[sprite_no] = 0;

    for (cube in cube_location) {

      let first_corner = cube.split(",");
      let cube_x = Number(first_corner[0]);
      let cube_y = Number(first_corner[1]);
      let cube_z = Number(first_corner[2]);
      let options = cube_location[cube].split(",");
      let width = Number(options[0]);
      let height = Number(options[1]);
      let length = Number(options[2]);
      let texture = Number(options[3]);

      if ( characters_x[sprite_no] >= cube_x - 10 && characters_x[sprite_no] <= cube_x + width + 10 &&
        characters_z[sprite_no] >= cube_z - 10 && characters_z[sprite_no] <= cube_z + length + 10 && texture == 4) {
        characters_y[sprite_no] = (height);
      }
    }
  }

  // Note: the player coordinates are inverted from the scenery because of the way movement is achieved
  let your_x = x_location * -1;
  let your_z = z_location * -1;
  y_location = -20;

  for (cube in cube_location) {

    let first_corner = cube.split(",");
    let cube_x = Number(first_corner[0]);
    let cube_y = Number(first_corner[1]);
    let cube_z = Number(first_corner[2]);
    let options = cube_location[cube].split(",");
    let width = Number(options[0]);
    let height = Number(options[1]);
    let length = Number(options[2]);
    let texture = Number(options[3]);

    if ( your_x >= cube_x - 10 && your_x <= cube_x + width + 10 &&
      your_z >= cube_z - 10 && your_z <= cube_z + length + 10 &&
      texture == 4) {
        y_location = (height + 20) * -1;
      }            
    }
  }
  
  function CollisionDetection(x,y,z) {
    // Check against leaving the game area
    if (x >= -400 && x < 1880 && z >= 200 && z <= 2500) {
      return false;
    }
    return true;
  }

  function AngleToTarget( sourceX, sourceZ, targetX, targetZ ) {

    var radiansToDegrees = 57.295779513082320876798154814105;
    // Calculate the angle ( in radians ) that source object would need to travel in to get to target object
    var radians = 0;
    var xLength = sourceX - targetX;
    var zLength = sourceZ - targetZ;
  
    if ( xLength > 0 && zLength > 0 ) {
      radians = Math.atan( xLength / zLength );
    }
    else if ( xLength > 0 && zLength < 0 ) {
      zLength *= -1;
      radians = Math.atan( zLength / xLength ) + 1.57079633;
    }
    else if ( xLength < 0 && zLength < 0 ) {
      xLength *= -1;
      zLength *= -1;
      radians = Math.atan( xLength / zLength ) + 3.14159265;
    }
    else if ( xLength < 0 && zLength > 0 ) {
      xLength *= -1;
      radians = Math.atan( zLength / xLength ) + 4.71238898;
    }
    else if ( xLength == 0 && zLength > 0 ) {
      radians = 0;
    }
    else if ( xLength > 0 && zLength == 0 ) {
      radians = 1.57079633;
    }
    else if ( xLength == 0 && zLength < 0 ) {
      radians = 3.14159265;
    }
    else if ( xLength < 0 && zLength == 0 ) {
      radians = 4.71238898;
    }
  return ( radians * radiansToDegrees );
}

function distanceBetweenPoints(x1,x2,z1,z2) {
  var x = x1 - x2;
  var z = z1 - z2;

  return Math.sqrt((x*x)+(z*z));
}

function UpdateStats() {

  document.getElementById("xlocation").value = x_location;
  document.getElementById("fps").value = fps;
  document.getElementById("zlocation").value = z_location;
}

// Section 10: Matrics - these functions manipulate the matrices that decide where to draw things in the 3D world

function multiplyMatrices(a, b) {

  const result = Array(4).fill().map(() => Array(4).fill(0));

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

function translateMatrix(vector,current_location_metrix) {

  let new_location_matrix = [[1,0,0,vector[0],],
                             [0,1,0,vector[1],],
                             [0,0,1,vector[2],],
                             [0,0,0,1]];

  return multiplyMatrices(current_location_metrix, new_location_matrix ); 
}

function rotateMatrix(angle, axis, current_location_metrix) {

  // Ensure axis is normalized
  let length = Math.hypot(axis[0], axis[1], axis[2]);
  let x = axis[0] / length;
  let y = axis[1] / length;
  let z = axis[2] / length;

  let c = Math.cos(angle);
  let s = Math.sin(angle);
  let t = 1 - c;

  let rotate_matrix = [
    [t*x*x + c,     t*x*y - z*s,   t*x*z + y*s,   0],
    [t*x*y + z*s,   t*y*y + c,     t*y*z - x*s,   0],
    [t*x*z - y*s,   t*y*z + x*s,   t*z*z + c,     0],
    [0,             0,             0,             1]
  ];

  return multiplyMatrices(current_location_metrix, rotate_matrix );
}

// Many of the GL functions required flattened matrices ( just an array ) and so this is useful for that
function flattenMatrix(multi_dimentional_matrix) {
    let result = [];
    for (let j = 0; j < multi_dimentional_matrix[0].length; j++)
        for (let i = 0; i < multi_dimentional_matrix.length; i++)
            result.push(multi_dimentional_matrix[i][j]);
    return result;
}

function createPerspective(fovy, aspect, znear, zfar) {
    let ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    let ymin = -ymax;
    let xmin = ymin * aspect;
    let xmax = ymax * aspect;
    let X = 2*znear/(xmax-xmin);
    let Y = 2*znear/(ymax-ymin);
    let A = (xmax+xmin)/(xmax-xmin);
    let B = (ymax+ymin)/(ymax-ymin);
    let C = -(zfar+znear)/(zfar-znear);
    let D = -1; 

    let perspective_matrix = flattenMatrix([[X, 0, A, 0],
                              [0, Y, B, 0],
                              [0, 0, C, D],
                              [0, 0, -1, 0]]);

    return perspective_matrix;
}

function loadIdentity() {

  movementMatrix =  [[1,0,0,0,],
                  [0,1,0,0,],
                  [0,0,1,0,],
                  [0,0,0,1]
                 ];
}

function moveTranslate(v) {
  movementMatrix = translateMatrix(v,movementMatrix);
}

function setMatrixUniforms() {
  let mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flattenMatrix(movementMatrix)));
}

function movePushMatrix() {
    let duplicate = movementMatrix;
    matrixStack.push(duplicate);
}

function movePopMatrix() {
  if (!matrixStack.length) {
    throw("Can't pop from an empty matrix stack.");
  }
  movementMatrix = matrixStack.pop();
}

function moveRotate(angle, v) {

  let inRadians = angle * Math.PI / 180.0;
  movementMatrix = rotateMatrix(inRadians,v,movementMatrix);
}


// Section 11: create the more complex models - to avoid having huge vectors ( arrays ) of model data to describe the scenery we define what we want at the beginning and this code generates all the data

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

// Section 12: Buffers - the OpenGL routines need everything in buffers ( we cannot just give them arrays ) and so these functions convert our data into buffers

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
  spriteVerticesBuffer = generateBuffers(sprite_vertices,"ARRAY_BUFFER");
  spriteVerticesTextureCoordBuffer = generateBuffers(sprite_texture_coordinates,"ARRAY_BUFFER");
  spriteVerticesIndexBuffer = generateBuffers(sprite_vertex_indices,"ELEMENT_ARRAY_BUFFER");
  floorVerticesBuffer = generateBuffers(floor_vertices,"ARRAY_BUFFER"); 
  seaVerticesBuffer = generateBuffers(sea_vertices,"ARRAY_BUFFER");
  floorVerticesTextureCoordBuffer = generateBuffers(floor_texture_coordinates,"ARRAY_BUFFER");
  floorVerticesIndexBuffer = generateBuffers(floor_vertex_indices,"ELEMENT_ARRAY_BUFFER");
  
}

// Section 13: texture handler - we want to wrap the models in our game with textures. This code converts the image data into the textures

function PrepareGameTextures(image_to_use,texture_image_number) {

  game_texture[texture_image_number] = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, game_texture[texture_image_number]);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255])); // red
  game_image[texture_image_number] = new Image();
  game_image[texture_image_number].src = image_to_use;
  game_image[texture_image_number].onload = function() { handleTextureLoaded(game_image[texture_image_number], game_texture[texture_image_number]); }
}

function initTextures() {
  PrepareGameTextures(character_image[0],0);
  PrepareGameTextures(character_image[1],1);
  PrepareGameTextures(character_image[2],2);
  PrepareGameTextures(sea_texture_image,4);
  PrepareGameTextures(cube_texture_image,5);
  PrepareGameTextures(floor_texture_image,6);
  
}

function handleTextureLoaded(image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

// Section 14: WebGL - this is where the magic happens. Everything beforehand was preparation.
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

