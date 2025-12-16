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

function AnyCharactersLeftAlive() {

    let how_many_characters_alive = 0;
    for (let character_no = 0; character_no < characters_x.length; character_no++) {
        if (characters_health[character_no] > 0)
            how_many_characters_alive++;
    }    
    return how_many_characters_alive;
}

function MoveCharacter(character_no,angle_to_move_in) {
        
    let character_speed = 0.5;
    let proposed_x = characters_x[character_no];
    proposed_x -= Math.cos( angle_to_move_in ) * ((characters_texture[character_no])*character_speed);
    let proposed_z = characters_z[character_no];
    proposed_z += Math.sin( angle_to_move_in ) * ((characters_texture[character_no])*character_speed);

    if (CollisionDetection(proposed_x,characters_y[character_no],proposed_z) == false ) { 

        if ( distanceBetweenPoints(x_location*-1,proposed_x,z_location*-1,proposed_z) > 50 ) {
            characters_x[character_no] = proposed_x;
            characters_z[character_no] = proposed_z;
        }
        else {       
            AdjustPlayerHealth(character_damage);
            characters_hurting_countdown[character_no] = 50; 
            proposed_x -= Math.cos( angle_to_move_in - 180) * (2);
            proposed_z = characters_z[character_no];
            proposed_z += Math.sin( angle_to_move_in -180 ) * (2);
            characters_x[character_no] = proposed_x;
            characters_z[character_no] = proposed_z;
        }
    }
}

function SpinCharacters(character_no) {

    characters_spin[character_no]-=5;
    if (characters_spin[character_no] < 0)
        characters_spin[character_no] = 360;

    characters_x[character_no] += Math.sin( characters_direction[character_no] ) * 3;
    characters_z[character_no] -= Math.cos( characters_direction[character_no] ) * 3;
    characters_spin_distance[character_no]++;
}

function CharacterAfterSpin(character_no) {
    characters_lives[character_no]--;
}

function ControlCharacters(phase_of_game) {
  
    if (phase_of_game == "game" ) {
  
        for (var character_no = 0; character_no < characters_x.length; character_no++) {

            if (characters_health[character_no] > 0 ) {
                var angle_to_move_in = AngleToTarget(characters_x[character_no], characters_z[character_no], x_location*-1, z_location*-1);

                characters_direction[character_no] = angle_to_move_in - 180;
                if (characters_direction[character_no]<0)
                    characters_direction[character_no] = 360 + characters_direction[character_no];

            }
            
            if (characters_health[character_no] > 0 ) {

                if ( distanceBetweenPoints(x_location*-1,characters_x[character_no],z_location*-1,characters_z[character_no]) <= character_active_range ) {
                    characters_active[character_no] = true;
                }
                else {
                    characters_active[character_no] = false;
                }

                if (characters_active[character_no]) {
       
                    characters_spin[character_no] = 0;
                    if (characters_hurting_countdown[character_no] <= 0 && 
                        characters_texture[character_no] < 3) { 
                        MoveCharacter(character_no,angle_to_move_in);
                    }
              
                    if (characters_hurting_countdown[character_no] > 0)
                        characters_hurting_countdown[character_no]--;
                }
            }
            else {
                SpinCharacters(character_no);
            }
        }    
    }
}
