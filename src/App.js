import './App.css';
import Image from './Image.js';
import { useState } from "react";

function App() {
  //we store the user settings here before we apply them with the button
  const [userunAppliedSettings, setUserUnappliedSettings] = useState({
    images: 10
  });

  //update the number of images stored in the unapplied settings
  const usrNumImageChange = function(event) {
    setUserUnappliedSettings({
      ...userunAppliedSettings,
      images: event.target.value
    });
  }

  //this is the user's actual applied settings
  const [usersettings, updateUserSettings] = useState({
    images: 1 //default images set as 10
  });

  //this is called when the button is pressed to update the user's actual settings
  const updateSettingsHandle = function(event) {
    updateUserSettings({...userunAppliedSettings});
  }

  var images = []
  for(var i = 0; i < usersettings.images; i++)
    images.push(<Image />)

  return (
    <div>
      <input type="number" defaultValue="1" onChange={usrNumImageChange}></input>
      <button onClick={updateSettingsHandle}>Generate images</button>
      {images}
    </div>
  );
}

export default App;
