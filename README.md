# Project 3 @cmda-minor-web · 2018-2019

## Design for Real-Time
_Voor het derde (en laatste) project van deze minor bouwt iedere student eigen prototype voor de opdrachtgever CERN. De aanbevelingen betreffen het designen voor Real-Time web applicaties. Technieken geleerd bij [Web Design](https://github.com/cmda-minor-web/web-design-1819) en [Real-Time Web](https://github.com/cmda-minor-web/real-time-web-1819) worden toegepast bij het bouwen van de de prototypes en het schrijven van de aanbevelingen._

## Table of Content
1. [Opdracht](#1)
2. [Uitvoering](#2)
2.1 - Het plan
2.2 - De Uitvoering

<a name="1"></a>

## Hoofdstuk 1 | Opdracht
[Cern](https://home.cern/) is een grote Europese organisatie die onderzoek doet naar elementaire deeltjes. De organisatie is gevestigd in [Meryrin, Zwitserland](https://www.google.nl/maps/place/CERN+Filtration+Plant/@46.2351765,6.0480437,15z/data=!4m8!1m2!2m1!1scern!3m4!1s0x0:0x1fba9665acdd729c!8m2!3d46.2296427!4d6.0532925?hl=nl). Overal ter wereld zijn mensen bezig met het verbeteren van de hard- en software van deze enorme machine. De machine leest en schrijft extreem veel data. Deze data moet vervolgens online mee gewerkt kunnen worden.

Met de data die we krijgen konden we kiezen uit de volgende opdrachten:
```
(O2B-100)
ALS Gebruiker WIL IK op al mijn devices een intuïtieve webapplicatie kunnen gebruiken
ZODAT Ik door alle opgeslagen metadata kan zoeken.

(O2B-102)
ALS Gebruiker WIL IK notificaties ontvangen via alerts / flashcards
ZODAT ik op een gemakkelijke manier notificaties kan ontvangen zonder hiervoor permanent screen real estate in te moeten leveren.

(O2B-97)
ALS Gebruiker WIL IK makkelijk rich text kunnen gebruiken met een simpele te gebruiken editor
ZODAT ik geen markdown commando's hoef te leren.

(O2B-99)
ALS Gebruiker WIL IK bepaalde berichten gepusht krijgen als notificatie
ZODAT ik niet de pagina hoef te refreshen (websocket op backend).

(O2B-99)
ALS Gebruiker WIL IK live op de hoogte gehouden worden van FLP informatie  (counters)
ZODAT Ik deze informatie kan gebruiken zonder de webapplicatie te moeten refreshen.

(O2B-101)
ALS Sysadmin WIL IK dat er meer test cases worden geschreven voor de front-end
ZODAT ik met een bepaalde zekerheid kan zeggen dat de applicatie doet waarvoor deze geschreven is

(O2B-90)
ALS Gebruiker WIL IK een simpele maar gebruiksvriendelijke manier om tags te maken en aan te passen
ZODAT Logs of threads gemakkelijker getagt kunnen worden en daarmee makkelijker te doorzoeken / filteren.
```

Ik heb gekozen voor de opdracht:
```
(O2B-99)
ALS Gebruiker WIL IK bepaalde berichten gepusht krijgen als notificatie
ZODAT ik niet de pagina hoef te refreshen (websocket op backend).

(O2B-99)
ALS Gebruiker WIL IK live op de hoogte gehouden worden van FLP informatie  (counters)
ZODAT Ik deze informatie kan gebruiken zonder de webapplicatie te moeten refreshen.
```

_In het volgende hoofdstuk leest u hoe ik deze opdracht heb uitgevoerd._

<a name="2"></a>

## Hoofdstuk 2 | Uitvoering
**2.1 - Het plan**

Het plan voor deze opdracht is het volgende: De gekregen data wordt netjes in een tabel verwerkt. Zodra er een nieuwe 'run' wordt toegevoegd, krijgt de gebruiker een Google Chrome melding (d.m.v. Service Workers). Op deze manier ben je op de hoogte van nieuwe updates. De connectie tussen client en server wordt gedaan d.m.v. sockets.

**2.2 - De uitvoering**

_Om met de data te kunnen werken, moet er eerst data gegenereerd worden. Om deze data zo real-time mogelijk te lezen, heb ik eerst geprobeerd om de [jiskefet-ui](https://github.com/SoftwareForScience/jiskefet-ui) en [jiskefet-api](https://github.com/SoftwareForScience/jiskefet-api) lokaal met MySQL te draaien. Op deze manier kon ik dan lokaal database query's uitvoeren en data verwerken. Tot mijn grote spijt ben ik na twee dagen hard proberen en bugs fixen erachter gekomen dat de API alleen op linux machines draait. Hierdoor ben ik helaas anderhalve dag aan tijd verloren._

Omdat het niet is gelukt de API lokaal te draaien, gebruik ik nu de [online api](http://cmd.jiskefet.io/). Deze ondersteunt helaas geen sockets, dus heb ik geen socket verbinding kunnen gebruiken tussen client en de API. Wat er nu gebeurt is het volgende:

Er draait een NodeJS server. Bij het openen van de webpagina op de client gebeuren er twee dingen:
- De client haalt de nodige informatie op uit de API en verwerkt deze in de tabel
- De client maakt een socket verbinding met de server
  
De server checkt wanneer er een verandering plaats vind in het bestand 'runs.json' (wat in de toekomst de online api is). Als er een file change is stuurt de server een bericht naar de client met de nieuwe data. De client reageert hierop door: 
- De nieuwe data weer te geven in de tabel
- Een push notificatie te geven


