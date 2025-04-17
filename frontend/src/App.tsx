import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarList } from './components/CarList/CarList';
import { Navigation } from './components/Navigation/Navigation';
import { CarDetails } from './components/CarDetails/CarDetails';
import { ReviewPage } from './pages/ReviewPage/ReviewPage';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <div className="app">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<CarList />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/reviews" element={<ReviewPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/*Tikriname, ar zmogus gali patekti i dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />
                 <Route element={<ProtectedRoute />}>
               </Route> 
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
