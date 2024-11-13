import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/my-journal");
    }
  }, []);
  const NameElement = useRef("");
  const EmailElement = useRef("");
  const PassElement = useRef("");

  const OnHandleClick = async (event) => {
    event.preventDefault();
    const uname = NameElement.current.value;
    const Email = EmailElement.current.value;
    const Pass = PassElement.current.value;

    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name: uname, email: Email, password: Pass }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json(); //return acknowledgement
    localStorage.setItem("users", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      navigate("/products");
    }
    NameElement.current.value = "";
    EmailElement.current.value = "";
    PassElement.current.value = "";
  };
  return (
    <main className="form-signin w-100 m-auto mainflex">
      <form className="signup">
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <div className="form-floating signcss">
          <input
            ref={NameElement}
            type="text"
            className="form-control"
            id="name"
            placeholder="Sam doe"
          />
          <label htmlFor="floatingInput">Enter you name</label>
        </div>
        <div className="form-floating signcss">
          <input
            ref={EmailElement}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating signcss">
          <input
            ref={PassElement}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          onClick={OnHandleClick}
        >
          Sign in
        </button>
      </form>
    </main>
  );
};

export default SignUp;
