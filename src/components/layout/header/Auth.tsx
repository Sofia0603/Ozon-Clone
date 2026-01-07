'use client';

import { Button } from '@/components/ui/Button';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { signUp, signIn, useSession } from '@/lib/auth-client';
import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { Field } from '@/components/ui/Field';
import { Modal } from '@/components/ui/Modal';
import { CircleAlert, ServerCrash } from 'lucide-react'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  ref: RefObject<HTMLDivElement | null>;
}

export function Auth({ setIsOpen, ref }: Props) {
  const { isPending } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    const { error } = await signUp.email({ email, password, name });
    if (error?.message) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    const { error } = await signIn.email({ email, password });
    if (error?.message) {
      setError(error.message);
    }
  };

  return (
    <Modal onClose={() => setIsOpen(false)} ref={ref}>
      <h1 className="text-3xl font-semibold mb-5">Вход/регистрация</h1>
      {error && (
        <div className='flex gap-2 items-center mb-3'>
          <CircleAlert className='text-red-500' />
          <p className="text-red-500 italic">{error}</p>
        </div>
      )}
      {isPending ? (
        <SkeletonLoader count={3} className="mb-3 w-full h-13.25" />
      ) : (
        <>
          <Field
            type="email"
            placeholder="Введите email: "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 mb-2"
          />
          <Field
            type="password"
            placeholder="Введите пароль: "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 mb-2"
          />
          <Field
            type="text"
            placeholder="Введите имя: "
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 mb-2"
          />
        </>
      )}

      <div className="flex gap-2 mt-4">
        <Button onClick={handleSignIn} disabled={isPending}>
          {isPending ? 'Загрузка...' : 'Войти'}
        </Button>

        <Button variant="secondary" onClick={handleSignUp} disabled={isPending}>
          {isPending ? 'Загрузка...' : 'Регистрация'}
        </Button>
      </div>
    </Modal>
  );
}
