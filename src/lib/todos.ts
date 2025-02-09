import { PUBLIC_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';

type taskObject = {
    ID: number;
    Status: boolean;
    Description: string;
    UserID: number
};

export type todoObject = {
    ID?: number;
    Status: boolean;
    Description: string;
    UserID: number;
};

export function createTodoStore(initial: taskObject[]) {
    let uid = 1;

    //function saveToLocalStorage(todos: todoObject[]) {
    //    localStorage.setItem('todos', JSON.stringify(todos));
    //}
    const todos: todoObject[] = initial?.map(
        ({ ID, UserID, Status, Description }: { ID: number; UserID: number; Status: boolean; Description: string }) => {
            return {
                ID,
                Status,
                Description,
                UserID
            };
        }
    );

    const createTask = async (des: string) => {

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
        return data.task

    }


    const { subscribe, update } = writable<todoObject[]>(todos);

    return {
        subscribe,
        add: async (Description: string) => {

            const task: todoObject = await createTask(Description)
            const todo: todoObject = {
                ID: task.ID,
                Status: task.Status,
                Description: task.Description,
                UserID: task.UserID
            };
            update(($todos) => {
                if ($todos.length === 1) {
                    return [todo]
                } else {
                    $todos.push(todo)
                    return $todos
                }
            });
        },
        remove: (todo: todoObject) => {
            update(($todos) => {
                const filterdArray = $todos.filter((t) => t !== todo);
                return filterdArray;
            });
        },
        mark: (todo: todoObject, Status: boolean) => {
            update(($todos) => {
                const tempArray = [...$todos.filter((t) => t !== todo), { ...todo, Status }];
                return tempArray;
            });
        }
    };
}
