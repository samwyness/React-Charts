import { arrayHas } from './arrayHas';

export const colors = {
  dark: '#49565f',
  light: '#FFF',
  grey: '#e1e2e3',
  lightGrey: '#f6f7f9',
  darkGrey: '#b0bec5',

  red500: '#F44336',
  red300: '#E57373',
  pink500: '#E91E63',
  pink300: '#F06292',
  deepPurple500: '#673AB7',
  deepPurple300: '#9575CD',
  blue500: '#2196F3',
  blue300: '#64B5F6',
  green500: '#4CAF50',
  green300: '#81C784',
  amber500: '#FFC107',
  amber300: '#FFD54F',
  orange500: '#FF9800',
  orange300: '#FFB74D',
  deepOrange500: '#FF5722',
  deepOrange300: '#FF8A65',
};

/**
 * [getRandomColor description]
 * @param  {[type]} last_color [description]
 * @return {[type]}            [description]
 */
export function getRandomColor(usedColors) {
  let colorNames = [
    'red500',
    'red300',
    'pink500',
    'pink300',
    'deepPurple500',
    'deepPurple300',
    'blue500',
    'blue300',
    'green500',
    'green300',
    'amber500',
    'amber300',
    'orange500',
    'orange300',
    'deepOrange500',
    'deepOrange300',
  ];

  let newColor = colors[colorNames[Math.floor(Math.random() * colorNames.length)]];

  if (usedColors && arrayHas(newColor, usedColors)) {
    newColor = getRandomColor(usedColors);
  }

  return newColor;
}

export function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = (R * (100 + percent)) / 100;
  G = (G * (100 + percent)) / 100;
  B = (B * (100 + percent)) / 100;

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  let RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
  let GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
  let BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

  return `#${RR + GG + BB}`;
}
