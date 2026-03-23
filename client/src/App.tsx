import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
//import Home from './pages/Home';
import LearnerView from './pages/LearnerView';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* <Route index element={<Home />} /> */}
        <Route index element={<LearnerView />} />
        <Route path="learner" element={<LearnerView />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
