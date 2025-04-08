import { useEffect, useState } from 'react'
import supabase from '../../../Supabase/Client'
import { Edit } from "@mui/icons-material";

export default function Avatar({ url, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) {
      setAvatarUrl(`https://oiflwdvvdflmgcrxezuj.supabase.co/storage/v1/object/public/avatars/${url}`);
    } else {
      setAvatarUrl(null);
    }
  }, [url]);

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Seleziona un\'immagine.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`; // Nome univoco
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath || ""); 
    } catch (error) {
      console.error("Errore caricamento avatar:", error.message);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
        />
      ) : (
        "Scegli il tuo avatar"
      )}
      <div>
        <input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className="file-input"
        />
        <label htmlFor="single" className="w-100">
          <Edit className="fs-5" />
        </label>
      </div>
    </>
  );
}
