import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import LearnerView from './pages/LearnerView';
import { AdminDashboard } from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import { Navigate } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        {/* Default index route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/" element={<MainLayout />}>

          {/* Other routes */}
          <Route path="learner" element={<LearnerView />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
        <Route path="login" element={<LoginPage />} /> </>

    )
  );

  return <RouterProvider router={router} />;
}

export default App;