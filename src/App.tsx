import React, {useState} from 'react';
import './App.css';

function App() {

    const [ rowSize, setRow ] = useState(10);
    const [ colSize, setCol ] = useState(10);

    const createPath = (startRow: number, startCol: number, createPath: boolean, color: string) => {
        const validDirection = ['right', 'bottom', 'left', 'top'];

        const remainingDirection = {right: rowSize, bottom: colSize, left: 0, top: 0};

        let nextDirection;

        let lastPosition = [];

        let rowIndex = startRow;
        let colIndex = startCol;

        let currentPosition = document.getElementById(`cell_${rowIndex}_${colIndex}`);

        let exit, lastExit, exitIndex, loop = 0, loopFuse = 0, maxLoops = 3 * rowSize * colSize, nextPossiblePosition;

        while (loop < ((rowSize * colSize) - 1)) {
            loopFuse++;

            if (loopFuse >= maxLoops) {
                break;
            }

            nextDirection = [];

            for (let i = 0; i < validDirection.length; i++) {
                switch (validDirection[i]) {
                    case 'right':
                        nextPossiblePosition = document.getElementById(`cell_${rowIndex}_${colIndex + 1}`);
                        break;
                    case 'left':
                        nextPossiblePosition = document.getElementById(`cell_${rowIndex}_${colIndex - 1}`);
                        break;
                    case 'bottom':
                        nextPossiblePosition = document.getElementById(`cell_${rowIndex + 1}_${colIndex}`);
                        break;
                    case 'top':
                        nextPossiblePosition = document.getElementById(`cell_${rowIndex - 1}_${colIndex}`);
                        break;
                }

                if (nextPossiblePosition != null) {
                    if (nextPossiblePosition.getAttribute('occupied') != 'true') {
                        // @ts-ignore
                        for (let t = 0; t < remainingDirection[validDirection[i]]; t++) {
                            nextDirection.push(validDirection[i]);
                        }
                    }
                }
            }

            if (nextDirection.length == 0) {
                if (createPath == true) {
                    return false;
                } else {
                    lastPosition.splice(lastPosition.length - 1, 1);
                    rowIndex = lastPosition[lastPosition.length - 1][0];
                    colIndex = lastPosition[lastPosition.length - 1][1];
                    currentPosition = document.getElementById(`cell_${rowIndex}_${colIndex}`);

                    continue;
                }
            }

            exitIndex = Math.floor(Math.random() * Math.floor(nextDirection.length));

            exit = nextDirection[exitIndex];

            if (createPath == false && currentPosition) {
                // @ts-ignore
                currentPosition.style[`border-${exit}`] = 'none';
            } else {
                if (!(exit == 'right' && colIndex == colSize - 1 && rowIndex == rowSize) && !(exit == 'bottom' && colIndex == colSize && rowIndex == rowSize -1) && currentPosition) {
                    // @ts-ignore
                    currentPosition.style[`border-${exit}`] = 'none';
                }
            }

            switch (exit) {
                case 'right':
                    colIndex = colIndex + 1;
                    remainingDirection.left++;
                    remainingDirection.right--;
                    break;

                case 'bottom':
                    rowIndex = rowIndex + 1;
                    remainingDirection.top++;
                    remainingDirection.bottom--;
                    break;

                case 'left':
                    colIndex = colIndex - 1;
                    remainingDirection.left--;
                    remainingDirection.right++;
                    break;

                case 'top':
                    rowIndex = rowIndex - 1;
                    remainingDirection.top--;
                    remainingDirection.bottom++;
                    break;
            }

            lastPosition.push([rowIndex, colIndex]);

            currentPosition = document.getElementById(`cell_${rowIndex}_${colIndex}`);

            if (currentPosition) {
                switch (exit) {
                    case 'right':
                        // @ts-ignore
                        currentPosition.style['border-left'] = 'none';
                        break;
                    case 'bottom':
                        // @ts-ignore
                        currentPosition.style['border-top'] = 'none';
                        break;
                    case 'left':
                        // @ts-ignore
                        currentPosition.style['border-right'] = 'none';
                        break;
                    case 'top':
                        // @ts-ignore
                        currentPosition.style['border-bottom'] = 'none';
                        break;
                }
            }


            if (rowIndex == rowSize && colIndex == colSize) {
                break;
            }

            if (currentPosition) {
                currentPosition.style.backgroundColor = color;
                currentPosition.setAttribute('occupied', 'true');
            }


            lastExit = exit;

            loop++;
        }

    };

    const createLabyrinth = () => {
        let rowIndex, colIndex;

        let table = document.createElement("table");
        let tbody = document.createElement('tbody');

        for (rowIndex = 1; rowIndex <= rowSize; rowIndex++) {
            let row = document.createElement('tr');

            for (colIndex = 1; colIndex <= colSize; colIndex++) {
                let col = document.createElement('td');
                if (rowIndex === 1 && colIndex === 1) {
                    col.style.backgroundColor = 'rgb(244,0,0)';
                    col.setAttribute('type', 'start');
                } else if (rowIndex === rowSize && colIndex === colSize) {
                    col.style.backgroundColor = 'rgb(0,244,0)';
                    col.setAttribute('type', 'finish');
                } else {
                    col.style.backgroundColor = 'rgb(255,255,255)';
                }
                col.setAttribute('id', `cell_${rowIndex}_${colIndex}`);
                row.appendChild(col)
            }
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        document.getElementById('laby')?.appendChild(table);
    };

    const draw = () => {
        let startAtRow = 1;
        let startAtCol = 1;

        let currentCell;

        createPath(startAtRow, startAtCol, false, 'rgb(240,0,0)');

        for (let n = 1; n < (rowSize * colSize) - 1; n++) {
            let currentPosition = document.getElementById(`cell_${startAtRow}_${startAtCol}`);
            if (currentPosition && currentPosition.getAttribute('occupied') == 'true') {
                createPath(startAtRow, startAtCol, true, 'rgb(240,120,0)');
            }
            if (startAtCol == colSize) {
                startAtRow ++;
                startAtCol = 1;
            } else {
                startAtCol++;
            }
        }


    };

    const loop = () => {
        let validExists = ['right', 'bottom', 'left', 'top'];

        let remainingExits = {
            right: colSize,
            bottom: rowSize,
            left: 0,
            top: 0
        };

        let nextExits = [];

        let lastCells = [];

        let rowIndex = '';
    };

    const init = () => {
        createLabyrinth();

        draw();
    };

    return (
        <div className="App">
            <div>
                Config
                <div>
                    <label>Row</label>
                    <input name={'row'} value={rowSize} onChange={(event) => {setRow(parseInt(event.target.value))}} />
                </div>
                <div>
                    <label>Col</label>
                    <input name={'col'} value={colSize} onChange={(event) => {setCol(parseInt(event.target.value))}}/>
                </div>
                <button onClick={init}>
                    Create
                </button>
            </div>
            <div className={'container'}>
                <div id={'laby'} className={'child'}></div>
            </div>
        </div>
    );
}

export default App;
