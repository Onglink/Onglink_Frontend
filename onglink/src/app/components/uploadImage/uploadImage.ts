import axios from 'axios';

export async function uploadImagemParaCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  formData.append('file', file);
  formData.append('upload_preset', uploadPreset || ''); 
  formData.append('folder', 'onglink'); // opcional

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );

  return response.data.secure_url;
}
