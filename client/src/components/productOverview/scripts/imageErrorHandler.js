import defaultImage from '@images/place-holder.png';

export default function imageErrorHandler(event) {
  event.target.onError = '';
  event.target.src = defaultImage;
}
