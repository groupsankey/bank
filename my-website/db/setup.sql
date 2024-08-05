CREATE DATABASE IF NOT EXISTS bench_db;
USE bench_db;
CREATE TABLE IF NOT EXISTS benches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  type VARCHAR(255) NOT NULL,
  place VARCHAR(255) NOT NULL,
  rating TINYINT NOT NULL
);

-- Sample data
INSERT INTO benches (lat, lng, type, place, rating) VALUES
(39.92077, 32.85411, 'Wooden', 'Park', 8),
(39.92100, 32.85500, 'Metal', 'Garden', 7);
