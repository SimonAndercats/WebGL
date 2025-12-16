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

window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyUnPressed, false);

ResetProjectiles();

function ControlDoor() {
    
  for (let d = 0; d < door_x.length; d++) {
    
    let distance = distanceBetweenPoints(x_location*-1, door_x[d], z_location*-1, door_z[d] );
      
    if (distance < 200) { //near enough to activate
      door_y[d] = (200 - distance) / 4; // cheap way to get an animated effect of a door opening !
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

  // This normalises the player coordinates
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

    // First check against leaving the game area
    if (x >= 20 && x < 1480 && z >= 20 && z <= 1480) {
  
      // Now check against each cube
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

        if ( x >= cube_x - 10 && x <= cube_x + width + 10 &&
             z >= cube_z - 10 && z <= cube_z + length + 10 &&
             y >= cube_y - 5 && y <= cube_y + height + 5 &&
             texture > 0 && texture < 4) {
          return true
        }            
      }
    }
    else {
      return true;
    }
    return false;
}

function checkKeyUnPressed(e) {
  
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
    if (e.keyCode == "32" || e.keyCode == "16") {
        shoot_projectile = true;
    }
}

function PlaySound ( soundname ) {
    let thissound = document.getElementById( soundname );
    thissound.play();
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

    if (movement_direction == 3) { // Move left ( straff )
    
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

    if (movement_direction == 4) { // move right ( straff )
    
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
      reversed_camera_angle +=(player_rotation_speed + rotation_acceleration);

      if (camera_angle < 0)
        camera_angle = 360;

      if (reversed_camera_angle > 360)
        reversed_camera_angle = 0;
    }
    else if (rotate_direction == 2) {
      camera_angle+=(player_rotation_speed + rotation_acceleration);
      reversed_camera_angle -=(player_rotation_speed + rotation_acceleration);
      if (camera_angle > 360)
        camera_angle = 0;

      if (reversed_camera_angle < 0)
        reversed_camera_angle = 360;
    }
      
    if (shoot_projectile) {
      if (how_much_ammo > 0 ) {
        how_much_ammo--;

        document.getElementById("shootAudio").play();
    
        // You only have a set number of projectiles and so check if any of them is unassigned
        for (let projectile = 0; projectile < your_projectile_x.length; projectile++) {
          if (your_projectile_active[projectile] == false &&
              projectile_collected_count > projectile ) {
              
              // Initialise projectile into its starting position and make it active
              let x_placement = x_location;
              let z_placement = z_location;
              let camera_angle_in_radians = camera_angle * 0.0174532925;
              your_projectile_x[projectile] = x_placement * -1;
              your_projectile_y[projectile] = (y_location+10) * -1;
              your_projectile_z[projectile] = z_placement * -1;
              your_projectile_angle[projectile] = camera_angle_in_radians; // it will then follow this tragectory
              your_projectile_active[projectile] = true;
              shoot_projectile = false;
              projectile_distance[projectile] = 0;
              break;
          }
        }
      }
    }
}

function ControlPowerups() {

  powerup_spin++;
  if (powerup_spin > 360)
    powerup_spin = 0;

  for (let i = 0; i < powerup_x.length; i++) {
    if (powerup_active[i] && powerup_collected[i] == false ) {
      if (x_location*-1 > powerup_x[i] - 40 && x_location*-1 < powerup_x[i] + 40 &&
          z_location*-1 > powerup_z[i] - 40 && z_location*-1 < powerup_z[i] + 40 ) {
            powerup_collected[i] = true;
            health+=150;
            how_much_ammo+=200;
            powerup_active[i] = false;   
                
            document.getElementById("powerupAudio").play();   
            powerup_count++;    
      }
    }
  }
} 

function UpdateStats() {

  if (level_just_loaded) {
    var url = new URL(location.href);
    var health_param = url.searchParams.get("health");
    var ammo_param = url.searchParams.get("ammo");
    document.getElementById("health").value = health_param;
    document.getElementById("ammo").value = ammo_param;
    level_just_loaded = false;
    if (! health_param)
      health_param = 500;
    if (! ammo_param)
      ammo_param = 200;
    health = health_param;
    how_much_ammo = ammo_param;
  }
  
  document.getElementById("health").value = health;
  document.getElementById("ammo").value = how_much_ammo;
}

function AdjustPlayerHealth(damage) {
    health-=damage;
    document.getElementById("gnawAudio").play();
    if (health<=0) {
      window.location.href = "gameover.html";
    }
}

function IsLevelComplete() {
    if (AnyCharactersLeftAlive() == 0) {
      window.location.href = "levelcomplete.html";
    }
}


function GameOver(which_ending) {}


function MoveProjectiles() {

  projectile_spin+=10;
  if (projectile_spin > 360)
    projectile_spin = 0;

  for (let projectile = 0; projectile < your_projectile_x.length; projectile++) { 

    if (your_projectile_active[projectile] && projectile_distance[projectile] <= 5000) {

      your_projectile_x[projectile] += Math.sin( your_projectile_angle[projectile] ) * 5.0;
      your_projectile_z[projectile] -= Math.cos( your_projectile_angle[projectile] ) * 5.0;
      projectile_distance[projectile] += 5;

      for (let character_no = 0; character_no < characters_x.length; character_no++) {
        if (characters_health[character_no] > 0) {
          if (distanceBetweenPoints(your_projectile_x[projectile], characters_x[character_no],your_projectile_z[projectile], characters_z[character_no] ) < 50) {
            characters_health[character_no]-=projectile_damage;

            if (characters_health[character_no]<=0)
              characters_health[character_no] = 0; // i want to make sure this is exactly zero so that spinning can take that number down lower

            characters_direction[character_no] = your_projectile_angle[projectile];

            your_projectile_active[projectile] = false;
            score += 100;
            document.getElementById("score").value = score;
            document.getElementById("enemyDownAudio").play();
            break;
          }
        }
      }  
    }
    else if (projectile_distance[projectile] > 500)
      your_projectile_active[projectile] = false;
  }
}

function ResetProjectiles() {
  for (let i = 0; i < magazine_size; i++) {
    your_projectile_angle[i] = 0;
    projectile_distance[i] = 0;
    your_projectile_x[i] = 0;
    your_projectile_y[i] = 0;
    your_projectile_z[i] = 0;
    your_projectile_active[i] = false;
  }
}

function distanceBetweenPoints(x1,x2,z1,z2) {

  var x = x1 - x2;
  var z = z1 - z2;

  return Math.sqrt((x*x)+(z*z));
}

