/*
 * Functions that extend the 2048 Grid's capabilities.
 * Heuristics (h_*()) are described here.
 */

// Encodes percentage of spaces on board free
Grid.prototype.h_free_spaces = function()
{
    return this.availableCells().length / 16;
};

// Literal score of the board
// approximated, can't know if a 4-tile was randomly
// spawned or made from two 2-tiles
// Ex.: for a 32-tile, the score must have been...
//      32 -> 32 + 16*2 + ~8*4 -> ~3*32
Grid.prototype.h_score = function()
{
    var score = 0;

    for (var row = 0; row < this.size; row++) {
        for (var col = 0; col < this.size; col++) {
            var cell = this.cellContent({x: row, y: col});
            if (!!cell) {
                var value = cell.value;
                console.log(value);
                score += value * (Math.log2(value) - 1);
            }
        }
    }
    
    return score;
};

// Encodes quality of value gradient present on board
// Adapted from monotonicity heuristic pseudocode
// described by Kohler, et. al (2019)
// Divided by 24, the greatest possible value
Grid.prototype.h_monotonicity = function()
{
    var best = -1;

    // do for both pairs of opposing corners
    // grid is "rotated by 90 degrees" when i = 1
    for (var i = 0; i < 2; i++) {
        var currentCorner1 = 0;
        var currentCorner2 = 0;

        // check in one direction
        // this is horizontal if unrotated, vertical otherwise
        for (var x = 0; x < 4; x++) {
            var row;
            var col;

            // map row if not rotated and col if rotated
            if (i == 0) row = x;
            else col = x;

            for (var y = 0; y < 3; y++) {
                // map col if not rotated and row if rotated
                if (i == 0) col = y;
                else row = this.size - 1 - y;

                // check monotonicity "left" and "right"
                var leftVal = this.cellContent({x: row, y: col});
                var rightVal = this.cellContent({x: row, y: col + 1});
                if (leftVal >= rightVal) currentCorner1++;
                if (leftVal <= rightVal) currentCorner2++;
            }
        }

        // check in the other direction
        for (var y = 0; y < 4; y++) {
            var row;
            var col;

            // map col if not rotated and row if rotated
            if (i == 0) col = y;
            else row = this.size - 1 - y;

            for (var x = 0; x < 3; x++) {
                // map row if not rotated and col if rotated
                if (i == 0) row = x;
                else col = x;

                // check monotonicity "up" and "down"
                var upVal = this.cellContent({x: row, y: col});
                var downVal = this.cellContent({x: row + 1, y: col});
                if (upVal >= downVal) currentCorner1++;
                if (upVal <= downVal) currentCorner2++;
            }
        }

        // choose best to be the greatest monotonicity seen yet
        best = Math.max(best, Math.max(currentCorner1, currentCorner2));
    }

    return best / 24;
};
