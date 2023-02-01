import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { App, AppContext } from '../App';
import { saveItem } from '../services/localStorageService';

function LoginForm() {
  const { setLogged } = useContext(AppContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(username, password);
    api
      .post('/login', { username, password })
      .then((res) => {
        console.log(res.data);
        setLogged(true);
        saveItem('user-token', res.data.token);
        saveItem('user-id', res.data.userId);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
      <label htmlFor='username' className='font-bold leading-tight'>
        Usuário
      </label>
      <input
        type='text'
        name='username'
        placeholder='Nome de usuário'
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400'
        value={username || ''}
        onChange={(event) => setUsername(event.target.value)}
        autoFocus
      />
      <label htmlFor='password' className='font-bold leading-tight'>
        Senha
      </label>
      <input
        type='password'
        name='password'
        placeholder='Sua senha'
        value={password || ''}
        onChange={(event) => setPassword(event.target.value)}
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400'
      />
      <button
        type='submit'
        className='mt-6 rounded-lg p-4 flex gap-3 items-center justify-center font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900'
      >
        Entrar
      </button>
    </form>
  );
}

export { LoginForm };
