-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "sonar_token" TEXT,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_title_key" ON "Folder"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_sonar_token_key" ON "Folder"("sonar_token");
