import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
	const access_code = event.cookies.get("access_code")
	console.log(access_code)
	event.locals.access_code = access_code
	const response = await resolve(event)
	return response
}
