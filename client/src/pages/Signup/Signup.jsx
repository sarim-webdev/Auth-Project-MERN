import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);

  const handleSignup = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("userName", form.userName);
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("profileImage", image);

  try {
    const res = await API.post("/auth/signup", formData);

    // ✅ SUCCESS ALERT
    alert(res.data.message);

    navigate("/login");

  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.message;

    alert(message);
  }
};

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
        <input
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, userName: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button>Signup</button>
      </form>

      <p>
        Already have account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;