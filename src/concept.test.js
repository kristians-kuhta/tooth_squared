import React from 'react';
import { render } from '@testing-library/react';

import {
  shiftMatrixRight,
  shiftMatrixLeft,
  shiftMatrixDown,
  shiftMatrixUp
} from './concept.js';


test('shifts the matrix right and adds up score', () => {
  const testMatrix = [
    [null, 4,    4,    8   ],
    [16,   16,   16,   null],
    [4,    2,    2,    2   ],
    [null, null, null, null]
  ];

  const initialScore = 0;

  const expectedMatrix = [
    [null, null, 8,    8   ],
    [null, null, 16,   32  ],
    [null, 4,    2,    4   ],
    [null, null, null, null]
  ];

  const expectedScore = 44;

  const result = shiftMatrixRight(testMatrix, initialScore);
  expect(result).toEqual([expectedMatrix, expectedScore]);
});

test('shifts the matrix left and adds up score', () => {
  const testMatrix = [
    [null, 4,    4,    8   ],
    [16,   16,   16,   null],
    [4,    2,    2,    2   ],
    [null, null, null, null]
  ];

  const initialScore = 0;

  const expectedMatrix = [
    [8,    8,    null, null],
    [32,   16,   null, null],
    [4,    4,    2,    null],
    [null, null, null, null]
  ];

  const expectedScore = 44;

  const result = shiftMatrixLeft(testMatrix, initialScore);
  expect(result).toEqual([expectedMatrix, expectedScore]);
});

test('shifts the matrix down and adds up score', () => {
  const testMatrix = [
    [null, 2,    2,    8],
    [4,    null, 16,   8],
    [4,    2,    2,    8],
    [null, null, null, 8]
  ];

  const initialScore = 0;

  const expectedMatrix = [
    [null, null, null, null],
    [null, null, 2,    null],
    [null, null, 16,   16  ],
    [8,    4,    2,    16  ]
  ];

  const expectedScore = 44;

  const result = shiftMatrixDown(testMatrix, initialScore);
  expect(result).toEqual([expectedMatrix, expectedScore]);
});

test('shifts the matrix up and adds up score', () => {
  const testMatrix = [
    [null, 2,    null, 8   ],
    [4,    null, 16,   8   ],
    [4,    2,    2,    8   ],
    [null, null, 2,    null]
  ];

  const initialScore = 0;

  const expectedMatrix = [
    [8,    4,    16,   16  ],
    [null, null, 4,    8   ],
    [null, null, null, null],
    [null, null, null, null],
  ];

  const expectedScore = 32;

  const result = shiftMatrixUp(testMatrix, initialScore);
  expect(result).toEqual([expectedMatrix, expectedScore]);
});
