
import Dashboard from './pages/Dashboard'
import './App.css'
import { DashboardProvider } from './context/DashboardContext';

export default function App() {
  return (
    <>
    <DashboardProvider>
      <Dashboard/>
    </DashboardProvider>
    </>
  )
}
