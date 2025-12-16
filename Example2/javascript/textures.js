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
  PrepareGameTextures(character_image[3],3);
  PrepareGameTextures(character_image[4],4);
  PrepareGameTextures(cube_texture_image,5);
  PrepareGameTextures(floor_texture_image,6);
  PrepareGameTextures(powerup_texture_image,7);
  PrepareGameTextures(projectile_texture_image,9);
  PrepareGameTextures(door_texture_image,10);
  PrepareGameTextures(ceiling_texture_image,11);  
}

function handleTextureLoaded(image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}