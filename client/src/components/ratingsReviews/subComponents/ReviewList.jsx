import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReviewsAsync,
} from '@reducers/reviewSlice';
import ReviewListTile from './ReviewListTile';

function ReviewList() {
  const dispatch = useDispatch();

  // const reviews = [
  //   {
  //     review_id: 1275619,
  //     rating: 2,
  //     summary: 'jhvk dshkjgh lguh lshudfg luhflgfuhubihsdflub lb ub luhlgiui',
  //     recommend: true,
  //     response: 'This isf sduoifhg ;ohg dsiufdbvs ludfhlgiu hs;doifihg os;ofihg ;os hdf;go hsdfgoiuh sd;fuhg sdpuihg; ifudshg;ou hsdf;ogh ;souifdhg;osi hfg;uoshgn ;uhfdg ; ouhsfdg;ubis h;dfuhg ;sfdgh ;sodfhg ;ohdsfg;o hdsf;goh;sodfhgi ;dsofh  df;oigj ;sdfh g;sodf h ;osd',
  //     body: 'jhvk dshkjgh udshgvlubdlfguivb lfuyibg ludsbfgl isbfdliug blsdifugb lusidfgb lsdfo yblig bludsifb g lifdbg ldsbfgl udsfb gl fudsb gl isdfbog bdsflgiu bl lguh lshudfg luhflgfuhubihsdflub lb ub luhlgiu f lb lsdbfl kubsdflukgb lsudfbgl sbdflu h fsludf blsudfbv lsdfbv hkblsuifb ljksdfb luksdfh lkblfkbv ljskdfbvl usdhf dbf jhylifuv slfdlihsf ;ui h;iuhfd ldufh bl uhfd dsuihd l;iuhfd uih   iuhf',
  //     date: '2022-07-18T00:00:00.000Z',
  //     reviewer_name: 'ibraheeeeeem',
  //     helpfulness: 0,
  //     photos: [
  //       {
  //         id: 2459491,
  //         url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
  //       },
  //     ],
  //   },
  //   {
  //     review_id: 1295619,
  //     rating: 2,
  //     summary: 'jhvk dshkjgh lguh lshudfg luhflgfuhubihsdflub lb ub luhlgiui',
  //     recommend: true,
  //     response: 'This isf sduoifhg ;ohg dsiufdbvs ludfhlgiu hs;doifihg os;ofihg ;os hdf;go hsdfgoiuh sd;fuhg sdpuihg; ifudshg;ou hsdf;ogh ;souifdhg;osi hfg;uoshgn ;uhfdg ; ouhsfdg;ubis h;dfuhg ;sfdgh ;sodfhg ;ohdsfg;o hdsf;goh;sodfhgi ;dsofh  df;oigj ;sdfh g;sodf h ;osd',
  //     body: 'jhvk dshkjgh udshgvlubdlfguivb lfuyibg ludsbfgl isbfdliug blsdifugb lusidfgb lsdfo yblig bludsifb g lifdbg ldsbfgl udsfb gl fudsb gl isdfbog bdsflgiu bl lguh lshudfg luhflgfuhubihsdflub lb ub luhlgiu f lb lsdbfl kubsdflukgb lsudfbgl sbdflu h fsludf blsudfbv lsdfbv hkblsuifb ljksdfb luksdfh lkblfkbv ljskdfbvl usdhf dbf jhylifuv slfdlihsf ;ui h;iuhfd ldufh bl uhfd dsuihd l;iuhfd uih   iuhf',
  //     date: '2022-07-18T00:00:00.000Z',
  //     reviewer_name: 'ibraheeeeeem',
  //     helpfulness: 0,
  //     photos: [
  //       {
  //         id: 2955491,
  //         url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
  //       },
  //       {
  //         id: 2955491,
  //         url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
  //       },
  //       {
  //         id: 2955491,
  //         url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
  //       },
  //       {
  //         id: 2955491,
  //         url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
  //       },
  //       {
  //         id: 2955491,
  //         url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
  //       },
  //     ],
  //   },
  //   {
  //     review_id: 1278619,
  //     rating: 2,
  //     summary: 'jhvk dshkjgh lguh lshudfg luhflgfuhubihsdflub lb ub luhlgiui',
  //     recommend: true,
  //     response: 'This isf sduoifhg ;ohg dsiufdbvs ludfhlgiu hs;doifihg os;ofihg ;os hdf;go hsdfgoiuh sd;fuhg sdpuihg; ifudshg;ou hsdf;ogh ;souifdhg;osi hfg;uoshgn ;uhfdg ; ouhsfdg;ubis h;dfuhg ;sfdgh ;sodfhg ;ohdsfg;o hdsf;goh;sodfhgi ;dsofh  df;oigj ;sdfh g;sodf h ;osd',
  //     body: 'jhvk dshkjgh udshgvlubdlfguivb lfuyibg ludsbfgl isbfdliug blsdifugb lusidfgb lsdfo yblig bludsifb g lifdbg ldsbfgl udsfb gl fudsb gl isdfbog bdsflgiu bl lguh lshudfg luhflgfuhubihsdflub lb ub luhlgiu f lb lsdbfl kubsdflukgb lsudfbgl sbdflu h fsludf blsudfbv lsdfbv hkblsuifb ljksdfb luksdfh lkblfkbv ljskdfbvl usdhf dbf jhylifuv slfdlihsf ;ui h;iuhfd ldufh bl uhfd dsuihd l;iuhfd uih   iuhf',
  //     date: '2022-07-18T00:00:00.000Z',
  //     reviewer_name: 'ibraheeeeeem',
  //     helpfulness: 0,
  //     photos: [
  //       {
  //         id: 2459491,
  //         url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
  //       },
  //     ],
  //   },
  // ];

  const reviews = useSelector((state) => state.reviews.data);

  useEffect(() => {
    dispatch(getReviewsAsync());
    // dispatch(getReviewsAsync(page, 'newest', 40435));
  }, []);

  return (
    <div
      style={{
        paddingRight: '10px',
      }}
    >
      Review List
      {reviews.map((review) => (
        <ReviewListTile review={review} key={review.review_id} />
      ))}
    </div>
  );
}

export default ReviewList;
