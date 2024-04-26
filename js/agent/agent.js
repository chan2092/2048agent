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
}

Agent.prototype.startPlay = function ()
{
    console.log("Starting continuous play");
    this.agentPlaying = true;
    while (this.agentPlaying && !this.gameManager.isGameTerminated()) {
        this.playOneMove();
    }
    console.log("Stopping continuous play");
}

Agent.prototype.stopPlay = function ()
{
    this.agentPlaying = false;
}

Agent.prototype.playOneMove = function ()
{
    // add a score to the grid for heuristics purposes
    this.gameManager.grid.score = this.gameManager.score;

    var moveChoice = this.chooseMove();
    this.gameManager.move(moveChoice);
};

Agent.prototype.chooseMove = function ()
{
    var chooseType = this.agentControls.algorithm();
    var move;

    if (chooseType === "minimax")
        move = this.chooseMinimaxMove();
    else if (chooseType === "expectimax")
        move = this.chooseExpectimaxMove();
    else
        move = this.chooseRandomMove();
    
    return move;
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
