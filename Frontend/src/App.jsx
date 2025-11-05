import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ChatBot from './components/Chatbot'
import Admin from './pages/Admin'
import PublicStats from './components/PublicStats'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal - Portafolio */}
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            <LoadingScreen />
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <PublicStats />
            <Skills />
            <ChatBot />
            <ScrollToTop />
            <Footer />
          </div>
        } />
        
        {/* Ruta de administración */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App