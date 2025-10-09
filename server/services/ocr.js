// server/services/ocr.js
import { createWorker } from 'tesseract.js';
import os from 'os';
import path from 'path';

const DEFAULT_LANG = process.env.OCR_LANG || 'eng';

let worker;
let currentLang = '';

const tidy = (t = '') =>
  String(t)
    .replace(/\r/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

/**
 * Initialize the Tesseract worker (idempotent).
 * lang can be 'eng' or combos like 'eng+spa'.
 */
export async function initOcr(lang = DEFAULT_LANG) {
  if (!worker) {
    worker = await createWorker({
      // Use a public tessdata mirror for language files
      // You can change to your own URL if needed.
      langPath: process.env.TESSDATA_URL || 'https://tessdata.projectnaptha.com/4.0.0',
      // Optional logs
      logger: process.env.TESSERACT_LOG === 'true' ? (m) => console.log('[OCR]', m) : undefined,
      // Optional cache directory; avoid write on read-only fs (comment out if needed)
      cachePath: path.join(os.tmpdir(), 'tessdata')
    });
  }
  if (currentLang !== lang) {
    await worker.loadLanguage(lang);
    await worker.initialize(lang);
    currentLang = lang;
  }
}

/**
 * Extract text from an image Buffer using Tesseract only.
 */
export async function extractTextFromImage(buffer, lang = DEFAULT_LANG) {
  await initOcr(lang);
  const { data } = await worker.recognize(buffer);
  return tidy(data?.text || '');
}

/**
 * Gracefully stop the worker (optional, e.g., on shutdown).
 */
export async function stopOcr() {
  try {
    if (worker) await worker.terminate();
  } finally {
    worker = undefined;
    currentLang = '';
  }
}