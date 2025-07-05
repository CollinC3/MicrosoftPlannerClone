-- SQLite
CREATE TABLE ColumnNames(
    columnId INTEGER NOT NULL,
    columnName TEXT NOT NULL,
    PRIMARY KEY(columnId)
);

CREATE TABLE Tasks(
    taskId INTEGER NOT NULL,
    columnId INTEGER NOT NULL,
    taskName TEXT NOT NULL,
    taskDescription TEXT,
    taskPriority TEXT,
    taskStatus TEXT,
    taskStartDate DATE,
    taskDueDate DATE,
    taskEndDate DATE,
    PRIMARY KEY(taskID),
    FOREIGN KEY(columnid) REFERENCES ColumnNames(columnid)
);

CREATE TABLE CheckList(
    checklistId INTEGER NOT NULL,
    taskId INTEGER NOT NULL,
    itemDescription TEXT,
    itemComplete BOOLEAN,
    PRIMARY KEY(checklistId),
    FOREIGN KEY(taskId) REFERENCES Tasks(taskId)
);

CREATE TABLE Comments(
    commentId INTEGER NOT NULL,
    taskId INTEGER NOT NULL,
    comment TEXT,
    person TEXT,
    commentDate DATETIME,
    PRIMARY KEY(commentId)
    FOREIGN KEY(taskId) REFERENCES Tasks(taskId)
);