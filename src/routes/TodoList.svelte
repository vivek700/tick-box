<script>
	export let tasks;
	export let done;
</script>

<ul>
	{#each $tasks.filter((todo) => todo.done === done) as todo (todo.id)}
		<li>
			<label>
				<input type="checkbox" checked={todo.done} />
				<span>{todo.description}</span>
			</label>
		</li>
	{/each}
</ul>
