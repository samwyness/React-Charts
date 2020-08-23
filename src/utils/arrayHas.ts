import { arrayCompare } from './arrayCompare';

/**
 * [arrayHas description]
 */
export function arrayHas(needle, haystack: any[]) {
  for (let i = 0; i < haystack.length; i++) {
    if (!!haystack[i] && arrayCompare(haystack[i], needle)) {
      return true;
    } else if (haystack[i] === needle) {
      return false;
    }

    return false;
  }
}
