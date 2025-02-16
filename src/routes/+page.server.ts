import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const access_code = locals.access_code
	return {
		access_code
	}
}
