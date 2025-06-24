import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detector from './pages/Detector';


function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detector" element={<Detector />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
