var matchManager = function() {
  this.activeTile = null;

  function findNextColoredTile(collection,index) {
    for (var i = index; i > -1; i--) {
      if (collection[i].id != 0) {
        return collection[i];
      }
    }

    return null;
  }

  this.onMouseDown = function(selectedTiles) {
    if (selectedTiles.length > 0) {
      // console.log(selectedTiles[0].position + " ==> " + mouseX + ", " + mouseY);
      this.activeTile = selectedTiles[0];
    }
  }

  this.onMouseDragged = function(selectedTiles) {
    if (selectedTiles.length > 0) {
      // console.log(selectedTiles[0].position + " ==> " + mouseX + ", " + mouseY);
      if (selectedTiles[0] === this.activeTile) {
        return;
      }
      if (this.activeTile === null) {
        this.activeTile = selectedTiles[0];
      } else {
        var currTile = this.activeTile;
        var newTile = selectedTiles[0];
        var currTileColor = currTile.id;
        var newTileColor = newTile.id;

        if (!currTile.containsTile(newTile)) {
          return;
        }

        currTile.setId(newTileColor);
        newTile.setId(currTileColor);
        animation.swap(currTile,newTile);

        this.activeTile = selectedTiles[0];
      }
    }
  }

  this.onMouseUp = function() {
    var matchingTiles = [];
    var haveMadeChange = false;
    var multiplier = 0;

    for (var i = 0; i < tiles.tiles.length; i++) {
      if (tiles.tiles[i].horizontalMatch() && tiles.tiles[i].id != 0) {
        matchingTiles[matchingTiles.length] = tiles.tiles[i].horizontalTiles();
      }
      if (tiles.tiles[i].verticalMatch() && tiles.tiles[i].id != 0) {
        matchingTiles[matchingTiles.length] = tiles.tiles[i].verticalTiles();
      }
    }

    multiplier = matchingTiles.length;

    do {
      haveMadeChange = false;
      var toMerge = [];
      var toReplace = [];

      for (var x = 0; x < matchingTiles.length; x++) {
        for (var y = 0; y < matchingTiles[x].length; y++) {
          for (var i = 0; i < matchingTiles.length; i++) {
            if (matchingTiles[i].indexOf(matchingTiles[x][y]) != -1
                && toMerge.indexOf(matchingTiles[x][y]) === -1) {
              toMerge[toMerge.length] = matchingTiles[i];
            }
          }
        }

        toMerge = toMerge.filter((value,index) => toMerge.indexOf(value) == index);
        if (toMerge.length > 1) {
          haveMadeChange = true;
          for (var i = 0; i < toMerge.length; i++) {
            var removeIndex = matchingTiles.indexOf(toMerge[i]);
            matchingTiles.splice(removeIndex,1);
            toReplace = toReplace.concat(toMerge[i]);
          }

          toReplace = toReplace.filter((value,index) => toReplace.indexOf(value) == index);
          matchingTiles[matchingTiles.length] = toReplace;

          break;
        } else {
          toMerge = [];
        }
      }
    } while (haveMadeChange);

    for (var x = 0; x < matchingTiles.length; x++) {
      for (var y = 0; y < matchingTiles[x].length; y++) {
        score.score += multiplier;
        // animate score poping up from tile position
        animation.textFrom(matchingTiles[x][y].position,multiplier,matchingTiles[x][y].color)
        // set tile id to 0
        matchingTiles[x][y].setId(0);
      }
    }

    // move empty tiles up to later simulate having tiles fall into place
    var tilesToFill = [];
    for (var x = tiles.grid.length-1; x > -1; x--) {
      for (var y = tiles.grid[x].length-1; y > -1; y--) {
        if (tiles.grid[x][y].id === 0) {
          var newPos = findNextColoredTile(tiles.grid[x],y);

          if (newPos === null) {
            tiles.grid[x][y].position.y -= 60;
            tilesToFill[tilesToFill.length] = tiles.grid[x][y];
          } else {
            tiles.grid[x][y].position.y = newPos.position.y;
            tiles.grid[x][y].setId(newPos.id);
            newPos.setId(0);
          }
          animation.addFallingTile(tiles.grid[x][y]);
        }
      }
    }

    for (var i = 0; i < tilesToFill.length; i++) {
      tilesToFill[i].setId(floor(random(1,5)));
    }
  }
}
