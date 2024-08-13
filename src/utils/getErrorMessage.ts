import { AxiosError } from "axios";

function getErrorMessage(error: AxiosError): string {
  if (error.response) {
    const statusCode = error.response.status;
    const responseData = error.response.data as {
      message: string;
      code: number;
    };
    const message =
      responseData?.message || error.message || "Something went wrong";

    // Handle different status codes
    switch (statusCode) {
      case 400:
        return `Bad Request: ${message}`;
      case 401:
        return `Unauthorized: ${message}`;
      case 403:
        return `Forbidden: ${message}`;
      case 404:
        return `Not Found: ${message}`;
      case 422:
        return `Incorrect input, check your input fields: ${message}`;
      case 500:
        return `Internal Server Error: ${message}`;
      case 502:
        return `Bad Gateway: ${message}`;
      case 503:
        return `Service Unavailable: ${message}`;
      case 504:
        return `Gateway Timeout: ${message}`;
      default:
        return `Error ${statusCode}: ${message}`;
    }
  } else if (error.request) {
    return "No response received from server. Please try again.";
  } else {
    return `Request Error: ${error.message}`;
  }
}

export default getErrorMessage;
