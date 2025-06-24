import React, { useState } from 'react';
import Grid from '../components/Grid';

function Detector() {
    const [GridData, SetGrid] = useState(
        Array(28).fill().map(() => Array(28).fill(0.0)) //auto fill the grid with 0.0's
    );

    const [prediction, setPrediction] = useState(null);  // new state for prediction output
    const [AllPredictions, setAllPredictions] = useState([]);  // new state for predictions output
    const [loading, setLoading] = useState(false);       // optional: show loading indicator

    const HandleClear = () => {
        const EmptyGrid = Array(28).fill().map(() => Array(28).fill(0.0));
        setPrediction(null);  // store prediction in state
        setAllPredictions([]); //set the array as empty
        SetGrid(EmptyGrid); //set grid as empty (full of 0.0's)
    };

    const handlePredict = () => {
        setLoading(true);

        //all the console logs below are used t=for testing if the app is functional
        console.log("Sending GridData:", GridData);

        if (Array.isArray(GridData) && Array.isArray(GridData[0])) {
            console.log("Grid size:", GridData.length, "x", GridData[0].length);
        } else {
            console.warn("GridData is not a 2D array:", GridData);
        }

        fetch('http://192.168.0.16:5000/api/predict', { //api endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Grid: GridData }) // send grid data to backend
        })
            .then(res => res.json())
            .then(data => {
                console.log("Received response:", data);
                setPrediction(data.prediction);  // store prediction in state
                setAllPredictions(data.all_predictions);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setLoading(false);
            });
    };

    return (
      <>
            <div className="container">

                <div className="row justify-content-center align-content-center">

                    <div className="col-3"></div>

                    <div className="col-6 d-flex justify-content-center">
                        <Grid Grid={GridData} SetGrid={SetGrid} />
                    </div>

                    <div className="col-2 d-flex text-white justify-content-center align-items-center">

                        {Array.isArray(AllPredictions) && AllPredictions.length > 0 && (
                        <div>
                            <h4 className="fw-bold">All Predictions</h4>                              
                                <ul className="border-top border-white">
                                    {AllPredictions.map((item) => (
                                        <li key={item.digit}>
                                            <b>Digit {item.digit}</b>: <i>{item.percentage.toFixed(2)}%</i>
                                        </li>
                                    ))}
                                </ul>
                        </div>
                    )}
                    </div>

                    <div className="col-1"></div> {/*this is a spacer*/}

                </div>

                <div className="row text-white justify-content-center align-items-center m-4">

                    <div className="col-3 d-flex justify-content-center align-items-center">
                        <button className="btn btn-success w-75 fw-bold" onClick={handlePredict} disabled={loading}>
                            {loading ? 'Predicting...' : 'Predict'}
                        </button>
                    </div>

                    <div className="col-3 d-flex justify-content-center align-items-center">
                        <button className="btn btn-primary w-75 fw-bold" onClick={HandleClear}>Clear</button>
                    </div>

                    {prediction !== null && (
                        <div className="row justify-content-center mt-3">
                            <div className="col-6 text-center text-white">
                                <div className="border-bottom border-white"></div>
                                <h3 className="">{prediction} Detected</h3>
                                <div className="border-top border-white"></div>
                            </div>
                        </div>
                    )} 
                    
                </div>
            </div>
      </>
  );
}

export default Detector;