import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage"
import TripReport from "./pages/tripReport"



function App() {
    return (
      <Router>
        {/* <StoreProvider> */}
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/report' component={TripReport} />
          {/* <Route exact path='/dashboard' component={Admin} /> */}
        {/* </StoreProvider> */}
      </Router>
  );
}

export default App;