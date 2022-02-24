import {Dimensions} from 'react-native';

export const WinDimen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const STANDARD_WIDTH = 375;
const CURRENT_WIDTH = WinDimen.width;
const K = CURRENT_WIDTH / STANDARD_WIDTH;
const USE_FOR_BIGGER_SIZE = true;

export function dynamicSize(size) {
  return K * size;
}

export function getFontSize(size) {
  if (USE_FOR_BIGGER_SIZE || CURRENT_WIDTH < STANDARD_WIDTH) {
    const newSize = dynamicSize(size);
    return newSize;
  }
  return size;
}
