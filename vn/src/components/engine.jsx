import story from '../story.json'
import useplayerInfo from '../store' 

function Flowhandler(){
    const {currentNodeId, advanceNode} =useplayerInfo();
    const currentNodeData = story[currentNodeId];

    if(!currentNodeData || currentNodeId ==="END"){
        return <h1>great enemy felled</h1>;
    }

    return(
        <div>
            {currentNodeData.type === "event" && (
                <div>
                    <h2>sys event</h2>
                    <button onClick={()=>advanceNode(currentNodeData.nextNode)}> next part</button>
                </div>
            )}

            {currentNodeData.type === "dialogue" && (
                <div>
                    <h3>{currentNodeData.speakerName}</h3>
                    <p>{currentNodeData.text}</p>
                    <button onClick={()=>advanceNode(currentNodeData.nextNode)}> next dialog</button>
                </div>
            )}

            {currentNodeData.type === "branch" && (
                <div>
                    <h3>{currentNodeData.speakerName}</h3>
                    <p>{currentNodeData.text}</p> 
                    <ul>
                        {currentNodeData.choices.map((choiceObject, index)=>(
                            <li key = {index}>
                                <button onClick={()=>advanceNode(choiceObject.nextNode)}>
                                    {choiceObject.label}
                                </button>
                            </li>
                        ))}    
                    </ul>                   
                </div>
            )}
        </div>
    )
}

export default Flowhandler