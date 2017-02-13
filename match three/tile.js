function Tile(x,y,width,height) {
    this.position = createVector(x,y);
    this.startPosition = createVector(x,y);
    this.width = width;
    this.height = height;
    this.color = color(255);
    this.id;

    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;

    this.index = "0,0";

    this.containsTile = function(item) {
      return this.up === item ||
             this.down === item ||
             this.left === item ||
             this.right === item;
    }

    this.horizontalMatch = function() {
      return (this.left != null && this.left.id === this.id) &&
             (this.right != null && this.right.id === this.id);
    }

    this.verticalMatch = function() {
      return (this.up != null && this.up.id === this.id) &&
             (this.down != null && this.down.id === this.id);
    }

    this.horizontalTiles = function() {
      var toReturn = [this];

      if (this.left != null && this.left.id === this.id) toReturn[toReturn.length] = this.left;
      if (this.right != null && this.right.id === this.id) toReturn[toReturn.length] = this.right;

      return toReturn;
    }

    this.verticalTiles = function() {
      var toReturn = [this];

      if (this.up != null && this.up.id === this.id) toReturn[toReturn.length] = this.up;
      if (this.down != null && this.down.id === this.id) toReturn[toReturn.length] = this.down;

      return toReturn;
    }

    this.setId = function(id) {
        this.id = id;
        this.color = colors.getColor(id);
    }

    this.show = function() {
        fill(this.color);
        rectMode(CENTER);
        rect(this.position.x,this.position.y,this.width,this.height);

        textAlign(CENTER);
        textSize(16);
        fill(0);
        text(this.id, this.position.x, this.position.y);
    }

    this.isMouseOver = function(mousePosX,mousePosY,xPadding,yPadding) {
      var isInsideX = (mousePosX >= this.startPosition.x - this.width/2 - xPadding &&
        mousePosX <= this.position.x + this.width/2 + xPadding);
      var isInsideY = (mousePosY >= this.startPosition.y - this.height/2 - yPadding &&
        mousePosY <= this.position.y + this.height/2 + yPadding);

      return (isInsideX && isInsideY);
    }
}
/*
//-------------------------------------------------------
// selects an element based on its weighted probability.
//-------------------------------------------------------
var select = function (array) {
    var random = Math.random();
    for (var i = 0; i < array.length; i++) {
        var _a = array[i], value = _a[0], weight = _a[1];
        if (random < weight) {
            return value;
        }
        else {
            random -= weight;
        }
    }
    return null;
};
//-------------------------------------------------------
// the population with hardcoded fitness values.
//-------------------------------------------------------
var population = [
    ["_______", 0],
    ["unicron", 100],
    ["popcorn", 404],
    ["_______", 0],
    ["aaaaaah", 788],
    ["isotope", 220],
    ["_______", 0],
    ["_______", 0],
    ["_______", 0]
];
console.log("population fitness", population);
//--------------------------------------------------------
// step 1) sum fitness for each element.
//--------------------------------------------------------
var total = population.reduce(function (acc, element) { return acc + element[1]; }, 0);
//---------------------------------------------------------
// step 2) compute weights (fitness / total) store in tuple.
//---------------------------------------------------------
var weighted = population.map(function (element) { return [element[0], element[1] / total]; });
console.log("population weighted", weighted);
//---------------------------------------------------------
// step 3) cross em
//---------------------------------------------------------
for (var i = 0; i < 100; i++) {
    var a = select(weighted);
    var b = select(weighted);
    console.log(undefined, a + " x " + b);
}
*/
