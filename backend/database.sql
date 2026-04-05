-- BMC 2026 Registration Database Schema
-- Run this SQL in your Hostinger MySQL database

CREATE TABLE IF NOT EXISTS `registrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `whatsapp` VARCHAR(30) NOT NULL,
  `institution` VARCHAR(255) NOT NULL,
  `participant_type` ENUM('Presenter','Non-Presenter') NOT NULL,
  `nationality` ENUM('Indonesian','Non-Indonesian') NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `sub_topic` VARCHAR(255) NOT NULL,
  `presence` ENUM('Offline','Online') NOT NULL,
  `payment_proof` VARCHAR(500) DEFAULT NULL,
  `abstract_file` VARCHAR(500) DEFAULT NULL,
  `info_source` VARCHAR(255) NOT NULL,
  `status` ENUM('pending','approved','rejected') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default admin: admin / admin123 (change this after first login!)
INSERT INTO `admin_users` (`username`, `password`) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
