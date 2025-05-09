import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { renderEcalSyncButtons } from './ecal-react';

function App() {

  useEffect(() => {
    // prod
    // renderEcalSyncButtons('omPbJveLsO6YQ8gjUUy6y0awtjd5oL2GOLTEKTxtX862b16aa0');
    console.log('loaded..');
    // environment
    renderEcalSyncButtons('6ea0955297341b6b22f516a42177979d55821c6d7217b');
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
          <button class='ecal-sync-widget-button' data-ecal-widget-id='5f3b51b63fe3d55d5c8b4567'>
            Sync to Calendar
          </button>
        </div>
      </header>
    </div>
  );
}

// prod widgetId: 67f87226b9fb520008419089
// test widgetId: 67e6448ab4c2140008f2bea3
export default App;
