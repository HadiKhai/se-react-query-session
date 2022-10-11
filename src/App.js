import logo from './logo.svg';
import './App.css';
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { BrowserRouter as Router } from 'react-router-dom';
import {Route, Switch} from "react-router";
import HomePage from "./pages/Home";
import Episode from "./pages/Episode";
import Layout from "./Layout";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <ReactQueryDevtools initialIsOpen/>
        <Router>
          <Switch>
            <Layout>
              <Route exact path={"/"}>
                <HomePage />
              </Route>
              <Route exact path={"/episodes/:episodeId"}>
                <Episode />
              </Route>
            </Layout>
          </Switch>

        </Router>
    </QueryClientProvider>
  );
}

export default App;
