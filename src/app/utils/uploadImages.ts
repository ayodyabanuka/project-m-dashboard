import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export default uploadImage;
