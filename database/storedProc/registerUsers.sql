CREATE OR ALTER PROCEDURE registerUsersProc(@id VARCHAR(200), @full_name VARCHAR(200),@cohort VARCHAR(100), @email VARCHAR(200), @password VARCHAR(200))
AS
BEGIN
    INSERT INTO usersTable(id, full_name,cohort_no, email, password) VALUES(@id, @full_name,@cohort, @email, @password)
END
