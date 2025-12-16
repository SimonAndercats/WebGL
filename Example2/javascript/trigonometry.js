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
  else if ( xLength < 0 && zLength < 0 )
{
xLength *= -1;
zLength *= -1;
radians = Math.atan( xLength / zLength ) + 3.14159265;
}
else if ( xLength < 0 && zLength > 0 )
{
xLength *= -1;
radians = Math.atan( zLength / xLength ) + 4.71238898;
}
else if ( xLength == 0 && zLength > 0 )
{
radians = 0;
}
else if ( xLength > 0 && zLength == 0 )
{
radians = 1.57079633;
}
else if ( xLength == 0 && zLength < 0 )
{
radians = 3.14159265;
}
else if ( xLength < 0 && zLength == 0 )
{
radians = 4.71238898;
}
return ( radians * radiansToDegrees );
}

function angleBetweenPoints(x1,x2,z1,z2) {

  var z = z2-z1;
  var x = x2-x1;

  if (x == 0)
    x = 0.001;
  if (z == 0) 
    z = 0.001; 

  var m = z/x;
  var radians = Math.atan(m);
  var degrees = radians / 0.0174532925;

  if (degrees < 0)
    degrees *= -1;

  return degrees;  
}