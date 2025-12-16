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

let item_length = 10;
let item_height = 10;
let item_width = 10;
let item_texture = 1;
let increase_forward_direction = 1;
let player_speed = 8.0;
let acceleration = 2;
let player_rotation_speed = 0.01;
let rotation_acceleration = 0;
let camera_rotation_direction = 1;
let y_camera_angle = 0;
let rotate_direction = 3;
let movement_direction = 1;
let sideways_direction = "";
let x_your_character = x_location;
let y_your_character = -100;
let z_your_character = z_location;
let y_location = -100;

function checkKeyUnPressed(e) {

  if (e.keyCode == "38") {
    // upwards motion
       movement_direction = 0;
  }
  if (e.keyCode == "40") {
    // downwards motion
    movement_direction = 0;
  }
  if (e.keyCode == "37") {
    sideways_direction = "";
   }
  if (e.keyCode == "39") {
    sideways_direction = "";
  }
} 
  
function checkKeyPressed(e) {
  
    if (e.keyCode == "37") {
      sideways_direction = "left";
    }
    if (e.keyCode == "38") {
      // upwards motion
        movement_direction = 2;
    }
    if (e.keyCode == "40") {
      // downwards motion
      movement_direction = 5;
    }
    if (e.keyCode == "39") {
      sideways_direction = "right";
    }
  }

function CollisionDetection(x,y,z) {
  // Check we don't leave the game area
  if (z <= 100 || z >= 1800 || x < -50000) {
    sideways_direction = "";
    return true;
  }
  if (y > 450) {
    movement_direction = 0;
    y_location = -450;
  }
  if (y < 0) {
    movement_direction = 0;
    y_location = -20;
  }
  return false;
}

function ControlPlayerMovement() {

    if (movement_direction == 2) {
      y_location-=3;
    }

    if (movement_direction == 5) {
      y_location+=3;
    }
    
    if (increase_forward_direction == 1) {
    
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

    if (sideways_direction == "left") {
    
        let camera_angle_in_radians = (camera_angle-90) * 0.0174532925;
        let x_probable = x_location;
        let z_probable = z_location;
    
        x_probable -= Math.sin( camera_angle_in_radians ) * (2 + acceleration); 
        z_probable += Math.cos( camera_angle_in_radians ) * (2 + acceleration); 
    
        if (CollisionDetection(x_probable*-1,(y_location+20)*-1,z_location*-1) == false )
          x_location = x_probable;
            
        if (CollisionDetection(x_location*-1,(y_location+20)*-1,z_probable*-1) == false )
          z_location = z_probable;
    } 

    if (sideways_direction == "right") { 
    
        let camera_angle_in_radians = (camera_angle + 90) * 0.0174532925;
        let x_probable = x_location;
        let z_probable = z_location;
    
        x_probable -= Math.sin( camera_angle_in_radians ) * (2 + acceleration);
        z_probable += Math.cos( camera_angle_in_radians ) * (2 + acceleration);
    
        if (CollisionDetection(x_probable*-1,(y_location+20)*-1,z_location*-1) == false )
          x_location = x_probable;
            
        if (CollisionDetection(x_location*-1,(y_location+20)*-1,z_probable*-1) == false )
          z_location = z_probable;
    } 
  }

  //let level_just_loaded = true;

function UpdateStats() { 
  document.getElementById("zlocation").value = x_location.toFixed(0);
  document.getElementById("xlocation").value = -z_location.toFixed(0);
  document.getElementById("altitude").value = -y_location;
  document.getElementById("speed").value = acceleration;
}


