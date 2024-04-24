function Agent(GameManager, size, KeyboardInputManager, HTMLActuator, LocalStorageManager)
{
    this.gameManager = new GameManager(size, KeyboardInputManager, HTMLActuator, LocalStorageManager);
    this.agentControls = new AgentControls;

    this.agentControls.bindToPlay(this.doOneMove.bind(this));
    //this.execute();
}

Agent.prototype.doOneMove = function ()
{
    var moveChoice = this.chooseMove();
    this.gameManager.move(moveChoice);
    console.log(moveChoice);
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
