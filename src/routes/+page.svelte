<script lang="ts">
	import { createTodoStore } from '$lib/todos';
	import TodoList from './TodoList.svelte';

	function focusOnMount(node: HTMLElement) {
		node.focus();
	}

	const todos = createTodoStore([
		{ done: false, description: 'write some docs' },
		{ done: false, description: 'start writing blog post' },
		{ done: true, description: 'buy some milk' },
		{ done: false, description: 'mow the lawn' },
		{ done: false, description: 'feed the turtle' },
		{ done: false, description: 'fix some bugs' }
	]);
</script>

<section class=" mt-7 w-10/12 mx-auto flex justify-center">
	<section class="w-full max-w-3xl">
		<input
			use:focusOnMount
			class="text-xl p-3 rounded bg-gray-900 border border-gray-600 w-full outline-1 outline-gray-300 text-gray-200 focus:border-transparent"
			type="text"
			id="task"
			name="task"
			placeholder="What needs to be accomplished?"
			on:keydown={(e) => {
				if (e.key !== 'Enter') return;
				todos.add(e.currentTarget.value);
				e.currentTarget.value = '';
			}}
		/>

		<section>
			<TodoList tasks={todos} done={false} />
		</section>
	</section>
</section>

<style lang="postcss">
	:global(html) {
		background-color: rgb(17, 24, 39);
	}
</style>
