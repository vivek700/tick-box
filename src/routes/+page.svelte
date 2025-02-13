<script lang="ts">
	import { createTodoStore, type todoObject } from '$lib/todos';
	import { onMount } from 'svelte';
	import TodoList from './TodoList.svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	function focusOnMount(node: HTMLElement) {
		node.focus();
	}
	let tasks: todoObject[] = $state([]);

	onMount(async () => {
		const res = await fetch(`${PUBLIC_BASE_URL}/tasks`, {
			credentials: 'include'
		});
		const data = await res.json();
		if (data.data) {
			tasks = data.data;
		} else {
			tasks = [{ ID: 0, Status: false, Description: "Let's do something meaningful today." }];
		}
	});
	let todos: ReturnType<typeof createTodoStore> = $derived(createTodoStore(tasks));
</script>

<section class=" mt-7 md:w-8/12 w-11/12 mx-auto flex justify-center">
	<section class="w-full max-w-4xl">
		<input
			use:focusOnMount
			class="text-xl p-3 bg-black/50 w-full text-gray-200 border-b-2 border-gray-500 rounded-t-md
			focus:border-pink-400 focus:outline-hidden"
			type="text"
			id="task"
			name="task"
			placeholder="What needs to be done?"
			onkeydown={(e) => {
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
		background-color: hsl(0, 0%, 11%);
	}
</style>
