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

    // add a score to the grid for heuristics purposes
    this.gameManager.grid.score = this.gameManager.score;

    // set the functionality of the play button
    this.agentControls.bindToPlay(this.doOneMove.bind(this));

    //this.execute();
}

Agent.prototype.doOneMove = function ()
{
    var moveChoice = this.chooseMove();
    this.gameManager.move(moveChoice);

    // TODO
    /*this.gameManager.grid.generateSuccessors()
        .forEach((s) => {
            var map = { 0:"Up", 1:"Right", 2:"Down", 3:"Left" };
            console.log("Move in " + map[s.direction] + " direction gives these scores:"
                + "\nfree spaces: " + s.h_free_spaces()
                + "\nscore: " + s.h_score()
                + "\nmonotonicity: " + s.h_monotonicity());
        });*/
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
    return minimax(this.gameManager.grid, depth);
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
