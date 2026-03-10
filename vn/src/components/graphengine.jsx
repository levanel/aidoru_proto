import { Stage, Sprite } from '@pixi/react';
import useplayerInfo from '../store'; 
import story from '../story.json'; 

function GraphicsEngine() {
    const screenWidth = 1280;
    const screenHeight = 720;

    const { currentNodeId } = useplayerInfo();
    const {currentBackground} = useplayerInfo();
    
    const currentNodeData = story[currentNodeId];

    /*const bgImage = currentNodeData?.background || null;*/

    return (
        <Stage width={screenWidth} height={screenHeight} options={{ backgroundColor: 0x1099bb }}>
            
            {currentBackground && (
                <Sprite 
                    image={currentBackground} 
                    x={0} 
                    y={0} 
                    width={screenWidth} 
                    height={screenHeight} 
                />
            )}
            
        </Stage>
    );
}

export default GraphicsEngine;