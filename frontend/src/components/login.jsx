import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../store/contextAPI";

const Login = () => {
  const { getProducts } = useContext(PostContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/my-journal");
    }
  }, []);

  const LoginHandle = async (e) => {
    e.preventDefault();
    let data = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    data = await data.json();
    if (data.auth) {
      localStorage.setItem("users", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.auth));
      navigate("/my-journal");
    } else {
      alert("please enter correct details");
    }
    getProducts();
  };
  return (
    <>
      <div className="bd-example mainflex">
        <form className="logincss">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control login-element"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control login-element"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={LoginHandle}
            className="btn btn-primary login-element"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
