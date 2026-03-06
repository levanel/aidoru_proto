import { Stage, Sprite } from '@pixi/react';
import useplayerInfo from '../store'; // Import your vault!
import story from '../story.json'; // Import your DAG!

function GraphicsEngine() {
    const screenWidth = 1280;
    const screenHeight = 720;

    // 1. Grab the current node ID from Zustand
    const { currentNodeId } = useplayerInfo();
    
    // 2. Look up the data for this exact node
    const currentNodeData = story[currentNodeId];

    // 3. Fallback: If the node doesn't have a background, use a default blue
    // If it does, use the image!
    const bgImage = currentNodeData?.background || null;

    return (
        <Stage width={screenWidth} height={screenHeight} options={{ backgroundColor: 0x1099bb }}>
            
            {/* 4. Make the Sprite dynamic! */}
            {bgImage && (
                <Sprite 
                    image={bgImage} 
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