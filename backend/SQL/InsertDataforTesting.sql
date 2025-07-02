-- SQLite

-- INSERT INTO ColumnNames(columnName)
-- VALUES 
--     ("Hockey"),
--     ("Planner Clone"),
--     ("Renting");

INSERT INTO Tasks(columnId, taskName, taskDescription, taskPriority, taskStatus, taskStartDate, taskEndDate)
VALUES 
    (1, "Team Build", "This is a task to build out a hockey team builder for the adult rec league.", "Low", "Not Started", "", ""),
    (2, "Work on Planner Clone", "This is a task to build out the Planner clone.","Medium","In-Progress", "2024-04-07", ""),
    (3, "Look for Rental properties", "This is a task to look for rental properties.","High","In-Progress", "2025-06-28", "");

INSERT INTO CheckList(taskId, itemDescription, itemComplete)
VALUES
    (1, "Code the builder", FALSE),
    (1, "Push the builder", FALSE),
    (2, "Code the Planner", FALSE),
    (3, "Do finance", FALSE);

INSERT INTO Comments(taskId, comment, person, commentDate)
VALUES
    (1, "This is my comment. I am making this comment longer to really see if I can make the thing do something.", "Collin", "2024-08-05 12:31:25"),
    (2, "This is my comment. I am making this comment longer to really see if I can make the thing do something.", "Josh", "2025-06-05 08:45:03"),
    (3, "This is my comment. I am making this comment longer to really see if I can make the thing do something.", "Alejandro", "2024-11-05 15:36:30");