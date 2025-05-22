/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { renderSyncDisplay } from './ecal-sync-display-spa';
import { renderEcalSyncButtons } from './ecal-react';

// Just move the renderButtons or apikey
import {
  
  renderProdFrostBankCases,
  renderTestCases as renderButtons,
  
  apikeyTesting as apikey,
  apikeyProdFrostBank,
  apikeyStage,
} from './buttons';


 
// frost bank center


function App() {

  useEffect(() => {
    // prod
    // renderEcalSyncButtons('omPbJveLsO6YQ8gjUUy6y0awtjd5oL2GOLTEKTxtX862b16aa0');
    console.log('loaded..');
    // environment
    // renderEcalSyncButtons('iO4vouUk2ZQ1FvdIKIrlZGdTSztVhkTcBhdRJkIxLX86242a0b');
    renderSyncDisplay(apikey);

  }, []); 

  /*
   * Test APIKEY: iO4vouUk2ZQ1FvdIKIrlZGdTSztVhkTcBhdRJkIxLX86242a0b
   * Test WidgetId: 67f75c52f941490008f8fc5e
   *  
   * Stage Apikey HOPTGTOFd8VvGniFyTmFWdToYlARFcbihJs5BCE620b90007ff
   * Stage WidgetId: 67f9e9647f847800089414d7
   *  67dd10ea7806100008df27cc
   *  64c89749935553000d8d9de0
   * 
   *  EPL Apikey: 6ea0955297341b6b22f516a42177979d55821c6d7217b
   * 
   * 
   *  PROD EPL: 6ea0955297341b6b22f516a42177979d55821c6d7217b
   * 
   *  Widget ID: '5f2b97cce344056b0e8b456b'
   *  data-ecal-category='Fixture/{{ECAL_USER_COUNTRYCODE}}/{{ECAL_USER_LANGUAGECODE}}/Premier League,PL2 - Division 1,PL2 - Division 2,U18 Premier League - North,U18 Premier League - South'
   */




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Prod Frost Bank Center
        </p>

        <div>

          { renderButtons() }
          
        </div>
      </header>
    </div>
  );
}

export default App;
