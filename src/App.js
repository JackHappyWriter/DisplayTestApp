/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { renderSyncDisplay } from './ecal-sync-display-spa';
import { renderEcalSyncButtons } from './ecal-react';

function App() {

  useEffect(() => {
    // prod
    // renderEcalSyncButtons('omPbJveLsO6YQ8gjUUy6y0awtjd5oL2GOLTEKTxtX862b16aa0');
    console.log('loaded..');
    // environment
    // renderEcalSyncButtons('HOPTGTOFd8VvGniFyTmFWdToYlARFcbihJs5BCE620b90007ff');
    renderSyncDisplay('HOPTGTOFd8VvGniFyTmFWdToYlARFcbihJs5BCE620b90007ff');
  }, []); 

  /*
   * Test APIKEY: iO4vouUk2ZQ1FvdIKIrlZGdTSztVhkTcBhdRJkIxLX86242a0b
   * Test WidgetId: 67f75c52f941490008f8fc5e
   *  
   * Stage Apikey HOPTGTOFd8VvGniFyTmFWdToYlARFcbihJs5BCE620b90007ff
   * Stage WidgetId: 67f9e9647f847800089414d7
   * 
   *  EPL Apikey: 6ea0955297341b6b22f516a42177979d55821c6d7217b
   */
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          <button class='ecal-sync-widget-button' data-ecal-widget-id='67f9e9647f847800089414d7'>
            Sync to Calendar
          </button>

          <button class='ecal-sync-widget-button' data-ecal-widget-id='67dd10ea7806100008df27cc'>
            Sync to Calendar
          </button>

           
          <button class="ecal-sync-widget-button"  data-ecal-widget-id="64c89749935553000d8d9de0" > 
            Sycn now
          </button>
       
        </div>
      </header>
    </div>
  );
}

// prod widgetId: 67f87226b9fb520008419089
// test widgetId: 67e6448ab4c2140008f2bea3
export default App;
