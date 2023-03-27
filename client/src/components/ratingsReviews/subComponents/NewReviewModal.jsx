/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StarRatingView from '@modular/StarRatingView';
import { postReview } from '../scripts/API_Helper';

function NewReviewModal() {
  // const prodId = useSelector((state) => state.product.id);
  // const prodName = useSelector((state) => state.product.name);
  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState(false);
  const [enteredCharacteristics, setEnteredCharacteristics] = useState({});
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');

  const { characteristics } = useSelector((state) => state.reviews.metaData);
  const characteristicsMeaning = {
    Size: {
      1: 'A size too small',
      2: '½ a size too small',
      3: 'Perfect',
      4: '½ a size too big',
      5: 'A size too wide',
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide',
    },
    Comfort: {
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect',
    },
    Quality: {
      1: 'Poor',
      2: 'Below average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect',
    },
    Length: {
      1: 'Runs Short',
      2: 'Runs slightly short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
  };

  const handleCharacteristicChange = (characteristic, value) => {
    setEnteredCharacteristics({
      ...enteredCharacteristics,
      [characteristic]: value,
    });
  };
  const handleSumChange = (e) => {
    // Here we are checking if the length is equal to 10
    if (e.target.value.length === 60) {
      window.alert("Username shouldn't exceed 60 characters");
    }
    setSummary(e.target.value);
  };
  const handleBodyChange = (e) => {
    // Here we are checking if the length is equal to 10
    if (e.target.value.length === 1000) {
      window.alert("Username shouldn't exceed 1000 characters");
    }
    setBody(e.target.value);
  };
  const handleNameChange = (e) => {
    // Here we are checking if the length is equal to 10
    if (e.target.value.length === 60) {
      window.alert("Username shouldn't exceed 60 characters");
    }
    setNickName(e.target.value);
  };
  const handleEmailChange = (e) => {
    // Here we are checking if the length is equal to 10
    if (e.target.value.length === 60) {
      window.alert("Username shouldn't exceed 60 characters");
    }
    setNickName(e.target.value);
  };

  const getImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImages((current) => [...current, reader.result]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const postNewReview = (reviewObj) => {
    postReview(reviewObj);
  };

  const renderStarsSwitch = () => {
    switch (rating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Average';
      case 4:
        return 'Good';
      case 5:
        return 'Great';
      default:
        return '';
    }
  };

  return (
    <div>
      <form>
        <div id="overallRating">
          {/* display 5 stars, user can click on a star and it fills the stars up to the star the user clicked  */}
          <StarRatingView averageRating={rating} />
          <span>
            {rating}
            {' stars - '}
            {renderStarsSwitch}
          </span>
        </div>
        <div id="recommend">
          <div className="radio">
            <label htmlFor="radioYes">
              Yes
              <input
                type="radio"
                id="radioYes"
                name="recommend"
                value="yes"
                onChange={() => setRecommend(true)}
              />
            </label>
            <label htmlFor="radioNo">
              No
              <input
                type="radio"
                id="radioNo"
                name="recommend"
                value="no"
                onChange={() => setRecommend(false)}
              />
            </label>
          </div>
        </div>
        <div id="characteristics" className="flex flex-col my-5">
          {Object.entries(characteristics).map(([key, value]) => (
            <div key={value.id} className="border p-3 mb-3" style={{ backgroundColor: '#f5f5f5' }}>
              <div className="grid grid-cols-5 gap-2">
                <div className="col-span-1 flex items-center">
                  <label className="block font-bold mb-2 w-24">{key}</label>
                </div>
                <div className="col-span-4 grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <div key={num} className="col-span-1 flex flex-col items-center border">
                      <label className="block p-1 rounded text-center w-16">{num}</label>
                      <input
                        type="radio"
                        value={num}
                        checked={enteredCharacteristics[key] === num.toString()}
                        onChange={() => handleCharacteristicChange(key, num.toString())}
                        style={{ width: '100%' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2">{enteredCharacteristics[key] ? characteristicsMeaning[key][enteredCharacteristics[key]] : 'none selected'}</div>
            </div>
          ))}
        </div>
        <div id="summary">
          {/* display 5 stars, user can click on a star and it fills the stars up to the star the user clicked  */}
        </div>
        <div id="body">
          {/* display 5 stars, user can click on a star and it fills the stars up to the star the user clicked  */}
        </div>
        <div id="getImage">
          {images.map((image, idx) => (
            <img id={`outputImage-${idx}`} key={`outputImage-${idx}`} alt={`outputImage-${idx}`} src={image} style={{ maxHeight: '4em', maxWidth: '4em' }} />
          ))}
          {images.length < 5 && <input type="file" accept="image/*" onChange={getImage} />}
        </div>
        <div id="nickName">
          {/* display 5 stars, user can click on a star and it fills the stars up to the star the user clicked  */}
        </div>
        <div id="email">
          {/* display 5 stars, user can click on a star and it fills the stars up to the star the user clicked  */}
        </div>
      </form>
    </div>
  );
}

export default NewReviewModal;
