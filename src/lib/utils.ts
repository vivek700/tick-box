
import { PUBLIC_BASE_URL } from '$env/static/public';

export const createTask = async (des: string) => {

    const res = await fetch(`${PUBLIC_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            Description: des
        })
    })
    const data = await res.json()
    return data.task

}

export async function deleteTask(id: number) {
    const res = await fetch(`${PUBLIC_BASE_URL}/tasks?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    return res
}



