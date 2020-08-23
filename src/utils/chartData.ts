import { getRandomColor } from './colors';

/**
 * [arrayCompare description]
 */
export function arrayCompare(a1: any[], a2: any[]) {
  if (a1.length !== a2.length) {
    return false;
  }

  let test1: string | boolean = false;
  let test2: string | boolean = false;

  for (let i = 0; i < a1.length; i++) {
    test1 = a1[i];
    test2 = a2[i];

    if (!!test1) {
      test1 = JSON.stringify(test1);
    }

    if (!!test2) {
      test2 = JSON.stringify(test2);
    }

    if (test1 !== test2) {
      return false;
    }
  }

  return true;
}

/**
 * [inArray description]
 */
export function inArray(needle, haystack: any[]) {
  for (let i = 0; i < haystack.length; i++) {
    if (!!haystack[i] && arrayCompare(haystack[i], needle)) {
      return true;
    } else if (haystack[i] === needle) {
      return false;
    }

    return false;
  }
}

/**
 * [arraySum description]
 */
export function arraySum(array: any[]) {
  return array.reduce((total, num) => total + num);
}

/**
 * [dataArrayToObject description]
 */
export function dataArrayToObject(data: any[]) {
  let titleArray;
  let dataArray;

  titleArray = data[0];
  dataArray = data.slice(1);

  let itemData = {
    title: titleArray[0],
    values: [],
  };

  let valueData = {
    title: titleArray[1],
    values: [],
    options: [],
  };

  dataArray.map((item, index) => {
    itemData.values.push(dataArray[index][0]);
    valueData.values.push(dataArray[index][1]);

    if (dataArray[index][2]) {
      valueData.options.push(dataArray[index][2]);
    }
  });

  if (valueData.options.length < 1) {
    let newColor = false;
    let usedColors = [];

    valueData.values.map(() => {
      newColor = getRandomColor(usedColors);
      valueData.options = [...valueData.options, { color: newColor }];
      usedColors = [...usedColors, newColor];
    });
  }

  let dataObject = {
    itemData,
    valueData,
  };

  return dataObject;
}

/**
 * [getCalculatedValuesFromData description]
 */
export function getCalculatedValuesFromData(dataObject) {
  let values = dataObject.valueData.values;

  let minValue = Math.min(...values);
  let maxValue = Math.max(...values);
  let valueCount = values.length;
  let valueTotal = arraySum(values);

  // Gridlines
  let gridlines = {
    major: 5,
    minor: 10,
  };

  // Set default values for our charts main data
  let startValue = 0;
  let endValue = 0;
  let remainder = 0;
  let rounding = 1;
  let average = remainder / gridlines.major;

  // Determine the rounding for the end value of the chart
  if (maxValue > 999999) {
    rounding = 1000000;
  } else if (maxValue > 99999) {
    rounding = 100000;
  } else if (maxValue > 9999) {
    rounding = 10000;
  } else if (maxValue > 999) {
    rounding = 1000;
  } else if (maxValue > 99) {
    rounding = 100;
  }

  // Calculate our endValue then update remainder & average
  endValue = Math.ceil(maxValue / rounding) * rounding;
  remainder = endValue - startValue;
  average = remainder / gridlines.major;

  return {
    minValue,
    maxValue,
    valueCount,
    valueTotal,
    startValue,
    endValue,
    remainder,
    gridlines,
    average,
  };
}

/**
 * [calculatePieSlices description]
 */
export function calculatePieSlices(
  pieSize: number,
  dataObject: { valueData: any }
) {
  let valueData = dataObject.valueData;
  let values = valueData.values;
  let valueTotal = arraySum(values);

  let slices = [];
  let itemColor;

  let l = pieSize / 2;

  let a = 0; // Angle
  let aRad = 0; // Angle in Rad
  let aCalc = 0;
  let arcSweep = 0;

  let z = 0; // Size z
  let x = 0; // Side x
  let y = 0; // Side y

  let X = 0; // SVG X coordinate
  let Y = 0; // SVG Y coordinate
  let R = 0; // Rotation

  values.map((valueItem: number, index: string | number) => {
    a = 360 * (valueItem / valueTotal);
    aCalc = a > 180 ? 360 - a : a;
    aRad = (aCalc * Math.PI) / 180;
    z = Math.sqrt(2 * l * l - 2 * l * l * Math.cos(aRad));

    if (aCalc <= 90) {
      x = l * Math.sin(aRad);
    } else {
      x = l * Math.sin(((180 - aCalc) * Math.PI) / 180);
    }

    y = Math.sqrt(z * z - x * x);
    Y = y;

    if (a <= 180) {
      X = l + x;
      arcSweep = 0;
    } else {
      X = l - x;
      arcSweep = 1;
    }

    itemColor = valueData.options[index]
      ? valueData.options[index].color
      : null;

    slices.push({
      percentage: valueItem / valueTotal,
      color: itemColor,
      arcSweep: arcSweep,
      L: l,
      X: X,
      Y: Y,
      R: R,
    });

    R = R + a;
  });

  return slices;
}
