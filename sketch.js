let angleX = 0;
let angleY = 0;
let zoom = 1000;
let resolution = 10;
let torusRadius = 18;
let tubeRadius = 4;

let spinSpeedY = -0.04; // Default spin speed on Y-axis
let spinBoost = 0;
let damping = 0.95;

function setup() {
  createCanvas(80, 80);
  textFont('monospace', 10);
  noStroke();
  background(0);
}

function draw() {
  background(0, 60);

  let chars = "▗▘▜▟▙▄▀▐▌▞▚▝▖▛█";

  translate(width / 2, height / 2);

  // Apply continuous rotation and boost from scrolling
  angleY += spinSpeedY + spinBoost;
  spinBoost *= damping;

  for (let theta = 0; theta < TWO_PI; theta += TWO_PI / resolution) {
    for (let phi = 0; phi < TWO_PI; phi += TWO_PI / resolution) {
      let x = (torusRadius + tubeRadius * cos(phi)) * cos(theta);
      let y = (torusRadius + tubeRadius * cos(phi)) * sin(theta);
      let z = tubeRadius * sin(phi);

      let tempX = x;
      let tempZ = z;
      let tempY = y;

      // Rotate around Y-axis
      let rotatedX = tempX * cos(angleY) - tempZ * sin(angleY);
      let rotatedZ = tempZ * cos(angleY) + tempX * sin(angleY);

      let screenX = rotatedX * (zoom / (zoom - rotatedZ));
      let screenY = tempY * (zoom / (zoom - rotatedZ));

      screenX -= textWidth(chars[0]) / 2;
      screenY += textAscent() / 4;

      let brightness = 100 + map(rotatedZ, -tubeRadius, tubeRadius, 0, chars.length - 1);
      let charIndex = constrain(floor(brightness), 0, chars.length - 1);

      fill(255, brightness / 6);
      text(chars[charIndex], screenX, screenY);
    }
  }
}

function mouseWheel(event) {
  // Scroll increases or decreases spin speed
  spinBoost += event.delta * 0.0005;
}

