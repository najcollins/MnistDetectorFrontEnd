import React, { useState, useEffect } from 'react';
import './Grid.css'; // optional, for better styling

const GRID_SIZE = 28; //MNIST uses 28 by 28 grids

function Grid({ Grid, SetGrid }) {

    //By default we are not drawing
    const [IsDrawing, SetIsDrawing] = useState(false);

    //detects input from the mouse being pressed on the grid and updates it
    const handleMouseDown = (Row, Col) => {
        updateCell(Row, Col); // no longer passes `1`, uses default
        SetIsDrawing(true);
    };


    //Sets drawing false when the mouse button is lifted
    const handleMouseUp = () => {
        SetIsDrawing(false);
    };

    //Triggers when a mouse enters a cell on the grid, if it is drawing then it updates the cell
    const handleMouseEnter = (Row, Col) => {
        if (IsDrawing) {
            updateCell(Row, Col);
        }
    };

    //replaces one cells value and updates the entire grid
    const updateCell = (row, col, centerValue = 1.0, edgeValue = 0.8, cornerValue = 0.4) => {
        const newGrid = Grid.map(r => [...r]);

        // Helper to safely update a cell within bounds
        const setCell = (r, c, value) => {
            if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
                newGrid[r][c] = value;
            }
        };

        // Set center
        setCell(row, col, centerValue);

        // Set cross edges
        if (row > 0) {
            if (Grid[row - 1][col] != 1.0) {
                setCell(row - 1, col, edgeValue); // top
            }

            if (col > 0 && Grid[row - 1][col - 1] == 0.0) {
                setCell(row - 1, col - 1, cornerValue); //top left
            }
            if (col < 27 && Grid[row - 1][col + 1] == 0.0) {
                setCell(row - 1, col + 1, cornerValue); //top right
            }

        } if (row < 27) {
            if (Grid[row + 1][col] != 1.0) {
                setCell(row + 1, col, edgeValue); // bottom
            }

            if (col > 0 && Grid[row + 1][col - 1] == 0.0) {
                setCell(row + 1, col - 1, cornerValue); //bottom left
            }
            if (col < 27 && Grid[row+ 1][col + 1] == 0.0) {
                setCell(row + 1, col + 1, cornerValue); //bottom left
            }

        } if (col > 0 && Grid[row][col - 1] != 1.0) {
            setCell(row, col - 1, edgeValue); // left

        } if (col < 27 && Grid[row][col + 1] != 1.0) {
            setCell(row, col + 1, edgeValue); // right
        }

        SetGrid(newGrid); //updates the Grid with this newGrid
    };

    // checks on the mouse if outside the grid to set drawing false if the mouse is lifted
    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    return (
        <div className="grid-container">
            {Grid.map((row, rowIndex) => ( //look through rows
                <div key={rowIndex} className="grid-row"> 
                    {row.map((cell, colIndex) => ( //look through each column of each row
                        //renders each cell as its own div
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="grid-cell"
                            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                            style={{ backgroundColor: `rgba(0, 0, 0, ${cell})`, }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;
