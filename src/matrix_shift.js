function shiftVector(row, toEnd) {
  let newRow = row.slice();
  newRow = newRow.filter((val) => { return val; });

  if (toEnd) {
    while(newRow.length < 4) {
      newRow.unshift(null);
    }
  } else {
    while(newRow.length < 4) {
      newRow.push(null);
    }
  }

  return newRow;
}

function shiftMatrixRight(matrix, currentScore) {
  let newScore = currentScore;
  let newMatrix = [];

  for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
    let currentRow = matrix[rowIdx];
    let shiftedRow = shiftVector(currentRow, true);

    let [ newRow, rowScore ] = squashVectorValues(shiftedRow, true);

    newScore += rowScore;

    newMatrix[rowIdx] = newRow;
  }

  return [ newMatrix, newScore ];
}

function shiftMatrixLeft(matrix, currentScore) {
  // TODO: use abstraction for left/right methods
  let newScore = currentScore;
  let newMatrix = [];

  for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
    let currentRow = matrix[rowIdx];
    let shiftedRow = shiftVector(currentRow, false);

    let [ newRow, rowScore ] = squashVectorValues(shiftedRow, false);

    newScore += rowScore;

    newMatrix[rowIdx] = newRow;
  }

  return [ newMatrix, newScore ];
}

function shiftMatrixDown(matrix, currentScore) {
  // TODO: use abstraction for down/up methods
  let newScore = currentScore;
  let newMatrix = [new Array(4), new Array(4), new Array(4), new Array(4)];

  for (let colIdx = 0; colIdx < 4; colIdx++) {
    let currentColumn = matrix.map((row) => row[colIdx]);
    let shiftedColumn = shiftVector(currentColumn, true);

    let [ newColumn, rowScore ] = squashVectorValues(shiftedColumn, true);

    newScore += rowScore;

    // The matrix currently contains columns as rows and needs to be transposed
    newMatrix[colIdx] = newColumn;
  }

  // Transpose the matrix
  newMatrix = newMatrix[0].map((_, colIndex) => newMatrix.map(row => row[colIndex]));

  return [ newMatrix, newScore ];
}

function shiftMatrixUp(matrix, currentScore) {
  // TODO: use abstraction for down/up methods
  let newScore = currentScore;
  let newMatrix = [new Array(4), new Array(4), new Array(4), new Array(4)];

  for (let colIdx = 0; colIdx < 4; colIdx++) {
    let currentColumn = matrix.map((row) => row[colIdx]);//.reverse();
    let shiftedColumn = shiftVector(currentColumn, false);

    let [ newColumn, rowScore ] = squashVectorValues(shiftedColumn, false);

    newScore += rowScore;

    // The matrix currently contains columns as rows and needs to be transposed
    newMatrix[colIdx] = newColumn;
  }

  // Transpose the matrix
  newMatrix = newMatrix[0].map((_, colIndex) => newMatrix.map(row => row[colIndex]));

  return [ newMatrix, newScore ];
}

function squashVectorValues(row, ascending) {
  let newRow = row.slice();
  let rowScore = 0;

  let valuesPresent = newRow.filter((val) => { return val; });

  // No need to squash row with no values
  if (valuesPresent.length === 0) {
    return [newRow, 0];
  }

  if (ascending) {
    for (let colIdx = 3; colIdx > 0; colIdx--) {
      // Because we always shift the vector before this executes
      // meaning that if the value is null then the row has been squashed
      if (newRow[colIdx] === null) {
        continue;
      }

      let nextElem = newRow[colIdx - 1];

      if (nextElem === newRow[colIdx] && nextElem) {
        newRow[colIdx] = row[colIdx] * 2;
        rowScore += newRow[colIdx];
        newRow[colIdx - 1] = null;
        newRow = shiftVector(newRow, ascending);
      }
    }
  } else {
    for (let colIdx = 0; colIdx < (newRow.length - 1); colIdx++) {
      // Because we always shift the vector before this executes
      // meaning that if the value is null then the row has been squashed
      if (row[colIdx] === null) {
        continue;
      }

      let nextElem = newRow[colIdx + 1];

      if (nextElem === newRow[colIdx] && nextElem) {
        newRow[colIdx] = row[colIdx] * 2;
        rowScore += newRow[colIdx];
        newRow[colIdx + 1] = null;
        newRow = shiftVector(newRow, ascending);
      }
    }
  }

  return [ newRow, rowScore ];
}

export { shiftMatrixRight, shiftMatrixLeft, shiftMatrixDown, shiftMatrixUp };
