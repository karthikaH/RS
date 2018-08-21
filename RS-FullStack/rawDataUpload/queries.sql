
-- database used
USE risk_sense;

DROP TABLE IF EXISTS risks;
CREATE TABLE IF NOT EXISTS risks (
  rank_s INT(11) NOT NULL AUTO_INCREMENT,
  target_port INT(11) DEFAULT NULL,
  record INT(11) DEFAULT NULL,
  target INT(11) DEFAULT NULL,
  source INT(11) DEFAULT NULL,
  PRIMARY KEY (rank_s)
) ENGINE=InnoDB;

--The MS Access uses the AUTOINCREMENT keyword to perform an auto-increment feature.
--By default, the starting value for AUTOINCREMENT is 1, and it will increment by 1 for each new record.
--To specify that the "ID" column should start at value 10 and increment by 5, change the autoincrement to AUTOINCREMENT(10,5).
