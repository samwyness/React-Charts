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
