import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import SellerPage from './components/pages/SellerPage';
import Summary from './components/pages/Summary';
import configureStore from "./store";
import { utils } from 'services';

import SelectAddress from 'components/pages/SelectAddress';
import SelectRoof from 'components/pages/SelectRoof';
import SetDetails from 'components/pages/SetDetails';
import Result from 'components/pages/Result';
import BuilderRoof from 'components/pages/BuilderRoof';

let { store, persistor } = configureStore();

const App = () => {

  useEffect(() => {
    window.addEventListener("resize", orientationChange, false);
    setTimeout(checkForInternetExplorer(), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function checkForInternetExplorer() {
    if (/*@cc_on!@*/false || !!document.documentMode) {
      alert("Vänligen uppdatera din webbläsare. Vi rekommenderar att du uppdaterar den eller väljer en annan webbläsare som Firefox eller Chrome.");
    }
  }

  function orientationChange() {
    if (utils.getIfMobile()) {
      if (window.innerHeight < window.innerWidth) {
        if (window.innerHeight < 600) {
          alert("Solcellskalkylen är tyvärr inte optimerad för det liggande läget. Vrid tillbaka din telefon till det stående läget och fortsätt med din Solcellskalkyl! ");
          window.removeEventListener("resize", orientationChange, false);
        }
      }
    }
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <Suspense fallback={<div />}>
          <Router>
            <Route exact path="/" component={SelectAddress} />
            <Route exact path="/selectroof" component={SelectRoof} />
            <Route exact path="/details" component={SetDetails} />
            <Route exact path="/result" component={Result} />
            <Route exact path="/sellerpage" component={SellerPage} />
            <Route exact path="/summary" component={Summary} />
            <Route exact path="/builder" component={BuilderRoof} />
            {/* <Route exact path="/test" component={Test} /> */}
          </Router>
        </Suspense>
      </PersistGate>
    </Provider>
  );

}

export default App;
