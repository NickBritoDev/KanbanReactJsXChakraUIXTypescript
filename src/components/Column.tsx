import { AddIcon } from '@chakra-ui/icons'
import { Badge, Box, Heading, IconButton, Stack, useColorModeValue } from '@chakra-ui/react'
import { ColumnType } from '../utils/Enums'
import { TaskModel } from '../utils/Models'
import Task from './Task'
import UseColumnTask from '../hooks/UseColumnTask'
import useColumnDrop from '../hooks/UseColumnDrop'

const ColumnColorScheme: Record<ColumnType, string> = {
    Todo: 'gray',
    'In Progress': 'blue',
    Blocked: 'red',
    Completed: 'green',
}

function Column({ column }: { column: ColumnType }) {
    const { task, addEmptyTask, updateTask, deleteTask, dropTaskFrom, swapTask } = UseColumnTask(column)

    const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom)

    const ColumnTask = task.map((task, index) => {
        return <Task key={task.id} task={task} index={index} onDelete={deleteTask} onDropHover={swapTask} onUpdate={updateTask} />
    })
    return (
        <Box>
            <Heading letterSpacing={'wide'} mb={4} fontSize={'md'}>
                <Badge px={2} py={1} rounded={'lg'} colorScheme={ColumnColorScheme[column]}>
                    {column}
                </Badge>
            </Heading>
            <IconButton icon={<AddIcon />} aria-label={'add-task'}
                variant={'solid'}
                py={2}
                w={'full'}
                size={'xs'}
                bgColor={useColorModeValue('gray.100', 'gray.700')}
                color={useColorModeValue('gray.500', 'gray.400')}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                colorScheme={'blackAlpha'}
                onClick={addEmptyTask}
            />
            <Stack
                ref={dropRef}
                direction={{ base: 'row', md: 'column' }}
                h={{ base: 300, md: 600 }}
                p={4} mt={2} spacing={4}
                bgColor={useColorModeValue('gray.500', 'gray.900')}
                rounded={'lg'}
                boxShadow={"md"}
                opacity={isOver ? 0.85 : 1}
                overflow='auto'
            >
                {ColumnTask}
            </Stack>
        </Box>
    )
}

export default Column