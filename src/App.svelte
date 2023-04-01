<script>
	import { boardObj } from "./stores.js";
	import TypeSelector from "./TypeSelector.svelte"
	
	let isDraggingMouse = false;
	let tickSpeed = 500
	
	function mouseHandler(e, x, y){
		// Holding mouse down or clicking within the board
		if (x !== undefined && y !== undefined && isDraggingMouse || e.type === 'mousedown'){
			$boardObj.matrix[y][x] = boardObj.generatePixel(x, y, $boardObj.color);
		}
	}
	
	function startGameTimer(){
			console.log(`Tickspeed: ${tickSpeed}`)
			setTimeout(() => {
			boardObj.applyPhysics()
			startGameTimer()
		}, tickSpeed)
	}
	
	startGameTimer()
</script>

<main id="root">
	<div id="topButtons">
		<button on:click={boardObj.startPhysics} disabled={!$boardObj.isPaused}>
			Start
		</button>
		<button on:click={boardObj.pausePhysics} disabled={$boardObj.isPaused}>
			Pause
		</button>
		<button on:click={boardObj.resetBoard}>
			Clear
		</button>	
	</div>
	
	<!-- Start "drag" if mouse clicks while inside canvas area. Stop "drag" if mouse releases or exits the canvas area  -->
	<div id="canvasContainer" 
		on:mousedown="{() => isDraggingMouse = true}" 
		on:mouseup="{() => isDraggingMouse = false}"
		on:mouseleave="{() => isDraggingMouse = false}">
		{#each $boardObj.matrix as pixelRow}
			<div class="pixelRow">				
				{#each pixelRow as {x, y, color}}
					<div class="pixel" style="background-color: {color};" on:mousedown|preventDefault={(e) => mouseHandler(e, x, y)} on:mouseenter={(e) => mouseHandler(e, x, y)}></div>
				{/each}
			</div>
		{/each}
	</div>
		<div id="tickSpeedContainer">
			<span>ms between ticks:</span>
			<input type="range" bind:value={tickSpeed} min=100 max=500 step=50>
			<span>{tickSpeed}</span>
		</div>
	<TypeSelector />
</main>

<style>
	#root{
		display:flex;
		flex-direction: column;
		align-items:center
	}
	
	#topButtons{
		display: flex;
	}
	
	#canvasContainer{
		border: solid black 3px;
	}
	
	.pixelRow{
		display: flex;
		margin: 0;
	}
	
	.pixel{
		margin:0;
		outline: none;
		width: 5px;
		height: 5px;
	}
	
	#tickSpeedContainer{
		display: flex;
		align-items: center
	}
	
	#tickSpeedContainer input{
		margin: 0 10px
	}
</style>