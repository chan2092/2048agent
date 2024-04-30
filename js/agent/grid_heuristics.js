/*
 * Functions that extend the 2048 Grid's capabilities.
 * Heuristics (h_*()) are described here.
 */

// Weights by which heuristics are applied
var grid_h_weights = {
    h_free_spaces: 0.25,
    h_uniformity: 0.2,
    h_monotonicity: 0.2,
    h_score: 0.25,
    h_large_cornered: 0.05,
    h_max_tile: 0.05,
};

// Combination of all heuristics
// weights are modified by the user via AgentControls
// Each heuristic is escaped so that if their weight
// is zero, they won't be calculated.
Grid.prototype.h_total = function()
{
    var score = 0;
    if (grid_h_weights.h_free_spaces != 0)
        score += grid_h_weights.h_free_spaces * this.h_free_spaces();
    if (grid_h_weights.h_uniformity != 0)
        score += grid_h_weights.h_uniformity * this.h_uniformity();
    if (grid_h_weights.h_monotonicity != 0)
        score += grid_h_weights.h_monotonicity * this.h_monotonicity();
    if (grid_h_weights.h_score != 0)
        score += grid_h_weights.h_score * this.h_score();
    if (grid_h_weights.h_large_cornered != 0)
        score += grid_h_weights.h_large_cornered * this.h_large_cornered();
    if (grid_h_weights.h_max_tile != 0)
        score += grid_h_weights.h_max_tile * this.h_max_tile();
    return score;
}

// Encodes percentage of spaces on board free
Grid.prototype.h_free_spaces = function()
{
    return this.availableCells().length / 16;
};

// Literal score of the board
// approximated, can't know if a 4-tile was randomly
// spawned or made from two 2-tiles
// Ex.: for a 32-tile, the score must have been around...
//      32 -> 32 + 16*2 + ~8*4 -> ~3*32
Grid.prototype.h_score = function()
{
    
    var score = 0;

    for (var row = 0; row < this.size; row++) {
        for (var col = 0; col < this.size; col++) {
            var cell = this.cellContent({x: row, y: col});
            if (!!cell) {
                var value = cell.value;
                score += value * (Math.log2(value) - 1);
            }
        }
    }
    
    
    return score / 10000;
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

Grid.prototype.h_max_tile = function ()
{
    var best = -Infinity;
    this.eachCell((x, y, c) => {
        if (c != null && c.value > best) best = c.value;
    });
    return best / 2048;
};

// uniformity as described by Kohler, et al.
Grid.prototype.h_uniformity = function ()
{
    var score = 0;
    var tileCounts = {};
    this.eachCell((c) => {
        if (tileCounts[c.value])
            tileCounts[c.value]++;
        else
            tileCounts[c.value] = 1;
    });
    for (var key in tileCounts) {
        score += Math.pow(tileCounts[key], 3);
    }
    return score / 4096;
};

Grid.prototype.h_large_cornered = function ()
{
    var score = 0;
    this.eachCell((x, y, c) => {
        if (c != null) {
            // half of tile value for each of x and y on the edge
            var tileScore = 0;
            if (c.x == 0 || c.x == this.size - 1) tileScore += 0.5;
            if (c.y == 0 || c.y == this.size - 1) tileScore += 0.5;
            score += c.value * tileScore;
        }
    });
    return score / 1024;
};
