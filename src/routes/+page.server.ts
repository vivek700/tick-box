import type { PageServerLoad } from './$types'

<<<<<<< HEAD
export const load: PageServerLoad = async ({ locals }) => {
	const access_code = locals.access_code
=======
export const load: PageServerLoad = async ({ cookies }) => {
	const access_code = await cookies.get("access_code")
	console.log(access_code)

>>>>>>> dev
	return {
		access_code
	}
}
