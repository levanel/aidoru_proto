import useplayerInfo from "../store";

function PlayerDashboard(){
  const {score, inventory, playerName, updateName, addScore, addItem, undo} = useplayerInfo();
  return(
    <div>
      <h2>Player: {playerName}</h2>
      <p>score: {score}</p>
      <p>inventory: {inventory.join(', ')}</p>

      <input
        type = "text"
        value={playerName}
        onChange = {(e)=>updateName(e.target.value)}
        placeholder = "thou art"
      />

      <button onClick={()=>addScore(10)}>defeat boss</button>
      <button onClick={()=>addItem('mini Ranni')}>finditem</button>
      <button onClick={()=>undo()}>reverse</button>
    </div>
  );
}

export default PlayerDashboard