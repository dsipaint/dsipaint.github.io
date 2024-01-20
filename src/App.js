import './App.css';
import { useState } from "react";
import Two from "two.js";
import Renderer from './Renderer.js';
import $ from "jquery";


function App() {

  //start with the default settings
  const defaultsettings = {
    number: 1
  }

  //initialise the settings
  const [settings, setSettings] = useState(defaultsettings);

  //when the number of images is changed, remember this in the settings
  const saveUserNumber = function (event) {
    setSettings({
      ...settings,
      number: event.target.value
    })
  }

  //when the button is pushed, we want to draw our boxes
  const generateImages = function () {
    //add the right number of boxes to draw to
    $("#boxcontainer").empty(); //(remove old boxes)
    for(var i = 0; i < settings.number; i++)
      $("#boxcontainer").append("<div id=\"box-" + i + "\" class=\"box\"></div>");

    //then draw in each box
    var boxes = document.getElementsByClassName("box");
    for(i = 0; i < boxes.length; i++)
    {
      var params = {
        width: 500,
        height: 500,
        type: Two.Types.canvas //draw as a two.js canvas so we can easily export the result
      }
      var two = new Two(params);
      two.appendTo(boxes[i]);
      Renderer.background(two);
      
      // Renderer.renderCrissCross(two);
      // Renderer.renderRandomCurves(two);
      // Renderer.renderRandomLinesAndCurves(two);
      // Renderer.renderRandomStraightLines(two);
      Renderer.renderStripes(two);

      two.update();
    }
  }

  return (
    <div>
      <input type="number" defaultValue={defaultsettings.number} onChange={saveUserNumber}></input>
      <button onClick={generateImages}>Generate Images</button>
      <div id="boxcontainer"></div>
    </div>
  );
}

export default App;
