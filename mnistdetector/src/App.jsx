import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './Routes.jsx';

let InUse = false;
function App() {
    

  return (
      <>

        <div className="container sticky-top">

            <div className="row sticky-top text-center">
              <div className="border-bottom border-white mt-3"></div>
              <h2 className="text-white border-bottom border-white mb-3">MNIST Number Detector</h2>
            </div>

            <AppRoutes></AppRoutes>

        </div>
    </>
  )
}

export default App
