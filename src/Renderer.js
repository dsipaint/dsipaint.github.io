import Two from "two.js";

//this code represents an image generated in a box by two.js


function background(two)
{
    var background = two.makeRectangle(0, 0, 10000, 10000);
    background.fill = 'white'
}

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
            new Two.Anchor(coords[0], coords[1], Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Two.Commands.move),
            new Two.Anchor(coords[2], coords[3], Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Two.Commands.curve)
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
                new Two.Anchor(coords[0], coords[1], Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Two.Commands.move),
                new Two.Anchor(coords[2], coords[3], Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height), Two.Commands.curve)
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

function renderStripes(two)
{
    const maxgradient = 10;
    const gradient = -maxgradient + Math.floor(Math.random()*(maxgradient*2 + 1));

    const maxspacing = 50;
    const minspacing = 100;
    const spacing = minspacing + Math.floor(Math.random()*(maxspacing + 1 - minspacing));
    //ignore offset for now

    //iterate upwards until we reach the top
    var n = 0;
    while(n*spacing <= two.height)
    {
        two.makeLine(0, n*spacing, two.width, (gradient*two.width) + (n*spacing));
        n++;
    }

    if(gradient >= 0)
    {
        //then iterate downwards until the intersection reaches the bottom
        n = -1;
        while((gradient*two.width) + (n*spacing) > 0)
        {
            two.makeLine(0, n*spacing, two.width, (gradient*two.width) + (n*spacing));
            n--;
        }
    }
    else
    {
        //keep iterating up until the opposite side intersections hit the top
        while((gradient*two.width) + (n*spacing) <= two.width)
        {
            two.makeLine(0, n*spacing, two.width, (gradient*two.width) + (n*spacing));
            n++;
        }
    }
}

function renderCrissCross(two)
{
    renderStripes(two);
    renderStripes(two);
}

function renderCurveStripes(two)
{
    //determines which way round the curves spawn, horizontal or vertical
    var use_y = Math.random() < 0.5;
    var bound = use_y ? two.height : two.width;

    //spacing between lines
    let minspacing = 20;
    let maxspacing = 100;
    var spacing = minspacing + Math.floor(Math.random()*maxspacing);

    //without lines either side, because the lines curve, there are large gaps of space where you would imagine offscreen curves should curve into
    let lineseitherside = 10;

    var pointset1 = [];
    for(var i = -(spacing*lineseitherside); i <= bound + (spacing*lineseitherside); i+=spacing)
        pointset1.push(-(spacing*lineseitherside) + i);


    var pointset2 = [];
    for(var i = -(spacing*lineseitherside); i <= bound + (spacing*lineseitherside); i+=spacing)
        pointset2.push(-(spacing*lineseitherside) + i);

    console.log(pointset1);

    //draw points as curves
    var lefthandle = [Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height)]
    var righthandle = [Math.floor(Math.random()*two.width), Math.floor(Math.random()*two.height)]
    for(var i = 1; i < pointset1.length; i++)
    {
        var points = []
        if(use_y)
        {
            points = [
                new Two.Anchor(pointset1[i], 0, lefthandle[0] + (i*spacing), lefthandle[1] + (i*spacing), righthandle[0], righthandle[1], Two.Commands.move),
                new Two.Anchor(pointset2[i], two.height, lefthandle[0] + (i*spacing), lefthandle[1] + (i*spacing), righthandle[0], righthandle[1], Two.Commands.curve)
              ];
        }
        else
        {
            points = [
                new Two.Anchor(0, pointset1[i], lefthandle[0] + (i*spacing), lefthandle[1] + (i*spacing), righthandle[0], righthandle[1], Two.Commands.move),
                new Two.Anchor(two.width, pointset2[i], lefthandle[0] + (i*spacing), lefthandle[1] + (i*spacing), righthandle[0], righthandle[1], Two.Commands.curve)
              ];
        }

        points.forEach(p => p.relative = false);
        //don't ask me what difference "the tricks" make, they just do
        let bezierPath = new Two.Path(points); //I think the trick is specifically using Two.Path rather than two.makePath
        two.add(bezierPath);
        bezierPath.automatic = false; //changing this is also the trick, without it it doesn't work
        bezierPath.fill = 'none';  
    }
}

export default {
    background,
    renderRandomStraightLines,
    renderRandomCurves,
    renderRandomLinesAndCurves,
    renderStripes, 
    renderCrissCross,
    renderCurveStripes
};