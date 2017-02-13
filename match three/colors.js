function Colors() {
    this.colors = [
      color(255),
      color(255,210,13),
      color(232,64,12),
      color(182,0,255),
      color(12,132,232),
      color(0,255,42)
    ];

    this.getColor = function(index) {
        if (index > -1 && index < this.colors.length) {
            return this.colors[index];
        } else {
            return null;
        }
    }
}
