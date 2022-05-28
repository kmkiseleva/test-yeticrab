import "./App.scss";
import Header from "./components/Header";
import RequestsList from "./pages/RequestsList";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <RequestsList />
      </div>
    </>
  );
};

export default App;
