import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Camera, Clipboard, Image as ImageIcon, Loader2 } from 'lucide-react';

const QuickAnalyze = ({ onResult, navigateToAnalysis }) => {
  const [mode, setMode] = useState('paste'); // paste | image
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const fileRef = useRef(null);

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgPreview(URL.createObjectURL(file));
  };

  const compressImage = (file, maxW = 1600, quality = 0.8) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (!blob) return reject(new Error('Compression failed'));
            resolve(new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }));
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = reject;
      img.src = url;
    });

  const submit = async () => {
    try {
      setLoading(true);
      if (mode === 'paste') {
        const { data } = await axios.post('/api/analyze/text', { text });
        onResult?.(data);
        navigateToAnalysis?.(data);
      } else {
        const file = fileRef.current?.files?.[0];
        if (!file) throw new Error('Select an image');
        const compressed = await compressImage(file);
        const form = new FormData();
        form.append('image', compressed);
        const { data } = await axios.post('/api/analyze/image', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        onResult?.(data);
        navigateToAnalysis?.(data);
      }
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Quick analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    mode === 'paste' ? text.trim().length >= 30 : Boolean(fileRef.current?.files?.[0]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Quick analysis</h3>
        <div className="inline-flex bg-slate-100 rounded-lg p-0.5">
          <button
            onClick={() => setMode('paste')}
            className={`px-3 py-1.5 text-sm rounded-md ${mode === 'paste' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            <Clipboard className="inline w-4 h-4 mr-1" />
            Paste text
          </button>
          <button
            onClick={() => setMode('image')}
            className={`px-3 py-1.5 text-sm rounded-md ${mode === 'image' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            <Camera className="inline w-4 h-4 mr-1" />
            Scan image
          </button>
        </div>
      </div>

      {mode === 'paste' ? (
        <div>
          <textarea
            rows={6}
            placeholder="Paste copied contract text here (at least ~30 characters)…"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p className="text-xs text-slate-500 mt-2">Tip: Use Ctrl/Cmd+V to paste quickly.</p>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Upload or capture an image</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImagePick}
            className="block w-full text-sm text-slate-700 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-primary-600 file:text-white hover:file:bg-primary-700"
          />
          {imgPreview && (
            <img
              src={imgPreview}
              alt="Preview"
              className="mt-3 max-h-64 rounded-md border border-gray-200"
            />
          )}
          <p className="text-xs text-slate-500 mt-2">
            Keep the image sharp and well-lit. We run OCR with Tesseract (on server).
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-end gap-3">
        <button
          onClick={submit}
          disabled={!canSubmit || loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:bg-slate-300 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
          Analyze
        </button>
      </div>
      <p className="text-[11px] text-slate-500 mt-3">
        By using quick analysis, you agree that pasted text or images will be processed securely for analysis.
      </p>
    </div>
  );
};

export default QuickAnalyze;