import './styles/global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './lib/dayjs';
import { MainPage } from './pages/MainPage';
import { LoginModal } from './components/LoginModal';
import { createContext, useState } from 'react';
import { getItem } from './services/localStorageService';

export const AppContext = createContext({
  logged: false,
  setLogged: (value: boolean) => {},
});

export function App() {
  const [isLogged, setIsLogged] = useState(
    getItem('user-token') !== null ? true : false
  );

  return (
    <div className='w-screen h-screen flex justify-center items-center overflow-hidden'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <AppContext.Provider
          value={{ logged: isLogged, setLogged: setIsLogged }}
        >
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={isLogged ? <MainPage /> : <LoginModal />}
              />
              <Route path='dashboard' element={<h1>Hello world</h1>} />
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </div>
    </div>
  );
}
