import { Link } from "react-router-dom";
import { Aside, Button, Input, Main, PageContent } from "../LoginAndSignUpStyles";

function LogInRoute() {



  return (
    <PageContent>
      <Aside>
        <h1>linkr</h1>
        <h3>save, share and discover the best links on the web</h3>
      </Aside>

      <Main>
        <form>
          <Input
            type="email"
            name="email"
            placeholder="email"
          />
          <Input
            type="password"
            name="password"
            placeholder="password" />
          <Button>Log In</Button>
        </form>
        <Link to="/sign-up">
          <span>First time? Create an account!</span>
        </Link>
      </Main>
    </PageContent>
  );
}

export default LogInRoute;