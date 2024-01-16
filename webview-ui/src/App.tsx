import { vscode } from "./utilities/vscode";
import { VSCodeButton, VSCodeTextArea, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import "./App.css";
import { useState, useEffect } from "react";
import { TextField } from "@vscode/webview-ui-toolkit";


function App() {

  const [counter, setCounter] = useState(0)
  const [config, setConfig] = useState<any>()

  const [cve, setCVE] = useState('CVE-2019-12900')
  const [cveContent, setCVEContent] = useState<any>()

  useEffect(() => {

    // Listen for messages from the extension
    window.addEventListener('message', (event) => {
      const message = event.data;

      if (message.command === 'sendConfig') {
        const configSettingValue = message.configSetting;
        // Now you can use configSettingValue in your React component
        console.log('Extension Configuration:', configSettingValue);
        setConfig({ config: configSettingValue})
      }
      if (message.command === 'sendCVE') {
        const cve = message.cve;
        // Now you can use configSettingValue in your React component
        console.log('CVE:', cve);
        setCVEContent(cve)
      }
    });
    vscode.postMessage({
      command: 'getConfig'
    });
  }, []);

  function handleShowContinuousProgress() {
    vscode.postMessage({
      command: "progress-continuous",
      text: "Hey there partner! 🤠",
    });
  }
  function handleShowProgress() {
    vscode.postMessage({
      command: "progress",
      text: "Hey there partner! 🤠",
    });
  }

  function getStuff() {
    vscode.postMessage({
      command: "getCVE",
      text: cve,
    });
  }

  return (
    <main>
      <h1>This is the counter! {counter}</h1>
      <VSCodeTextField value={cve} onInput={(e) => setCVE((e?.target as TextField)?.value)} />

      <VSCodeButton onClick={getStuff}>Show message with counter</VSCodeButton>

      <VSCodeButton onClick={handleShowContinuousProgress}>Show continuous progress</VSCodeButton>

      <VSCodeButton onClick={handleShowProgress}>Show progress</VSCodeButton>

      <VSCodeTextArea value={JSON.stringify(cveContent)} resize='both'/>
    </main>
  );
}

export default App;
