class ApiError extends Error {
  constructor(status, message = "Something went wrong") {
    super();
    this.status = status;
    this.message = message;
  }
}
export default ApiError;