import { deepCopy } from "./helper.js";

export function calculateBasicPhysics(currentMatrix){
	const newMatrix = deepCopy(currentMatrix)
	for(let y = (newMatrix.length - 1) ; y >= 0; y--){
		for(let x = 0; x <= newMatrix[0].length - 1; x++){
			let pixelObj = newMatrix[y][x];			
			// 1. Ignore pixels that aren't filled
			if(!pixelObj.isFilled){
				continue;
			}
			
			// 2. Save copy of pixel below pixelObj
			let pixelObjBelow = y+1 >= newMatrix.length ? null : newMatrix[y+1][x];
		
			// 3. Pixel is at border bottom or pixel below is fixed: fix current pixel position
			if(pixelObjBelow === null || pixelObjBelow.isFixed === true){
				newMatrix[y][x] = {...pixelObj, isFixed: true, color: "black"}
				continue
			}

			// 4. Pixel doesn't have anything under it: move it down
			else if(pixelObjBelow.isFilled === false){
				newMatrix[y][x] = {...pixelObj, isFilled: false, color: "white"}
				newMatrix[y+1][x] = {...pixelObjBelow, isFilled: true, color: "gray"}
				continue
			}
		}
	}
	return newMatrix
}