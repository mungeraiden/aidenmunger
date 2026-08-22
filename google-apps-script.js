/*
  GOOGLE APPS SCRIPT BACKEND
  1. Create a Google Sheet.
  2. Open Extensions → Apps Script.
  3. Paste this entire file.
  4. Deploy → New deployment → Web app.
  5. Execute as: Me
  6. Who has access: Anyone
  7. Copy the Web app URL into script.js on your website.
*/

const SHEET_NAME = "Feedback";

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ok:true, message:"Aiden feedback endpoint is online."}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = getSheet_();
  const data = JSON.parse(e.postData.contents || "{}");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp","Rating","What went well","Could be better","Three words","Name","Anything else"]);
  }

  sheet.appendRow([
    new Date(),
    data.rating || "",
    data.best || "",
    data.improve || "",
    data.vibe || "",
    data.name || "",
    data.private || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}
