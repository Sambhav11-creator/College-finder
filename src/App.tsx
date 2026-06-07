import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CollegeProvider } from './context/CollegeContext';
import { SavedProvider } from './context/SavedContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { CompareDrawer } from './components/Compare/CompareDrawer';

// Pages
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { CollegeDetail } from './pages/CollegeDetail';
import { ComparePage } from './pages/ComparePage';
import { Predictor } from './pages/Predictor';
import { SavedItems } from './pages/SavedItems';

function App() {
  return (
    <CollegeProvider>
      <SavedProvider>
        <Router>
          <div className="app-layout-wrapper">
            <Header />
            
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/college/:id" element={<CollegeDetail />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/predictor" element={<Predictor />} />
                <Route path="/saved" element={<SavedItems />} />
              </Routes>
            </main>

            <CompareDrawer />
            <Footer />
          </div>
        </Router>
      </SavedProvider>
    </CollegeProvider>
  );
}

export default App;
