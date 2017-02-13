var animationManager = function() {
  this.animations = [];
  this.textAnimations = [];
  this.fallingTiles = [];
  this.isAnimating = false;

  this.swap = function(firstItem, secondItem) {
    this.animations[this.animations.length] = {
      "progress": 0.0,
      "items": [{
        "item": firstItem,
        "startPos": secondItem.startPosition,
        "endPos": firstItem.startPosition
      },
      {
        "item": secondItem,
        "startPos": firstItem.startPosition,
        "endPos": secondItem.startPosition
      }]
    }
  }

  this.textFrom = function(startPosition,text,color) {
    this.textAnimations[this.textAnimations.length] = {
      "progress": 0,
      "startPosition": startPosition,
      "text": text,
      "color": color
    }
  }

  this.addFallingTile = function(tile) {
    this.fallingTiles[this.fallingTiles.length] = {
      "progress": 0,
      "tile": tile,
      "startPosition": tile.position
    }
  }

  this.show = function() {
    if (this.animations.length === 0) {
      return;
    }

    this.isAnimating = true;
    this.animations[0]["items"][0]["item"].position.x = lerp(this.animations[0]["items"][0]["startPos"].x,
                                                            this.animations[0]["items"][0]["endPos"].x,
                                                            this.animations[0]["progress"]);
    this.animations[0]["items"][0]["item"].position.y = lerp(this.animations[0]["items"][0]["startPos"].y,
                                                            this.animations[0]["items"][0]["endPos"].y,
                                                            this.animations[0]["progress"]);

    this.animations[0]["items"][1]["item"].position.x = lerp(this.animations[0]["items"][1]["startPos"].x,
                                                            this.animations[0]["items"][1]["endPos"].x,
                                                            this.animations[0]["progress"]);
    this.animations[0]["items"][1]["item"].position.y = lerp(this.animations[0]["items"][1]["startPos"].y,
                                                            this.animations[0]["items"][1]["endPos"].y,
                                                            this.animations[0]["progress"]);
    if (this.animations[0]["progress"] >= 1.0) {
      this.animations.splice(0,1);
      this.isAnimating = false;
      return;
    }
    this.animations[0]["progress"] += 0.15;
    if (this.animations[0]["progress"] > 1.0) {
      this.animations[0]["progress"] = 1.0;
    }
  }

  this.animateText = function() {
    for (var i = this.textAnimations.length-1; i > -1; i--) {
      var currPos = createVector(
        this.textAnimations[i]["startPosition"].x,
        lerp(this.textAnimations[i]["startPosition"].y,
             this.textAnimations[i]["startPosition"].y - 10,
             this.textAnimations[i]["progress"])
      );

      textAlign(CENTER);
      textSize(32);
      fill(this.textAnimations[i]["color"]);
      text(this.textAnimations[i]["text"], currPos.x, currPos.y);

      this.textAnimations[i]["progress"] += 0.075;
      if (this.textAnimations[i]["progress"] > 1.0) {
        this.textAnimations[i]["progress"] = 1.0;
      }
      if (this.textAnimations[i]["progress"] === 1.0) {
        this.textAnimations.splice(i,1);
      }
    }
  }

  this.fall = function() {
    for (var i = this.fallingTiles.length-1; i > -1; i--) {
      var currPos = createVector(
        lerp(this.fallingTiles[i]["startPosition"].x,
             this.fallingTiles[i]["tile"].startPosition.x,
             this.fallingTiles[i]["progress"]),
        lerp(this.fallingTiles[i]["startPosition"].y,
             this.fallingTiles[i]["tile"].startPosition.y,
             this.fallingTiles[i]["progress"])
      )

      this.fallingTiles[i]["tile"].position = currPos;

      this.fallingTiles[i]["progress"] += 0.1;
      if (this.fallingTiles[i]["progress"] > 1.0) {
        this.fallingTiles[i]["progress"] = 1.0;
      }
      if (this.fallingTiles[i]["progress"] === 1.0) {
        this.fallingTiles.splice(i,1);
      }
    }
  }
}
