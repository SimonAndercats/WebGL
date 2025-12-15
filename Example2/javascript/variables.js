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

let x_location = -1200;
let z_location = -1400;
let camera_angle = 30;
let reversed_camera_angle = 30;
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
let character_active_range = 500;
let character_damage = 1;
let item_length = 10;
let item_height = 10;
let item_width = 10;
let item_texture = 1;
let shoot_projectile = false;
let projectile_collected_count = 100;
let projectile_distance = [];
let your_projectile_x = [];
let your_projectile_y = [];
let your_projectile_z = [];
let your_projectile_active = [];
let your_projectile_angle = [];
let projectile_damage = 1;
let projectile_spin = 0;
let how_much_ammo = 500;
let magazine_size = 10;
let player_speed = 1.0;
let acceleration = 0;
let player_rotation_speed = 0.01;
let rotation_acceleration = 0;
let camera_rotation_direction = 1;
let y_camera_angle = 0;
let rotate_direction = 3;
let movement_direction = 0;
let x_your_character = x_location;
let y_your_character = -100;
let z_your_character = z_location;
let y_location = -20;
let health = 500;
let difficulty_delay_powerup = 5;
let powerup_spin = 0;
let delay_til_next_powerup = difficulty_delay_powerup;
let damage = 0;
let powerup_requirement = 1; 
let powerup_count = 0;
let level_just_loaded = true;
let sceneryVerticesBuffer;
let sceneryVerticesTextureCoordBuffer;
let sceneryVerticesIndexBuffer;
let floorVerticesBuffer;
let floorVerticesTextureCoordBuffer;
let floorVerticesIndexBuffer;
let ceilingVerticesBuffer;
let ceilingVerticesTextureCoordBuffer;
let ceilingVerticesIndexBuffer;
let spriteVerticesBuffer;
let spriteVerticesTextureCoordBuffer;
let spriteVerticesIndexBuffer;
let projectileVerticesBuffer;
let powerupVerticesBuffer;
let doorVerticesBuffer;
let game_texture = [];
let game_image = [];
let floorImage;
let cubeImage;
let powerupImage;
let ceilingImage;
let spriteImage = [];
let projectileImage;
let doorImage;
let floorTexture;
let powerupTexture;
let keyTexture;
let projectileTexture;
let doorTexture;
let cubeTexture;
let spriteTexture = [];
let ceilingTexture;
let scenery_vertices = [];
let scenery_texture_coordinates = [];
let scenery_vertex_indices = [];
let num_cubes = 0;
let character_image = [ "images/zombie_green.png","images/zombie_green.png","images/zombie_green.png","images/zombie_orange.png","images/zombie_orange.png" ];
let cube_texture_image = "images/square.png";
let floor_texture_image = "images/sea.png";
let ceiling_texture_image = "images/sea.png";
let powerup_texture_image = "images/powerup1.png";
let projectile_texture_image = "images/projectile.png";
let door_texture_image = "images/gate.png";
let cube_location = {"1070,0,1490" : "10,10,10,0","1150,0,1490" : "10,10,10,0","1120,0,1490" : "10,10,10,0","1100,0,1490" : "400,50,10,1","1100,0,1190" : "10,10,10,0","1100,0,1130" : "10,10,10,0","1100,0,1110" : "10,10,10,0","1100,0,1100" : "10,10,10,0","1100,0,1090" : "10,50,400,1","1110,0,1090" : "10,10,10,0","1320,0,1090" : "10,10,10,0","1390,0,1090" : "110,110,10,1","1380,0,1090" : "10,10,10,0","1510,0,1090" : "10,10,10,0","1500,0,1090" : "10,50,400,1","1310,0,410" : "10,10,10,0","1310,0,520" : "10,10,10,0","1310,0,710" : "10,10,10,0","1310,0,690" : "10,10,10,0","1300,0,690" : "10,110,400,1","1490,0,690" : "10,100,400,1","1490,0,230" : "10,10,10,0","1490,0,260" : "10,10,10,0","1490,0,270" : "10,10,10,0","1490,0,280" : "10,10,10,0","1490,0,290" : "10,80,400,2","1130,0,290" : "10,10,10,0","1100,0,290" : "10,10,10,0","1090,0,290" : "400,110,10,3","1090,0,300" : "10,100,400,3","840,0,700" : "10,10,10,0","740,0,700" : "10,10,10,0","700,0,700" : "400,30,10,1","710,0,840" : "10,10,10,0","700,0,840" : "400,100,10,1","1110,0,840" : "10,10,10,0","1100,0,840" : "200,50,10,1","690,0,840" : "10,100,400,1","690,0,1240" : "10,10,10,0","290,0,1240" : "10,10,10,0","300,0,1240" : "400,110,10,1","30,0,1240" : "270,100,10,3","30,0,870" : "10,10,10,0","30,0,810" : "10,10,10,0","30,0,830" : "10,10,10,0","30,0,840" : "10,60,400,1","40,0,840" : "400,110,10,1","440,0,840" : "10,100,90,1","440,0,940" : "10,10,10,0","440,0,930" : "150,100,10,1","650,0,930" : "10,10,10,0","660,0,930" : "30,100,10,1","660,0,700" : "10,10,10,0","340,0,700" : "10,10,10,0","310,0,700" : "10,10,10,0","300,0,700" : "400,80,10,1","30,0,700" : "190,110,10,1","30,0,400" : "10,10,10,0","30,0,390" : "10,10,10,0","40,0,390" : "10,10,10,0","30,0,380" : "10,100,320,1","40,0,380" : "400,100,10,2","50,0,380" : "10,10,10,0","50,0,390" : "10,10,10,0","450,0,380" : "10,10,10,0","440,0,380" : "10,100,320,2","60,0,720" : "10,10,10,0","60,0,710" : "10,40,130,1","1120,0,1110" : "10,10,10,0","1120,0,1100" : "10,10,10,0","1120,0,1090" : "10,10,10,0","1130,0,1100" : "10,10,10,0","1110,0,1100" : "10,10,10,0","1110,0,1080" : "190,100,10,1","1380,0,1100" : "10,10,10,0",};
let characters_x = [800,1390,1290,1450,1200,1080,710,630,150,150,150,150,310,160];
let characters_y = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let characters_z = [800,420,470,560,800,800,750,840,990,1160,760,500,500,790];
let characters_texture = [2,1,1,2,2,2,2,1,2,1,1,1,2,3];
let characters_health = [1,1,1,1,1,1,1,1,1,1,1,1,1,1];
let characters_direction = [274.2740085419617,292.5352609015962,292.06510561769517,284.43984925598704,272.132953197632,272.5103661153445,284.5356742034583,267.4057825561545,122.3974031158545,142.59057899020632,74.57590329532579,37.46007367460689,15.69151402575261,80.70757996765207];
let characters_spin = [1,0,0,0,0,0,0,0,0,0,0,0,0,0];
let characters_hurting_countdown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let characters_active = [false,false,false,false,false,false,false,false,false,false,false,false,false,false];
let characters_projectile_x = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let characters_projectile_y = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let characters_projectile_z = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let characters_projectile_active = [false,false,false,false,false,false,false,false,false,false,false,false,false];
let characters_projectile_direction = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let characters_projectile_distance = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let powerup_x = [1370,1180,1390,1180,1110,500,660,270,310,160];
let powerup_y = [0,0,0,0,0,0,0,0,0,0];
let powerup_z = [1220,1320,610,540,770,860,790,1030,570,790];
let powerup_type = [1,1,1,1,1,1,1,1,1,1];
let powerup_active = [true,true,true,true,true,true,true,true,true,false];
let powerup_collected = [true,true,true,true,true,true,true,false,false,false];
let door_x = [260,620,1350];
let door_y = [1.806174810547624,0.27820874301140464,0.7842290796777007];
let door_z = [700,930,1090];
let door_texture = [1,1,1];
let door_opened = [false,false,false];
let door_key = [false,false,false];
let finish_x = 310;
let finish_z = 570;
let characters_spin_distance = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let characters_lives = [1,1,1,1,1,1,1,1,1,1,1,1,1,];

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

let door_vertices = [

    // Front face
    -40, 0,  2,
     40, 0,  2,
     40,  100,  2,
    -40,  100,  2,
    // Back face
    -40, 0,  -2,
    -40,  100,-2,
     40,  100,-2,
     40, -0, -2,
    // Right face
     40, 0, -2,
     40,  100, -2,
     40,  100,  2,
     40, 0,  2,
    // Left face
    -40, 0, -2,
    -40, 0,  2,
    -40,  100,  2,
    -40,  100, -2,
    // Top face
    -40, 100, -2,
    40, 100, -2,
    40, 100,  2,
    -40, 100,  2,
];

let projectile_vertices = [

    // Front face
    -3, -1.0,  3,
    3, -1.0,  3,
    3,  1.0,  3,
    -3,  1.0,  3,
    // Back face
    -3, -1.0, -3,
    -3,  1.0, -3,
    3,  1.0, -3,
    3, -1.0, -3,
    // Right face
    3, -1.0, -3,
    3,  1.0, -3,
    3,  1.0,  3,
    3, -1.0,  3,
    // Left face
    -3, -1.0, -3,
    -3, -1.0,  3,
    -3,  1.0,  3,
    -3,  1.0, -3,
    // Top face
    -3, 1.0, -3,
    3, 1.0, -3,
    3, 1.0,  3,
    -3, 1.0,  3     
];

let powerup_vertices = [

    // Front face
    -4, -2,  4,
    4, -2,  4,
    4,  30,  4,
   -4,  30,  4,
   // Back face
   -4, -2, -4,
   -4,  30, -4,
    4,  30, -4,
    4, -2, -4,
   // Right face
    4, -2, -4,
    4,  30, -4,
    4,  30,  4,
    4, -2,  4,
   // Left face
   -4, -2, -4,
   -4, -2,  4,
   -4,  30,  4,
   -4,  30, -4,
   // Top face
   -4, 30, -4,
   4, 30, -4,
   4, 30,  4,
   -4, 30,  4
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
    0, 0, 0,
    1500, 0, 0,
    1500, 0, 1500,
    0, 0,  1500,
];

let ceiling_vertices = [

0, 100, 0,
    1500, 100, 0,
    1500, 100, 1500,
    0, 100,  1500,
    ];


let ceiling_vertex_indices = [
    0,  1,  2,      
    0,  2,  3,  
];

let ceiling_texture_coordinates = [
	0.0,  0.0,
    12,  0.0,
    12,  12,
    0.0,  12,
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