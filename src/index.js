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

function getLine()
{
  var points = Renderer.randomLineBetweenTwoSides(titlerender);
  return new Two.Path([new Two.Anchor(points[0], points[1]), new Two.Anchor(points[2], points[3])]);
}


var lines = []
titlerender.bind('update', function(framecount){
  while(lines.length !== 10)
  {
    line = getLine();
    line.stroke = '#' + Math.floor(Math.random()*16777215).toString(16);
    line.linewidth = 3;
    titlerender.add(line);
    line.beginning = 1;
    
    lines.push(line);  
  }

  for(var i = 0; i < lines.length; i++)
  {
    var line = lines[i];
    if(line.beginning <= 0)
    {
      titlerender.remove(line);

      lines.splice(lines.indexOf(line), 1);
      return;
    }
  
    line.beginning -= 0.01;
  }

}).play();

var text = titlerender.makeText("Get Squigalin", 0,  0, {size: 50, alignment: 'left'});
text.fill = 'white';
text.stroke = 'black';

var rect = text.getBoundingClientRect();
text.translation.y = rect.height - rect.top + parseInt($('body').css('margin').replace("px", "")); //for some reason text is aligned weird- this is the best way I've found to somewhat center it
text.translation.x = -parseInt($('body').css('margin').replace("px", ""));

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
