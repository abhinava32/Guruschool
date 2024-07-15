import LandingPage from "./LandingPage/LandingPage";
import UserState from "./Context/UserState";

function App() {
  return (
    <>
      <UserState>
        <div className="App">  
          <LandingPage></LandingPage>
        </div>
      </UserState>
    </>
    
  );
}

export default App;
