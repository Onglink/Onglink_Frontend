// src/app/services/uploadService.js

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const uploadService = async (file) => {
    if (!file) return null;

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Falha no upload para o Cloudinary');
        }

        const data = await response.json();
        return data.secure_url; // Retorna a URL pública da imagem/arquivo

    } catch (error) {
        console.error('Erro no upload:', error);
        return null;
    }
};
export default uploadService;