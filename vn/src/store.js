import { create } from "zustand";
import { produceWithPatches, applyPatches,enablePatches } from "immer";
enablePatches();

let backupstates=[];
const useplayerInfo = create((set)=>({
    score :0,
    inventory:['grace', 'sword'],
    playerName:'tarnished',

    updateName : (newName)=>set((state)=>{
        const [nextState, patches, inversePatches] = produceWithPatches(state, (draft)=>{
            draft.playerName=newName;
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
