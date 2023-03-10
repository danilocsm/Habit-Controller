import * as Dialog from '@radix-ui/react-dialog';
import { SignIn, X } from 'phosphor-react';
import { LoginForm } from './LoginForm';

function LoginModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className='absolute w-1/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 fcous:ring-offset-2 focus:ring-offset-background justify-center'
        type='button'
      >
        <SignIn size={20} className='text-violet-500' />
        Realizar Login
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />

        <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Dialog.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200'>
            <X size={24} aria-label='fechar' />
          </Dialog.Close>
          <Dialog.Title className='text-3xl leading-tight font-extrabold'>
            {' '}
            Realizar Login
          </Dialog.Title>
          <LoginForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { LoginModal };
