---
title: 'Getting your Audible library to Google Sheets'
date: '2025-06-03'
tags:
  - Audible
---

For years, I’ve tracked my Audible purchases using a checklist in Google Keep to keep tabs on what I want to listen to next.

My backlog got to a point that I sometimes forgot to add books and lost track of some series.

Audible's tools are lackluster to say the least, but luckily people have put in the work to fill in the gap.

In short, here's how I fixed my problem and improved automation of my audiobook tracking:

1. Use [mkb79's audible-cli][1] to export my Audible library as a CSV/TSV.
2. Create a Google Sheet to replace my Google Keep list.
3. Create a Google Apps script on the spreadsheet that can handle the CSV/TSV.
4. Set up a scheduled task that exports my Audible library CSV/TSV to Google Drive nightly.
5. Set up the Google Apps script trigger to run nightly.

While I’m not covering every step in detail, I’ve shared a ready-to-use spreadsheet template and the full Google Apps Script so you can set it up quickly.

---

## Google Sheet Template

Opening the link below will let you create a copy of my sheet template with the Google Apps script already in place.

https://docs.google.com/spreadsheets/d/1Gnm3rGYgoWN801sF9g_wkHlLkyu7clC4yOWavNtIELo/copy

---

## Google Drive

If you want to use Google Drive for your CSV, such as when running a nightly export and saving it to Drive, follow these steps:

1. Use audible-cli to export a CSV and upload it to Google Drive.
2. Open the file on Google Drive, copy the URL, and get the file ID from it.
3. In the Google Sheet, click <b>Extensions -> Apps Script</b>. In the `Code.gs` file, add the file ID to the variable at the top.
4. To automate the import to the spreadsheet, go to <b>Triggers</b> (on the left), and add a <b>time-based trigger</b> that runs the `importAudibleCsvFromDrive` function.

---

## Apps Script

The Apps Script adds a <b>"Book Tools"</b> menu to the Google Sheets toolbar.

It provides the following tools:

1. Upload audible-cli CSV
2. Import CSV from Drive. *This just triggers the Drive import if you don't want to wait for your time-based trigger.*
3. Sort books by author & series

NOTE: The script does not overwrite any books in your spreadsheet. It only adds new ones.

---

## Sorting

Some book series are sequels or continuations of others. If you want them to sort properly, go to the `SeriesSortOrder` sheet
and set them up. Col 1 is the author, Col 2 is the series name, Col 3 is the order you want them to appear.



[1]: https://github.com/mkb79/audible-cli
