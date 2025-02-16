import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ cookies }) => {
	const access_code = await cookies.get("access_code")
	console.log(access_code)

	return {
		access_code
	}
}
