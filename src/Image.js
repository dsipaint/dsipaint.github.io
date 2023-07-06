import Two from "two.js"

//this code represents an image generated in a box by two.js

function Image()
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

    var params = {
        fitted: true
    };
    
    var boxes = document.getElementsByClassName("box");
    for(var i = 0; i < boxes.length; i++)
    {
        var two = new Two(params).appendTo(boxes[0]);
    
        //make multiple lines
        var maxlines = 10;
        var minlines = 5;
        var randlines = minlines + Math.floor(Math.random()*(maxlines + 1 - minlines));
        for(var j = 0; j < randlines; j++)
        {
            //get 2 different random numbers
            var rand1 = Math.floor(Math.random()*4);
            var rand2 = Math.floor(Math.random()*4);
            if(rand1 === rand2)
                rand2 = (rand1 + 1)%3;
    
            var coords1 = pickRandomSidePos(rand1);
            var coords2 = pickRandomSidePos(rand2);
    
            var line = two.makeLine(coords1[0], coords1[1], coords2[0], coords2[1]);
            two.update()
        }
    }

    return <div className="box"></div>;
}

export default Image;