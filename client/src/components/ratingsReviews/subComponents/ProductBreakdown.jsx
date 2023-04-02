import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import characteristicsMeaning from '../scripts/characteristicsMeaning';

function ProductBreakdown() {
  const metaData = useSelector((state) => state.reviews.metaData);
  const { characteristics } = metaData;

  return (
    <div className="flex">
      <div className="grid grid-auto-rows">
        {/* Display rating breakdown */}
        {characteristics && Object.keys(characteristics).map((key) => (
          <div key={`${key}-${characteristics[key].id}`}>
            <span id="ratingsLabel" className="px-[10px]">{`${key}`}</span>
            <div id="ratingsContent">

              <span style={{
                display: 'flex', flexFlow: 'row-reverse', fontSize: '12px', marginLeft: 'auto',
              }}
              >
                {characteristicsMeaning[key][5]}
              </span>
              <div
                id="ratingBar"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '10px',
                  width: '200px',
                  height: '20px',
                  border: '1px solid grey',
                  marginRight: '10px',
                }}
              >
                <div
                  className="bg-stone-200 dark:bg-secondary-200"
                  style={{
                    display: 'inline-block',
                    position: 'relative',
                    width: `${(characteristics[key].value / 5) * 100}%`,
                    height: '100%',
                  }}
                >
                  <div
                    className="bg-secondary-300 dark:bg-primary-200"
                    style={{
                      zIndex: '2',
                      display: 'inline-block',
                      position: 'absolute',
                      left: '95%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      border: '1px solid grey',
                    }}
                  />
                </div>
                <div
                  className="bg-stone-200 dark:bg-secondary-200"
                  style={{
                    zIndex: '1',
                    display: 'inline-block',
                    position: 'relative',
                    width: `${100 - (characteristics[key].value / 5) * 100}%`,
                    height: '100%',
                  }}
                />
              </div>
              <div>
                <span style={{ fontSize: '12px' }}>{characteristicsMeaning[key][1]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductBreakdown;
