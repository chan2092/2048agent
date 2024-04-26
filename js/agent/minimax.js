/*
 * Minimax search capabilities
 */

// Minimax search algorithm
// Adapted from pseudocode from:
//   Artificial Intelligence: a Modern Approach
//     Stuart Russell, Peter Norvig
function minimax(state, maxDepth)
{
    var res = maxValue(state, maxDepth);
    console.log("Chose move " + res.action + " with value " + res.value);
    return res.action;
}
function maxValue(state, depth)
{
    // search for best successor value
    var v = -Infinity;
    var a = -1;

    var valueList = []; ////////////////////////////////////////
    state.generateSuccessors().forEach((s2) => {
        var minRes = minValue(s2, depth);

        valueList.push(minRes.value); ////////////////////////////////////////////

        if (minRes.value > v) {
            v = minRes.value;
            a = s2.direction;
        }
    });

    // if terminal max win 100, lose 0
    if (state.over)
        return { value: (self.won) ? 100 : 0, action: -1 };

    /*
    console.log("MAX HERE, AT DEPTH " + depth
                + "\nfrom moves with values: " + valueList
                + "\nchose value: " + v); ////////////////////////////////////////
    */

    return { value: v, action: a };
}
function minValue(state, depth)
{
    // if reached depth here, return heuristic
    if (depth == 0) {
        var h_val = state.h_total();
        return { value: h_val, action: state.direction };
    }

    // search for worst (for max) random tile placement
    var v = Infinity;
    var a = -1;
    var valueList = []; //////////////////////////////////////////////
    state.generateRandomSuccessors().forEach((s2) => {
        var maxRes = maxValue(s2, depth-1);
        valueList.push(maxRes.value); ////////////////////////////////
        if (maxRes.value < v) {
            v = maxRes.value;
            a = s2.direction;
        }
    });

    /*
    console.log("MIN HERE, AT DEPTH " + depth
                + "\nfrom moves with values: " + valueList
                + "\nchose value: " + v); /////////////////////////////
    */
   
    return { value: v, action: a };
}
