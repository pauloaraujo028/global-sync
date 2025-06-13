/*
  Warnings:

  - You are about to drop the `InvoiceTransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "InvoiceTransaction";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FiscalNotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "receiptDate" DATETIME NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "invoiceSeries" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "issueDate" DATETIME NOT NULL,
    "dueDate1" DATETIME,
    "dueDate2" DATETIME,
    "dueDate3" DATETIME,
    "carrierName" TEXT,
    "vehiclePlate" TEXT,
    "driverName" TEXT,
    "driverDocument" TEXT,
    "exitNoteNumber" TEXT,
    "exitTime" TEXT
);
