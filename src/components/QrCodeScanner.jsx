"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QrScanner({ onScan }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 300, height: 300 },
      },
      false
    );

    scanner.render(
      (decodedText) => {
        scanner.clear();
        onScan(decodedText);
        setIsOpen(false);
      },
      (error) => {
        // Ignore scan errors
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScan, isOpen]);

  return (
    <>
      <button className="qr-btn" onClick={() => setIsOpen(true)}>
        Scan QR Code
      </button>

      {isOpen && (
        <div className="qr-fullscreen w-full">
          <div className="qr-header">
            <button className="qr-close" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>

          <div id="qr-reader" className="qr-reader" />
        </div>
      )}
    </>
  );
}
