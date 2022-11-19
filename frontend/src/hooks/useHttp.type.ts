export enum HttpActionKind {
  SEND,
  SUCCESSED,
  FAILED,
  ADD_DATA,
  RESET_ERROR,
}

export type HttpAction = {
  type: HttpActionKind;
  responseData?: any;
  fieldName?: string;
  error?: string;
};

export type HttpState = {
  loading: boolean;
  data: any;
  error: string | null;
};
