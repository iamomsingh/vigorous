import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default App;
