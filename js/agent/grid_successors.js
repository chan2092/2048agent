/*
 * Functions that extend the 2048 Grid's capabilities.
 * Successor grids are generated here.
 */

Grid.prototype.generateSuccessors = function()
{
    var s_list =[];

    for (var dir = 0; dir < 4; dir++) {
        var s_grid = new Grid(this.size, this.serialize().cells);
        s_grid.score = this.score;  // transfer score for score heuristic
        
        var changed = s_grid.move(dir);

        // don't add to list if not different
        if (changed)
            s_list.push(s_grid);
    }

    return s_list;
};


// The rest of this file has been copied and modified
// from the GameManager's move() functionality
// All credit to Gabriele Cirulli

// Build a list of positions to traverse in the right order
Grid.prototype.buildTraversals = function (vector) {
    var traversals = { x: [], y: [] };
  
    for (var pos = 0; pos < this.size; pos++) {
        traversals.x.push(pos);
        traversals.y.push(pos);
    }
  
    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();
  
    return traversals;
};

// Find farthest position from a cell in a certain direction
Grid.prototype.findFarthestPosition = function (cell, vector) {
    var previous;
  
    // Progress towards the vector direction until an obstacle is found
    do {
        previous = cell;
        cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.withinBounds(cell) &&
             this.cellAvailable(cell));
  
    return {
        farthest: previous,
        next: cell // Used to check if a merge is required
    };
};

// Get the vector representing the chosen direction
Grid.prototype.getVector = function (direction) {
    // Vectors representing tile movement
    var map = {
      0: { x: 0,  y: -1 }, // Up
      1: { x: 1,  y: 0 },  // Right
      2: { x: 0,  y: 1 },  // Down
      3: { x: -1, y: 0 }   // Left
    };
  
    return map[direction];
};

// Performs a move on grid given a direction
// DOES NOT add the random tile, this is handled
// differently by the different search algorithms
Grid.prototype.move = function(direction)
{
    var self = this;

    var cell, tile;

    var vector     = this.getVector(direction);
    var traversals = this.buildTraversals(vector);
    var moved      = false;

    // Traverse the grid in the right direction and move tiles
    traversals.x.forEach(function (x) {
        traversals.y.forEach(function (y) {
            cell = { x: x, y: y };
            tile = self.cellContent(cell);

            if (tile) {
                var positions = self.findFarthestPosition(cell, vector);
                var next      = self.cellContent(positions.next);

                // Only one merger per row traversal?
                if (next && next.value === tile.value && !next.mergedFrom) {
                    var merged = new Tile(positions.next, tile.value * 2);
                    merged.mergedFrom = [tile, next];

                    self.insertTile(merged);
                    self.removeTile(tile);

                    // Converge the two tiles' positions
                    tile.updatePosition(positions.next);

                    // Update the score
                    self.score += merged.value;

                    // The mighty 2048 tile
                    //if (merged.value === 2048) { self.won = true; }
                } else {
                    self.cells[tile.x][tile.y] = null;
                    self.cells[positions.farthest.x][positions.farthest.y] = tile;
                    tile.updatePosition(positions.farthest.x);
                }

                // if positions are not the same, tile moved
                if (cell.x !== tile.x || cell.y !== tile.y) {
                    moved = true; // The tile moved from its original cell!
                } else {
                    console.log("NOT MOVED?");
                    console.log(self);
                }
            }
        });
    });

    return moved;
};

