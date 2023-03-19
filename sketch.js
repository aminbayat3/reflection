const width = 640;
const height = 394; 
let v1, v2, n;
let a = 6;
let b = 8;
let c = height;
let m = 0;
let px= width/2;
let py = height/2;


const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const form = document.querySelector('.form');
const info = document.getElementById('info');
const nx = document.getElementById('nx');
const ny = document.getElementById('ny');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  px = +input1.value;
  py = +input2.value;

  a = +nx.value;
  b = +ny.value;

  c = ((a/b) * px) + py;
  m = (-1) * (a/b);
  n = createVector(a, b).normalize();

  info.innerHTML = `
  <p>reflectPoint: (${px}, ${py})</p>
  <p>n: (${a}, ${b})</p>
`
});



function setup() {
  createCanvas(width, height);
  c = ((a/b) * px) + py;
  m = (-1) * (a/b);
  n = createVector(a, b).normalize();
}

function draw() {
  background(0);
  stroke(255);
  v1 = createVector(px - mouseX, py - mouseY);
  v2 = p5.Vector.add(v1, p5.Vector.mult(n, -2 * p5.Vector.dot(n, v1)));
  // draw:
  paintArrow(createVector(px - v1.x, py - v1.y), v1);
  paintArrow(createVector(px, py), v2);
  surface(m, c);
  
}

function paintArrow(base, vec) {
  push();
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 10;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function surface(m, c) {
  console.log(c, m)
  let f = function(x) {
    return (m * x) + c;
  }
  line(0, f(0), width, f(width));
}
