const generateMockResponse = (method, endpoint) => {
  switch (method) {
    case 'get':
      if (/products\/\d+$/.test(endpoint)) {
        return [200, {
          id: 1,
          name: 'Air Minis 250',
          slogan: 'Full court support',
          description: 'This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.',
          category: 'Basketball Shoes',
          default_price: '0',
          features: [
            {
              feature: 'Sole',
              value: 'Rubber',
            },
            {
              feature: 'Material',
              value: 'FullControlSkin',
            },
          ],
        },
        ];
      } if (/products\/\d+\/styles/.test(endpoint)) {
        return [200, {
          product_id: '1',
          results: [
            {
              style_id: 1,
              name: 'Forest Green & Black',
              original_price: '140',
              sale_price: '0',
              'default?': true,
              photos: [
                {
                  thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail.jpg',
                  url: 'urlplaceholder/style_1_photo_number.jpg',
                },
                {
                  thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail.jpg',
                  url: 'urlplaceholder/style_1_photo_number.jpg',
                },
                // ...
              ],
              skus: {
                1: {
                  quantity: 8,
                  size: 'XS',
                },
                2: {
                  quantity: 16,
                  size: 'S',
                },
                3: {
                  quantity: 17,
                  size: 'M',
                },
                // ...
              },
            },
            {
              style_id: 2,
              name: 'Desert Brown & Tan',
              original_price: '140',
              sale_price: '0',
              'default?': false,
              photos: [
                {
                  thumbnail_url: 'urlplaceholder/style_2_photo_number_thumbnail.jpg',
                  url: 'urlplaceholder/style_2_photo_number.jpg',
                },
                // ...
              ],
              skus: {
                4: {
                  quantity: 8,
                  size: 'XS',
                },
                5: {
                  quantity: 16,
                  size: 'S',
                },
                6: {
                  quantity: 17,
                  size: 'M',
                },
                // ...
              },
            },
            // ...
          ],
        },
        ];
      } if (/products\/\d+\/related/.test(endpoint)) {
        return [200, [
          1,
          2,
        ],
        ];
      } if (/qa\/questions\/\d+\/answers/.test(endpoint)) {
        return [200, {
          question: '1',
          page: 0,
          count: 5,
          results: [
            {
              answer_id: 1,
              body: 'What a great question!',
              date: '2018-01-04T00:00:00.000Z',
              answerer_name: 'metslover',
              helpfulness: 8,
              photos: [],
            },
            {
              answer_id: 2,
              body: "Something pretty durable but I can't be sure",
              date: '2018-01-04T00:00:00.000Z',
              answerer_name: 'metslover',
              helpfulness: 5,
              photos: [{
                id: 1,
                url: 'urlplaceholder/answer_5_photo_number_1.jpg',
              },
              {
                id: 2,
                url: 'urlplaceholder/answer_5_photo_number_2.jpg',
              },
                // ...
              ],
            },
            // ...
          ],
        },
        ];
      }

      switch (endpoint) {
        case 'reviews/':
          return [200, {
            product: '1',
            page: 0,
            count: 10,
            results: [
              {
                review_id: 1,
                rating: 3,
                summary: 'dfgdfg',
                recommend: false,
                response: null,
                body: 'this is a test to see if anything is working incorrectly. it is very wordy.',
                date: '2022-10-21T00:00:00.000Z',
                reviewer_name: 'dsfsdf',
                helpfulness: 2,
                photos: [],
              },
              {
                review_id: 2,
                rating: 2,
                summary: 'This is a great product',
                recommend: true,
                response: 'wow',
                body: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                date: '2022-07-18T00:00:00.000Z',
                reviewer_name: 'ibraheeeeeem',
                helpfulness: 0,
                photos: [
                  {
                    id: 12,
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
                  },
                ],
              },
            ],
          },
          ];

        case 'reviews/meta/':
          return [200, {
            product_id: '1',
            ratings: {
              1: '22',
              2: '50',
              3: '46',
              4: '35',
              5: '83',
            },
            recommended: {
              false: '66',
              true: '170',
            },
            characteristics: {
              Fit: {
                id: 135224,
                value: '2.7108433734939759',
              },
              Length: {
                id: 135225,
                value: '3.1538461538461538',
              },
              Comfort: {
                id: 135226,
                value: '3.0601092896174863',
              },
              Quality: {
                id: 135227,
                value: '3.4325842696629213',
              },
            },
          },
          ];
        case 'products/':
          return [200, [
            {
              id: 1,
              name: 'Camo Onesie',
              slogan: 'Blend in to your crowd',
              description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
              category: 'Jackets',
              default_price: '140',
            },
            {
              id: 2,
              name: 'Bright Future Sunglasses',
              slogan: "You've got to wear shades",
              description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
              category: 'Accessories',
              default_price: '69',
            },
            {
              id: 3,
              name: 'Morning Joggers',
              slogan: 'Make yourself a morning person',
              description: "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
              category: 'Pants',
              default_price: '40',
            },
          ],
          ];

        case 'cart':
          return [200, [
            {
              sku_id: 1,
              count: 2,
            },
            {
              sku_id: 2,
              count: 1,
            },
            {
              sku_id: 3,
              count: 33,
            },
            // ...
          ],
          ];

        case 'qa/questions/':
          return [200, {
            product_id: '1',
            results: [{
              question_id: 1,
              question_body: 'Why is this product cheaper here than other sites?',
              question_date: '2018-10-18T00:00:00.000Z',
              asker_name: 'williamsmith',
              question_helpfulness: 4,
              reported: false,
              answers: {
                1: {
                  id: 1,
                  body: 'We are selling it here without any markup from the middleman!',
                  date: '2018-08-18T00:00:00.000Z',
                  answerer_name: 'Seller',
                  helpfulness: 4,
                  photos: [],
                  // ...
                },
              },
            },
            {
              question_id: 2,
              question_body: 'How long does it last?',
              question_date: '2019-06-28T00:00:00.000Z',
              asker_name: 'funnygirl',
              question_helpfulness: 2,
              reported: false,
              answers: {
                1: {
                  id: 1,
                  body: 'Some of the seams started splitting the first time I wore it!',
                  date: '2019-11-28T00:00:00.000Z',
                  answerer_name: 'sillyguy',
                  helpfulness: 6,
                  photos: [],
                },
                2: {
                  id: 2,
                  body: '9 lives',
                  date: '2019-11-12T00:00:00.000Z',
                  answerer_name: 'iluvdogz',
                  helpfulness: 31,
                  photos: [],
                },
              },
            },
              // ...
            ],
          },
          ];

        default:
          throw new Error(`${endpoint} is not a supported endpoint for the context of this test`);
      }

    case 'post':
      if (/qa\/questions\/\d+\/answers/.test(endpoint)) {
        return [201];
      }
      switch (endpoint) {
        case 'reviews':
          return [201];
        case 'qa/questions':
          return [201];
        case 'cart':
          return [201];
        default:
          throw new Error(`${endpoint} is not a supported endpoint for the context of this test`);
      }

    case 'put':
      if (/reviews\/\d+\/helpful/.test(endpoint)) {
        return [204];
      } if (/reviews\/\d+\/report/.test(endpoint)) {
        return [204];
      } if (/qa\/questions\/\d+\/helpful/.test(endpoint)) {
        return [204];
      } if (/qa\/questions\/\d+\/report/.test(endpoint)) {
        return [204];
      } if (/qa\/answers\/\d+\/helpful/.test(endpoint)) {
        return [204];
      } if (/qa\/answers\/\d+\/helpful/.test(endpoint)) {
        return [204];
      }
      throw new Error(`${endpoint} is not a supported endpoint for the context of this test`);

    default:
      throw new Error(`${method} is not a supported HTTP method for the context of this test`);
  }
};

export default generateMockResponse;
