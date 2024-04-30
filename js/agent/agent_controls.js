function AgentControls()
{
    // input for search algorithm type
    this.algorithm_input = document.getElementById("agent-algorithm");

    // input for search depth
    this.depth_input = document.getElementById("agent-depth");

    // input for search heuristics
    this.h_score_input = document.getElementById("ah-score");
    this.h_monotonicity_input = document.getElementById("ah-monotonicity");
    this.h_free_spaces_input = document.getElementById("ah-free-spaces");
    this.h_max_tile_input = document.getElementById("ah-max-tile");
    this.h_large_cornered_input = document.getElementById("ah-large-cornered");
    this.h_uniformity_input = document.getElementById("ah-uniformity");

    // play buttons
    this.play_one_input = document.getElementById("agent-play-one");
    this.play_input = document.getElementById("agent-play");
    this.pause_input = document.getElementById("agent-pause");
}

AgentControls.prototype.algorithm = function()
{
    return this.algorithm_input.value;
};

AgentControls.prototype.depth = function()
{
    return this.depth_input.value;
};

AgentControls.prototype.h_weights = function()
{
    return {
        h_free_spaces: this.h_free_spaces_input.value,
        h_uniformity: this.h_uniformity_input.value,
        h_monotonicity: this.h_monotonicity_input.value,
        h_score: this.h_score_input.value,
        h_large_cornered: this.h_large_cornered_input.value,
        h_max_tile: this.h_max_tile_input.value
    };
};

AgentControls.prototype.bindToPlayOne = function(fn)
{
    this.play_one_input.addEventListener("click", fn);
    this.play_one_input.addEventListener("touchend", fn);
};

AgentControls.prototype.bindToPlay = function(fn)
{
    this.play_input.addEventListener("click", fn);
    this.play_input.addEventListener("touchend", fn);
};

AgentControls.prototype.bindToPause = function(fn)
{
    this.pause_input.addEventListener("click", fn);
    this.pause_input.addEventListener("touchend", fn);
};
