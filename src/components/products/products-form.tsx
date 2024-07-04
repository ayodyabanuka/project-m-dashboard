import React, { useState, useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { db, storage } from '@/app/utils/firebase';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';

interface Props {
  onSubmit: () => void;
}

interface Size {
  name: string;
  qty: number;
}

const ProductForm: React.FC<Props> = ({ onSubmit }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState<string[]>(['']); // Array of bullet points
  const [mainCategory, setMainCategory] = useState(''); // Updated to string
  const [sizes, setSizes] = useState<Size[]>([{ name: '', qty: 0 }]);
  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (images) {
      const newImagePreviews = Array.from(images).map((image) =>
        URL.createObjectURL(image)
      );
      setImagePreviews(newImagePreviews);
    }
  }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleSizeChange = (
    sizeIndex: number,
    key: keyof Size,
    value: number | string
  ) => {
    const newSizes = [...sizes];
    newSizes[sizeIndex] = {
      ...newSizes[sizeIndex],
      [key]: value
    };
    setSizes(newSizes);
  };

  const handleAddSize = () => {
    setSizes([...sizes, { name: '', qty: 0 }]);
  };

  const handleRemoveSize = (sizeIndex: number) => {
    const newSizes = [...sizes];
    newSizes.splice(sizeIndex, 1);
    setSizes(newSizes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!images || images.length === 0) {
      alert('Please upload at least one image.');
      setLoading(false);
      return;
    }

    const imagesUrls: string[] = [];

    try {
      // Upload images to Firebase Storage
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageName = `${Date.now()}_${image.name}`;
        const storageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(storageRef);
        imagesUrls.push(downloadUrl);
      }

      // Save product data to Firestore
      const docRef = doc(db, 'products', id);
      await setDoc(docRef, {
        id,
        name,
        price: parseFloat(price),
        category,
        description,
        details,
        mainCategory,
        sizes,
        images: imagesUrls,
        createdAt: new Date()
      });
      // await addDoc(collection(db, 'products'), {
      //   name,
      //   price: parseFloat(price),
      //   category,
      //   description,
      //   details,
      //   mainCategory,
      //   sizes,
      //   images: imagesUrls,
      //   createdAt: new Date()
      // });

      // Reset form and notify parent component
      setId('');
      setName('');
      setPrice('');
      setCategory('');
      setDescription('');
      setDetails(['']);
      setMainCategory('');
      setSizes([{ name: '', qty: 0 }]);
      setImages(null);
      setImagePreviews([]);
      setLoading(false);
      onSubmit();
    } catch (error) {
      setLoading(false);
      console.error('Error uploading images and saving product:', error);
    }
  };

  return (
    <div className="flex space-x-6">
      <form onSubmit={handleSubmit} className="w-1/2 space-y-6">
        {/* Product Id */}
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Product Id
          </div>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Product Name */}
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Product Name
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Price */}
        <div>
          <div className="block text-sm font-medium text-slate-400">Price</div>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Category */}
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Category
          </div>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Main Category */}
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Main Category
          </div>
          <select
            id="mainCategory"
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Main Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        {/* Description */}
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Description
          </div>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Details (Bullet Points) */}
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Details (Bullet Points)
          </div>
          <textarea
            id="details"
            value={details.join('\n')}
            onChange={(e) =>
              setDetails(
                e.target.value.split('\n').filter((detail) => detail !== '')
              )
            }
            rows={5}
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        {/* Sizes */}
        <div>
          <div className="block text-sm font-medium text-slate-400">
            Sizes and Quantity
          </div>
          {sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} className="mt-4 flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={size.name}
                  onChange={(e) =>
                    handleSizeChange(sizeIndex, 'name', e.target.value)
                  }
                  placeholder="Size Name"
                  className="block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={size.qty}
                  onChange={(e) =>
                    handleSizeChange(sizeIndex, 'qty', Number(e.target.value))
                  }
                  placeholder="Quantity"
                  className="block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSize(sizeIndex)}
                className="rounded-lg bg-red-800 px-4 py-2 text-slate-200"
              >
                Remove
              </button>
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
        {/* Images */}
        <div>
          <div className="block text-sm font-medium text-slate-400">Images</div>
          <input
            id="images"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            className="mt-1 block w-full rounded-lg border border-slate-500 bg-slate-800 px-3 py-2 text-slate-400 shadow-sm file:rounded-lg file:border-0 file:bg-slate-700 file:px-3 file:py-2 file:text-slate-400 hover:file:bg-slate-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-700 px-4 py-2 text-white shadow hover:bg-slate-800 focus:outline-none"
          >
            {loading ? <ClipLoader color="#ffffff" size={100} /> : 'Submit'}
          </button>
        </div>
      </form>
      <div className="w-1/2 space-y-1 border-l border-slate-600 p-4">
        <h2 className="text-lg font-medium text-gray-900">Product Preview</h2>
        <div>
          <div className="text-2xl font-semibold capitalize text-slate-400">
            {name}
          </div>
          <div className="text-slate-400">{category}</div>
          <div className="text-slate-400">{mainCategory}</div>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-6">
          {imagePreviews.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Preview ${index}`}
              height={100}
              width={100}
              className="h-fit w-full object-cover"
            />
          ))}
        </div>

        <div className="text-slate-400">
          {price ? 'LKR' : ''} {price}
        </div>
        <div className="py-10 text-justify text-slate-400">{description}</div>
        <div className="grid grid-cols-3">
          {sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} className="mt-4">
              <div className="text-slate-400">
                Size: {size.name} - Qty: {size.qty}
              </div>
            </div>
          ))}
        </div>
        <div>
          <ul className="list-inside list-disc text-slate-400">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
