0.6: Uusi muistiinpano
```mermaid
sequenceDiagram
    participant selain
    participant palvelin

    Note right of selain: Painetaan "save" nappia
    
    selain->>palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    palvelin-->>selain: 201 Created

    Note right of selain: Selaimen lataama JavaScript koodi määrittää muistiinpanon lähettämisen
```
