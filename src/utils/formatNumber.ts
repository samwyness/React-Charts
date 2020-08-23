/**
 *
 * @param number
 * @param sep
 */
export function formatNumber(number: number, sep = ',') {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}
