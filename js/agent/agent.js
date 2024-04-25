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
    /*
    var moveChoice = this.chooseMove();
    this.gameManager.move(moveChoice);
    */

    // TODO
    this.gameManager.grid.generateSuccessors()
        .forEach((s) => {
            console.log(s.serialize());
        });
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
    // TODO
    return 0;
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
