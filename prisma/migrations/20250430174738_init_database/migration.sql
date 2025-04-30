BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Proposal] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Proposal_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Proposal_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Day] (
    [id] INT NOT NULL IDENTITY(1,1),
    [order] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [proposalId] INT NOT NULL,
    [stepId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Day_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Day_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Step] (
    [id] INT NOT NULL IDENTITY(1,1),
    [order] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [proposalId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Step_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Step_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Day] ADD CONSTRAINT [Day_proposalId_fkey] FOREIGN KEY ([proposalId]) REFERENCES [dbo].[Proposal]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Day] ADD CONSTRAINT [Day_stepId_fkey] FOREIGN KEY ([stepId]) REFERENCES [dbo].[Step]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Step] ADD CONSTRAINT [Step_proposalId_fkey] FOREIGN KEY ([proposalId]) REFERENCES [dbo].[Proposal]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
