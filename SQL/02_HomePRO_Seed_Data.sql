set identity_insert [USER] on
insert into [USER] (Id, Name, Email, firebaseId) values (1, 'Thomas Virgil', 'j@j.com', 'qCCBmyvDWKcJ23mPFaKALLrpW0r2')
insert into [USER] (Id, Name, Email, firebaseId) values (2, 'Nigel Heartworm', 'NigelH@mail.com','4ehFSJ3lkuW8K2iFtlW7Ybe4CiC3')
set identity_insert [USER] off

set identity_insert [PROJECTS] on
insert into [Projects] (Id, UserId, [Name], [Description]) values (1, 1, 'Out Door Kitchen','This is an outdoor kitchen with BBQ, sink, a patio and gazebo or shade. ')
set identity_insert [PROJECTS] off

set identity_insert [Step] on
insert into [Step] ([Id], [Description], [IsComplete], [ProjectId], [TimeEstimate], [Step]) values (1, 'Call 811', 0, 1, 10, 1)
insert into [Step] ([Id], [Description], [IsComplete], [ProjectId], [TimeEstimate], [Step]) values (2, 'Mark Off Area', 0, 1, 10, 2)
insert into [Step] ([Id], [Description], [IsComplete], [ProjectId], [TimeEstimate], [Step]) values (3, 'Dig Out marked off area making it even', 0, 1, 120, 3)
set identity_insert [step] off