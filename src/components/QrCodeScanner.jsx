"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

export default function QrScanner({ onScan }) {
  const [isOpen, setIsOpen] = useState(false);
  const qrRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const startScanner = async () => {
      await new Promise((r) => setTimeout(r, 100));

      const qr = new Html5Qrcode("qr-reader");
      qrRef.current = qr;

      try {
        await qr.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: (viewfinderWidth, viewfinderHeight) => {
              const size = Math.min(viewfinderWidth, viewfinderHeight);
              return { width: size, height: size };
            },
          },
          (decodedText) => {
            onScan(decodedText);
            closeScanner();
          }
        );
      } catch (err) {
        console.warn("Camera not started:", err);
      }
    };

    startScanner();

    return () => {
      closeScanner();
    };
  }, [isOpen]);

  const closeScanner = async () => {
    if (qrRef.current) {
      try {
        await qrRef.current.stop();
        qrRef.current.clear();
      } catch { }
      qrRef.current = null;
    }
    setIsOpen(false);
  };

  // 🖼️ Scan QR from uploaded image
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const qr = new Html5Qrcode("qr-reader-file");

    try {
      const decodedText = await qr.scanFile(file, true);
      onScan(decodedText);
      setIsOpen(false);
    } catch (err) {
      alert("No QR code found in image");
    } finally {
      qr.clear();
      e.target.value = "";
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Scan QR Code</button>

      {isOpen && (
        <div className="qr-fullscreen">
          <button onClick={closeScanner}>Close</button>

          {/* Camera Scanner */}
          <div id="qr-reader" style={{ width: 300, height: 300 }} />

          {/* Divider */}
          <p style={{ margin: "1rem 0" }}>OR</p>

          {/* Upload from gallery */}
          <button onClick={() => fileInputRef.current.click()}>
            Upload QR Image
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileUpload}
          />

          {/* Hidden container for file scanning */}
          <div id="qr-reader-file" style={{ display: "none" }} />
        </div>
      )}
    </>
  );
}
