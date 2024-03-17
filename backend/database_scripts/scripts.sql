-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bdfqojyf0cukhwtj2lrp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bdfqojyf0cukhwtj2lrp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bdfqojyf0cukhwtj2lrp` DEFAULT CHARACTER SET utf8 ;
USE `bdfqojyf0cukhwtj2lrp` ;

-- -----------------------------------------------------
-- Table `bdfqojyf0cukhwtj2lrp`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdfqojyf0cukhwtj2lrp`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_usuario` VARCHAR(50) NOT NULL,
  `contraseña` VARCHAR(50) NOT NULL,
  `tipo_usuario` ENUM('empleado', 'administrador', 'tecnico') NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bdfqojyf0cukhwtj2lrp`.`empleado_docente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdfqojyf0cukhwtj2lrp`.`empleado_docente` (
  `id_empleado_docente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `identificacion` VARCHAR(20) NOT NULL,
  `departamento` VARCHAR(100) NULL DEFAULT NULL,
  `cargo` VARCHAR(100) NULL DEFAULT NULL,
  `contacto` VARCHAR(100) NULL DEFAULT NULL,
  `id_usuario` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_empleado_docente`),
  INDEX `id_usuario` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `empleado_docente_ibfk_1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bdfqojyf0cukhwtj2lrp`.`usuario` (`id_usuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bdfqojyf0cukhwtj2lrp`.`equipo_tecnologico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdfqojyf0cukhwtj2lrp`.`equipo_tecnologico` (
  `id_equipo` INT NOT NULL AUTO_INCREMENT,
  `nombre_equipo` VARCHAR(100) NOT NULL,
  `marca` VARCHAR(100) NULL DEFAULT NULL,
  `modelo` VARCHAR(100) NULL DEFAULT NULL,
  `configuracion` TEXT NULL DEFAULT NULL,
  `estado` ENUM('disponible', 'prestado', 'en_reparacion') NOT NULL,
  PRIMARY KEY (`id_equipo`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bdfqojyf0cukhwtj2lrp`.`prestamo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdfqojyf0cukhwtj2lrp`.`prestamo` (
  `id_préstamo` INT NOT NULL AUTO_INCREMENT,
  `id_empleado_docente` INT NULL DEFAULT NULL,
  `id_equipo` INT NULL DEFAULT NULL,
  `fecha_solicitud` DATE NOT NULL,
  `fecha_entrega` DATE NULL DEFAULT NULL,
  `fecha_retiro` DATE NULL DEFAULT NULL,
  `dirección_entrega` VARCHAR(255) NOT NULL,
  `estado` ENUM('pendiente', 'aprobado', 'rechazado', 'finalizado') NOT NULL,
  `aprobado_por` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_préstamo`),
  INDEX `id_empleado_docente` (`id_empleado_docente` ASC) VISIBLE,
  INDEX `id_equipo` (`id_equipo` ASC) VISIBLE,
  CONSTRAINT `prestamo_ibfk_1`
    FOREIGN KEY (`id_empleado_docente`)
    REFERENCES `bdfqojyf0cukhwtj2lrp`.`empleado_docente` (`id_empleado_docente`),
  CONSTRAINT `prestamo_ibfk_2`
    FOREIGN KEY (`id_equipo`)
    REFERENCES `bdfqojyf0cukhwtj2lrp`.`equipo_tecnologico` (`id_equipo`))
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bdfqojyf0cukhwtj2lrp`.`auditoria_administrativa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdfqojyf0cukhwtj2lrp`.`auditoria_administrativa` (
  `id_auditoria` INT NOT NULL AUTO_INCREMENT,
  `acción` VARCHAR(255) NOT NULL,
  `id_préstamo` INT NULL DEFAULT NULL,
  `id_usuario` INT NULL DEFAULT NULL,
  `fecha_acción` DATETIME NOT NULL,
  PRIMARY KEY (`id_auditoria`),
  INDEX `id_préstamo` (`id_préstamo` ASC) VISIBLE,
  INDEX `id_usuario` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `auditoria_administrativa_ibfk_1`
    FOREIGN KEY (`id_préstamo`)
    REFERENCES `bdfqojyf0cukhwtj2lrp`.`prestamo` (`id_préstamo`),
  CONSTRAINT `auditoria_administrativa_ibfk_2`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bdfqojyf0cukhwtj2lrp`.`usuario` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bdfqojyf0cukhwtj2lrp`.`devolucion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdfqojyf0cukhwtj2lrp`.`devolucion` (
  `id_devolucion` INT NOT NULL AUTO_INCREMENT,
  `id_préstamo` INT NULL DEFAULT NULL,
  `fecha_devolucion` DATE NOT NULL,
  `motivo` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_devolucion`),
  INDEX `id_préstamo` (`id_préstamo` ASC) VISIBLE,
  CONSTRAINT `devolucion_ibfk_1`
    FOREIGN KEY (`id_préstamo`)
    REFERENCES `bdfqojyf0cukhwtj2lrp`.`prestamo` (`id_préstamo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bdfqojyf0cukhwtj2lrp`.`soporte_tecnico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdfqojyf0cukhwtj2lrp`.`soporte_tecnico` (
  `id_soporte_tecnico` INT NOT NULL AUTO_INCREMENT,
  `id_préstamo` INT NULL DEFAULT NULL,
  `fecha_reporte` DATE NOT NULL,
  `descripción_problema` TEXT NULL DEFAULT NULL,
  `estado` ENUM('pendiente', 'en_proceso', 'resuelto') NOT NULL,
  `resuelto_por` INT NULL DEFAULT NULL,
  `descripcion_solucion` TEXT NULL DEFAULT NULL,
  `necesita_devolucion` ENUM('si', 'no') NOT NULL DEFAULT 'no',
  PRIMARY KEY (`id_soporte_tecnico`),
  INDEX `id_préstamo` (`id_préstamo` ASC) VISIBLE,
  CONSTRAINT `soporte_tecnico_ibfk_1`
    FOREIGN KEY (`id_préstamo`)
    REFERENCES `bdfqojyf0cukhwtj2lrp`.`prestamo` (`id_préstamo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bdfqojyf0cukhwtj2lrp`.`transaccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdfqojyf0cukhwtj2lrp`.`transaccion` (
  `id_transaccion` INT NOT NULL AUTO_INCREMENT,
  `id_préstamo` INT NULL DEFAULT NULL,
  `fecha_transaccion` DATETIME NOT NULL,
  `tipo_transaccion` ENUM('entrega', 'retiro', 'soporte') NOT NULL,
  `detalles` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_transaccion`),
  INDEX `id_préstamo` (`id_préstamo` ASC) VISIBLE,
  CONSTRAINT `transaccion_ibfk_1`
    FOREIGN KEY (`id_préstamo`)
    REFERENCES `bdfqojyf0cukhwtj2lrp`.`prestamo` (`id_préstamo`))
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
