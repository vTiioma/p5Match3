// JavaScript Linq substitute
//
// filter is equivalent to Where
// map is equivalent to Select
// every is equivalent to All
// some is equivalent to Any
// reduce is "kinda" equivalent to Aggregate (and also can be used to Sum)
// sort is "kinda" like OrderBy (but it sorts the array in place - eek!)
//
// and, of course, you can chain function calls

var tiles;
var colors;
var score;
var topScore;
var matchManager;
var animation;

function setup() {
  topScore = new scoreText (50,60,45,"Top Score: ")
  score = new scoreText (50,100,30,"Score: ");
  createCanvas(600,600);
  colors = new Colors();
  matchManager = new matchManager();
  animation = new animationManager();
  tiles = new Grid();
  tiles.makeGrid(width/2,height/2+50,3,3,50,50,10,10);
  var test = [1,1,2,2,3,3,4,4,5,5];
  console.log(test.filter((value,index) => test.indexOf(value) == index));
  console.log(tiles.tiles.filter(function(x) { return x.id == 0; }).length);
}

function draw() {
  background(52);
  topScore.show();
  score.show();
  tiles.show();
  animation.show();
  animation.animateText();
  animation.fall();
}

function mousePressed() {
  if (animation.isAnimating) {
    return;
  }
  matchManager.onMouseDown(tiles.tiles.filter(function(x) { return x.isMouseOver(mouseX,mouseY,0,0); }));
}

function mouseDragged() {
  if (animation.isAnimating) {
    return;
  }
  matchManager.onMouseDragged(tiles.tiles.filter(function(x) { return x.isMouseOver(mouseX,mouseY,0,0); }));
}

function mouseReleased() {
  matchManager.onMouseUp();
}
