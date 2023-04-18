import { XYCoord, useDrag, useDrop } from 'react-dnd'
import { ItemType } from '../utils/Enums'
import { DragItem, TaskModel } from '../utils/Models'
import { useRef } from 'react';

export function useTaskDragAndDrop<T extends HTMLElement>({
    task, index, handleDropHover,
}: {
    task: TaskModel;
    index: number;
    handleDropHover: (i: number, j: number) => void;
}) {
    const ref = useRef<T>(null)

    const [{ isDragging }, drag] = useDrag<
        DragItem,
        void,
        { isDragging: Boolean }
    >({
        type: ItemType.TASK,
        item: { from: task.column, id: task.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const [_, drop] = useDrop<DragItem, void, unknown>({
        accept: ItemType.TASK,
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }

            const draggedItemIndex = item.index
            const hoveredItemIndex = index

            if (draggedItemIndex === hoveredItemIndex) {
                return
            }

            const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex
            const isDraggedItemBellowHovered = !isDraggedItemAboveHovered

            const { x: mouseX, y: mouseY } = monitor.getClientOffset() as XYCoord

            const hoveredBoundingRect = ref.current.getBoundingClientRect()

            const hoveredMiddleHeight = (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2

            const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top
            const isMouseYAboveHoveredModdleHeight =
                mouseYRelativeToHovered < hoveredMiddleHeight
            const isMouseYBelowHoveredMiddleHeight =
                mouseYRelativeToHovered > hoveredMiddleHeight

            if (isDraggedItemAboveHovered && isMouseYAboveHoveredModdleHeight) {
                return
            }

            if (isDraggedItemBellowHovered && isMouseYBelowHoveredMiddleHeight) {
                return
            }

            handleDropHover(draggedItemIndex, hoveredItemIndex)

            item.index = hoveredItemIndex
        }
    })

    drag(drop(ref))

    return {
        ref,
        isDragging,
        handleDropHover
    }
}
