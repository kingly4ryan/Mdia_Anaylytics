import axios from 'axios';

// utils/api.js
export const fetchSegmentationResults = async () => {
  // Returning the provided JSON data
  return [
    { "username": "user1", "segment": 3 },
    { "username": "user2", "segment": 4 },
    { "username": "user3", "segment": 2 },
    { "username": "user4", "segment": 2 },
    { "username": "user5", "segment": 4 },
    { "username": "user6", "segment": 3 },
    { "username": "user7", "segment": 4 },
    { "username": "user8", "segment": 1 },
    { "username": "user9", "segment": 3 },
    { "username": "user10", "segment": 0 },
    { "username": "user11", "segment": 2 },
    { "username": "user12", "segment": 0 },
    { "username": "user13", "segment": 1 },
    { "username": "user14", "segment": 1 },
    { "username": "user15", "segment": 2 },
    { "username": "user16", "segment": 0 },
    { "username": "user17", "segment": 3 },
    { "username": "user18", "segment": 1 },
    { "username": "user19", "segment": 2 },
    { "username": "user20", "segment": 0 },
    { "username": "user21", "segment": 3 },
    { "username": "user22", "segment": 1 },
    { "username": "user23", "segment": 1 },
    { "username": "user24", "segment": 2 },
    { "username": "user25", "segment": 0 },
    { "username": "user26", "segment": 1 },
    { "username": "user27", "segment": 0 },
    { "username": "user28", "segment": 1 },
    { "username": "user29", "segment": 1 },
    { "username": "user30", "segment": 3 },
    { "username": "user31", "segment": 0 },
    { "username": "user32", "segment": 3 },
    { "username": "user33", "segment": 1 },
    { "username": "user34", "segment": 2 },
    { "username": "user35", "segment": 0 },
    { "username": "user36", "segment": 3 },
    { "username": "user37", "segment": 1 },
    { "username": "user38", "segment": 1 },
    { "username": "user39", "segment": 2 },
    { "username": "user40", "segment": 0 },
    { "username": "user41", "segment": 1 },
    { "username": "user42", "segment": 0 },
    { "username": "user43", "segment": 1 },
    { "username": "user44", "segment": 1 },
    { "username": "user45", "segment": 3 },
    { "username": "user46", "segment": 0 },
    { "username": "user47", "segment": 3 },
    { "username": "user48", "segment": 1 },
    { "username": "user49", "segment": 2 },
    { "username": "user50", "segment": 0 }
  ];
};

  
  // utils/api.js
export const fetchPerformanceResults = async () => {
  // Mocking the data as if it's coming from an API
  return {
    actual: [
        1900,
        2800,
        2200,
        1500,
        1600,
        1800,
        2600,
        1700,
        2100,
        2200
    ],
    predicted: [
        1900.0000000000002,
        2800.0,
        2200.0,
        1500.0000000000005,
        1600.0000000000005,
        1800.0000000000002,
        2600.0,
        1700.0000000000005,
        2100.0,
        2200.0
    ]
  };
};


export const fetchChurnResults = async () => {
  return {
    actual: [1900, 2800, 2200, 1500, 1600, 1800, 2600, 1700, 2100, 2200],
    predicted: [1600, 2900, 2200, 1550, 1400, 1100, 200, 3700, 2000, 2000]
  };
};
