class Board {
  constructor () {
    this.rows = 6;
    this.columns = 7;
    this.spaces = this.createSpaces();
  }

/**
 * Generates 2D array of spaces.
 * @return {Array} An array of space objects
 */
  createSpaces() {
    const spaces = [];
    for (var x = 0; x < this.columns; x++) {
      const column = [];
      for (var y = 0; y < this.rows; y++) {
        column.push(new Space(x, y));
      }
      spaces.push(column);
    }
    return spaces;
  }

  drawHTMLBoard() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.spaces[i][j].drawSVGSpace();
      }
    }
  }
}
