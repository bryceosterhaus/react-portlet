create index IX_A39A67FB on todo_Todo (done);
create index IX_51A2F379 on todo_Todo (uuid_[$COLUMN_LENGTH:75$], companyId);
create unique index IX_4014043B on todo_Todo (uuid_[$COLUMN_LENGTH:75$], groupId);