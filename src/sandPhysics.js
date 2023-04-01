import { deepCopy } from "./helper.js";

export function calculateSandPhysics(currentMatrix){
	const newMatrix = deepCopy(currentMatrix)
	for(let y = (newMatrix.length - 1) ; y >= 0; y--){
		for(let x = 0; x <= newMatrix[0].length - 1; x++){
			let pixelObj = newMatrix[y][x];			
			// 1. Ignore pixels that aren't filled or already fixed
			if(!pixelObj.isFilled || pixelObj.isFixed) {
				continue;
			}
			
			// 2. Save copy of pixel below pixelObj
			let pixelObjBelow = y+1 >= newMatrix.length ? null : newMatrix[y+1][x];
			
			// 3. The border is below this pixel, affix the pixel
			if(pixelObjBelow === null){
				newMatrix[y][x] = {...pixelObj, isFixed: true, color: "brown"}
				continue
			}
			
			// 4. Pixel doesn't have anything under it: move it down
			else if(pixelObjBelow.isFilled === false){
				newMatrix[y][x] = {...pixelObj, isFilled: false, color: "white"}
				newMatrix[y+1][x] = {...pixelObjBelow, isFilled: true, color: "tan"}
				continue
			}
			
			// 5. Save copy of pixels to bottom left and bottom right
			let pixelObjBottomLeft = x-1 >= newMatrix[0].length ? null : newMatrix[y+1][x-1]
			let pixelObjBottomRight = x+1 < 0 ? null : newMatrix[y+1][x+1]
			
			// 6. Determine which are available (1 or both)
			const isBottomLeftOpen = pixelObjBottomLeft !== null && !pixelObjBottomLeft.isFilled
			const isBottomRightOpen = pixelObjBottomRight !== null && !pixelObjBottomRight.isFilled

			// 7. Both are available, randomly choose
			if(isBottomLeftOpen && isBottomRightOpen){
				const randomIdx = Math.floor(Math.random()*2)
				const options = [pixelObjBottomLeft, pixelObjBottomRight]
				const choice = options[randomIdx]
				newMatrix[y][x] = {...pixelObj, isFilled: false, color: "white"}
				newMatrix[choice.y][choice.x] = {...choice, isFilled: true, color: "tan"}
				continue
			}
			
			// 8. Only bottomLeft is available
			else if(isBottomLeftOpen){
				newMatrix[y][x] = {...pixelObj, isFilled: false, color: "white"}
				newMatrix[y+1][x-1] = {...pixelObjBottomLeft, isFilled: true, color: "tan"}
				continue
			}
			
			// 9. Only bottomRight is available
			else if(isBottomRightOpen){
				newMatrix[y][x] = {...pixelObj, isFilled: false, color: "white"}
				newMatrix[y+1][x+1] = {...pixelObjBottomRight, isFilled: true, color: "tan"}
				continue
			}
			
			// 10. Pixel is at border bottom or pixel below is fixed: fix current pixel position
			else if(pixelObjBelow.isFixed === true){
				newMatrix[y][x] = {...pixelObj, isFixed: true, color: "brown"}
				continue
			}
			
			// 11. Nothing is available, remain but do not set isFixed = true
			else{
				continue
			}
		}
	}
	return newMatrix
}