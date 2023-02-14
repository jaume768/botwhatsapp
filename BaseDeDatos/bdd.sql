create database BotWhatsapp;
use BotWhatsapp;

CREATE TABLE Personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    edad VARCHAR(255),
    telefono VARCHAR(255),
    gmail VARCHAR(255),
    ciudad VARCHAR(255),
    direccion VARCHAR(255)
);

CREATE TABLE informacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    informacion TEXT
);

CREATE TABLE Personas_info (
    id_persona INT NOT NULL,
    id_info INT NOT NULL,
    PRIMARY KEY (id_persona, id_info),
    FOREIGN KEY (id_persona) REFERENCES Personas(id),
    FOREIGN KEY (id_info) REFERENCES informacion(id)
);

CREATE TABLE Recordatorio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL
);

INSERT INTO Personas (nombre, edad, telefono, gmail, ciudad, direccion) 
VALUES 
("jaume", 20, "683472110", "jaumefernandezsunyer10@gmail.com", "Manacor", "Historiador Truyols,8,1D"),
("Fran squad", 19, "625925514", "francescsalomgalmes@gmail.com", "Manacor", "Rossello,34,bajos");

INSERT INTO informacion (informacion) 
VALUES 
("Te novia, li agrada s'anime, vol ser empresari"),
("Te novia, li agrada s'anime i shooters, estudia informatica");
INSERT INTO Personas_info (id_persona, id_info) 
VALUES 
(1, 1),
(2, 2);

INSERT INTO Recordatorio (titulo, descripcion, fecha, hora)
VALUES
    ('Sopar Familiar', 'Es sopar de cada any amb sa familia', '2023-12-25', '20:30:00');


Query per treure tota la informacio de una persona:

select * from Personas,Personas_info,informacion where Personas.id = Personas_info.id_persona and Personas_info.id_info = informacion.id and Personas.nombre = "jaume" limit 1;


