'use server'

import { headers } from 'next/headers'
import { getSession } from '../auth'

export async function getUser(){
	  const session = await getSession({
		headers: await headers()
	});


	if(!session){
		throw new Error('Unauthtorized')
	}

	return session.user
}