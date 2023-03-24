// import $ from 'jquery';

// export default function checkValidImage(url, callback) {
//   if (url !== '') {
//     $('<img>', {
//       src: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
//       error: () => callback(false),
//       load: () => callback(true),
//     });
//   }
//   callback(false);
// }

export default function checkImage(url, callback) {
  const image = new Image();
  image.onload = () => {
    if (image.width > 0) {
      callback(true);
    }
  };
  image.onerror = () => {
    callback(false);
  };
  image.src = url;
}
