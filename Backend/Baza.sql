use master;
go
drop database if exists RestoranRezervacije;
go
create database RestoranRezervacije collate Croatian_CI_AS;
go
use RestoranRezervacije;
go


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

-- Popis svih rezervacija
select r.sifra, g.ime, g.prezime, s.broj_stola, r.datum_vrijeme, r.broj_osoba
from Rezervacije r
inner join Gosti g on r.gost = g.sifra
inner join Stolovi s on r.stol = s.sifra
where r.datum_vrijeme between '2024-05-10 00:00:00' and '2024-05-12 23:59:59';

-- Ukupan broj narudžbi za određeno jelo
select j.naziv_jela, sum(n.kolicina) as ukupno_naruceno
from Narudzbe n
inner join Jelovnik j on n.jelo = j.sifra
group by j.naziv_jela
order by ukupno_naruceno desc;