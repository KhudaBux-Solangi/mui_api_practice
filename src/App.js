import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from './components/header/Header';
import Hero from './components/hero-section/HeroSection';
import Products from './components/prductsget/Products';
import SignUpForm from './components/Sign-up/SignUpForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/Sign-up/SignIn';
import PageNotFound from './components/pageNotFound/PageNotFound';
import { CartProvider } from '../src/components/context/CartContext';  // CartContext import

function App() {
  return (
    // Wrap the entire app in CartProvider so that cart data is available throughout the app
    <CartProvider> 
      <Router>
        <Header />
        <Hero />

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/SignIn" element={<SignIn />} />
          
        </Routes>

        <Routes>
          <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>

        <h1>Hello Dunya</h1>
      </Router>
    </CartProvider>
  );
}

export default App;
