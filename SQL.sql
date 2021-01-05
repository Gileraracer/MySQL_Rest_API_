CREATE DATABASE `products` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;


CREATE TABLE `products`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NULL,
  `description` MEDIUMTEXT NULL,
  `price` DECIMAL(10,2) NULL,
  `stock` INT NULL,
  PRIMARY KEY (`id`));

-- Tesdaten
insert into products.products (title, description, price, stock) VALUES 
('Bedsure Kuscheldecke Lila XL Decke Sofa','weiche& warme Fleecedecke als Sofadecke/Couchdecke',21.71,5),
('Bedsure Sherpa Decke Türkis hochwertige Wohndecken Kuscheldecken','extra Dicke warm Sofadecke/Couchdecke in zweiseitig',41.36,2),
('Micro USB Kabel','Nylon Micro USB Ladekabel Schnellladekabel High Speed Handy Datenkabel',5.09,200),
('Manuka Health aktiver Manuka-Honig','MGO 100+ Manuka-Honig ist ein hochwertiger Manuka-Honig, der mindestens 100 mg / kg Methylglyoxal (MGO) enthält. Der MGO-Wert bezeichnet die Stärke des Honigs - je höher der MGO, desto stärker der Manuka-Honig. Unser MGO Manuka-Honig kommt aus abgelegenen, unberührten Gebieten Neuseelands und ist frei von Zusatzstoffen und Rückständen von Antibiotika oder Pestiziden. Unser Team von Honigspezialisten erntet diesen seltenen Honig besonders sorgfältig. Jeder Löffel repräsentiert die ganze Kraft von Neuseelands einzigartiger Natur! Die Maori in Neuseeland schätzen die Manukapflanze seit Jahrhunderten wegen ihrer besonderen Eigenschaften. Wichtiger Qualitäts-Hinweis: Beachten Sie bitte beim Kauf von Manuka-Honig, dass nicht alle angebotenen Sorten die gleiche Qualität aufweisen. MGO Manuka-Honig von Manuka Health stammt zu 100% aus Neuseeland und ist zudem getestet und zertifiziert auf MGO-Gehalt, Reinheit und Qualität.',29.98,10),
('Kelaide Orthopädische Einlegesohlen mit Fußgewölbestütze','KORRIGIEREN SIE IHRE FUßHALTUNG, LINDERN SIE SCHMERZEN IM FUßGEWöLBE UND VERBESSERN SIE DEN KOMFORT. Kelaide Orthopädische Einlegesohlen kann die Kraftstruktur des Fußes ausgleichen, bei Plattfüßen, hohen Bögen, Plantarfasziitis, Menschen mit Knochensporn und Achillessehnenentzündung bieten eine komfortable Lösung.',19.99,30)


-- und hier noch der (nicht SQL!) Body für ein neues Produkt - für den PUT

{"title":"Neuer Artikel",
"description":"Dieser Artikel ist super!",
"price":199.99,
"stock":0}