/*
  Warnings:

  - Added the required column `name` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo-url" TEXT,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("cpf", "email", "id", "phone", "photo-url", "userId") SELECT "cpf", "email", "id", "phone", "photo-url", "userId" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE UNIQUE INDEX "Contact_cpf_key" ON "Contact"("cpf");
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
