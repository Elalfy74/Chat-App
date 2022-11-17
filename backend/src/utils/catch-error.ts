import { CustomError } from "./global.types";

export function isCatchError(err: any): err is CustomError {
  return true;
}
