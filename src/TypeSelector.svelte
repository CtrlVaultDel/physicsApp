<script>
	import { boardObj } from "./stores.js"
</script>

<select bind:value={$boardObj.physicsType} on:change={boardObj.updateColor}>
	<option value="default">Default</option>
	<option value="sand">Sand</option>
<!-- 	<option value="water">Water</option> -->
</select>