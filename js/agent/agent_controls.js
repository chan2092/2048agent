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

AgentControls.prototype.heuristics = function()
{
    var h_list = [];

    if (this.h_score_input.checked) h_list.append("score");
    if (this.h_monotonicity_input.checked) h_list.append("monotonicity");
    if (this.h_free_spaces_input.checked) h_list.append("free_spaces");

    return h_list;
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
