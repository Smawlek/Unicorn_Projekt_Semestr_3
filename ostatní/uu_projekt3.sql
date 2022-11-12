-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2022 at 09:10 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uu_projekt3`
--

-- --------------------------------------------------------

--
-- Table structure for table `assigments`
--

CREATE TABLE `assigments` (
  `id_as` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(512) COLLATE utf8_unicode_ci DEFAULT '',
  `maxPoints` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fields`
--

CREATE TABLE `fields` (
  `id_fi` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `short` varchar(16) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id_ra` int(11) NOT NULL,
  `assigment` int(11) NOT NULL,
  `sturu_id` int(11) NOT NULL,
  `points` int(11) DEFAULT 0,
  `description` varchar(512) COLLATE utf8_unicode_ci DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_ro` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_ro`, `name`) VALUES
(1, 'Admin'),
(2, 'Lektor'),
(3, 'Student');

-- --------------------------------------------------------

--
-- Table structure for table `runs`
--

CREATE TABLE `runs` (
  `id_sute` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `teacher` int(11) NOT NULL,
  `start` date NOT NULL,
  `length` int(11) NOT NULL,
  `canSign` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stu_ru`
--

CREATE TABLE `stu_ru` (
  `id_sturu` int(11) NOT NULL,
  `student` int(11) NOT NULL,
  `run` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id_su` int(11) NOT NULL,
  `creator` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `field` int(11) NOT NULL,
  `howManyWeeks` int(11) NOT NULL,
  `weekDescription` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`weekDescription`)),
  `teacher` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id_ty` int(11) NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_us` int(11) NOT NULL,
  `name` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `role` int(11) NOT NULL DEFAULT 3,
  `password` varchar(512) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assigments`
--
ALTER TABLE `assigments`
  ADD PRIMARY KEY (`id_as`),
  ADD KEY `author` (`author`),
  ADD KEY `subject` (`subject`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `fields`
--
ALTER TABLE `fields`
  ADD PRIMARY KEY (`id_fi`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id_ra`),
  ADD KEY `assigment` (`assigment`),
  ADD KEY `sturu_id` (`sturu_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_ro`);

--
-- Indexes for table `runs`
--
ALTER TABLE `runs`
  ADD PRIMARY KEY (`id_sute`),
  ADD KEY `subject` (`subject`),
  ADD KEY `teacher` (`teacher`);

--
-- Indexes for table `stu_ru`
--
ALTER TABLE `stu_ru`
  ADD PRIMARY KEY (`id_sturu`),
  ADD KEY `student` (`student`),
  ADD KEY `run` (`run`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id_su`),
  ADD KEY `creator` (`creator`),
  ADD KEY `field` (`field`),
  ADD KEY `teacher` (`teacher`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id_ty`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_us`),
  ADD KEY `role` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assigments`
--
ALTER TABLE `assigments`
  MODIFY `id_as` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fields`
--
ALTER TABLE `fields`
  MODIFY `id_fi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id_ra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_ro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `runs`
--
ALTER TABLE `runs`
  MODIFY `id_sute` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stu_ru`
--
ALTER TABLE `stu_ru`
  MODIFY `id_sturu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id_su` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id_ty` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_us` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assigments`
--
ALTER TABLE `assigments`
  ADD CONSTRAINT `assigments_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`id_us`),
  ADD CONSTRAINT `assigments_ibfk_2` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id_su`),
  ADD CONSTRAINT `assigments_ibfk_3` FOREIGN KEY (`type`) REFERENCES `types` (`id_ty`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`assigment`) REFERENCES `assigments` (`id_as`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`sturu_id`) REFERENCES `stu_ru` (`id_sturu`);

--
-- Constraints for table `runs`
--
ALTER TABLE `runs`
  ADD CONSTRAINT `runs_ibfk_1` FOREIGN KEY (`subject`) REFERENCES `subjects` (`id_su`),
  ADD CONSTRAINT `runs_ibfk_2` FOREIGN KEY (`teacher`) REFERENCES `users` (`id_us`);

--
-- Constraints for table `stu_ru`
--
ALTER TABLE `stu_ru`
  ADD CONSTRAINT `stu_ru_ibfk_1` FOREIGN KEY (`student`) REFERENCES `users` (`id_us`),
  ADD CONSTRAINT `stu_ru_ibfk_2` FOREIGN KEY (`run`) REFERENCES `runs` (`id_sute`);

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`id_us`),
  ADD CONSTRAINT `subjects_ibfk_2` FOREIGN KEY (`field`) REFERENCES `fields` (`id_fi`),
  ADD CONSTRAINT `subjects_ibfk_3` FOREIGN KEY (`teacher`) REFERENCES `users` (`id_us`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id_ro`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
