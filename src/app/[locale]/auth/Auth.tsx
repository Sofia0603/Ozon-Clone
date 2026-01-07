'use client';

import { Button } from '@/components/ui/Button'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { signUp, signIn, useSession } from '@/lib/auth-client';
import { useState } from 'react';
import { Field } from '@/components/ui/Field';
import {cn} from 'clsx';

export function Auth() {
  const { isPending } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async () => {
    await signUp({ email, password, name });
  };

  const handleSignIn = async () => {
    await signIn({ email, password });
  };


  return (
    <div className="h-screen w-screen flex justify-center items-center bg-blue-100">
      <div className="bg-white/">
        <h1 className="text-2xl">Вход/регистрация</h1>
        {isPending ? (
          <SkeletonLoader count={3} />
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

        <div className="flex gap-2">
          <Button
            onClick={handleSignIn}
            disabled={isPending}
          >
            {isPending ? 'Загрузка...' : 'Войти'}
          </Button>

         <Button
            variant='secondary'
            onClick={handleSignUp}
            disabled={isPending}
          >
            {isPending ? 'Загрузка...' : 'Регистрация'}
          </Button>
        </div>
      </div>
    </div>
  );
}
