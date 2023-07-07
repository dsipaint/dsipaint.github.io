import './App.css';
import { useState } from "react"

function App() {

  var defaultsettings = {
    number: 1
  }

  const [settings, setSettings] = useState(defaultsettings);
  const [presettings, setPreSettings] = useState(defaultsettings);

  const saveUserNumber = function (event) {
    setPreSettings({
      ...presettings,
      number: event.target.value
    })
  }

  const generateImages = function () {
    setSettings({
      ...presettings
    })
  };

  var divs = [];
  for(var i = 0; i < settings.number; i++)
    divs.push(<div className="box"></div>);

  return (
    <div>
      <input type="number" defaultValue={defaultsettings.number} onChange={saveUserNumber}></input>
      <button onClick={generateImages}>Generate Images</button>
      {divs}
    </div>
  );
}

export default App;
