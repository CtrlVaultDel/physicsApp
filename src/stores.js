import { writable } from 'svelte/store';
import { generateNewMatrix } from "./generator.js"
import { calculateSandPhysics } from "./sandPhysics.js";
import { calculateBasicPhysics } from "./basicPhysics.js";
import { Pixel } from "./Pixel.js";

const DEFAULT_HEIGHT = 25;
const DEFAULT_WIDTH = 25;

function createBoardStore(){
	// =========================
	// Object properties (writable)
	// =========================
	const { subscribe, set, update } = writable({
		matrix: generateNewMatrix(DEFAULT_WIDTH, DEFAULT_HEIGHT),
		physicsType: "sand",
		color: "tan",
		isPaused: false,
		tickSpeed: 5000,
		height: DEFAULT_HEIGHT,
		width: DEFAULT_WIDTH,
	});
	
	// =========================
	// Public methods
	// =========================
	const methods = {
		startPhysics: () => update(board => ({...board, isPaused: false})),
		pausePhysics: () => update(board => ({...board, isPaused: true})),
		
		generatePixel: (x, y, color) => {
			let newPixel;
			update(board => {
				newPixel = new Pixel(x, y, color, false, true)
				return board
			})
			return newPixel;
		},
		
		updateColor: () => {
			update(board => {
				switch(board.physicsType){
					case "": return board.color = "tan"
					default: return board.color = "gray"
				}
			})
		},
		
		applyPhysics: () => {
			update(board => {
				if(board.isPaused){
					return board;
				}
				else{
					let newMatrix;
					switch(board.physicsType){
						case "sand":
							newMatrix = calculateSandPhysics(board.matrix)
							break;
						default: 
							newMatrix = calculateBasicPhysics(board.matrix)
					}
					return {...board, matrix: newMatrix}
				}
			})
		},
		
		resetBoard: () => {
			update(board => {
				const newMatrix = generateNewMatrix(board.width, board.height);
				return {...board, matrix: newMatrix}
			})
		}
	}

	return {
		subscribe,
		set,
		...methods
	}
}

export const boardObj = createBoardStore();