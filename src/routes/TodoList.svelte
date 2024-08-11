<script>
	import { flip } from 'svelte/animate';
	import { send, receive } from '$lib/transition';

	export let tasks;
	export let done;
</script>

<ul>
	{#each $tasks.filter((todo) => todo.done === done) as todo (todo.id)}
		<li
			class:done
			in:receive={{ key: todo.id }}
			out:send={{ key: todo.id }}
			animate:flip={{ duration: 200 }}
		>
			<label class="bg-slate-800/35 my-2 w-full p-4 rounded flex items-center gap-2">
				<input
					type="checkbox"
					checked={todo.done}
					on:change={(e) => tasks.mark(todo, e.currentTarget.checked)}
				/>
				<p class="flex-1 overflow-auto break-words">{todo.description}</p>
				<button class="p-2" on:click={() => tasks.remove(todo)}></button>
			</label>
		</li>
	{/each}
</ul>

<style lang="postcss">
	.done {
		opacity: 0.5;
	}
	button {
		background-image: url('../lib/remove.svg');
	}
	input[type='checkbox'] {
		/* Increase the size */
		width: 16px;
		height: 16px;
	}
</style>
