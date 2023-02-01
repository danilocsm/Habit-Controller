import { SignOut } from 'phosphor-react';
import { useCallback, useContext } from 'react';
import { AppContext } from '../App';
import { removeItem } from '../services/localStorageService';

function LogoutButton() {
  const { setLogged } = useContext(AppContext);

  const handleLogout = useCallback((event: any) => {
    //realiza logout
    removeItem('user-token');
    removeItem('user-id');
    setLogged(false);
  }, []);

  return (
    <button
      onClick={handleLogout}
      className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 fcous:ring-offset-2 focus:ring-offset-background'
    >
      <SignOut size={20} className='text-violet-500' />
      Fazer logout
    </button>
  );
}

export { LogoutButton };
