import { useDrop } from 'react-dnd'
import { ColumnType, ItemType } from '../utils/Enums'
import { DragItem, TaskModel } from '../utils/Models'

function useColumnDrop(
    column: ColumnType,
    handleDrop: (fromColumn: ColumnType, taskId: TaskModel['id']) => void,
) {
    const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
        accept: ItemType.TASK,
        drop: (dragItem) => {
            if (!dragItem || dragItem.from === column) { 
                return
            }
            handleDrop(dragItem.from, dragItem.id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return {
        isOver,
        dropRef
    }
}

export default useColumnDrop;
