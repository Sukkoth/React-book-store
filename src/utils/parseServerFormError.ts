import { AxiosError } from "axios";

export interface ServerFormErrorResponse {
  message: string;
  code: number;
  errors: Array<{
    code: string;
    expected: string;
    received: string;
    path: string[];
    message: string;
  }>;
}

interface ValidationError {
  message: string;
  fieldName: string;
}

export default function parseServerFormError(
  error: AxiosError<ServerFormErrorResponse>
): ValidationError[] | null {
  if (error.response) {
    const { status, data } = error.response;

    // Handle validation error specifically (status code 422)
    if (status === 422 && data.errors && Array.isArray(data.errors)) {
      return data.errors.map((err) => ({
        message: err.message,
        fieldName: err.path.join("."), // Join the path array to form the field name
      }));
    }
  }
  return null;

  //     // Handle other error statuses
  //     const message = data.message || error.message || "An error occurred";
  //     return `Error ${status}: ${message}`;
  //   } else if (error.request) {
  //     // The request was made but no response was received
  //     return "No response received from server. Please try again.";
  //   } else {
  //     // Something happened in setting up the request that triggered an Error
  //     return `Request Error: ${error.message}`;
  //   }
}
