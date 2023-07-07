import './App.css';
import { useState } from "react"

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
    })
  };

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
