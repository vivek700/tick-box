import type { PageLoad } from "./$types"

export const load: PageLoad = ({ params }) => {
	console.log(params.slug)
	return {
		title: "hello world"
	}
}

