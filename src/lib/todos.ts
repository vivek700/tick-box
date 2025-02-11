import { writable } from 'svelte/store';
import { createTask, deleteTask } from './utils';
//
//type taskObject = {
//    ID: number;
//    Status: boolean;
//    Description: string;
//    UserID: number
//};
//
export type todoObject = {
    ID: number;
    Status: boolean;
    Description: string;
};

export function createTodoStore(initial: todoObject[]) {

    const todos: todoObject[] = initial?.map(
        ({ ID, Status, Description }:
            { ID: number; Status: boolean; Description: string }) => {
            return {
                ID,
                Status,
                Description,
            };
        }
    );

    const { subscribe, update } = writable<todoObject[]>(todos);

    return {
        subscribe,
        add: async (Description: string) => {

            const task: todoObject = await createTask(Description)
            const todo: todoObject = {
                ID: task.ID,
                Status: task.Status,
                Description: task.Description,
            };
            update(($todos) => {
                if ($todos[0].ID === 0) {
                    return [todo]
                } else {
                    $todos.push(todo)
                    return $todos
                }
            });
        },
        remove: async (todo: todoObject) => {
            update(($todos) => {
                const filterdArray = $todos.filter((t) => t !== todo);
                return filterdArray;
            });
            const res = await deleteTask(todo.ID)
            if (!res.ok) {
                update(($todos) => {
                    $todos.push(todo)
                    return $todos
                })
            }
        },
        mark: (todo: todoObject, Status: boolean) => {
            update(($todos) => {
                const tempArray = [...$todos.filter((t) => t !== todo), { ...todo, Status }];
                return tempArray;
            });
        }
    };
}
