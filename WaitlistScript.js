/* eslint-disable @typescript-eslint/no-unused-vars */
// Google Apps Script (Google Sheets) backend for CampusPulse waitlist.
// Paste into: Google Sheets > Extensions > Apps Script
//
// Improvement: prevents duplicate emails (case-insensitive) using a sheet scan + a script lock.

function normalizeEmail_(value) {
  return String(value || "").trim().toLowerCase();
}

function emailExists_(sheet, normalizedEmail) {
  if (!normalizedEmail) return false;
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false; // row 1 = headers

  // Email column is column 3 ("Email") based on setup() below.
  var values = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (normalizeEmail_(values[i][0]) === normalizedEmail) return true;
  }
  return false;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: "Busy. Try again." })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();

    // Mandatory Validation
    if (!data.name || !data.email || !data.university) {
      return ContentService.createTextOutput(
        JSON.stringify({ result: "error", message: "Missing mandatory fields" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    var email = normalizeEmail_(data.email);

    // Prevent duplicates (case-insensitive).
    if (emailExists_(sheet, email)) {
      // The frontend uses `no-cors`, so it doesn't read responses. Still return a useful JSON.
      return ContentService.createTextOutput(
        JSON.stringify({ result: "success", duplicate: true })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      timestamp,
      data.name,
      email,
      data.university,
      data.year || "",
      data.reason || "",
      data.phone || "",
      data.source || "",
      data.role || "",
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: String(error) })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function setup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Full Name",
      "Email",
      "University",
      "Year of Study",
      "Why Joining",
      "Phone Number",
      "How Heard",
      "Role on Campus",
    ]);
  }
}
