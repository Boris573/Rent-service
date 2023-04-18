import Numeral from 'numeral';

export const formatPrice = (value: number | undefined) => {
  if (!value) {
    return '-';
  }

  return `${Numeral(value).format('0,0.00')}р.`;
}