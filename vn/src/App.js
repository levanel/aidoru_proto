// App.jsx
import './App.css'
import PlayerDashboard from './components/player';
import Flowhandler from './components/engine'
import { checkStoryCycle } from './components/infinitechecker';
import GraphicEngine from './components/graphengine';
function App() {

{ /* const prerequisites = [
        ["node_002", "node_001"],
        ["node_003", "node_002"],
        ["node_004", "node_003"],
        ["node_005", "node_004"],
        ["node_003", "node_005"] 
    ]
    const iscycle = checkStoryCycle(prerequisites); */}
  return (
    <div className="App">
      <h1>eldenring</h1>
      <PlayerDashboard />
      <Flowhandler />
      <GraphicEngine/>
      {/*
        iscycle 
          ? "yes"
          : "nope"
      */}
    </div>
  );
}

export default App;
