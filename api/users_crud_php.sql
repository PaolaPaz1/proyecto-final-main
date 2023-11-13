-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2023 at 08:51 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `users_crud_php`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `is_admin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `user_id`, `is_admin`) VALUES
(1, 6, 1),
(2, 8, 0),
(3, 9, 0),
(4, 10, 0),
(5, 11, 0),
(6, 12, 0),
(7, 13, 0),
(8, 16, 0),
(9, 17, 0),
(16, 24, 2);

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id_egreso` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id_egreso`, `id_usuario`, `monto`, `descripcion`, `categoria`, `fecha`) VALUES
(42, 31, 0.15, 'compre aguita', 'Alimentacion', '2023-11-07'),
(43, 31, 100.00, 'fui a la pampa', 'Alimentacion', '2023-11-06'),
(44, 6, 10.99, 'Spotify pagado', 'Entretenimiento', '2023-11-12'),
(45, 6, 14.99, 'Compre cositas para piel grasa', 'Cuidado Personal', '2023-11-12'),
(46, 6, 15.00, 'picsa', 'Alimentacion', '2023-11-13');

-- --------------------------------------------------------

--
-- Table structure for table `income`
--

CREATE TABLE `income` (
  `id_ingreso` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `income`
--

INSERT INTO `income` (`id_ingreso`, `id_usuario`, `monto`, `descripcion`, `categoria`, `fecha`) VALUES
(20, 31, 364.25, 'me pagaron el mes en adoc', 'Ingreso Laboral', '2023-11-07'),
(21, 31, 5.00, 'me dio mi abuelita', 'Ingreso Familiar', '2023-11-07'),
(22, 6, 227.33, 'Me pagaron la quincena', 'Ingreso Laboral', '2023-11-12'),
(23, 6, 120.00, 'Inverti en una tiendita de por aqui', 'Ingreso de Inversiones', '2023-11-12'),
(24, 6, 145.00, 'pagoooo', 'Ingreso Laboral', '2023-11-12');

-- --------------------------------------------------------

--
-- Table structure for table `limite_mensual`
--

CREATE TABLE `limite_mensual` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `año` int(11) NOT NULL,
  `mes` int(11) NOT NULL,
  `limite` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `limite_mensual`
--

INSERT INTO `limite_mensual` (`id`, `id_usuario`, `año`, `mes`, `limite`) VALUES
(1, 6, 2023, 11, 124.00),
(10, 8, 2023, 11, 784.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `password` varchar(14) NOT NULL,
  `email` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `password`, `email`) VALUES
(6, 'Lionel Andrés', 'Messi Cuccittini', 'goat', 'messi10@goat.com'),
(8, 'Fatima Margarita', 'Caballero Rivera', 'manchita', 'fcaballero03@gmail.com'),
(9, 'Johana', 'Landaverde', 'pepito12', 'johalanda73@hotmail.com'),
(10, 'Paola', 'Guevara', 'pepito', 'pao182930@hotmail.com'),
(11, 'Jacob', 'Herrera', 'aaaaa', 'jacob112@clases.edu.sv'),
(12, 'Pancho', 'Wenceslao', 'panchito123', 'panchito123@hotmail.com'),
(13, 'Pedri \"Potter\"', 'Gonzales', '12345', 'pedri16@fcb.com'),
(16, 'Mami', 'Mamá', 'mamita', 'mamassv@mom.com'),
(17, 'Jhon', 'Smith', '1234', 'john.smith@example.com'),
(24, 'Ingrid', 'Herrera', 'nose123', 'nosejaja@hotmail.com'),
(25, 'Rosendo', 'Garcia', 'whenyourallarg', 'mardybum@upupandway.com'),
(26, 'Rosendo', 'Garcia', 'dsadsadsad', 'jajajajj.jaja@shewasclose.com'),
(27, 'Saira', 'Benitez', '12345', 'saildrey@nose.com'),
(28, 'patito juan', 'alcachofas', '12345', 'prueba@gmail.com'),
(29, 'Jefferson', 'Pineda', '12345', 'pruebas2.12@gmail.com'),
(30, 'Juan', 'Ejemplo', '8520', 'ojalasirva@gmail.com'),
(31, 'Panchito', 'Funes', 'hola123456', 'panchitofunes@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id_egreso`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`id_ingreso`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `limite_mensual`
--
ALTER TABLE `limite_mensual`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_monthly_limit` (`id_usuario`,`año`,`mes`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id_egreso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `income`
--
ALTER TABLE `income`
  MODIFY `id_ingreso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `limite_mensual`
--
ALTER TABLE `limite_mensual`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `admins_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`);

--
-- Constraints for table `income`
--
ALTER TABLE `income`
  ADD CONSTRAINT `income_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
