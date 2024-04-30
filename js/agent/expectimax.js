/*
 * Expectimax search capabilities
 */

// Expectimax search algorithm
// Adapted from Minimax pseudocode from:
//   Artificial Intelligence: a Modern Approach
//     Stuart Russell, Peter Norvig
function expectimax(state, maxDepth)
{
    var res = playerValue(state, maxDepth);
    return res.action;
}

function playerValue(state, depth)
{
    // search for best successor value
    var val = -Infinity;
    var act = -1;

    // if terminal max win 100, lose 0
    if (!state.cellsAvailable() &&
        !state.tileMatchesAvailable())
        return { value: (state.won)? 100 : 0, action: -1 };

    // player nodes
    state.generateSuccessors().forEach((s2) => {
        // chance nodes
        var branches = s2.availableCells().length;
        var expectedValue = 0;
        s2.generateRandomSuccessors().forEach((s3) => {
            var probability = s3.probability / branches;
            
            // if reached depth or if probability of occurrence
            // is below the threshold, successorValue is heuristic
            if (depth <= 0 || probability < 0.05)
                successorValue = s3.h_total();
            // otherwise it continues down the tree
            else 
                successorValue = playerValue(s3, depth - 1).value;

            // apply probability to get expected value / average
            expectedValue += probability * successorValue;            
        });

        if (expectedValue > val) {
            val = expectedValue;
            act = s2.direction;
        }
    });

    return { value: val, action: act };
}