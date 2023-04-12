import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, register, reset } from "../features/auth/authSlice";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "@/app/store";
import { UserData } from "@/features/auth/authService";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      router.push("/explore");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, router]);

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    dispatch(register(formData));
  };

  return (
    <>
      <section className="heading">
        <h1>Register</h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              placeholder="Enter your username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
