import { PageContent, Aside, Main, Input, Button } from "../LoginAndSignUpStyles";
import { Link, useHistory } from "react-router-dom"
import { useState } from "react";
import { SignUp } from "../../../services/api";
import Loading from "../../../components/Loading";

function SignUpRoute() {

  const history = useHistory();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    username: "",
    pictureUrl: ""
  });

  function handleChange(event) {
    setInputFields({ ...inputFields, [event.target.name]: event.target.value });
  }

  function Register(event) {
    event.preventDefault();
    setBtnDisabled(true);

    if (!inputFields.email || !inputFields.password || !inputFields.username || !inputFields.pictureUrl) {
      setBtnDisabled(false);
      return alert("Por favor, preencha todos os campos do cadastro.")
    }

    const body = inputFields;

    postSignUp(body)
      .then(response => {
        setBtnDisabled(false);
        console.log(response)
        if (response.status === 200) {
          history.push("/");
        }
      })
      .catch(err => {
        setBtnDisabled(false);
        console.log(err.response);
        if (err.response.status === 403) return alert("Endereço de email já cadastrado!")
      });
  }

  return (
    <PageContent>
      <Aside>
        <h1>linkr</h1>
        <h3>save, share and discover the best links on the web</h3>
      </Aside>

      <Main>
        <form onSubmit={Register}>
          <Input required
            type="email"
            name="email"
            onChange={handleChange}
            value={inputFields.name}
            placeholder="e-mail" />
          <Input required
            type="password"
            name="password"
            onChange={handleChange}
            value={inputFields.password}
            placeholder="password" />
          <Input
            type="text"
            name="username"
            onChange={handleChange}
            value={inputFields.username}
            placeholder="username" />
          <Input
            type="url"
            name="pictureUrl"
            onChange={handleChange}
            value={inputFields.pictureUrl}
            placeholder="picture url" />
          <Button disabled={btnDisabled}>
            {!btnDisabled
              ? "Sign Up"
              : <Loading visible={true} />
            }
          </Button>
        </form>
        <Link to="/">
          <span>Switch back to log in</span>
        </Link>
      </Main>
    </PageContent>
  );
}

export default SignUpRoute;