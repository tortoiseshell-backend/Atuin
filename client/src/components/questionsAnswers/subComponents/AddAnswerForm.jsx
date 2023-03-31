import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQAndA } from '@reducers/qnaSlice';
import defaultImage from '@images/place-holder.jpg';
import PropTypes from 'prop-types';
import FormData from 'form-data';
import axios from 'axios';

function AddAnswerForm({ qBodyId }) {
  const [images, setImages] = useState([0]);
  const { name } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  let photosArr = [];

  // const uploadPhotos = () => {
  //   // TODO: add photo links to photosArr
  // };

  // const getImage = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (images[0] === 0) {
  //       setImages(() => [reader.result]);
  //     } else {
  //       setImages((current) => [...current, reader.result]);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  const uploadImageToImgur = async (imageData) => {
    const data = new FormData();
    data.append('image', imageData);

    const config = {
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      headers: {
        Authorization: 'Bearer 72f560c29407c932a0b76f8a1adc287ed03ae950',
        Cookie: 'IMGURSESSION=494f1e879f30e1625de8cb15b931bd92; _nc=1',
        'Content-Type': 'multipart/form-data',
      },
      data,
    };

    try {
      const response = await axios(config);
      console.log(response.data.data.link);

      if (images[0] === 0) {
        setImages(() => [response.data.data.link]);
      } else {
        setImages((current) => [...current, response.data.data.link]);
      }
      photosArr.push(response.data.data.link);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result.replace(/^data:image\/\w+;base64,/, '');
      uploadImageToImgur(base64Data);
    };

    reader.readAsDataURL(file);
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
              {images.length < 5 && <input type="file" id="actualButton" name="filename" accept="image/*" onChange={handleImageUpload} multiple hidden />}
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
