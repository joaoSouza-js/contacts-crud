-- DropIndex
DROP INDEX "User_email_key";

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
    CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("cpf", "email", "id", "name", "phone", "photo-url", "userId") SELECT "cpf", "email", "id", "name", "phone", "photo-url", "userId" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
