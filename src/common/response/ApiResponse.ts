export function SuccessRes(message: string, data: any) {
  return {
    success: true,
    message: message,
    data: data,
  };
}
