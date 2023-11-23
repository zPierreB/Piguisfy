-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 23 nov. 2023 à 18:22
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `piguisfy`
--

-- --------------------------------------------------------

--
-- Structure de la table `albums`
--

DROP TABLE IF EXISTS `albums`;
CREATE TABLE IF NOT EXISTS `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `release_date` date NOT NULL,
  `image` varchar(250) NOT NULL,
  `artist_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `artistId` (`artist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `albums`
--

INSERT INTO `albums` (`id`, `name`, `release_date`, `image`, `artist_id`) VALUES
(1, 'Fruto', '2023-10-19', 'images/frutoo.jpg', 1),
(2, 'Databeat', '2023-10-29', 'images/pexels-photo-7464822.jpeg', 2),
(3, 'BZRP Session', '2023-10-30', 'images/bzrp_profil.jpg', 1),
(4, 'Noche', '2023-11-05', 'images/cover1.jpg', 1);

-- --------------------------------------------------------

--
-- Structure de la table `artists`
--

DROP TABLE IF EXISTS `artists`;
CREATE TABLE IF NOT EXISTS `artists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `artistName` (`artist_name`),
  KEY `userId` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `artists`
--

INSERT INTO `artists` (`id`, `artist_name`, `user_id`) VALUES
(1, 'MC Piguis', 1),
(2, 'Cocotin', 2);

-- --------------------------------------------------------

--
-- Structure de la table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE IF NOT EXISTS `playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image` varchar(250) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `image`, `user_id`, `created_at`) VALUES
(9, 'Astro', 'images/1700417878063-Piguisfy.jpg', 1, '2023-11-16 22:39:44'),
(15, 'Viajar ✈️', 'images/citynight.jpg', 2, '2023-11-17 23:25:14'),
(45, 'Road trip v2', 'images/1700670463991-vanhippie.jpg', 1, '2023-11-22 17:27:44'),
(49, 'test', 'images/1700731546298-cmoi.png', 1, '2023-11-23 10:25:58');

-- --------------------------------------------------------

--
-- Structure de la table `playliststracks`
--

DROP TABLE IF EXISTS `playliststracks`;
CREATE TABLE IF NOT EXISTS `playliststracks` (
  `playlist_id` int NOT NULL,
  `track_id` int NOT NULL,
  PRIMARY KEY (`playlist_id`,`track_id`),
  KEY `trackId` (`track_id`),
  KEY `playlistId` (`playlist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `playliststracks`
--

INSERT INTO `playliststracks` (`playlist_id`, `track_id`) VALUES
(9, 92),
(9, 101),
(9, 114),
(45, 114);

-- --------------------------------------------------------

--
-- Structure de la table `tracks`
--

DROP TABLE IF EXISTS `tracks`;
CREATE TABLE IF NOT EXISTS `tracks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `duration` int NOT NULL,
  `path` varchar(250) NOT NULL,
  `album_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `albumId` (`album_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `tracks`
--

INSERT INTO `tracks` (`id`, `name`, `duration`, `path`, `album_id`) VALUES
(92, 'Fruto.mp3', 133, 'uploads/1699402161156-Fruto.mp3', 1),
(93, 'Spiring - Nostalgy.wav', 156, 'uploads/1699402331395-Spiring - Nostalgy.wav', 1),
(98, 'dido-stan-loop-intro.mp3', 166, 'uploads/1700419678686-dido-stan-loop-intro.mp3', 1),
(101, 'PESO PLUMA  BZRP Music Sessions #55.mp3', 193, 'uploads/1700420145470-Peso-Pluma-BZRP-Music-Sessions-55.mp3', 3),
(114, 'SanHolo&JaiWolf-WeWillMeetAgain.mp3', 202, 'uploads/1700581747403-SanHolo&JaiWolf-WeWillMeetAgain.mp3', 4),
(115, 'Dragostea Din Tei  Eurobeat Remix.mp3', 220, 'uploads/1700581898339-Dragostea Din Tei  Eurobeat Remix.mp3', 4);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `profil_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `date_of_birth`, `profil_pic`) VALUES
(1, 'Pigos', 'pierre-briere@orange.fr', '$2b$10$G7drpH8HfLf2m2dVOL3D/.QvjzzTRxLUD3z.G2sWCKVR7hBY6/xUa', '1998-02-20', 'images/astro.png'),
(2, 'Helicodecombat', 'coco@gmail.com', '', '1996-07-06', ''),

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `artists`
--
ALTER TABLE `artists`
  ADD CONSTRAINT `artists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `playliststracks`
--
ALTER TABLE `playliststracks`
  ADD CONSTRAINT `playliststracks_ibfk_1` FOREIGN KEY (`track_id`) REFERENCES `tracks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `playliststracks_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `tracks`
--
ALTER TABLE `tracks`
  ADD CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
