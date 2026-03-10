import { create } from "zustand";
import { produceWithPatches, applyPatches,enablePatches } from "immer";
import story from './story.json';
enablePatches();

let backupstates=[];    
const useplayerInfo = create((set)=>({
    score :0,
    inventory:['grace', 'sword'],
    playerName:'tarnished',
    currentNodeId: "start_node",
    currentBackground: story["start_node"].background || null, 
    updateName : (newName)=>set((state)=>{
        const [nextState, patches, inversePatches] = produceWithPatches(state, (draft)=>{
            draft.playerName=newName;
        });
        backupstates.push(inversePatches);

        return nextState;
    }),
    advanceNode :(nextNodeId, storyData)=>set((state)=>{
        const [nextState, patches, inversePatches] = produceWithPatches(state, (draft)=>{
            draft.currentNodeId=nextNodeId;

            //check nextnode if it exist.
            const checknextnode = story[nextNodeId];
            if(checknextnode && checknextnode.background){
                draft.currentBackground=checknextnode.background;
            }

        });
        backupstates.push(inversePatches);
        return nextState;
    }),
    addScore: (points)=>set((state)=>{
        const [nextState, patches, inversePatches] = produceWithPatches(state, (draft)=>{
            draft.score+=points;
        });
        backupstates.push(inversePatches);

        return nextState;
    }),
    addItem: (item)=>set((state) =>{
        const [nextState, patches, inversePatches] = produceWithPatches(state, (draft)=>{
            draft.inventory.push(item);
        });
        backupstates.push(inversePatches);
        return nextState;    
}),
    resetGame:()=>set((state) =>{
        const [nextState, patches, inversePatches] = produceWithPatches(state, (draft)=>{
            draft.score = 0;
            draft.inventory = [];
            draft.playerName = 'tarnished';
        });
        backupstates.push(inversePatches);
        return nextState;    
}),

    undo: () => set((state) => {
        if (backupstates.length === 0) return state;
                const lastPatch = backupstates.pop();
        return applyPatches(state, lastPatch);
    })
}))

export default useplayerInfo;
