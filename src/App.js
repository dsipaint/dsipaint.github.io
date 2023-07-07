import './App.css';
import { useState } from "react";
import Two from "two.js";
import render from './Image.js';

var params = {
  fitted: true
}
var two = new Two(params);

function App() {

  //start with the default settings
  var defaultsettings = {
    number: 1
  }

  //initialise the settings, and the unsaved settings
  const [settings, setSettings] = useState(defaultsettings);
  const [presettings, setPreSettings] = useState(defaultsettings);

  //when the number of images is changed, remember this in the unsaved settings
  const saveUserNumber = function (event) {
    setPreSettings({
      ...presettings,
      number: event.target.value
    })
  }

  //when the button is pushed, we want to update the real settings with the unsavedsettings
  const generateImages = function () {
    setSettings({
      ...presettings
    });

    //TODO rather than use the settings to affect the output of the render option, it might be worth
    //just doing some jquery magic here instead, manually appending the desired amount of boxes to some
    //container div, and then iterating and rendering in them. This less-reliance on using the state might
    //stop the weird outputs
    
    //after the button is pressed and the settings are updated, draw our images
    two.clear();

    var boxes = document.getElementsByClassName("box");
    for(var i = 0; i < boxes.length; i++)
    {
      two.appendTo(boxes[i]);
      render(two);
      two.update();
    }
  }

  //here, we want to use the real settings to generate our output
  var images = [];
  for(var i = 0; i < settings.number; i++)
    images.push(<div className="box"></div>);

  return (
    <div>
      <input type="number" defaultValue={defaultsettings.number} onChange={saveUserNumber}></input>
      <button onClick={generateImages}>Generate Images</button>
      {images}
    </div>
  );
}

export default App;
