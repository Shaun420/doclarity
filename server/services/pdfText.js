import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

// Extract text from a PDF Buffer using pdfjs-dist
export async function extractPdfText(buffer) {
  // Avoid worker setup in Node
  const loadingTask = pdfjsLib.getDocument({
    data: buffer,
    disableWorker: true
  });

  const pdf = await loadingTask.promise;
  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent({ normalizeWhitespace: true });

    fullText += normalizeTextContent(textContent) + '\n\n';
  }

  return tidy(fullText);
}

function normalizeTextContent(textContent) {
  // Build text, adding newlines for EOL and rough line breaks using Y movement
  let out = '';
  let lastY = null;

  for (const item of textContent.items) {
    const str = item.str || '';
    const ts = item.transform;
    const y = Array.isArray(ts) ? ts[5] : null;

    // Heuristic: new line if Y moved significantly
    if (lastY !== null && y !== null && Math.abs(y - lastY) > 8) {
      out += '\n';
    }

    out += str;
    if (item.hasEOL) out += '\n';
    else out += ' ';

    lastY = y;
  }

  return out;
}

function tidy(t) {
  return String(t)
    .replace(/\r/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}