/* eslint-disable max-len */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

  const {   ratings,         recommended,       characteristics } = useSelector((state) => state.reviews.metaData);
        // "ratings": {     "recommended": {   "characteristics": {
        //   2: 1,            0: 5               "Size": {
        //   3: 1,            // ...               "id": 14,
        //   4: 2,          }                      "value": "4.0000"
        //   // ...                              },
        // }                                     "Width": {
        //                                         "id": 15,
        //                                           "value": "3.5000"
        //                                       },
        //                                       "Comfort": {
        //                                         "id": 16,
        //                                           "value": "4.0000"
        //                                       },
                                                // ...
        //                                       }