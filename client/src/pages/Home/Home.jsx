import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../services/api";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);

  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* 🔵 SIDEBAR */}
      <div
        style={{
          width: "250px",
          background: "#111",
          color: "#fff",
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>

          {/* 👇 PROFILE IMAGE CIRCLE */}
          <img
            src={user?.profileImage}
            alt="profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #fff",
            }}
          />

          <h3 style={{ marginTop: "10px" }}>
            {user?.userName}
          </h3>

          <p style={{ fontSize: "12px", color: "#aaa" }}>
            {user?.email}
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            background: "red",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* 🟢 MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Welcome {user?.userName}</h1>
        <p>This is your dashboard</p>
      </div>

    </div>
  );
};

export default Home;