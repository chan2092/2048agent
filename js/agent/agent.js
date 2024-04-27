/*
 * Class describing the high-level operations of the
 * 2048 Agent. Interfaces with the AgentControls class
 * in order to receive user input and with the
 * SearchAlgorithm classes to choose moves. Exacts output
 * via the pre-existing GameManager class.
 */

function Agent(gameManager)
{
    this.gameManager = gameManager;
    this.agentControls = new AgentControls;

    // control for continuous play, if true then play is going on
    this.agentPlaying = false;    

    // set the functionality of the play button
    this.agentControls.bindToPlayOne(this.playOneMove.bind(this));
    this.agentControls.bindToPlay(this.startPlay.bind(this));
    this.agentControls.bindToPause(this.stopPlay.bind(this));

    // set up the worker
    this.worker = new Worker("js/agent/agent_worker.js");
    /*this.worker.onmessage = (event) => {
        var m = event.data;
        this.gameManager.move(m);
    };*/
    this.worker.onmessage = (event) => {
        this.gameManager.move(event.data);
        if (this.agentPlaying && !this.gameManager.isGameTerminated())
            this.playOneMove();
        else
            this.agentPlaying = false;
    };
}

Agent.prototype.startPlay = function ()
{
    // set the worker's message receiver to keep running
    this.agentPlaying = true;
    this.playOneMove();
}

/*Agent.prototype.startPlay = function ()
{
    console.log("Starting continuous play");
    this.agentPlaying = true;
    while (this.agentPlaying && !this.gameManager.isGameTerminated()) {
        this.playOneMove();
    }
    console.log("Stopping continuous play");
}*/

Agent.prototype.stopPlay = function ()
{
    this.agentPlaying = false;
}

Agent.prototype.playOneMove = function ()
{
    this.worker.postMessage({
        size: this.gameManager.size,
        cells: this.gameManager.grid.serialize().cells,
        depth: this.agentControls.depth()
    });
};

Agent.prototype.chooseMove = function ()
{
    /*var chooseType = this.agentControls.algorithm();
    var move;

    if (chooseType === "minimax")
        move = this.chooseMinimaxMove();
    else if (chooseType === "expectimax")
        move = this.chooseExpectimaxMove();
    else
        move = this.chooseRandomMove();
    
    return move;*/
    var depth = this.agentControls.depth();
    var w = new Worker("js/agent/agent_worker.js");
    w.postMessage({
        grid: this.gameManager.grid,
        depth: depth
    });
    w.onmessage = (event) => {
        console.log("Move received: " + event.data);
    }
    return 0;
};

Agent.prototype.chooseMinimaxMove = function()
{
    var depth = this.agentControls.depth();
    console.log("choosing minimax move with depth " + depth);
    return ab_minimax(this.gameManager.grid, depth);
};

Agent.prototype.chooseExpectimaxMove = function()
{
    // TODO
    return 0;
};

Agent.prototype.chooseRandomMove = function()
{
    return Math.floor(Math.random() * 3.9);
};
