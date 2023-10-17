<script>
	import { onMount } from 'svelte';
	import List from './List.svelte';
	import Item from './Item.svelte';

	export let name, dev;
 
	let item, page;
	let key, keyCode;

	//$:console.log(key, keyCode); // 2. 리액티브 디버깅 코드


	async function hashchange() {
		// the poor man's router!
		const path = window.location.hash.slice(1);
		//console.log('path', path);
		if (path.startsWith('/item')) {
			const id = path.slice(6);
			item = await fetch(`https://node-hnapi.herokuapp.com/item/${id}`).then((r) => r.json());
			//console.log('item:', item)
			window.scrollTo(0, 0);
		} else if (path.startsWith('/top')) {
			//page = +path.slice(5).replace(/[^0-9]/g,1);
			page = +path.slice(5);
			//page =  Math.abs(page);
			//console.log('else page',page)
			item = null;
		} else {
			window.location.hash = '/top/1';
		}
	}
 


	function handleKeydown(event) {
		  key = event.key;
		  keyCode = event.keyCode;

		//console.log('key',key, 'keyCode',keyCode)
	}
 
 
	onMount(hashchange);
</script>

<svelte:window on:hashchange={hashchange}  on:keydown={handleKeydown}/>
 <sub>
	<h1>Hello {name} ver {dev}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
 </sub>
 

<main>
	{#if item}
		<Item {item} returnTo="#/top/{page}" />
	{:else if page}
		<List {page} />
	{/if}

	 
</main>
 

 
<!-- <div style="text-align: center">
	{#if key}
	  <kbd>{key === ' ' ? 'Space' : key}</kbd>
	  <p>{keyCode}</p>
	{:else}
	  <p>Focus this window and press any key</p>
	{/if}
  </div> -->
<!-- <style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style> -->

<style>
	main {
		position: relative;
		max-width: 800px;
		margin: 0 auto;
		min-height: 101vh;
		padding: 1em;
	}

	main :global(.meta) {
		color: #999;
		font-size: 12px;
		margin: 0 0 1em 0;
	}

	sub {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		sub {
			max-width: none;
		}
	}

</style>
