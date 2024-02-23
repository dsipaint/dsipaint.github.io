import './App.css';
import { useState } from "react";
import Two from "two.js";
import Renderer from './Renderer.js';
import ReactDOMServer from 'react-dom/server';
import $ from 'jquery';


function App() {

  //start with the default settings
  const defaultsettings = {
    number: 1,
    type: "Stripes"
  }

  //when you want to add more rendering options, add the name and the method here :)
  const renderingoptions = {
    stripes: Renderer.renderStripes,
    random_straight_lines: Renderer.renderRandomStraightLines,
    curve_stripes: Renderer.renderCurveStripes,
    random_curves: Renderer.renderRandomCurves,
    random_lines_and_curves: Renderer.renderRandomLinesAndCurves,
    crisscross: Renderer.renderCrissCross
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

  //whenever type of image is changed, remember this in the settings
  const saveUserType = function (event) {
    setSettings({
      ...settings,
      type: event.target.value
    });
  }

  //when the button is pushed, we want to draw our boxes
  const generateImages = function () {
    //remove old boxes
    $(".box").remove();

    //add the right number of boxes to draw to
    for(var i = 0; i < settings.number; i++)
      $("#menu").after(ReactDOMServer.renderToStaticMarkup(<div id={"box" + i} className="box"></div>));

    //then draw in each box
    var boxes = document.getElementsByClassName("box");
    for(i = 0; i < boxes.length; i++)
    {
      var params = {
        width: 796.8, //hard-coded from app.css, the number of pixels to match the measurements of a4 paper
        height: 1123.2,
        type: Two.Types.canvas //draw as a two.js canvas so we can easily export the result
      }
      var two = new Two(params);
      two.appendTo(boxes[i]);
      Renderer.background(two);

      renderingoptions[settings.type.toLowerCase().replaceAll(" ", "_")](two);

      two.update();
    }
  }

  return (
    <div>
      <div id="menu">
        <input type="number" defaultValue={defaultsettings.number} onChange={saveUserNumber}></input>
        <select id="selectType"onChange={saveUserType}>
          {
            Object.keys(renderingoptions).map(key => (
              <option>{key.replaceAll("_", " ")}</option>
            ))
          }
        </select>
        <button onClick={generateImages}>Generate Images</button>
      </div>
    </div>
  );
}

export default App;
