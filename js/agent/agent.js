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
Agent.prototype.stopPlay = function () {  this.agentPlaying = false;  }

Agent.prototype.playOneMove = function ()
{
    this.worker.postMessage({
        size: this.gameManager.size,
        cells: this.gameManager.grid.serialize().cells,
        depth: this.agentControls.depth(),
        algorithm: this.agentControls.algorithm(),
        h_weights: this.agentControls.h_weights(),
    });
};
