import "jest";
import * as irasutoya from "../src/irasutoya";

type ImageDetail = irasutoya.ImageDetail;

function isValidImageDetail(obj: any): obj is ImageDetail {
  const imageDetail = obj as ImageDetail;

  return (
    validateNonEmptyString(imageDetail.title) &&
    validateNonEmptyString(imageDetail.imageUrl) &&
    validateNonEmptyString(imageDetail.description) &&
    validateStringArray(imageDetail.categories) &&
    true
  );
}

function validateNonEmptyString(str: string): boolean {
  return validateString(str) && str !== "";
}

function validateString(str: string): boolean {
  return typeof(str) === "string";
}
 
function validateStringArray(arr: string[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (!validateNonEmptyString(arr[i])) {
      return false;
    }
  }

  return true;
}

test("randomImage", async () => {
  const detailImage = await irasutoya.randomImage();
  expect(isValidImageDetail(detailImage)).toBeTruthy();
});

test("totalImageCount", async () => {
  const count = await irasutoya.totalImageCount();
  expect(count).toBeGreaterThan(10000);
});
