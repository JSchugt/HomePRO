USE [master]

if db_id('HomePRO') IS NULL
   CREATE DATABASE [HomePRO]
GO

USE [HomePRO]
GO

DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Projects];
DROP TABLE IF EXISTS [Step];
DROP TABLE IF EXISTS [ProjectMaerials];
DROP TABLE IF EXISTS [Materials];
GO

CREATE TABLE [user] (
  [userId] int PRIMARY KEY,
  [name] nvarchar(255),
  [email] nvarchar(255) not null,
  [firebaseId] nvarchar(255),
)
GO

CREATE TABLE [Projects] (
  [id] int PRIMARY KEY,
  [userId] int not null,
  [name] nvarchar(255) not null,
  [description] nvarchar(255),
 CONSTRAINT [FK_Projects_USER] FOREIGN KEY ([userId]) References [User] ([Id])
)
GO

CREATE TABLE [Materials] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255) not null,
  [price] int not null,
  [qty] int not null,
  CONSTRAINT [FK_Materials_USER] FOREIGN KEY ([userId]) References [User] ([Id])
)
GO

CREATE TABLE [Step] (
  [id] int [pk],
  [projectId] int not null,
  [TimeEstimate] datetime,
  [Description] nvarchar(255),
  [step] int,
 CONSTRAINT [FK_Step_Projects] FOREIGN KEY ([projectId]) REFERENCES [Projects] ([Id])
)
GO

CREATE TABLE [ProjectMaterials] (
  [id] int PRIMARY KEY,
  [projectId] int,
  [materialId] int,
  CONTRAINT [FK_ProjectMaterials_Materials] FOREIGN KEY ([MaterialsId]) REFERENCES [ProjectMaterials] ([id]),
  CONTRAINT [FK_ProjectMaterials_Projects] FOREIGN KEY ([ProjectId]) REFERENCES [Projects] ([id])
)
GO
