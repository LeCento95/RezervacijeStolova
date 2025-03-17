 SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_ab2d4c_restorantmanagerre SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_ab2d4c_restorantmanagerre COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_ab2d4c_restorantmanagerre SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

create table Operateri(
sifra int not null primary key identity(1,1),
email varchar(50) not null,
lozinka varchar(200) not null
);

-- Lozinka generirana pomoću https://bcrypt-generator.com/
insert into Operateri values ('stojancaric8@gmail.com',
'$2a$12$PxsJjU5Exq77zLCpS3GGX.BpoH2p4UTLP.Xf1.Zu/J9G7BT.P2EZC');

insert into Operateri values ('edunova@edunova.hr',
'$2a$12$btGdO8IVkKJJX1szpX4S7ubofyBxUTx1A3yKigbDDFY.o0FXBo9nG');

create table Stolovi(
sifra int not null primary key identity (1,1),
broj_stola int not null,
kapacitet int not null,
lokacija varchar (50) -- npr. "terasa" ili "unutanji dio"
);

create table Gosti(
sifra int not null primary key identity (1,1),
ime varchar (50) not null,
prezime varchar (50) not null,
broj_telefona varchar (20),
e_mail varchar (100)
);

create table Rezervacije(
sifra int not null primary key identity (1,1),
gost int not null references Gosti(sifra),
stol int not null references Stolovi(sifra),
datum_vrijeme datetime not null,
broj_osoba int not null,
napomena varchar (200)
);

create table Jelovnik(
sifra int not null primary key identity (1,1),
naziv_jela varchar (50) not null,
kategorija varchar (50), -- npr. "predjelo", "glavno jelo", "desert"
cijena decimal (18,2)
);

create table Narudzbe(
sifra int not null primary key identity (1,1),
rezervacija int not null references Rezervacije(sifra),
jelo int not null references Jelovnik(sifra),
kolicina int not null
);


-- 1
insert into Stolovi (broj_stola, kapacitet, lokacija) values
(1, 4, 'Terasa A1'),
(2, 6, 'Kamin'),
(3, 2, 'Galerija');

-- 2
insert into Gosti (ime, prezime, broj_telefona, e_mail) values
('Pero', 'Perić', '0912345678', 'pero.peric@gmail.com'),
('Ana', 'Marić', '091876542', 'ana.maric@gmail.com'),
('Marija', 'Delić', '0998765432', 'marija.delic@gmail.com');

-- 3
insert into Rezervacije (gost, stol, datum_vrijeme, broj_osoba, napomena) values
(1, 1, '2024-05-10 19:00:00', 4, 'Baby chair'),
(2, 2, '2024-05-11 20:00:00', 6, ''),
(3, 3, '2024-05-12 19:00:00', 2, '');

-- 4
insert into Jelovnik (naziv_jela, kategorija, cijena) values
('Tuna steak', 'glavno jelo', 60.00),
('Sirove strasti', 'predjelo', 20.00),
('Tiramisu', 'desert', 15.00);

insert into Narudzbe (rezervacija, jelo, kolicina) values
(1, 1, 2), -- 2 tuna steak-a za prvu rezervaciju
(1, 2, 1), -- 1 sirove strasti za prvu rezervaciju
(2, 3, 3), -- 3 tiramisua za drugu rezervaciju
(3, 1, 2); -- 2 tuna steak-a za treću rezervaciju

select * from Stolovi;
select * from Gosti;
select * from Rezervacije;
select * from Jelovnik;
select * from Narudzbe;

insert into Stolovi (broj_stola, kapacitet, lokacija) values
(4, 4, 'Terasa A2'),
(5, 8, 'Glavna sala'),
(6, 2, 'A1'),
(7, 4, 'Terasa B1'),
(8, 6, 'Kamin'),
(9, 3, 'Galerija'),
(10, 5, 'Glavna sala'),
(11, 2, 'B1'),
(12, 4, 'Terasa B2');

insert into Gosti (ime, prezime, broj_telefona, e_mail) values
('Ivan', 'Horvat', '0981234567', 'ivan.horvat@gmail.com'),
('Lucija', 'Kovač', '0958765432', 'lucija.kovac@gmail.com'),
('Marko', 'Babić', '0971234567', 'marko.babic@gmail.com'),
('Ivana', 'Jurić', '0928765432', 'ivana.juric@gmail.com'),
('Josip', 'Novak', '0991234567', 'josip.novak@gmail.com'),
('Petra', 'Kralj', '0918765432', 'petra.kralj@gmail.com'),
('Nikola', 'Vuković', '0981234567', 'nikola.vukovic@gmail.com'),
('Sara', 'Pavlović', '0958765432', 'sara.pavlovic@gmail.com'),
('Matej', 'Knežević', '0971234567', 'matej.knezevic@gmail.com');

insert into Rezervacije (gost, stol, datum_vrijeme, broj_osoba, napomena) values
(4, 4, '2024-05-13 18:30:00', 4, 'Rođendan'),
(5, 5, '2024-05-14 20:30:00', 8, 'Veća grupa'),
(6, 6, '2024-05-15 21:00:00', 2, ''),
(7, 7, '2024-05-16 19:30:00', 4, ''),
(8, 8, '2024-05-17 20:00:00', 6, 'Godišnjica'),
(9, 9, '2024-05-18 19:00:00', 3, ''),
(10, 10, '2024-05-19 20:30:00', 5, ''),
(11, 11, '2024-05-20 21:00:00', 2, ''),
(12, 12, '2024-05-21 19:30:00', 4, 'Alergija na orašaste plodove');

insert into Jelovnik (naziv_jela, kategorija, cijena) values
('Brancin na žaru', 'glavno jelo', 70.00),
('Carpaccio od hobotnice', 'predjelo', 25.00),
('Panna cotta', 'desert', 18.00),
('Rižoto s plodovima mora', 'glavno jelo', 55.00),
('Salata od kozica', 'predjelo', 22.00),
('Čokoladni mousse', 'desert', 16.00),
('Teleći odrezak', 'glavno jelo', 80.00),
('Juha od rajčice', 'predjelo', 18.00),
('Sladoled', 'desert', 12.00);

-- Narudžbe za rezervaciju 4 (Rođendan)
INSERT INTO Narudzbe (rezervacija, jelo, kolicina) VALUES
(4, 7, 1), -- Teleći odrezak
(4, 8, 2), -- Juha od rajčice
(4, 9, 2); -- Sladoled

-- Narudžbe za rezervaciju 5 (Veća grupa)
INSERT INTO Narudzbe (rezervacija, jelo, kolicina) VALUES
(5, 4, 3), -- Rižoto s plodovima mora
(5, 5, 2), -- Salata od kozica
(5, 6, 4); -- Čokoladni mousse

-- Narudžbe za rezervaciju 6 (prazno)
INSERT INTO Narudzbe (rezervacija, jelo, kolicina) VALUES
(6, 1, 1), -- Brancin na žaru
(6, 3, 1); -- Panna cotta

-- Narudžbe za rezervaciju 7 (prazno)
INSERT INTO Narudzbe (rezervacija, jelo, kolicina) VALUES
(7, 2, 2), -- Carpaccio od hobotnice
(7, 5, 1); -- Salata od kozica

-- Narudžbe za rezervaciju 8 (Godišnjica)
INSERT INTO Narudzbe (rezervacija, jelo, kolicina) VALUES
(8, 4, 2), -- Rižoto s plodovima mora
(8, 6, 2), -- Čokoladni mousse
(8, 9, 1); -- Sladoled

-- Narudžbe za rezervaciju 9 (prazno)
INSERT INTO Narudzbe (rezervacija, jelo, kolicina) VALUES
(9, 1, 1), -- Brancin na žaru
(9, 8, 1); -- Juha od rajčice

-- Narudžbe za rezervaciju 10 (prazno)
INSERT INTO Narudzbe (rezervacija, jelo, kolicina) VALUES
(10, 7, 2), -- Teleći odrezak
(10, 3, 2); -- Panna cotta

-- Narudžbe za rezervaciju 11 (prazno)
INSERT INTO Narudzbe (rezervacija, jelo, kolicina) VALUES
(11, 2, 1), -- Carpaccio od hobotnice
(11, 6, 1); -- Čokoladni mousse

-- Narudžbe za rezervaciju 12 (Alergija na orašaste plodove)
INSERT INTO Narudzbe (rezervacija, jelo, kolicina) VALUES
(12, 4, 2), -- Rižoto s plodovima mora
(12, 5, 1); -- Salata od kozica

select * from Stolovi;
select * from Gosti;
select * from Rezervacije;
select * from Jelovnik;
select * from Narudzbe;
select * from Operateri;

-- Popis svih rezervacija
select r.sifra, g.ime, g.prezime, s.broj_stola, r.datum_vrijeme, r.broj_osoba
from Rezervacije r
inner join Gosti g on r.gost = g.sifra
inner join Stolovi s on r.stol = s.sifra
where r.datum_vrijeme between '2024-05-10 00:00:00' and '2024-05-22 23:59:59';;

-- Ukupan broj narudžbi za određeno jelo
select j.naziv_jela, sum(n.kolicina) as ukupno_naruceno
from Narudzbe n
inner join Jelovnik j on n.jelo = j.sifra
group by j.naziv_jela
order by ukupno_naruceno desc;