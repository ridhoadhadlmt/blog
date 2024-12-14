import VerticalMenu  from './components/VerticalMenu'
import MainContent  from './components/MainContent'
import './App.css';
import { useState } from 'react';
function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <VerticalMenu {...{open,setOpen}}/>
      <MainContent {...{open,setOpen}}/>
        
      
    </div>
  );
}


export default App;
