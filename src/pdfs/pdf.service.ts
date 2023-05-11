import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import PDFMerger from 'pdf-merger-js';

@Injectable()
export class PdfService {
  async createPdfs(contents: string[], isMerged: boolean): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: 'new' });
    const tab = await browser.newPage();
    const pdfBuffers = [];

    for (let i = 0; i < contents.length; i++) {
      await tab.setContent(contents[i], {
        waitUntil: ['networkidle0'],
      });

      pdfBuffers.push(
        await tab.pdf({
          format: 'A4',
          printBackground: true,
        }),
      );
    }

    await browser.close();

    if (isMerged) {
      return this.mergePdfs(pdfBuffers);
    }

    return pdfBuffers[0];
  }

  private async mergePdfs(pdfBuffers: Buffer[]) {
    const merger = new PDFMerger();

    for (const pdfBuffer of pdfBuffers) {
      await merger.add(pdfBuffer);
    }

    return await merger.saveAsBuffer();
  }
}
