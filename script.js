
let o = 130
let h = 35
let angle = 60
let lensWidth = 30
let r = 150
let f = r/2
function setup() {
  createCanvas(800, 400);
  angleMode(DEGREES)
  slider = createSlider(0, 500, o);
  slider.style('width', '500px');
}

function draw() {
  o = parseInt(slider.value());
  background(0);
  ray()
  img()
  lens()
  
}

function lens(){
  detail()
  push()
  translate(width/2,height/2)
  stroke(255)
  strokeWeight(1)
  noFill()
  
  //focal
  push()
  noStroke()
  fill(255)
  text("F",-f,20)
  stroke(255)
  strokeWeight(5)
  point(-f,0)
  pop()
  
  //2F
  push()
  noStroke()
  fill(255)
  text("2F",-f * 2,20)
  stroke(255)
  strokeWeight(5)
  point(-f * 2,0)
  pop()
  
  //focal
  push()
  noStroke()
  fill(255)
  text("F '",f,20)
  stroke(255)
  strokeWeight(5)
  point(f,0)
  pop()
  
  //2F
  push()
  noStroke()
  fill(255)
  text("2F '",f * 2,20)
  stroke(255)
  strokeWeight(5)
  point(f * 2,0)
  pop()
  
  
  let yOff = -f * sin(angle)
  let xOff = (-f * cos(angle)) - lensWidth/2
  let xOff1 = xOff
  let yOff1 = -yOff
  
  //top
  line(xOff,yOff,-xOff,yOff)
  //down
  line(xOff1,yOff1,-xOff1,yOff1)
  //middle
  line(-width/2,0,width,0)
  
  // //dotted middle line
  dashedLine((xOff + xOff1)/2,(yOff)/2,(xOff + xOff1)/2,(yOff)/2,7,6)
  // //front
  arc((-lensWidth/2)-(r/2),0,r,r,-angle,angle)
  // //back
  arc((lensWidth/2)+(r/2),0,r,r,angle*2,-angle*2)
  pop()
}

function detail(){
  push()
  noStroke()
  fill(255)
  text(`Focal length:${f}\n Height of image:${h} \n Object: ${o}`,10,20)
  pop()
}

function ray(){
  //object
  push()
  translate(width/2,height/2)
  stroke(0,0,255)
  line(-o,0,-o,-h)
  pop()
  
  //parallel ray
  push()
  translate(width/2,height/2)
  stroke(255)
  line(-o,-h,lensWidth,-h)
  pop()
  
  //ray
  push()
  translate(width/2,height/2)
  stroke(255)
  l1(-o,-h,lensWidth,0,100)
  pop()
  
}

function img(){
  let img = (-f*o)/(o+f)
  let mg = img/o
  
  //paralle refracted ray
  push()
  translate(width/2,height/2)
  stroke(255)
  l2(lensWidth,-h,-f,0,60)
  pop()
  
  //image
  push()
  translate(width/2,height/2)
  stroke(255,0,0)
  line(img,0,img,h*mg)
  pop()
  //extended paralle refracted ray
  push()
  translate(width/2,height/2)
  stroke(255)
  l2(lensWidth,-h,-f,0,-60)
  pop()
}

function l1(x1,y1,x2,y2,d){
  let m = (((x2-x1)**2)+((y2-y1)**2))**(0.5) + d
  let n = d
  let x = (m * x2 - n * x1)/(m-n) 
  let y = (m * y2 - n * y1)/(m-n) 
  line(x1,y1,x,y)
}

function l2(x1,y1,x2,y2,d){
  let m = (((x2-x1)**2)+((y2-y1)**2))**(0.5) + d
  let n = d
  let x = (m * x2 - n * x1)/(m-n) 
  let y = (m * y2 - n * y1)/(m-n) 
  dashedLine(x1,y1,x,y,10,7)
}


function dashedLine(x1, y1, x2, y2, l, g) {
  var pc = dist(x1, y1, x2, y2) / 100;
  var pcCount = 1;
  var lPercent = gPercent = 0;
  var currentPos = 0;
  var xx1 = yy1 = xx2 = yy2 = 0;

  while (int(pcCount * pc) < l) {
    pcCount++
  }
  lPercent = pcCount;
  pcCount = 1;
  while (int(pcCount * pc) < g) {
    pcCount++
  }
  gPercent = pcCount;

  lPercent = lPercent / 100;
  gPercent = gPercent / 100;
  while (currentPos < 1) {
    xx1 = lerp(x1, x2, currentPos);
    yy1 = lerp(y1, y2, currentPos);
    xx2 = lerp(x1, x2, currentPos + lPercent);
    yy2 = lerp(y1, y2, currentPos + lPercent);
    if (x1 > x2) {
      if (xx2 < x2) {
        xx2 = x2;
      }
    }
    if (x1 < x2) {
      if (xx2 > x2) {
        xx2 = x2;
      }
    }
    if (y1 > y2) {
      if (yy2 < y2) {
        yy2 = y2;
      }
    }
    if (y1 < y2) {
      if (yy2 > y2) {
        yy2 = y2;
      }
    }

    line(xx1, yy1, xx2, yy2);
    currentPos = currentPos + lPercent + gPercent;
  }
}