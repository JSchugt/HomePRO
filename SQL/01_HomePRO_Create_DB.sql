USE [master]

if db_id('HomePRO') IS NULL
  CREATE DATABASE [HomePRO]
GO

USE [HomePRO]
GO

DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [Step];
DROP TABLE IF EXISTS [ProjectMaterials];
DROP TABLE IF EXISTS [Materials];
GO
CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255),
  [email] nvarchar(255),
  [firebaseId] nvarchar(255)
)
GO

CREATE TABLE [Projects] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int,
  [Name] nvarchar(255),
  [Description] nvarchar(255)
)
GO

CREATE TABLE [Materials] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int,
  [Name] nvarchar(255),
  [Price] int,
  [Qty] int
)
GO

CREATE TABLE [Step] (
  [Id] int PRIMARY KEY IDENTITY,
  [ProjectId] int,
  [TimeEstimate] datetime,
  [Description] nvarchar(255),
  [Step] int,
  [IsComplete] bit
)
GO

CREATE TABLE [ProjectMaterials] (
  [Id] int PRIMARY KEY IDENTITY,
  [ProjectId] int,
  [MaterialId] int
)
GO

ALTER TABLE [Projects] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [ProjectMaterials] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Projects] ([Id])
GO

ALTER TABLE [Step] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Projects] ([Id])
GO

ALTER TABLE [Materials] ADD FOREIGN KEY ([Id]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Materials] ADD FOREIGN KEY ([Id]) REFERENCES [ProjectMaterials] ([Id])
GO
