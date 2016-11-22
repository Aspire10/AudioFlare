var mic, amplitude, red, green, blue, randActive, welcome;

function setup() {
	frameRate(60);
	createCanvas(displayWidth-17, displayHeight);
	mic = new p5.AudioIn()
	amplitude = new p5.Amplitude();
	mic.start();
	fft = new p5.FFT();
	fft.setInput(mic);
	noCursor();
	stroke(0);
	strokeWeight(2);
	fill(0);
	red = 0;
	green = 0;
	blue = 0;
	randActive = false;
	welcome = true;
	textFont('Orbitron');
}

function draw() {
	var spectrum = fft.analyze();
	background(map(width-mouseX, 0, width, 0, 255));
	if(randActive == true){
		if(random(100) > 90){
			red = int(random()*2);
			green = int(random()*2);
			blue = int(random()*2);
		}
		if(red == 0 && green == 0 && blue == 0){
			red = 1;
			blue = 1;
			geen = 1;
		}
	}
	for(var i = 0; i<360; i+=4){
		var x = map(i, 0, 360, 0, width);
		var h = map(spectrum[i], 0, 255, height, 0);
		var hOpp = map(spectrum[359-i], 0, 255, height, 0);
		if(hOpp>h)
			color = map((hOpp-h), 0, height/2, 0, 255);
		else
			color = map((h-hOpp), 0, height/2, 0, 255);
		stroke(color * red, color * green, color * blue);
		fill(color);
		rect(x+(width/180), h+2, (width/360)/4, (hOpp-h)-2);
	}
	if(welcome == true){
		noStroke();
		fill(200, 200, 200, 220);
		rect(width/4, height/4, width/2, height/2);
		fill(0);
		textAlign(CENTER, CENTER);
		textSize(width/65);
		text("AUDIO FLARE", width/2, height/3.5);
		text("CONTROLS", width/2, height/3.5 + height/10);
		text("- Use the [R][G][B][T] keys to change color", width/2, height/3.5 + height/5);
		text("- Drag the mouse left or right to change the brightness", width/2, height/3.5 + 3*height/10);
		text("CLICK TO BEGIN AND ENTER FULLSCREEN", width/2, height/3.5 + 2*height/5);
	}
}

function mousePressed() {
	if(welcome == true) welcome = false;
  var fs = fullscreen();
  if(fs)
    resizeCanvas(displayWidth-17, displayHeight);
  else
    resizeCanvas(displayWidth, displayHeight);
  fullscreen(!fs);
}

function keyPressed(){
	if(key == 'R')
		if(red == 0) red = 1;
		else red = 0;
	if(key == 'G')
		if(green == 0) green = 1;
		else green = 0;
	if(key == 'B')
		if(blue == 0) blue = 1;
		else blue = 0;
	if(key == 'T')
		if(randActive == false)	randActive = true;
		else randActive = false;
}