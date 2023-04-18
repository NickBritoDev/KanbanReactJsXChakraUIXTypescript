import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, Textarea } from '@chakra-ui/react'
import { TaskModel } from "../utils/Models";
import React from "react";
import { AutoResizeTextarea } from "./AutoResizeTextArea";
import { useTaskDragAndDrop } from "../hooks/UseTaskDragAndDrop";

type TaskProps = {
    index: number;
    task: TaskModel;
    onUpdate: (id: TaskModel['id'], updateTask: TaskModel) => void
    onDelete: (id: TaskModel['id']) => void
    onDropHover: (i: number, j: number) => void // Adicione a propriedade onDropHover ao tipo TaskProps
}


function Task({ index, task, onDelete: handleDelete, onUpdate: handleUpdate, onDropHover: handleDropHover }: TaskProps) {

    const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
        task, index, handleDropHover,
    })

    const handeTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTitle = e.target.value
        handleUpdate(task.id, { ...task, title: newTitle })
    }

    const handleDeleteClick = () => {
        handleDelete(task.id)
    }

    return (
        <Box
            ref={ref}
            as={'div'}
            role={"group"}
            position={"relative"}
            rounded={"lg"}
            maxW={200}
            minW={200}
            pl={3} pr={7} pt={3} pb={1}
            boxShadow={"xl"}
            cursor={"grab"}
            opacity={isDragging ? 0.5 : 1}
            bgColor={task.color}>

            <IconButton

                pos={"absolute"}
                top={0}
                right={0}
                zIndex={100}
                size={"md"}
                colorScheme={'solid'}
                color={"gray.700"}
                icon={<DeleteIcon />}
                opacity={0}
                aria-label={"delete-task"}
                _groupHover={{
                    opacity: 1,
                }}
                onClick={() => handleDelete(task.id)} />

            <AutoResizeTextarea
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        bg: 'gray.500',
                        borderRadius: 'md',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        bg: 'gray.600',
                    },
                    '&::-webkit-scrollbar-track': {
                        bg: 'gray.300',
                        borderRadius: 'md',
                    },
                    '&::-webkit-scrollbar-track:hover': {
                        bg: 'gray.400',
                    },
                }}
                onChange={handeTitleChange}
                fontWeight={"semibold"}
                cursor={"inherit"}
                border={"none"}
                p={0}
                resize={"none"}
                minH={70}
                maxH={200}
                focusBorderColor={'none'}
                color={"gray.700"}
                value={task.title}
            />
        </Box>
    )
}

export default Task