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

function initBuffers() { // Load scenery data into buffers

  sceneryVerticesBuffer = generateBuffers(scenery_vertices,"ARRAY_BUFFER");
  sceneryVerticesTextureCoordBuffer = generateBuffers(scenery_texture_coordinates,"ARRAY_BUFFER");
  sceneryVerticesIndexBuffer = generateBuffers(scenery_vertex_indices,"ELEMENT_ARRAY_BUFFER");
  spriteVerticesBuffer = generateBuffers(sprite_vertices,"ARRAY_BUFFER");
  spriteVerticesTextureCoordBuffer = generateBuffers(sprite_texture_coordinates,"ARRAY_BUFFER");
  spriteVerticesIndexBuffer = generateBuffers(sprite_vertex_indices,"ELEMENT_ARRAY_BUFFER");
  powerupVerticesBuffer = generateBuffers(powerup_vertices,"ARRAY_BUFFER");
  doorVerticesBuffer = generateBuffers(door_vertices,"ARRAY_BUFFER"); 
  projectileVerticesBuffer = generateBuffers(projectile_vertices,"ARRAY_BUFFER");; 
  floorVerticesBuffer = generateBuffers(floor_vertices,"ARRAY_BUFFER"); 
  floorVerticesTextureCoordBuffer = generateBuffers(floor_texture_coordinates,"ARRAY_BUFFER");
  floorVerticesIndexBuffer = generateBuffers(floor_vertex_indices,"ELEMENT_ARRAY_BUFFER");
  ceilingVerticesBuffer = generateBuffers(ceiling_vertices,"ARRAY_BUFFER"); 
  ceilingVerticesTextureCoordBuffer = generateBuffers(ceiling_texture_coordinates,"ARRAY_BUFFER");
  ceilingVerticesIndexBuffer = generateBuffers(ceiling_vertex_indices,"ELEMENT_ARRAY_BUFFER");
}

function addSceneryItem(width,height,length,texture) {

    cube_location[x_building_location + "," + y_building_location + "," + z_building_location] = width + "," + height + "," + length + "," + texture;

    generateVerteces();
    
    initBuffers();
}
