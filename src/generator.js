import { Pixel } from "./Pixel.js"

export function generateNewMatrix(width, height){
	const newMatrix = new Array(height);
	for(let y = 0; y < height; y++){
		newMatrix[y] = (new Array(width));
		for(let x = 0; x < height; x++){
			newMatrix[y][x] = new Pixel(x, y, "white", false, false)
		}
	}
	return newMatrix;
}