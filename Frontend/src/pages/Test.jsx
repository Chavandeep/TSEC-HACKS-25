import React, { useState } from 'react';
import { postImage } from '../services/post'; // Adjust the import according to your file structure

const Test = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('No file selected');
      return;
    }

    try {
      const result = await postImage(file);
      setUploadStatus(`Upload successful: ${result.predicted_class}`);
    } catch (error) {
      setUploadStatus('Upload failed');
    }
  };

  return (
    <div>
      <input type="file" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default Test;