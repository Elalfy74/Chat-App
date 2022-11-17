import { useCallback, useReducer } from "react";

enum HttpActionKind {
  SEND,
  SUCCESSED,
  FAILED,
  ADD_DATA,
  RESET_ERROR,
}

type HttpAction = {
  type: HttpActionKind;
  responseData?: any;
  error?: any;
};

type HttpState = {
  loading: boolean;
  data: any;
  error: any;
};

function httpReducer(state: HttpState, action: HttpAction): HttpState {
  const { type, responseData, error } = action;

  switch (type) {
    case HttpActionKind.SEND:
      return {
        data: state.data,
        error: null,
        loading: true,
      };
    case HttpActionKind.SUCCESSED:
      return {
        data: responseData!,
        error: null,
        loading: false,
      };
    case HttpActionKind.FAILED:
      return {
        data: null,
        error: error!,
        loading: false,
      };
    case HttpActionKind.ADD_DATA:
      return {
        data: {
          ...state.data,
          messages: [...state.data.messages, responseData],
        },
        error: null,
        loading: false,
      };
    case HttpActionKind.RESET_ERROR:
      return {
        data: null,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
}

const useHttp = (requestFunction: Function, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    loading: startWithPending ? true : false,
    data: null,
    error: null,
  });

  const resetError = useCallback(() => {
    dispatch({ type: HttpActionKind.RESET_ERROR });
  }, []);

  const addData = useCallback((newData: any) => {
    dispatch({ type: HttpActionKind.ADD_DATA, responseData: newData });
  }, []);

  const sendRequest = useCallback(
    async function (requestData?: any) {
      dispatch({ type: HttpActionKind.SEND });
      try {
        const responseData = await requestFunction(requestData);

        dispatch({
          type: HttpActionKind.SUCCESSED,
          responseData: responseData.data,
        });
      } catch (error: any) {
        dispatch({
          type: HttpActionKind.FAILED,
          error: error.response.data.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );
  return {
    sendRequest,
    resetError,
    addData,
    ...httpState,
  };
};

export default useHttp;
