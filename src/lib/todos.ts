import { PUBLIC_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';

type taskObject = {
    Status: boolean;
    Description: string;
};

export type todoObject = {
    id?: number;
    Status: boolean;
    Description: string;
};

export function createTodoStore(initial: taskObject[]) {
    let uid = 1;

    function saveToLocalStorage(todos: todoObject[]) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    const todos: todoObject[] = initial?.map(
        ({ Status, Description }: { Status: boolean; Description: string }) => {
            return {
                id: uid++,
                Status,
                Description
            };
        }
    );

    const createTask = async (des: string) => {
        console.log(des)

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
        console.log(data)

    }


    const { subscribe, update } = writable<todoObject[]>(todos);

    return {
        subscribe,
        add: (Description: string) => {
            const todo: todoObject = {
                id: uid++,
                Status: false,
                Description
            };
            update(($todos) => {

                createTask(Description)
                saveToLocalStorage([...$todos, todo]);
                return [...$todos, todo];
            });
        },
        remove: (todo: todoObject) => {
            update(($todos) => {
                const filterdArray = $todos.filter((t) => t !== todo);
                saveToLocalStorage(filterdArray);
                return filterdArray;
            });
        },
        mark: (todo: todoObject, Status: boolean) => {
            update(($todos) => {
                const tempArray = [...$todos.filter((t) => t !== todo), { ...todo, Status }];
                saveToLocalStorage(tempArray);
                return tempArray;
            });
        }
    };
}
