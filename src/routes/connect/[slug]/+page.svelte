<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	onMount(async () => {
		const res = await fetch(`${PUBLIC_BASE_URL}/set-cookie/${data.access_code_value}`, {
			method: 'POST',
			credentials: 'include'
		});
		if (!res.ok) {
			error(res.status, {
				message: 'Unable to save your preferences. Please clear your browser cookies and try again.'
			});
		} else {
			goto('/');
		}
	});
</script>

<h2 class="text-pink-500">Redirecting...</h2>
