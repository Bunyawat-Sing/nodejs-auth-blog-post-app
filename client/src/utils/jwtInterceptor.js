import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    // 🐨 Todo: Exercise #6
    //  ให้เขียน Logic ในการแนบ Token เข้าไปใน Header ของ Request
    // เมื่อมีการส่ง Request จาก Client ไปหา Server
    // ภายใน Callback Function axios.interceptors.request.use
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, add it to the Authorization header
    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }

    return req;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // 🐨 Todo: Exercise #6
      //  ให้เขียน Logic ในการรองรับเมื่อ Server ได้ Response กลับมาเป็น Error
      // โดยการ Redirect ผู้ใช้งานไปที่หน้า Login และลบ Token ออกจาก Local Storage
      // ภายใน Error Callback Function ของ axios.interceptors.response.use
      if (error.response && error.response.status === 401) {
        // Unauthorized error (401) indicates invalid or expired token
        // Remove the token from localStorage
        localStorage.removeItem("token");

        // Redirect to the login page
        // Note: You might need to adjust this based on your routing setup
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
