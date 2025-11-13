import MainLayout from '@/layouts/MainLayout'
import Edit from '@/pages/Edit/Edit'
import Home from '@/pages/Home'
import type { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    index: true,
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    )
  },
  {
    path: '/add',
    element: (
      <MainLayout>
        <Edit />
      </MainLayout>
    )
  }
]

export default routes
