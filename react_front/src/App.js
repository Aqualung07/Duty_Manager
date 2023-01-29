import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import service_config from "./services/service_config";
import DutyList from "./components/DutyList.js";

const apolloClient = service_config.getClient();

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DutyList />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
