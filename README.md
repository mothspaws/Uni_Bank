<h3 style="text-align: center;">DSP</h3>
<h2 style="text-align: center;">Uni Bank</h2>
<h3 style="text-align: center;">Viktoriia Sergeeva</h3>
<p style="text-align: center;">20.04.2023</p>

1. Úvod

    1.1. Účel
        Cílem semestrální práce STIN je vytvoření aplikace, která simuluje komunikaci uživatele s bankou a umožňuje provádět platby a zobrazovat historii účtu. Aplikace bude se skládat z backendu a frontendu, které budou vzájemně komunikovat a nacházet se na různých zařízeních. Součásti testování budou vytvořené testovací uživatelé. Oni se budou přihlašovat do aplikace, provádět transakce a ověřovat správnost funkčností systému.

    1.2. Rozsah produktu
        1.2.1. Funkční požadavky
            <ul>
                <li>Uživatel se může přihlásit do aplikace,</li>
                <li>Uživatel může být ověřen,</li>
                <li>Uživatel může provádět platby,</li>
                <li>Uživatel může zobrazovat historii účtu,</li>
                <li>Uživatel může zobrazit jakoukoliv ze svých měn.</li>
            </ul>
        1.2.3. Použití
            Aplikace bude použitá jako výsledek semestrální práce a jako potvrzení dosazených znalosti z předmětu STIN.

    1.3. Definice, zkratky, zkratková slova
        STIN - Softwarové inženýrství,
        DSP - Dokumentace softwarového produktu,
        API - Application Programming Interface,
        REST - REpresentational State Transfer,
        SQL - Structured Query Language,
        SQLite - SQL database engine,
        Node.js - JavaScript runtime environment,
        Svelte - JavaScript framework,
        Fetch API - JavaScript API,
        HTML - HyperText Markup Language,
        CSS - Cascading Style Sheets,
        JavaScript - programovácí jazyk,
        Currency - kód měny dle ISO 4217 (EUR, USD, CZK atd.)

    1.5. Odkazy
        <ul>
            <li>[Repozitář](https://github.com/ViktoriiaSr/Uni_Bank) projektu</li>
            <li>[Zdroj](https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt?date=20.04.2022) měnového kurzu eura</li>
        </ul>

2. Celkový popis
    **Název produktu:** Uni Bank 
    **Jazyk aplikace:** angličtina 
    **Předpokládané datum dokončení:** 4.5.2023
    2.1. Perspektiva produktu
        Aplikace bude vytvořena jako webová aplikace, která bude komunikovat s backendem a databází. Backend bude vytvořen pomocí Node.js a bude komunikovat s databází pomocí knihovny SQLite. Databáze bude vytvořena pomocí jazyka SQL a bude komunikovat s backendem pomocí knihovny SQLite. Frontend bude vytvořen pomocí jazyka JavaScript a moderního frameworku Svelte a bude komunikovat s backendem pomocí Fetch API. Backend bude komunikovat s frontendem pomocí REST API.
    2.2. Funkce produktu
        <ul>
            <li>Přihlášení
                Uživatel musí zadat přihlašovací údaje.
                    Pokud v systému bude nalezen uživatel s odpovídajícími údají: 
                        - bude přesměrován na stránku s ověřením,
                        - odešle se mu email s ověřovácím kódem.
                    Pokud v systému nebude nalezen uživatel s odpovídajícími údají:
                        - uživatelovi se zobrazí chybová hláška `user was not found`.
            </li>
            <li>Ověření
                Uživatel musí zadat ověřovací kód.
                    Pokud bude ověřovací kód správný:
                        - bude přesměrován na stránku s účty.
                    Pokud bude ověřovací kód nesprávný:
                        - uživatelovi se zobrazí chybová hláška `wrong code`.
            </li>
            <li>Platba
                **Popis chování:**
                Po potvrzení platby uživatelem proběhně několik kontrol:
                <ul>
                    <li>Má-li uživatel účet v měně platby?
                    </li>
                    <li>Má-li uživatel dostatek peněz na účtu?
                        <ul>
                            <li>Pokud uživatel nemá účet v měně platby, bude provedena kontrola dostatku peněz na výchozí měně</li>
                        </ul>
                    </li>
                </ul>
                **Výchozá měna:** pro všechny uživatele je nastavena na `CZK`.
                <ul>
                    <li>Na hlavní stránce s účty je umíštěno tlačítko `payment`,</li>
                    <li>Po kliknutí na tlačítko `payment` se náhodně vygeneruje částka a měna,</li>
                    <li>Uživatel musí potvrdit nebo zamítnout platbu,</li>
                    <li>V případě úspěšné transakcí:
                        <ul>
                        <li>bude přesměrován na stránku s účty,</li>
                        <li>bodou upravena data v databázi.</li>
                        </ul>
                    </li>
                    <li>V případě neúspěšné transakce:
                        <ul>
                        <li>bude přesměrován na stránku s účty,</li>
                        <li>uživatelovi se zobrazí chybová hláška `transaction was not successful`.</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>Historie měňového kurzu
                Na hlavní strínce bude zobrazována historie tranzakcí s aktuáně zvolenou měnou.
            </li>
            <li>Zobrazení
                <ul>
                    <li>Na hlavní stránce s účty je umístěno tlačítko `change currency`,</li>
                    <li>Po kliknutí na tlačítko `change currency` se změní aktuální měna na následující uživatelskou měnu,</li>
                    <li>Uživatel může zobrazit jakoukoliv ze svých měn.</li>
                </ul>
            </li>
        </ul>
        2.2.1. Use Case diagram
            <img src="data for dsp/Uni_Bank.svg" alt="Use Case diagram" style="max-width:85%;">
    2.3. Charakteristiky uživatele
        <ul>
            <li>Uživatel bude mít přístup do aplikace pouze po přihlášení a ověření,</li>
            <li>Uživatel bude mít přístup pouze k svým účtům,</li>
            <li>Uživatel bude mít přístup pouze k svým transakcím,</li>
            <li>Uživatel bude mít přístup pouze k svým měnám.</li>
        </ul>
        
3. Systémové požadavky
    - Klient / Server
        - Každá část aplikace běží samostatně.
        - Frontend klient běží v moderním webovém prohlížeči a je napsán v JavaScriptu s využitím frameworku Svelte.
        - Backend server je napsán v jazyce JavaScript.
    - API ČNB
        - Aplikace očekává, že data z API ČNB (https://www.cnb.cz/) budou ve výměnném formátu CSV s oddělovačem `|` a s atributy:
            - První řádek je den, ke kterým všechny hodnoty náleží
            - Druhý řádek jsou atributy
                - `země` => plný název země měny
                - `měna` => plný název měny
                - `množství` => počet kusů měny, ke kterým se vztahuje cena
                - `kód` => kód měny dle ISO 4217
                - `kurz` => kurz měny s desetinnou čárkou `,` a 2 desetinnými místy
        - Pokud nebude možné z API data získat, použijou se poslední dostupná data, tj. data naposledy uložená v databázi
    - Měny
        - Data se se stahují jednou za den, automaticky na serveru ve 14:35
