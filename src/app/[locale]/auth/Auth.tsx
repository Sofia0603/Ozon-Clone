'use client';

import { useSession } from '@/lib/auth-client';
import { useState } from 'react';

export default function Auth() {
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handeSignUp = async () => {
    await signUP
  }

  
  return <div>Auth</div>;
}
