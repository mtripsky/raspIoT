export const roundToOne = (num: number) => {
  return Math.round(num * 10) / 10;
};

/**
export const roundToTwo = (num : number) => {
  return +(Math.round(num + 'e+2') + 'e-2');
};*/

export default {
  roundToOne,
};
