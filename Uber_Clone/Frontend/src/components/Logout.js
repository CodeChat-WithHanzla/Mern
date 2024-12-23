import axios from "axios";

const logout = async (navigate, clearData, person = "users") => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/${person}/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      localStorage.removeItem("token");
      clearData({});
      navigate("/login");
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export default logout;
