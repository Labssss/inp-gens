import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Navigation } from "./components/navigation";
import { Login } from './pages/Login';
// import { Registration } from './pages/Registration';
import { GenScreen } from './pages/GenScreen'
import { GenReceipt } from './pages/GenReceipt';
import { NotFound } from './pages/NotFound';
import { CustomContext } from "./Context";

function App() {
  const {user, role, accessLvl, isLogged} = useContext(CustomContext);
  return (
    <>  
      <div className="flex min-h-screen w-full bg-gray-50">
      {isLogged && <Navigation/>}
          <Routes>      
              {!isLogged && <Route path="/" element={ <Login/> } />}
              
              {isLogged && accessLvl >= 2 && <Route path="/" element={<Navigate to="/genScreen"/>} />}
              {isLogged && accessLvl >= 1 && <Route path="/" element={<Navigate to="/genReceipt"/>} />}

              {isLogged && accessLvl >= 2 && <Route path="/genScreen" element={<GenScreen/>} />}
              {isLogged && accessLvl >= 1 && <Route path="/genReceipt" element={<GenReceipt/>} />}




              <Route path='/*' element={<NotFound/>}/>
          </Routes>
      </div>

    </>
  );
}

export default App;
