-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: otakuscope
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1
USE otakuscope2;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNEwCTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anime`
--

DROP TABLE IF EXISTS `anime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anime` (
  `id` int NOT NULL,
  `title_romaji` varchar(255) NOT NULL,
  `title_english` varchar(255) DEFAULT NULL,
  `title_native` varchar(255) DEFAULT NULL,
  `description` text,
  `genres` varchar(255) DEFAULT NULL,
  `average_score` int DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anime`
--

LOCK TABLES `anime` WRITE;
/*!40000 ALTER TABLE `anime` DISABLE KEYS */;
/*!40000 ALTER TABLE `anime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anime_details`
--

DROP TABLE IF EXISTS `anime_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anime_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `anime_id` int NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `is_favorite` tinyint(1) DEFAULT '0',
  `score` tinyint DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`anime_id`),
  CONSTRAINT `anime_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `anime_details_chk_1` CHECK (((`score` is null) or (`score` between 1 and 10)))
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anime_details`
--

LOCK TABLES `anime_details` WRITE;
/*!40000 ALTER TABLE `anime_details` DISABLE KEYS */;
INSERT INTO `anime_details` VALUES (1,23,171018,'Plan to Watch',0,6,'2025-03-09 21:31:22'),(9,23,177709,'Not Set',1,NULL,'2025-03-11 04:20:08'),(14,23,176063,'Not Set',1,4,'2025-03-11 04:25:48'),(16,30,176496,'Plan to Watch',0,3,'2025-03-23 04:14:58'),(20,31,177709,'Watching',1,8,'2025-03-23 04:33:31'),(23,23,176301,'Not Set',1,NULL,'2025-04-26 22:35:23');
/*!40000 ALTER TABLE `anime_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anime_lists`
--

DROP TABLE IF EXISTS `anime_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anime_lists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `list_id` int NOT NULL,
  `anime_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_list_anime` (`list_id`,`anime_id`),
  CONSTRAINT `anime_lists_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `lists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anime_lists`
--

LOCK TABLES `anime_lists` WRITE;
/*!40000 ALTER TABLE `anime_lists` DISABLE KEYS */;
INSERT INTO `anime_lists` VALUES (1,2,182814,'2025-04-26 21:27:42'),(2,2,123,'2025-04-26 21:31:14'),(5,1,176301,'2025-04-26 22:35:35'),(6,3,176301,'2025-04-26 22:35:48');
/*!40000 ALTER TABLE `anime_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anime_reviews`
--

DROP TABLE IF EXISTS `anime_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anime_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `anime_id` int NOT NULL,
  `review_title` varchar(255) NOT NULL,
  `review_content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`anime_id`),
  CONSTRAINT `anime_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anime_reviews`
--

LOCK TABLES `anime_reviews` WRITE;
/*!40000 ALTER TABLE `anime_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `anime_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_edited` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `forum_posts` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_posts`
--

DROP TABLE IF EXISTS `forum_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_edited` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `forum_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_posts`
--

LOCK TABLES `forum_posts` WRITE;
/*!40000 ALTER TABLE `forum_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lists`
--

DROP TABLE IF EXISTS `lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (1,23,'Favorites','2025-04-26 21:18:00'),(2,23,'Hello','2025-04-26 21:27:40'),(3,23,'otaku','2025-04-26 22:35:46'),(4,23,'izaakai','2025-04-27 14:38:05');
/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myanime`
--

DROP TABLE IF EXISTS `myanime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myanime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `anime_id` int NOT NULL,
  `status` enum('Plan to Watch','Watching','Watched') NOT NULL,
  `score` int DEFAULT NULL,
  `review` text,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `anime_id` (`anime_id`),
  CONSTRAINT `myanime_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `myanime_ibfk_2` FOREIGN KEY (`anime_id`) REFERENCES `anime` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myanime`
--

LOCK TABLES `myanime` WRITE;
/*!40000 ALTER TABLE `myanime` DISABLE KEYS */;
/*!40000 ALTER TABLE `myanime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'rafid','rafidahmed@gmail.com','$2b$10$x.1su.ZNkMVJxR.brJVW3.2J8Ws0ndvAZ0tVCACxv6dg31SZJAqeK',NULL,'2024-11-17 15:37:38'),(22,'rafidasd','asdassdassd@gmail.com','$2b$10$TSbk6HZ89.jUTZklLhOUuOnWq6WrqvExvxcH7zD65rPtx9GPysLKK',NULL,'2024-11-18 15:45:04'),(23,'django','rafidahmed816@gmail.com','$2b$10$Rrel1uLATp1N2e3/e4uI.OnjUVg7YTgH/hTxBY1VggAOJAqmZ5qHS',NULL,'2024-11-19 03:26:49'),(24,'34343','rafidahmed81s6@gmail.com','$2b$10$GnZf7YD/0d3vuxoPWESV5.IA6yoT66y.YpImMQnmH3Z.PE4fmYWES',NULL,'2024-11-19 03:26:59'),(25,'rafidahmed','rafid@gmail.com','$2b$10$gmJyLg3qxy1eK034h2e9hOvJv.wEl8EZ0g8vC7quilhxPOkszvJBy',NULL,'2024-11-19 03:28:14'),(26,'rafid12','asdassda@gmail.com','$2b$10$HqnA0qXFQccw9WlMH8tAWeuaNE9E.bZBrP3R4k56k5Dl4zdfA2YOq',NULL,'2024-11-19 03:31:35'),(27,'rafid12232','dummy@gmail.com','$2b$10$zTJrWqvhe7HI3xxruV6bqOc6oPsScyEJ3CLTcmMNc.gBa8HTmlK3K',NULL,'2024-11-19 03:34:44'),(28,'faiyaz','faiyaz@gmail.com','$2b$10$tF7yR8nGvtbKxNo51XBAGuKxade7PuGcjbDt23KoPmG0UqAHeWhLa',NULL,'2024-11-19 03:35:09'),(29,'12344','rafidahmed12222@gmail.com','$2b$10$V.1pV6ZNaK56cfI3jxnrN.JnRPUy5RMxDU1UBjeqS43tufSo77Y.G',NULL,'2024-11-19 04:25:34'),(30,'otaku','otakuscope@gmail.com','$2b$10$bbzfhwYzsM0MDl5p.nksRunJ0AgsCzEhhRAUmmYasZgN6j5XzAW.a',NULL,'2025-03-23 04:13:59'),(31,'njaou','njaou@gmail.com','$2b$10$NL5nBsui7m4Yu8v7B4mbhehhRKXi4dLUvXgYjgiRkgl90qhptRw4m',NULL,'2025-03-23 04:32:09');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-27 22:49:17
