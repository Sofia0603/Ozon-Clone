'use client';

import { signUp, useSession } from '@/lib/auth-client';
import { useState } from 'react';

export function Auth() {
  const { data: session, isPending } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handeSignUp = async () => {
    await signUp({email, password, name})
  }

  const handeSignIn = async () => {
    await signIn({email, password})
  }

  //  skeleton loader

  

  return <div>Auth</div>;
}
