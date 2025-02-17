import type { PageServerLoad } from './$types'


export const load: PageServerLoad = async ({ params }) => {
	const access_code_value = params.slug
	return {
		access_code_value
	}

}
