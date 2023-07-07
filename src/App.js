import './App.css';
import { useState } from "react";
import Two from "two.js";
import render from './Image.js';
import $ from "jquery"


function App() {

  //start with the default settings
  var defaultsettings = {
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
    $("#boxcontainer").empty();
    for(var i = 0; i < settings.number; i++)
      $("#boxcontainer").append("<div id=\"box-" + i + "\" class=\"box\"></div>");

    //then draw in each box

    var boxes = document.getElementsByClassName("box");
    for(var i = 0; i < boxes.length; i++)
    {
      var params = {
        fitted: true
      }
      var two = new Two(params);
      two.appendTo(boxes[i]);
      render(two);
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
