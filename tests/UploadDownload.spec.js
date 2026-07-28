import ExcelJS from 'exceljs'
import { test, expect, request } from '@playwright/test'
// const { test, expect, request } = require('@playwright/test')


async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = readExcel(worksheet, searchText);
  console.log(output);

  if (output.row === -1 || output.column === -1) {
    console.log(`"${searchText}" not found in the worksheet.`);
    return;
  }

  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
  console.log('File updated successfully!');
}

function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}

// await writeExcelTest('Red', 'purple', { colChange: 2 }, 'download.xlsx');


test('download and upload file test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')
  const downloadPromise = page.waitForEvent('download')
   await page.getByRole('button', { name: 'Download' }).click(); // Click the download button

    const download = await downloadPromise; // Get the download object

   await download.saveAs(`C:/Users/SudhanshuPrakash/Downloads/download.xlsx`);
  // await page.locator('#downloadButton').click()
  // await page.getByLabel("//span[text()='Upload File']").click();
  await downloadPromise
  await writeExcelTest('Red', 'purple', { colChange: 2 }, 'C:\\Users\\SudhanshuPrakash\\Downloads\\download.xlsx')
  // await page.locator('#fileinput').click()
  await page.locator('#fileinput').setInputFiles('C:/Users/SudhanshuPrakash/Downloads/download.xlsx')
  // await page.pause()
  const textlocator = page.locator('div#cell-5-undefined div').nth(1)
  console.log(await textlocator.textContent());
  await expect(textlocator).toHaveText('purple')
  // const desiredRow = page.locator('div#cell-5-undefined div').nth(1)
  //
  // console.log(await desiredRow.last().textContent());
})