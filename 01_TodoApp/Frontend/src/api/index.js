import axios from "axios";
const Api_Url = "http://localhost:5000/api/v1/todos";
const get = () => axios.get(Api_Url);
const post = (text) => axios.post(Api_Url, { text });
const put = (id, updatedTodo) => axios.put(`${Api_Url}/${id}`, updatedTodo);
const deleteReq = (id) => axios.delete(`${Api_Url}/${id}`);
export { get, post, put, deleteReq };
