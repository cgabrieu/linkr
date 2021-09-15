import { PageContent, Aside, Main, Input, Button } from "../LoginAndSingUpStyles";

function SignUpRoute() {
  return (
    <PageContent>
      <Aside>
        <h1>linkr</h1>
        <h3>save, share and discover the best links on the web</h3>
      </Aside>

      <Main>
        <form>
          <Input type="email" placeholder="e-mail" />
          <Input type="password" placeholder="password" />
          <Input type="text" placeholder="username" />
          <Input type="url" placeholder="picture url" />
          <Button>Sign Up</Button>
        </form>
        <span>Switch back to log in</span>
      </Main>
    </PageContent>
  );
}

export default SignUpRoute;