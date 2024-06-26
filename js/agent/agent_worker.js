/*
 * A web worker script to allow the 2048 UI to run at
 * the same time as the agent.
 */

// imports
importScripts("../tile.js");
importScripts("../grid.js");
importScripts("grid_heuristics.js");
importScripts("grid_successors.js");
importScripts("minimax.js");
importScripts("expectimax.js");

// wait on messages from the UI thread to start
var running = false;

onmessage = function (event) {
    if (event.data.cells && event.data.size && event.data.algorithm) {
        var grid = new Grid(event.data.size, event.data.cells);
        var depth = event.data.depth;
        var h_weights = event.data.h_weights;

        // set weights for grid heuristics
        grid_h_weights = h_weights;

        // get move according to specified algorithm
        var move;
        if (event.data.algorithm === "minimax")
            move = ab_minimax(grid, depth);
        else if (event.data.algorithm === "expectimax")
            move = expectimax(grid, depth);
        else
            move = Math.floor(Math.random() * 3.9);

        this.postMessage(move);
    }
};

