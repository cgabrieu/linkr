import styled from "styled-components"

function SignUpRoute() {
  return (
    <PageContent>
      <Aside>
        <h1>linkr</h1>
        <h3>Save, share and discover the best links on the web</h3>
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

const PageContent = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`

const Aside = styled.aside`
  background-color: #151515;
  color: #FFFFFF;
  width: 65%;
  font-family: 'Passion One', Sans-serif;
  font-weight: 700;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 301px 319px 478px 144px;

  h1 {
    font-size: 6.625rem
  }

  h3 {
    font-size: 2.688rem;
    width: 442px;
  }
`

const Main = styled.main`
  width: 35%;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 13px;
  }

  span {
    font-family: 'Lato', sans-serif;
    color: #FFFFFF;
    margin-top: 14px;
  }
`

const Input = styled.input`
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  height: 6vh;
  width: 25vw;
  padding-left: 18px;
  font-size: 3vh;
  border-radius: 6px;
  border: 0;

  &::placeholder {
    color: #9F9F9F;
  }
`

const Button = styled.button`
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  height: 6vh;
  width: 25vw;
  background-color: #1877F2;
  border-radius: 6px;
  border: 0;
  font-size: 2.5vh;
  color: #FFFFFF;
`




export default SignUpRoute;