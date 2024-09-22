class ApiResponse {
  constructor(status, message, data) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
export default ApiResponse;
