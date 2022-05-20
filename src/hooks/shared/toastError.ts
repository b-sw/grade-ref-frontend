import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";

export const toastError = (toast: any, error: AxiosError) => {
  let toastMessage: string = 'Something went wrong';
  if (error.response!.status === StatusCodes.BAD_REQUEST) {
    toastMessage = (error.response!.data as any).message;
  }
  toast({
    title: toastMessage,
    status: 'error',
    position: 'bottom-right',
    duration: 2000,
  });
}