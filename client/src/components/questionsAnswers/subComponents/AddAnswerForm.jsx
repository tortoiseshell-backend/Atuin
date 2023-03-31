import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQAndA } from '@reducers/qnaSlice';
import defaultImage from '@images/place-holder.jpg';
import PropTypes from 'prop-types';

const axios = require('axios');

function AddAnswerForm({ qBodyId }) {
  const [images, setImages] = useState([0]);
  const { name } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  let photosArr = [];

  const uploadPhotos = () => {
    // TODO: add photo links to photosArr
  };

  const getImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (images[0] === 0) {
        setImages(() => [reader.result]);
      } else {
        setImages((current) => [...current, reader.result]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const API_URL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${qBodyId.qId}/answers`;
    const API_CONFIG = {
      headers: {
        Authorization: process.env.AUTH_SECRET,
      },
      params: {
        question_id: qBodyId.qId,
      },
    };
    const API_DATA = {
      body: e.target[0].value,
      name: e.target[1].value,
      email: e.target[2].value,
      photos: photosArr,
    };

    const payload = {
      qId: qBodyId.qId,
      answerData: {
        answerer_name: e.target[1].value,
        body: e.target[0].value,
        date: new Date(),
        helpfulness: 0,
        photos: photosArr,
      },
    };

    axios.post(API_URL, API_DATA, API_CONFIG)
      .then((postRes) => {
        console.log('POST RES: ', postRes);
        // axios.get(API_URL, API_CONFIG)
        //   .then((res) => {
        //     dispatch(saveGetResults(res.data));
        //   })
        //   .catch((err) => {
        //     throw new Error(err);
        //   });
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });

    dispatch(updateQAndA(payload));
  };

  return (
    <div className="m-5">

      <h3 className="text-xl font-bold">Submit Your Answer</h3>
      <h5>
        {name}
        :&nbsp;
        {qBodyId.qBody}
      </h5>

      <form className="m-[5%]" onSubmit={submitHandler}>
        <div className="yourQuestion my-5">
          <p>
            Your Answer
            <span className="text-red-500">*</span>
          </p>
          <textarea rows="4" cols="50" className="w-full border rounded-md border-gray-500 dark:bg-secondary-100  p-2" maxLength="1000" required />
        </div>

        <div className="yourNickname my-5">
          <p>
            What is your nickname?
            <span className="text-red-500">*</span>
          </p>
          <input type="text" className="w-full border rounded-md border-gray-500 dark:bg-secondary-100 font-xs p-2" maxLength="60" placeholder="Example: jackson543!" required />
          <small className="block text-gray-700 dark:text-stone-300">For privacy reasons, do not use your full name or email address</small>
        </div>

        <div className="yourEmail my-5">
          <p>
            Your email
            <span className="text-red-500">*</span>
          </p>
          <input type="email" className="w-full border rounded-md border-gray-500 dark:bg-secondary-100 p-2" maxLength="60" placeholder="Example: jack@email.com" required />
          <small className="block text-gray-700 dark:text-stone-300">For authentication reasons, you will not be emailed</small>
        </div>

        <div className="uploadPhotos my-7">
          <div className="thumbnails my-2 py-2 px-1 col-span-5 grid grid-cols-5 gap-2 items-center justify-items-center border rounded-md dark:bg-secondary-100 border-secondary-300 dark:border-primary-300 font-xs border p-1 rounded" id="getImage">
            {images.map((image, index) => (
              <img className="my-2" id={`outputImage-${index}`} key={`outputImage-${index}`} alt={`outputImage-${index}`} onError={((e) => { e.target.src = defaultImage; })} src={image} style={{ maxHeight: '4em', maxWidth: '4em' }} />
            ))}
          </div>
          <div className="uploadButton my-4">
            <label htmlFor="actualButton" className="styledUploadButton hover:bg-primary-100 dark:hover:bg-secondary-300 border border-secondary-300 dark:border-primary-300 text-secondary-300 dark:text-primary-300 rounded p-2">
              {images.length < 5 && <input type="file" id="actualButton" name="filename" accept="image/*" onChange={getImage} multiple hidden />}
              <i className="fa-solid fa-plus text-secondary-300 dark:text-primary-300" />
              &nbsp; Upload a photo
            </label>
          </div>
        </div>

        <div className="submitAnswer flex justify-end mt-10">
          <button type="submit" className="object-right-bottom bg-secondary-300 dark:bg-primary-300 hover:bg-primary-200 dark:hover:bg-primary-200 rounded text-white dark:text-secondary-200 hover:text-secondary-300 p-2">Submit Answer</button>
        </div>
      </form>

    </div>
  );
}

AddAnswerForm.propTypes = {
  qBodyId: PropTypes.shape({
    qBody: PropTypes.string.isRequired,
    qId: PropTypes.number.isRequired,
  }).isRequired,
};

export default AddAnswerForm;
