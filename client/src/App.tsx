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
//import LoginPage from './pages/LoginPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Default index route */}
        {/* <Route index element={<LoginPage />} /> */}

        {/* Other routes */}
        {/* <Route index element={<LoginPage />} /> */}
        <Route path="learner" element={<LearnerView />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;