<script lang="ts">
	import { createTodoStore } from '$lib/todos';
	import { onMount } from 'svelte';
	import TodoList from './TodoList.svelte';

	function focusOnMount(node: HTMLElement) {
		node.focus();
	}

	const todos = createTodoStore([
		{ done: false, description: "Let's do something meaningful today." }
	]);
</script>

<section class=" mt-7 md:w-8/12 w-11/12 mx-auto flex justify-center">
	<section class="w-full max-w-4xl">
		<input
			use:focusOnMount
			class="text-xl p-3 rounded bg-gray-900 border border-gray-600 w-full outline-1 outline-gray-300 text-gray-200 focus:border-transparent"
			type="text"
			id="task"
			name="task"
			placeholder="What needs to be done?"
			on:keydown={(e) => {
				if (e.key !== 'Enter') return;
				todos.add(e.currentTarget.value);
				e.currentTarget.value = '';
			}}
		/>
		<section class=" text-gray-300 grid md:grid-cols-2 gap-4">
			<section>
				<h2 class="my-5 text-3xl text-gray-200">todo</h2>
				<TodoList tasks={todos} done={false} />
			</section>
			<section>
				<h2 class="my-5 text-3xl text-gray-200">done</h2>
				<TodoList tasks={todos} done={true} />
			</section>
		</section>
	</section>
</section>

<style lang="postcss">
	:global(html) {
		background-color: rgb(17, 24, 39);
	}
</style>
