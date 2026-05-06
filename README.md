# Sammanfattning


## Funktionalitet

App som ger sannolikheten för att se norrsken, utifrån kp index och lokal molnighet.

- data för norrsken (dock inte realtid)
- data för molnighet (återigen dock inte realtid)
- användarens position
- kan söka plats (men inte spara)
- kan bestämma sannolikheten för att se norrsken
- karta
- mörkt användargränsnitt

- API:
Norrsken: [NOAA](https://www.ncei.noaa.gov/)
Väder: [open-meteo
](https://open-meteo.com/)

## Avgränsningar

Saknas pushnotiser, kan inte spara en eller flera platser, samt diverse nice-to-have saker som t.ex. norrskens-prognos.
  
## AI-användning

- förklara hur funktionalitet kan implementeras i kod
- begreppsdefinition av  norrskens- och molnighetsdatan, samt hur den kunde användas 
- felsökning av kod
- stylingkoden, t.ex. styles, är AI-genererad och finjusterad i efterhand


# Kravspecifikationer

## Ska-krav

- realtidsdata för norrsken (fixat, dock inte realtid)
- realtidsdata för väder,åtminstone molnighet (fixat, återigen dock inte realtid)
- användarens position (fixat)
- kunna ha en eller flera platser sparade (delvis, kan söka plats men inte spara)
- kunna bestämma sannolikheten för att se norrsken (fixat)
- pushnotiser

## Bör-krav

- karta
- mörkt användargränsnitt (så att de kan användas utomhus när det är mörkt)

## Nice-to-have

- användare kan i realtid rapportera vad det ser, vilket även andra användare kan se
- modernt användargränssnitt
- norrskens-prognos? (vet inte om det är möjligt)
  
## API

Norrsken: NOAA

Väder: open-meteo
