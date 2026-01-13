'use client';

import { TProduct } from '@/lib/db/types';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  product: TProduct;
}

export default function AdminPage({}: Props) {
  const [products, setProducts] = useState<[TProduct]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [message, setMessage] = useState('');

  const [reviewProductId, setReviewProductId] = useState('');
  const [reviewUserId, setReviewUserId] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: reviewProductId,
          userId: reviewUserId,
          rating: Number(rating),
          comment,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage('Отзыв добавлен');
        setReviewProductId('');
        setReviewUserId('');
        setRating('');
        setComment('');
      } else {
        setMessage(`Ошибка: ${data.error}`);
      }
    } catch {
      setMessage('Ошибка сервера');
    }
  };

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
        setProducts((prev) => prev.filter((p) => p.id !== id));
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
        body: JSON.stringify({
          name,
          description,
          price,
          discountPrice,
          images: images.filter(Boolean),
        }),
      });
      const data = await res.json();
      if (data.success) {
        const newProduct: TProduct = {
          id: data.id,
          name,
          description,
          price,
          discountPrice: discountPrice || null,
          images: images.filter(Boolean),
        };
        setProducts((prev) => [newProduct, ...prev]);
        setMessage(`Товар добавлен! ID: ${data.id}`);
        setName('');
        setDescription('');
        setPrice('');
        setDiscountPrice('');
        setImages('');
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
            {images.map((img, index) => (
              <input
                key={index}
                value={img}
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.value;
                  setImages(newImages);
                }}
                placeholder={`URL картинки ${index + 1}`}
                className="border p-2 rounded"
              />
            ))}

            <button
              type="button"
              onClick={() => setImages([...images, ''])}
              className="text-blue-500 text-sm"
            >
              + Добавить изображение
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Добавить товар
            </button>
          </form>
          {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Добавить отзыв</h2>

          <form onSubmit={handleReviewSubmit} className="flex flex-col gap-3">
            <select
              value={reviewProductId}
              onChange={(e) => setReviewProductId(e.target.value)}
              required
              className="border p-2 rounded"
            >
              <option value="">Выберите товар</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              value={reviewUserId}
              onChange={(e) => setReviewUserId(e.target.value)}
              placeholder="ID пользователя"
              required
              className="border p-2 rounded"
            />

            <input
              type="number"
              min="1"
              max="5"
              step="0.5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Рейтинг (1–5)"
              required
              className="border p-2 rounded"
            />

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Комментарий"
              className="border p-2 rounded"
            />

            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Добавить отзыв
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <div
            className="p-4 bg-white shadow-xl rounded-xl flex gap-2 items-start"
            key={product.id}
          >
            <Image
              src={product.images[0]}
              width={120}
              height={140}
              className="rounded-lg"
              alt={product.name}
            />
            <div className="justify-self-start flex-1">
              <div className="font-medium text-sm">{product.name}</div>
              <span className="font-bold text-xl mt-40">{product.price}</span>
            </div>
            <button onClick={() => deleteHandler(product.id)} className="">
              <Trash2 className="stroke-red-900" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
