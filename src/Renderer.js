//this code represents an image generated in a box by two.js


//this generates 2 points, representing a randomly generated line between 2 sides
//this only returns the ends of the line, so you are free to draw the line however you want
function randomLineBetweenTwoSides(two)
{
    //this generates a random point on a given side of the box
    function pickRandomSidePos(side)
    {
        switch(side)
        {
            case 0:
                return [0, Math.floor(Math.random()*two.height)];

            case 1:
                return [two.width, Math.floor(Math.random()*two.height)];

            case 2:
                return [Math.floor(Math.random()*two.height), 0];

            case 3:
                return [Math.floor(Math.random()*two.height), two.height];

            default:
                return [0, 0];

        }
    }

        //get 2 different random numbers
        var rand1 = Math.floor(Math.random()*4);
        var rand2 = Math.floor(Math.random()*4);
        if(rand1 === rand2)
            rand2 = (rand1 + 1)%3;

        var coords1 = pickRandomSidePos(rand1);
        var coords2 = pickRandomSidePos(rand2);
        return [coords1[0], coords1[1], coords2[0], coords2[1]];
}

function renderRandomStraightLines(two)
{
    //make multiple lines
    const maxlines = 10;
    const minlines = 5;
    var randlines = minlines + Math.floor(Math.random()*(maxlines + 1 - minlines));
    for(var j = 0; j < randlines; j++)
    {
        var coords = randomLineBetweenTwoSides(two);
        var line = two.makeLine(coords[0], coords[1], coords[2], coords[3]);
    }
}

export default renderRandomStraightLines;