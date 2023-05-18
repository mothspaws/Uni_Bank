<h3 style="text-align: center;">DSP</h3>
<h2 style="text-align: center;">Uni Bank</h2>
<h3 style="text-align: center;">Viktoriia Sergeeva</h3>
<p style="text-align: center;">20.04.2023</p>

1. Úvod

	1.1. Účel
         Cílem semestrální práce STIN je vytvoření aplikace, která simuluje komunikaci uživatele s bankou a umožňuje provádět platby a zobrazovat historii účtu. Aplikace bude se skládat z backendu a frontendu, které budou vzájemně komunikovat a nacházet se na různých zařízeních. Součásti testování budou vytvořené testovací uživatelé. Oni se budou přihlašovat do aplikace, provádět transakce a ověřovat správnost funkčností systému.

    1.2. Rozsah produktu
    
	1.2.1. Funkční požadavky
		- Uživatel se může přihlásit do aplikace,
		- Uživatel může být ověřen,
		- Uživatel může provádět platby,
		- Uživatel může zobrazovat historii účtu,
		- Uživatel může zobrazit jakoukoliv ze svých měn.

	1.2.2. Použití
		Aplikace bude použitá jako výsledek semestrální práce a jako potvrzení dosazených znalosti z předmětu STIN.

    1.3. Definice, zkratky, zkratková slova
    <ul>
        <li>STIN - Softwarové inženýrství,</li>
        <li>DSP - Dokumentace softwarového produktu,</li>
        <li>API - Application Programming Interface,</li>
        <li>REST - REpresentational State Transfer,</li>
        <li>SQL - Structured Query Language,</li>
        <li>SQLite - SQL database engine,</li>
        <li>Node.js - JavaScript runtime environment,</li>
        <li>Svelte - JavaScript framework,</li>
        <li>Fetch API - JavaScript API,</li>
        <li>HTML - HyperText Markup Language,</li>
        <li>CSS - Cascading Style Sheets,</li>
        <li>JavaScript - programovácí jazyk,</li>
        <li>Currency - kód měny dle ISO 4217 (EUR, USD, CZK atd.)</li>
    </ul>

    1.4. Odkazy
        <ul>
            <li>[Repozitář](https://github.com/ViktoriiaSr/Uni_Bank) projektu</li>
            <li>[Zdroj](https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt?date=20.04.2022) měnového kurzu eura</li>
        </ul>

2. Celkový popis

    **Název produktu:** Uni Bank
     
    **Jazyk aplikace:** angličtina 
    
    **Předpokládané datum dokončení:** 18.5.2023
    
    2.1. Perspektiva produktu
        Aplikace bude vytvořena jako webová aplikace, která bude komunikovat s backendem a databází. Backend bude vytvořen pomocí Node.js a bude komunikovat s databází pomocí knihovny SQLite. Databáze bude vytvořena pomocí jazyka SQL a bude komunikovat s backendem pomocí knihovny SQLite. Frontend bude vytvořen pomocí jazyka JavaScript a moderního frameworku Svelte a bude komunikovat s backendem pomocí Fetch API. Backend bude komunikovat s frontendem pomocí REST API.

    2.2. Funkce produktu
	- Přihlášení
	    Uživatel musí zadat přihlašovací údaje. Pokud v systému bude nalezen uživatel s odpovídajícími údají: - bude přesměrován na stránku s ověřením, - odešle se mu email s ověřovácím kódem. Pokud v systému nebude nalezen uživatel s odpovídajícími údají: - uživatelovi se zobrazí chybová hláška `user was not found`.
	    
	- Ověření
	    Uživatel musí zadat ověřovací kód. Pokud bude ověřovací kód správný: - bude přesměrován na stránku s účty. Pokud bude ověřovací kód nesprávný: - uživatelovi se zobrazí chybová hláška `wrong code`.
	    
	- Platba
	    **Popis chování:** Po potvrzení platby uživatelem proběhně několik kontrol:
	    -   Má-li uživatel účet v měně platby?
	    -   Má-li uživatel dostatek peněz na účtu?
	        -   Pokud uživatel nemá účet v měně platby, bude provedena kontrola dostatku peněz na výchozí měně
	    	 **Výchozá měna:** pro všechny uživatele je nastavena na `CZK`.
	    
	    -   Na hlavní stránce s účty je umíštěno dva polí a zlačítko `pay`,
		-   Do prvního pole se uživatel napíše částku,
		-   V druhém poli si uživatel vybere měnu platby,
		-   Po zadání všech údajů platby se umožní stisknutí tlačítka `pay`,
		-   Po kliknutí na tlačítko `pay`:
			-   V případě úspěšné transakcí:
				-   bude přesměrován na stránku s účty,
				-   bodou upravena data v databázi.
			-   V případě neúspěšné transakce se uživatelovi zobrazí chybová hláška transaction was not successful.
-   Historie měňového kurzu
    Na hlavní strínce bude zobrazována historie tranzakcí s aktuáně zvolenou měnou.
-   Zobrazení
    -   Na hlavní stránce s účty je umístěno tlačítko `change currency`,
    -   Po kliknutí na tlačítko `change currency` se změní aktuální měna na následující uživatelskou měnu,
    -   Uživatel může zobrazit jakoukoliv ze svých měn.

    2.2.1. Use Case diagram
		![[data for dsp/Uni_Bank.svg|470]]
	2.2.1. SQLite schéma
		![[img_sql.png|400]]
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

4. Odhad čásové náročnosti 
	Odpověď ze serveru by měla trvat 8-10 ms.