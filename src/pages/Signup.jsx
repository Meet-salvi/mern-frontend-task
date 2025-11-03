import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API = import.meta.env.VITE_API_URL;

    try {
      const res = await axios.post(`${API}/api/auth/register`, formData, {
        withCredentials: true, // keep if you're using cookies/auth
      });

      console.log(res);

      toast.success(res.data.message || "Registered Successfully");

      // Save token returned from backend
      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
      }

      //Redirect after signup
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  {
    formData.password.length > 0 && formData.password.length < 6 && (
      <small className="text-danger">
        Password must be at least 6 characters
      </small>
    );
  }

  return (
    <>
      <ToastContainer />

      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card p-4 shadow-lg" style={{ width: 400 }}>
          <h2 className="text-center mb-4">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6} // 6 digit validation
              />

              {/* Eye Icon */}
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>

            <button className="btn btn-success w-100">Sign Up</button>

            <p className="text-center mt-3">Already have an account?</p>

            <button
              type="button"
              className="btn btn-primary w-100 mt-2"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
