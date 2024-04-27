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

// wait on messages from the UI thread to start
var running = false;
onmessage = function (event) {
    if (event.data.cells && event.data.size) {
        var grid = new Grid(event.data.size, event.data.cells);
        var depth = event.data.depth;
        this.postMessage(ab_minimax(grid, depth));
    }
};

