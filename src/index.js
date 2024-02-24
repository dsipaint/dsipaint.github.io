import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Two from 'two.js';
import $ from 'jquery';
import Renderer from './Renderer.js';

//render top-title animation
var titlerender = new Two({
  type: Two.Types.webgl,
  fitted: true
})
titlerender.appendTo($('#title')[0]);
Renderer.background(titlerender);

var background = titlerender.makeGroup();
var foreground = titlerender.makeGroup();

function getLine()
{
  var points = Renderer.randomLineBetweenTwoSides(titlerender);
  if(Math.random() < 0.5) //50% chance for straight lines
    return new Two.Path([new Two.Anchor(points[0], points[1]), new Two.Anchor(points[2], points[3])]);
  else //50% chance for curved bezier path
  {
    let bezierpoints = [
      new Two.Anchor(points[0], points[1], Math.floor(Math.random()*titlerender.width), Math.floor(Math.random()*titlerender.height), Math.floor(Math.random()*titlerender.width), Math.floor(Math.random()*titlerender.height), Two.Commands.move),
      new Two.Anchor(points[2], points[3], Math.floor(Math.random()*titlerender.width), Math.floor(Math.random()*titlerender.height), Math.floor(Math.random()*titlerender.width), Math.floor(Math.random()*titlerender.height), Two.Commands.curve)
    ];
    
    bezierpoints.forEach(p => p.relative = false);
    //don't ask me what difference "the tricks" make, they just do
    let bezierPath = new Two.Path(bezierpoints); //I think the trick is specifically using Two.Path rather than two.makePath
    bezierPath.automatic = false; //changing this is also the trick, without it it doesn't work
    bezierPath.fill = 'none';

    return bezierPath;
  }
}


var lines = []
var maxspeed = 0.007;
var minspeed = 0.005;
titlerender.bind('update', function(framecount){
  while(lines.length !== 10) //10 lines at any given time
  {
    line = getLine();
    line.stroke = '#' + Math.floor(Math.random()*16777215).toString(16);
    line.linewidth = 3;
    background.add(line);
    line.beginning = 1;
    line.speed = minspeed + (Math.random()*(maxspeed - minspeed)); //add our own custom speed parameter to each line
    
    lines.push(line);  
  }

  for(var i = 0; i < lines.length; i++)
  {
    var line = lines[i];
    if(line.beginning <= 0) //fade lines out when they're finished drawing
    {
      line.opacity -= 0.1;
      if(line.opacity <= 0)
      {
        background.remove(line);

        lines.splice(lines.indexOf(line), 1);
        return;
      }
    }
  
    line.beginning -= line.speed;
  }

}).play();

var text = titlerender.makeText("Get Squigalin", 0,  0, {size: 50, alignment: 'left'});
text.fill = 'white';
text.stroke = 'black';

var rect = text.getBoundingClientRect();
text.translation.y = rect.height - rect.top + parseInt($('body').css('margin').replace("px", "")); //for some reason text is aligned weird- this is the best way I've found to somewhat center it
text.translation.x = -parseInt($('body').css('margin').replace("px", ""));

foreground.add(text);

titlerender.update();

//render react app itself
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
