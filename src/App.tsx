import { Container, SimpleGrid } from '@chakra-ui/react'
import Column from './components/Column'
import { ColumnType } from './utils/Enums'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DarkModeIconButton from './components/DarkModelIconButton'

function App() {

  return (
    <>
    <DarkModeIconButton position={'absolute'} top={5} right={5}/>
      <Container maxWidth={'container.lg'} px={4} py={10}>
        <DndProvider backend={HTML5Backend}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.BLOCKED} />
            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </DndProvider>

      </Container>
    </>
  )
}

export default App
