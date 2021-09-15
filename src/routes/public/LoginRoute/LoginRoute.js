import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { PageContent, Aside, Main, Input, Button } from "../LoginAndSignUpStyles";

function LoginRoute() {

  const [btnDisabled, setBtnDisabled] = useState(false);

  return (
    <PageContent>
      <Aside>
        <h1>linkr</h1>
        <h3>save, share and discover the best links on the web</h3>
      </Aside>

      <Main>
        <form onSubmit={""}>
          <Input
            type="email"
            name="email"
            placeholder="e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="password" />
          <Button disabled={false}>
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