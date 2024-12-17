import React, { useState } from 'react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Processing Complete! XML file is ready for download.');
    }, 3000); // Simulate 3 seconds of processing
  };

  return (
    <div className="pdf-uploader-container">
      <h1 className="pdf-uploader-title">PDF to XML Converter</h1>
      {isProcessing ? (
        <div
          className="processing-container"
          role="alert"
          aria-live="assertive"
        >
          <div className="processing-icon" aria-hidden="true">
            ⏳
          </div>
          <p className="processing-text">Processing...</p>
          <p className="processing-subtext">
            Your XML file will automatically download once it is ready.
          </p>
        </div>
      ) : file ? (
        <div className="convert-container">
          <p className="uploaded-file-name">Uploaded: {file.name}</p>
          <button className="convert-button" onClick={startProcessing}>
            Convert to XML
          </button>
        </div>
      ) : (
        <>
          <p className="pdf-uploader-subtitle">
            Easily convert PDF to XML, directly in your browser! It's fast, free, and works on any device.
          </p>
          <div
            className="pdf-drop-area"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                document.getElementById('file-upload')?.click();
              }
            }}
            aria-label="Drag and drop your PDF file here or press Enter to upload."
          >
            <div className="pdf-drop-icon" aria-hidden="true">📥</div>
            <p className="pdf-drop-text">Drag and drop your PDF file here</p>
            <p className="pdf-size-info">PDF Files Smaller Than 100MB</p>
            <input
              type="file"
              accept="application/pdf"
              id="file-upload"
              className="file-input"
              onChange={handleFileInput}
              aria-label="Upload PDF file"
            />
            <label htmlFor="file-upload" className="upload-button">
              Upload file
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
