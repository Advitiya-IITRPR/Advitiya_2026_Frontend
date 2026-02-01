"use client";

import { useEffect, useState } from "react";
import QrScanner from "./QrCodeScanner";

type Props = {
  onScan: (data: string) => void;
};

export default function QrModal({ onScan }: Props) {
  const [open, setOpen] = useState(false);
  const [startScan, setStartScan] = useState(false);

  // Start scanning automatically when modal opens
  useEffect(() => {
    if (open) setStartScan(true);
  }, [open]);

  return (
    <>
      <button className="qr-btn" onClick={() => setOpen(true)}>
        Scan QR Code
      </button>

      {open && (
        <div className="qr-modal-overlay">
          <div className="qr-modal">
            <div className="qr-modal-header">
              <h3>QR Scanner</h3>
              <button
                className="qr-close"
                onClick={() => {
                  setOpen(false);
                  setStartScan(false);
                }}
              >
                X
              </button>
            </div>

            <div className="qr-reader-wrapper">
              {startScan && <QrScanner onScan={onScan} startScan={startScan} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
