import { v4 as uuidv4 } from 'uuid'
import { ColumnType } from '../utils/Enums'
import { TaskModel } from '../utils/Models'
import { useLocalStorage } from 'usehooks-ts'

function UseTaskCollection() {
    return useLocalStorage<{
        [key in ColumnType]: TaskModel[]
    }>('task', {
        Todo: [
            {
                id: uuidv4(),
                column: ColumnType.TO_DO,
                title: 'Task 1',
                color: 'yellow.300'
            },
        ],
        Blocked: [
            {
                id: uuidv4(),
                column: ColumnType.TO_DO,
                title: 'Task 1',
                color: 'yellow.300'
            },
        ],
        'In Progress': [
            {
                id: uuidv4(),
                column: ColumnType.TO_DO,
                title: 'Task 1',
                color: 'yellow.300'
            },
        ],
        Completed: [
            {
                id: uuidv4(),
                column: ColumnType.TO_DO,
                title: 'Task 1',
                color: 'yellow.300'
            },
        ],
    })
}

export default UseTaskCollection