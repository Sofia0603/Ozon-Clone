'use client';

import { TProduct } from '@/lib/db/types';
import { Trash2 } from 'lucide-react'
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  product: TProduct;
}

export default function AdminPage({}: Props) {
  const [products, setProducts] = useState<[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);


  const deleteHandler = async (id: string) => {
    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), 
      });
  
      const data = await res.json();
      if (data.success) {
        setMessage('Товар удалён!');
        setProducts(prev => prev.filter(p => p.id !== id)); 
      } else {
        setMessage(`Ошибка: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Ошибка сервера');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price, discountPrice, imageUrl }),
      });
      const data = await res.json();
      if (data.success) {
        const newProduct: TProduct = {
          id: data.id,
          name,
          description,
          price,
          discountPrice: discountPrice || null,
          imageUrl,
        };
        setProducts((prev) => [newProduct, ...prev]);
        setMessage(`Товар добавлен! ID: ${data.id}`);
        setName('');
        setDescription('');
        setPrice('');
        setDiscountPrice('');
        setImageUrl('');
      } else {
        setMessage(`Ошибка: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Ошибка сервера');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 bg-gray-100 p-8">
      <div className="flex flex-col gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Добавить товар</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Название"
              required
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Цена"
              required
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Цена со скидкой"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="URL картинки"
              required
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Добавить товар
            </button>
          </form>
          {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <div className="p-4 bg-white shadow-xl rounded-xl flex gap-2 items-start justify-between" key={product.id}>
            <Image src={product.imageUrl} width={120} height={140} className="rounded-lg" />
            <div className='justify-self-start'>
              <div className="font-medium text-sm">{product.name}</div>
              <span className='font-bold text-xl mt-40'>{product.price}</span>
            </div>
            <button
            onClick={()=> deleteHandler(product.id)}
            className=''
              >
              <Trash2 className='stroke-red-900'/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
