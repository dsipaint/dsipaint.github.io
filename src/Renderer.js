import Two from "two.js";

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
    const randlines = minlines + Math.floor(Math.random()*(maxlines + 1 - minlines));
    for(var i = 0; i < randlines; i++)
    {
        var coords = randomLineBetweenTwoSides(two);
        var line = two.makeLine(coords[0], coords[1], coords[2], coords[3]);
    }
}

function renderRandomCurves(two)
{
    const maxlines = 10;
    const minlines = 5;
    const randlines = minlines + Math.floor(Math.random()*(maxlines + 1 - minlines));
    for(var j = 0; j < randlines; j++)
    {
        var coords = randomLineBetweenTwoSides(two);
        let points = [
            new Two.Anchor(coords[0], coords[1], null, null, Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Two.Commands.move),
            new Two.Anchor(coords[2], coords[3], 400, 500, Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Two.Commands.curve)
          ];
          
        points.forEach(p => p.relative = false);
        //don't ask me what difference "the tricks" make, they just do
        let bezierPath = new Two.Path(points); //I think the trick is specifically using Two.Path rather than two.makePath
        two.add(bezierPath);
        bezierPath.automatic = false; //changing this is also the trick, without it it doesn't work
        bezierPath.fill = 'none';   
    }
}

function renderRandomLinesAndCurves(two)
{
    const maxlines = 10;
    const minlines = 5;
    const randlines = minlines + Math.floor(Math.random()*(maxlines + 1 - minlines));
    for(var j = 0; j < randlines; j++)
    {
        var coords = randomLineBetweenTwoSides(two);

        // 50/50 chance to be a bezier curve or a straight line
        if(Math.random() < 0.5)
        {
            let points = [
                new Two.Anchor(coords[0], coords[1], null, null, Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Two.Commands.move),
                new Two.Anchor(coords[2], coords[3], 400, 500, Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Two.Commands.curve)
              ];
              
            points.forEach(p => p.relative = false);
            //don't ask me what difference "the tricks" make, they just do
            let bezierPath = new Two.Path(points); //I think the trick is specifically using Two.Path rather than two.makePath
            two.add(bezierPath);
            bezierPath.automatic = false; //changing this is also the trick, without it it doesn't work
            bezierPath.fill = 'none';  
        } 
        else
        {
            var line = two.makeLine(coords[0], coords[1], coords[2], coords[3]);
        }
    }
}

export default {
    renderRandomStraightLines,
    renderRandomCurves,
    renderRandomLinesAndCurves
};