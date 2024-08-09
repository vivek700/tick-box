<script lang="ts">
	function focusOnMount(node: HTMLElement) {
		node.focus();
	}
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
			}}
		/>
	</section>
</section>

<style lang="postcss">
	:global(html) {
		background-color: rgb(17, 24, 39);
	}
</style>
