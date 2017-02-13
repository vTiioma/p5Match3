var scoreText = function(x,y,fontSize,prefixText) {
  this.score = 0;
  this.fontSize = fontSize;
  this.position = createVector(x,y);
  this.prefixText = prefixText;
  this.color = color(255);

  this.show = function() {
    textAlign(LEFT);
    textSize(this.fontSize);
    fill(this.color);
    text(this.prefixText + this.score, this.position.x, this.position.y);
  }
}
