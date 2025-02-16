import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'


export const load: PageServerLoad = async ({ params, cookies }) => {
	const access_code_value = params.slug
	if (typeof access_code_value === 'string' && access_code_value.length > 0) {
		cookies.set("access_code", access_code_value, {
			path: "/",
			secure: true,
			httpOnly: true,
			expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
		})
		redirect(307, '/')
	}

}
