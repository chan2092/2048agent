/*
 * Minimax search capabilities
 */

// Minimax search algorithm
// Adapted from pseudocode from:
//   Artificial Intelligence: a Modern Approach
//     Stuart Russell, Peter Norvig
function ab_minimax(state, maxDepth)
{
    var res = ab_maxValue(state, maxDepth, -Infinity, Infinity);
    return res.action;
}
function ab_maxValue(state, depth, a, b)
{
    // search for best successor value
    var val = -Infinity;
    var act = -1;

    state.generateSuccessors().forEach((s2) => {
        var minRes = ab_minValue(s2, depth, a, b);

        if (minRes.value > val) {
            val = minRes.value;
            act = s2.direction;
            a = Math.max(a, val);
        }

        // prune
        if (val >= b)
            return { value: val, action: act };
    });

    // if terminal max win 100, lose 0
    if (state.over)
        return { value: (state.won)? 100 : 0, action: -1 };

    return { value: val, action: act };
}
function ab_minValue(state, depth, a, b)
{
    // if reached depth here, return heuristic
    if (depth == 0) {
        var h_val = state.h_total();
        return { value: h_val, action: state.direction };
    }

    // search for worst (for max) random tile placement
    var val = Infinity;
    var act = -1;

    state.generateRandomSuccessors().forEach((s2) => {
        var maxRes = ab_maxValue(s2, depth-1, a, b);
        
        if (maxRes.value < val) {
            val = maxRes.value;
            act = s2.direction;
            b = Math.min(b, val);
        }

        // prune
        if (val <= a)
            return { value: val, action: act };
    });
   
    return { value: val, action: act };
}
