-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: 14-Ago-2024 às 01:31
-- Versão do servidor: 10.3.14-MariaDB
-- versão do PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ninjafeeders`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `friends`
--

DROP TABLE IF EXISTS `friends`;
CREATE TABLE IF NOT EXISTS `friends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `status` enum('Pendente','Amigos','Rejeitado') DEFAULT 'Pendente',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `friend_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `friend_id` (`friend_id`)
) ENGINE=MyISAM AUTO_INCREMENT=100 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `friends`
--

INSERT INTO `friends` (`id`, `user_name`, `user_id`, `friend_id`, `status`, `created_at`, `updated_at`, `friend_name`) VALUES
(99, 'jc200', 84, 109, 'Amigos', '2024-08-13 00:51:51', '2024-08-13 00:52:09', 'test1'),
(98, 'test2', 110, 109, 'Amigos', '2024-08-13 00:43:26', '2024-08-13 00:43:58', 'test1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `mensgens`
--

DROP TABLE IF EXISTS `mensgens`;
CREATE TABLE IF NOT EXISTS `mensgens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msg` varchar(1000) NOT NULL,
  `likes` int(11) DEFAULT NULL,
  `deslikes` int(11) DEFAULT NULL,
  `autor` varchar(50) DEFAULT NULL,
  `visibilidade_msg` varchar(20) NOT NULL,
  `titulomsg` varchar(500) DEFAULT NULL,
  `criada_em` datetime DEFAULT current_timestamp(),
  `autor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `autor` (`autor`)
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `mensgens`
--

INSERT INTO `mensgens` (`id`, `msg`, `likes`, `deslikes`, `autor`, `visibilidade_msg`, `titulomsg`, `criada_em`, `autor_id`) VALUES
(189, 'msg private 1', 0, 1, 'test2', 'private', 'msg private 1...', '2024-08-12 21:43:12', 110),
(190, 'msg privada jc200', 0, 1, 'jc200', 'private', 'msg privada jc200...', '2024-08-07 21:46:36', 84),
(191, 'msg private 1 test2', 1, 1, 'test2', 'public', 'msg private 1 test2...', '2024-08-05 21:48:35', 110);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `unique_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `nome`, `username`, `password`) VALUES
(84, 'jairo', 'jc200', '$2a$10$ci42.B0dBuRWr437qwI0J.2LFiTa9GAc4wHDfElNm7nqZu0ooKtWe'),
(107, 'jairo', 'jc400', '$2a$10$hxP9.4FbFj.G3ZgDnKCi4um.wqA4t4ghx3mdubF9paSdKuRBQfaxu'),
(108, 'jairo', 'jc500', '$2a$10$U/vjv0hLR/MbSMUcO8KHP.aN6jvR8iZwP5yP9Uiwcwe8T.si2NIve'),
(109, 'test1', 'test1', '$2a$10$HLDvDQbQG3sic7A/lirGcuSMizWhSZEStDtnOXMt1EsCSJEDXiZw6'),
(110, 'test2', 'test2', '$2a$10$bsNZ.kKARUQxmY1YbRYfFOrtZaBEGThede8aO5AqR/ctcC/7yQWFG');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_likes`
--

DROP TABLE IF EXISTS `user_likes`;
CREATE TABLE IF NOT EXISTS `user_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `msg_id` int(11) NOT NULL,
  `like_status` enum('like','dislike','anulado') NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=117 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `user_likes`
--

INSERT INTO `user_likes` (`id`, `user_id`, `msg_id`, `like_status`, `criado_em`) VALUES
(116, 84, 191, 'dislike', '2024-08-13 01:50:11'),
(115, 84, 190, 'anulado', '2024-08-13 01:49:51'),
(114, 109, 190, 'dislike', '2024-08-13 01:05:20'),
(113, 109, 189, 'dislike', '2024-08-13 01:03:44'),
(112, 109, 191, 'like', '2024-08-13 01:03:35'),
(111, 110, 183, 'anulado', '2024-08-12 23:30:34'),
(110, 110, 182, 'anulado', '2024-08-12 23:29:16'),
(109, 110, 184, 'anulado', '2024-08-12 23:28:01'),
(108, 110, 181, 'anulado', '2024-08-12 23:24:14'),
(107, 110, 180, 'like', '2024-08-12 23:12:10');

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `mensgens`
--
ALTER TABLE `mensgens`
  ADD CONSTRAINT `mensgens_ibfk_1` FOREIGN KEY (`autor`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
