import fs from 'fs/promises';
import puppeteer from 'puppeteer';

const createPdf = async () => {
  const url = 'http://localhost:3000/resume';

  await fs.mkdir('public/pdfs', { recursive: true });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
  } catch (e) {
    if (e.toString().includes('ERR_CONNECTION_REFUSED')) {
      console.log('Please run `npm run preview` before generating PDF');
      process.exit(1);
    }
  }

  await page.evaluate(() => {
    const resume = document.querySelector('#resume-page');

    if (!resume) {
      throw new Error('Element #resume-page not found');
    }

    const clonedResume = resume.cloneNode(true);

    document.body.innerHTML = '';
    document.body.appendChild(clonedResume);

    document.documentElement.style.margin = '0';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = 'white';
  });

  await page.emulateMediaType('print');

  await page.pdf({
    path: 'public/pdfs/resume.pdf',
    printBackground: true,
    format: 'A4',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
};

await createPdf();
