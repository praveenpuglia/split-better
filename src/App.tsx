import Nav from '@/components/Nav';
import { Route, Routes } from 'react-router-dom';
import { LandingPage } from '@/components/LandingPage';
import { Home } from '@/components/Home';
import { Heading } from '@chakra-ui/react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export const App = () => {
  return (
    <div className="App">
      <Nav></Nav>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Heading>404!</Heading>} />
      </Routes>
    </div>
  );
};
