-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE =
        'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tecnocontrol
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tecnocontrol
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tecnocontrol` DEFAULT CHARACTER SET utf8;
USE `tecnocontrol`;

-- -----------------------------------------------------
-- Table `tecnocontrol`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnocontrol`.`Usuario`
(
    `idUsuario` INT         NOT NULL AUTO_INCREMENT,
    `email`     VARCHAR(45) NOT NULL,
    `password`  VARCHAR(45) NOT NULL,
    PRIMARY KEY (`idUsuario`)
)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tecnocontrol`.`Unidad`
-- -----------------------------------------------------

CREATE TABLE `Unidad`
(
    `idGps`             int(11)     NOT NULL AUTO_INCREMENT,
    `marca`             varchar(45) NOT NULL,
    `modelo`            varchar(45) NOT NULL,
    `placas`            varchar(45) NOT NULL,
    `serie`             varchar(45) NOT NULL,
    `ano`               varchar(45) NOT NULL,
    `color`             varchar(45) NOT NULL,
    `linea`             varchar(45) NOT NULL,
    `Usuario_idUsuario` int(11)     NOT NULL,
    PRIMARY KEY (`idGps`),
    INDEX `fk_Unidad_Usuario1_idx` (`Usuario_idUsuario` ASC),
    CONSTRAINT `fk_Unidad_Usuario1`
        FOREIGN KEY (`Usuario_idUsuario`)
            REFERENCES `usuario` (`idUsuario`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
) ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `tecnocontrol`.`Evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tecnocontrol`.`Evento`
(
    `idEvento`     INT          NOT NULL AUTO_INCREMENT,
    `Unidad_idGps` INT          NOT NULL,
    `name_device`  VARCHAR(45)  NOT NULL,
    `date_message` DATE         NOT NULL,
    `idMessage`    VARCHAR(45)  NOT NULL,
    `dsc_Message`  VARCHAR(105) NOT NULL,
    `latitud`      VARCHAR(45)  NOT NULL,
    `longitud`     VARCHAR(45)  NOT NULL,
    `velocidad`    VARCHAR(45)  NOT NULL,
    `ignicion`     VARCHAR(45)  NOT NULL,
    `odometro_kms` DOUBLE       NOT NULL,
    `dir`          DOUBLE       NOT NULL,
    PRIMARY KEY (`idEvento`),
    INDEX `fk_Evento_Unidad_idx` (`Unidad_idGps` ASC),
    CONSTRAINT `fk_Evento_Unidad`
        FOREIGN KEY (`Unidad_idGps`)
            REFERENCES `tecnocontrol`.`Unidad` (`idGps`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
)
    ENGINE = InnoDB;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
