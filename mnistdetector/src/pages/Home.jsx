import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

let InUse = false;
function Home() {
    const navigate = useNavigate();

    const handleClick = () => {      // toggle state
        navigate('/detector');  // navigate to /detector
    };

    return (
        <>

            <div className="container">

                <div className="row text-white text-center">

                    <p>
                        This application was developed by Noah Collins, its purpose is to showcase machine learning and the neural network
                        that has been trained with the MNIST dataset.
                    </p>
                    <p>
                        This is a dataset that contains 70,000 examples of digits (0 to 9)
                        with each associated to label to indicate which digit that example holds.
                    </p>

                </div>

                <div className="row text-white justify-content-center align-items-center m-5">

                    <button className="col-3 btn bg-secondary border-2 border-black text-black m-5" onClick={ handleClick }>
                        Use Detector
                    </button>

                </div>
            </div>
        </>
    )
}

export default Home