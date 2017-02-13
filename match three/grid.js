function Grid() {
    this.x;
    this.y;
    this.tiles = [];
    this.grid = [];

    this.makeGrid = function(centerX, centerY, x, y, xScale, yScale, xPadding, yPadding) {
        this.x = x;
        this.y = y;

        var halfWidth = (x * xScale) + (x * xPadding);
        var halfHeight = (y * yScale) + (y * yPadding);

        halfWidth -= xScale/2;
        halfWidth -= xPadding/2;

        halfHeight -= yScale/2;
        halfHeight -= yPadding/2;

        halfWidth /= 2;
        halfHeight /= 2;

        var startX = centerX - halfWidth;
        var startY = centerY - halfHeight;

        for (var X = 0; X < x; X++) {
            startY = centerY - halfHeight;
            var tempArray = [];
            for (var Y = 0; Y < y ; Y++) {
                tempArray[Y] = new Tile(startX,startY,xScale,yScale);
                startY += yScale + yPadding;

                tempArray[Y].index = X+","+Y;
            }
            this.grid[X] = tempArray;
            startX += xScale + xPadding;
        }

        for (var X = 0; X < x; X++) {
            for (var Y = 0; Y < y ; Y++) {
                // add to tiles
                this.tiles[this.tiles.length] = this.grid[X][Y];
                // set tile ID
                this.grid[X][Y].setId(floor(random(1,5)));

                // set up
                if (Y-1 > -1) {
                  this.grid[X][Y].up = this.grid[X][Y-1];
                }
                // set down
                if (Y+1 < y) {
                  this.grid[X][Y].down = this.grid[X][Y+1];
                }
                // set left
                if (X-1 > -1) {
                  this.grid[X][Y].left = this.grid[X-1][Y];
                }
                // set right
                if (X+1 < x) {
                  this.grid[X][Y].right = this.grid[X+1][Y];
                }
            }
        }
    }

    this.show = function() {
        for (var i = 0; i < this.tiles.length; i++) {
            this.tiles[i].show();
        }
    }
}
