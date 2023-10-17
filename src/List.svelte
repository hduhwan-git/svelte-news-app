<script>
    import { beforeUpdate } from 'svelte';
	import Summary from './Summary.svelte';
    const PAGE_SIZE = 30;
    export let page;

    

    let items;
	let offset;

	$: fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`)
		.then((r) => r.json())
		.then((data) => {
    		items = data;
			offset = PAGE_SIZE * (page - 1);
            //console.log('data',data, 'offset',offset, data.length)
			window.scrollTo(0, 0);
		});
     
    //console.log('page',page, PAGE_SIZE, 'items',items, 'offset', offset );    

</script>
<!-- <h2>news (https://node-hnapi.herokuapp.com) list</h2> -->
{#if items}

	{#each items as item, i}
		<Summary {item} {i} {offset} />
	{/each}
    
    {#if page>2}
        <a href="#/top/1">first </a>   
        <a href="#/top/{page - 1}">prev</a>  
        <a href="#/top/{page + 1}">next</a>
    {:else if page==2}    
        <a href="#/top/{page - 1}">prev</a>  
        <a href="#/top/{page + 1}">next</a>
    {:else if page<=1}    
        <a href="#/top/{page + 1}">next</a>
    {:else}
        <a href="#/top/{page - 1}">prev</a>  
	{/if}
{:else}
	<p class="loading">loading...</p>
{/if}
 