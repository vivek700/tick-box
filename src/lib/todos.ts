import { writable } from "svelte/store";

type taskObject = {
    done: boolean
    description: string

}

export type todoObject = {
    id?: number
    done: boolean
    description: string
}

export function createTodoStore(initial: taskObject[]) {
    let uid = 1

    function saveToLocalStorage(todos: todoObject[]) {
        localStorage.setItem(
            'todos',
            JSON.stringify(todos)
        );

    }
    const todos: todoObject[] = initial.map(({ done, description }: { done: boolean, description: string }) => {
        return {
            id: uid++,
            done,
            description
        }
    })


    const { subscribe, update } = writable<todoObject[]>(todos)



    return {
        subscribe,
        add: (description: string) => {
            const todo: todoObject = {
                id: uid++,
                done: false,
                description
            }
            update($todos => {
                saveToLocalStorage([...$todos, todo])
                return [...$todos, todo]
            })

        },
        remove: (todo: todoObject) => {
            update($todos => {
                const filterdArray = $todos.filter((t) => t !== todo)
                saveToLocalStorage(filterdArray)
                return filterdArray
            })

        },
        mark: (todo: todoObject, done: boolean) => {
            update($todos => {
                const tempArray = [...$todos.filter((t) => t !== todo),
                { ...todo, done }
                ]
                saveToLocalStorage(tempArray)
                return tempArray
            })

        }

    }
}