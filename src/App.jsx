import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Header } from './feature/Header';
import Login from './feature/Login';
import Dashboard from './feature/Dashboard';
import Report from './feature/Report';
import PageNotFound from './feature/PageNotFound';
import AddExpense from './feature/AddExpense';
import ItemProvider from './context/ItemProvider'

function App() {

  return (
    <>
      <BrowserRouter>
        <ItemProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Login />}>
            </Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/view-report/:id' element={<Report />}></Route>
            <Route path='/add-expense' element={<AddExpense />}></Route>
            <Route path='/edit-expense/:id' element={<AddExpense />}></Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </ItemProvider>
      </BrowserRouter>
    </>
  )
}

export default App
