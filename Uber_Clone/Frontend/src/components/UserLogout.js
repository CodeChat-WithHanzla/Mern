import axios from "axios";

const UserLogout = async (navigate) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

export default UserLogout;
