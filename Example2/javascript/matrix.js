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

function createPerspective(fovy, aspect, znear, zfar)
{
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

  mvMatrixNew =  [[1,0,0,0,],
                  [0,1,0,0,],
                  [0,0,1,0,],
                  [0,0,0,1]
                 ];
}

function matrixTranslate(v) {
  mvMatrixNew = translateMatrix(v,mvMatrixNew);
}

function setMatrixUniforms() {
  let mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flattenMatrix(mvMatrixNew)));
}

function matrixPushMatrix() {
    let duplicate = mvMatrixNew;
    mvMatrixStackNew.push(duplicate);
}

function matrixPopMatrix() {
  if (!mvMatrixStackNew.length) {
    throw("Can't pop from an empty matrix stack.");
  }
  
  mvMatrixNew = mvMatrixStackNew.pop();
}

function matrixRotate(angle, v) {

  let inRadians = angle * Math.PI / 180.0;
  mvMatrixNew = rotateMatrix(inRadians,v,mvMatrixNew);
}
