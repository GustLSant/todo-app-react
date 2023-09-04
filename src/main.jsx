import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import Home from './routes/Home.jsx'
import TasksDisplayer from './routes/TasksDisplayer.jsx'
import ArchivedTasksDisplayer from './routes/ArchivedTasksDisplayer.jsx'
import ArchivedTasksContainer from './components/ArchivedTasksContainer/ArchivedTasksContainer'
import ErrorPage from './routes/ErrorPage.jsx'

import { TasksProvider } from './contexts/TasksContext'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [ //esse children eh pq usa o Outlet
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tasks",
        element: <TasksDisplayer />,
      },
      {
        path: "/archived-tasks",
        element: <ArchivedTasksDisplayer />,
      },
      {
        path: "/archived-tasks/:day",
        element: <ArchivedTasksContainer />,
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TasksProvider>
      <RouterProvider router={router} />
    </TasksProvider>
  </React.StrictMode>,
)
