import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CreateProductPage from './pages/CreateProductPage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Box minH={'100vh'} bg={"gray.100"}>
        <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/create' element={<CreateProductPage />} />
          </Routes>
      </Box>
    </>
  )
}

export default App
