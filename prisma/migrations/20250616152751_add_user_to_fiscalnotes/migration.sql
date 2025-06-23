/*
  Warnings:

  - Added the required column `userId` to the `FiscalNotes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FiscalNotes" (
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
    "exitTime" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "FiscalNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FiscalNotes" ("arrivalTime", "carrierName", "companyName", "createdAt", "driverDocument", "driverName", "dueDate1", "dueDate2", "dueDate3", "exitNoteNumber", "exitTime", "id", "invoiceNumber", "invoiceSeries", "issueDate", "orderNumber", "receiptDate", "updatedAt", "vehiclePlate") SELECT "arrivalTime", "carrierName", "companyName", "createdAt", "driverDocument", "driverName", "dueDate1", "dueDate2", "dueDate3", "exitNoteNumber", "exitTime", "id", "invoiceNumber", "invoiceSeries", "issueDate", "orderNumber", "receiptDate", "updatedAt", "vehiclePlate" FROM "FiscalNotes";
DROP TABLE "FiscalNotes";
ALTER TABLE "new_FiscalNotes" RENAME TO "FiscalNotes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
