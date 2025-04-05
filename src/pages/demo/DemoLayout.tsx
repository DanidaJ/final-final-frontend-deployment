import { Outlet } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function DemoLayout() {
  return (
    <DashboardLayout isDemo={true}>
      <Outlet />
    </DashboardLayout>
  )
} 