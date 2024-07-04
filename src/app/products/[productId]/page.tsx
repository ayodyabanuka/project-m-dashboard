'use client';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import { db, storage } from '@/app/utils/firebase'; // Import storage from firebase config
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

interface Size {
  id: string;
  name: string;
  qty: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  mainCategory: string;
  description: string;
  details: string[];
  images: string[];
  sizes: Size[];
}

const ProductEdit: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    mainCategory: '',
    description: '',
    details: [],
    images: [],
    sizes: []
  });
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', productId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setNewImages(fileArray);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    setProduct({ ...product, images: updatedImages });
  };

  const handleSizeChange = (sizeIndex: number, name: string, qty: number) => {
    const updatedSizes = [...product.sizes];
    updatedSizes[sizeIndex] = { id: '', name, qty };
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleAddSize = () => {
    setProduct({
      ...product,
      sizes: [...product.sizes, { id: '', name: '', qty: 0 }]
    });
  };

  const handleRemoveSize = (sizeIndex: number) => {
    const updatedSizes = [...product.sizes];
    updatedSizes.splice(sizeIndex, 1);
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload new images to Firebase Storage and get their URLs
      const uploadedImageUrls = await Promise.all(
        newImages.map(async (image) => {
          const imageName = `${Date.now()}_${image.name}`;
          const imageRef = ref(storage, `images/${imageName}`);
          await uploadBytes(imageRef, image);
          return await getDownloadURL(imageRef);
        })
      );

      // Merge new uploaded image URLs with existing image URLs
      const allImageUrls = [...product.images, ...uploadedImageUrls];

      const docRef = doc(db, 'products', productId as string);
      await updateDoc(docRef, {
        name: product.name,
        price: product.price,
        mainCategory: product.mainCategory,
        description: product.description,
        details: product.details,
        images: allImageUrls,
        sizes: product.sizes
      });

      router.push('/products'); // Redirect to product list after update
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-6 text-2xl font-bold text-slate-400">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Product Name
          </div>
          <input
            id="name"
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="mt-1 block w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-slate-400">Price</div>
          <input
            id="price"
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Main Category
          </div>
          <select
            id="mainCategory"
            value={product.mainCategory}
            onChange={(e) =>
              setProduct({ ...product, mainCategory: e.target.value })
            }
            className="mt-1 block w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Main Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Description
          </div>
          <textarea
            id="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="mt-1 block w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Details (Bullet Points)
          </div>
          <textarea
            id="details"
            value={product.details.join('\n')}
            onChange={(e) =>
              setProduct({
                ...product,
                details: e.target.value
                  .split('\n')
                  .filter((detail) => detail !== '')
              })
            }
            rows={5}
            className="mt-1 block w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <div className="block text-sm font-medium text-slate-400">Images</div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <div className="mt-2">
            {product.images.map((imageUrl, index) => (
              <div key={index} className="flex items-center">
                <Image
                  src={imageUrl}
                  alt={`Product ${index}`}
                  height={100}
                  width={100}
                  className="mb-2 mr-2 h-20 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="block text-sm font-medium text-slate-400">Sizes</div>
          {product.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} className="mt-2 p-2">
              <div className="mt-1 flex items-center">
                <input
                  type="text"
                  value={size.name}
                  onChange={(e) =>
                    handleSizeChange(sizeIndex, e.target.value, size.qty)
                  }
                  placeholder="Size Name"
                  className="mr-2 rounded border border-slate-600 bg-slate-700  px-2 py-1 text-slate-200"
                />
                <input
                  type="number"
                  value={size.qty}
                  onChange={(e) =>
                    handleSizeChange(
                      sizeIndex,
                      size.name,
                      Number(e.target.value)
                    )
                  }
                  placeholder="Quantity"
                  className="rounded border border-slate-600 bg-slate-700 px-2 py-1 text-slate-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSize(sizeIndex)}
                  className="ml-2 rounded-lg bg-red-800 px-4 py-1 text-slate-200"
                >
                  Remove Size
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSize}
            className="mt-2 rounded-lg bg-slate-700 px-4 py-2 text-white shadow hover:bg-slate-800 focus:outline-none"
          >
            Add Size
          </button>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-slate-700 px-4 py-2 text-white shadow hover:bg-slate-800 focus:outline-none"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
