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
		<button
			aria-label="Open share options"
			popovertarget="share-opt"
			class="share-button text-white p-1 bg-pink-800 rounded-md mb-5 float-end cursor-pointer hover:bg-pink-900 focus:bg-pink-900"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-share-2"
				><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle
					cx="18"
					cy="19"
					r="3"
				/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line
					x1="15.41"
					x2="8.59"
					y1="6.51"
					y2="10.49"
				/></svg
			>
		</button>
		<input
			use:focusOnMount
			class="text-xl p-3 bg-black/50 w-full text-gray-200 border-b-2 border-gray-500 rounded-t-md
			focus:border-pink-800 focus:outline-hidden"
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

<section popover id="share-opt" class="share-opt rounded-md">
	<h1>vivek</h1>
</section>

<style lang="postcss">
	:global(html) {
		background-color: hsl(0, 0%, 11%);
	}
</style>
