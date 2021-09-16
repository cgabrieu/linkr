import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../../components/Loading";
import UserContext from "../../../contexts/UserContext";
import { LogIn } from "../../../services/api";
import { PageContent, Aside, Main, Input, Button } from "../LoginAndSignUpStyles";

function LoginRoute() {

  const history = useHistory()
  const { user, setUser } = useContext(UserContext);

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  function checkUserOnLocalStorage() {
    const userLocalStorage = localStorage.getItem("user");

    if (userLocalStorage === null) {
      return
    } else {
      const user = JSON.parse(userLocalStorage);
      setUser(user);
      history.push("/timeline")
    }
  }
  checkUserOnLocalStorage();

  function handleChange(event) {
    setInputFields({ ...inputFields, [event.target.name]: event.target.value });
  }

  function loginUser(event) {
    event.preventDefault();
    setBtnDisabled(true);

    if (!inputFields.email || !inputFields.password) {
      setBtnDisabled(false);
      return alert("Por favor, preencha todos os campos para efetuar o login!");
    }

    const body = inputFields

    LogIn(body)
      .then(response => {
        setBtnDisabled(false);
        const user = response.data;
        setUser(user, response.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        if (response.status === 200) {
          history.push("/timeline");
        }
      })
      .catch(err => {
        setBtnDisabled(false);
        if (err.response.status === 403 || err.response.status === 400) return alert("email/senha incorretos, tente novamente!");
      });
  }

  return (
    <PageContent>
      <Aside>
        <h1>linkr</h1>
        <h3>save, share and discover the best links on the web</h3>
      </Aside>

      <Main>
        <form onSubmit={loginUser}>
          <Input required
            type="email"
            name="email"
            value={inputFields.email}
            onChange={handleChange}
            placeholder="e-mail" />
          <Input required
            type="password"
            name="password"
            value={inputFields.password}
            onChange={handleChange}
            placeholder="password" />
          <Button disabled={btnDisabled}>
            {!btnDisabled
              ? "Log In"
              : <Loading visible={true} />
            }
          </Button>
        </form>
        <Link to="/sign-up">
          <span>Firts time? Create an account!</span>
        </Link>
      </Main>
    </PageContent>
  );
}

export default LoginRoute;