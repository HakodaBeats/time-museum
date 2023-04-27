CREATE TABLE History (
     ArticleID INT PRIMARY KEY,
     Title VARCHAR(50) NOT NULL,
     Subtitle VARCHAR(50) NOT NULL,
     Description TEXT NOT NULL,
     Content TEXT NOT NULL,
     ACTIVE BOOL DEFAULT TRUE
);

CREATE TABLE Users (
     UserID INT NOT NULL,
     Name VARCHAR(50) NOT NULL,
     Surname VARCHAR(50) NOT NULL,
     Email VARCHAR(50) NOT NULL,
     Password VARCHAR(50) NOT NULL,
     Role VARCHAR(50) DEFAULT 'user',
     Active BOOL DEFAULT TRUE,
     PRIMARY KEY (UserID)
);

CREATE TABLE Events (
     EventID INT NOT NULL,
     Title VARCHAR(50) NOT NULL,
     Subtitle VARCHAR(50) NOT NULL,
     Description TEXT NOT NULL,
     Date DATE NOT NULL,
     StartTime TIME NOT NULL,
     EndTime TIME NOT NULL,
     SeatsNumber INT NOT NULL,
     ACTIVE BOOL DEFAULT TRUE,
     PRIMARY KEY (EventID)
);

CREATE TABLE Credits (
     StafferID INT NOT NULL,
     Name VARCHAR(50) NOT NULL,
     Surname VARCHAR(50) NOT NULL,
     Role VARCHAR(50) NOT NULL,
     ACTIVE BOOL DEFAULT TRUE,
     PRIMARY KEY (StafferID)
);