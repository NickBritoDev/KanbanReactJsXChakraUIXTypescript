import { useCallback } from "react";
import { v4 as uuidv4 } from 'uuid'
import { ColumnType } from "../utils/Enums";
import { TaskModel } from "../utils/Models";
import useTaskCollection from './UseTaskCollection'
import { pickChakraRandomColor, swap } from "../utils/Helpers";

const MAX_TASK_PER_COLUMN = 100

function UseColumnTask(column: ColumnType) {
    const [task, setTask] = useTaskCollection()

    const addEmptyTask = useCallback(() => {
        console.log(`Add new empty task to ${column} column`)

        setTask((allTask) => {
            const columnTask = allTask[column]

            if (columnTask.length > MAX_TASK_PER_COLUMN) {
                console.log('Too many task!')
                return allTask
            }

            const newColumnTask: TaskModel = {
                id: uuidv4(),
                title: `New ${column} task`,
                color: pickChakraRandomColor('.300'),
                column,
            }
            return {
                ...allTask,
                [column]: [newColumnTask, ...columnTask],
            }
        })
    }, [column, setTask])

    const updateTask = useCallback(
        (id: TaskModel['id'], updateTask: Omit<Partial<TaskModel>, 'id'>) => {
            console.log(`Updating taskm ${id} whit ${JSON.stringify(updateTask)}`)

            setTask((allTask) => {
                const columnTask = allTask[column]

                return {
                    ...allTask,
                    [column]: columnTask.map((task) =>
                        task.id === id ? { ...task, ...updateTask } : task
                    )
                }
            })
        },
        [column, setTask]
    )

    const deleteTask = useCallback(
        (id: TaskModel['id']) => {
            console.log(`Removing task  ${id} `)

            setTask((allTask) => {
                const columnTask = allTask[column]

                return {
                    ...allTask,
                    [column]: columnTask.filter((task) => task.id !== id)
                }
            })
        },
        [column, setTask]
    )

    const dropTaskFrom = useCallback(
        (from: ColumnType, id: TaskModel['id']) => {
            setTask((allTask) => {
                const fromColumnTask = allTask[from];
                const toColumnTask = allTask[column];
                const movingTask = fromColumnTask.find((task) => task.id === id)

                console.log(`Moving task ${movingTask?.id} from ${from} to ${column}`)

                if (!movingTask) {
                    return allTask
                }

                return {
                    ...allTask,
                    [from]: fromColumnTask.filter((task) => task.id !== id),
                    [column]: [{ ...movingTask, column }, ...toColumnTask]
                }
            })
        },
        [column, setTask]
    )

    const swapTask = useCallback(
        (i: number, j: number) => {
            console.log(`Swapping task ${i} whit ${j} in ${column} column`)

            setTask((allTask) => {
                const columnTask = allTask[column]
                return {
                    ...allTask,
                    [column]: swap(columnTask, i, j)
                }
            })
        },
        [column, setTask]
    )

    return {
        task: task[column],
        addEmptyTask,
        updateTask,
        deleteTask,
        dropTaskFrom,
        swapTask
        }


}

export default UseColumnTask