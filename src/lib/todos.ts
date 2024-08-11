import { writable } from "svelte/store";

type taskObject = {
    done: boolean
    description: string

}

export type todoObject = {
    id: number
    done: boolean
    description: string
}

export function createTodoStore(initial: taskObject[]) {
    let uid = 1

    const todos: todoObject[] = initial.map(({ done, description }: { done: boolean, description: string }) => {
        return {
            id: uid++,
            done,
            description
        }
    })


    const { subscribe, update } = writable<todoObject[]>(todos)

    function saveToLocalStorage(todo: todoObject) {

        const rawData = localStorage.getItem('todos')
        if (!rawData) {
            localStorage.setItem(
                'todos',
                JSON.stringify(todos)
            );
            return
        }
        const tasks = JSON.parse(rawData)
        console.log(tasks)
        tasks.push(todo)
        localStorage.setItem(
            'todos',
            JSON.stringify(tasks)
        );

    }


    return {
        subscribe,
        add: (description: string) => {
            const todo: todoObject = {
                id: uid++,
                done: false,
                description
            }
            update($todos => [...$todos, todo])
            saveToLocalStorage(todo)

        },
        remove: (todo: todoObject) => {
            update($todos => $todos.filter((t) => t !== todo))
            saveToLocalStorage(todo)
        },
        mark: (todo: todoObject, done: boolean) => {
            update($todos => [...$todos.filter((t) => t !== todo),
            { ...todo, done }
            ])
            saveToLocalStorage(todo)
        }

    }
}