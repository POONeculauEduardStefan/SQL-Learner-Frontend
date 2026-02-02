import React from 'react';

const Course7 = () => {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl text-blue-500">Subinterogări necorelate</h2>
            <p>Subinterogările necorelate sunt fraze SELECT încorporate în clauzele WHERE, HAVING și FROM ale unei interogări (foarte foarte rar se pot intalni in ORDER BY sau in SELECT), adica ale altei fraze SELECT. Subinterogarea necorelată (denumită și interogarea interioară sau interogarea imbricată) se execută o singură dată, înaintea interogării exterioare, cea din urmă utilizând rezultatul subinterogării în general pentru a filtra.</p>
            <p>Subinterogarea are în general rolul de extrage valori din baza de date care ulterior vor servi la filtrarea altor înregistrări. Subinterogarea trebuie delimitata de fiecare data de paranteze si poate sa apară doar în partea din dreapta a operatorului de comparatie.</p>
            <p>Sintaxa este următoarea:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT ...<br />
    {"    "}FROM ...<br />
    {"    "}WHERE expr operator<br />
    {"          "}{"(SELECT ..."}<br />
    {"              "}FROM ...<br />  
    {"              "}[WHERE ...]<br />
    {"              "}{"[GROUP BY...[HAVING...]])"}<br />
    {"    "}[GROUP BY...[HAVING...]]<br />
    {"    "}[ORDER BY...]<br />
    </pre>
            </div>
            <p>Exemple:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT nume, prenume <br />
    {"    "}FROM studenti<br /> 
    {"    "}WHERE nr_matricol IN<br />
    {"          "}{"(SELECT nr_matricol"}<br />
    {"              "}FROM note<br />
    {"              "}{"WHERE valoare=10)"}<br />
    {"    "}ORDER BY nume, prenume;<br />
        <span className="text-slate-400">
        --ce returneaza interogarea de mai sus?
        </span>
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT DISTINCT nume, prenume <br />
    {"    "}FROM studenti s, note n<br /> 
    {"    "}WHERE s.nr_matricol=n.nr_matricol and valoare{">"}<br />
    {"          "}{"(SELECT MAX(valoare)"}<br />
    {"              "}FROM studenti s, note n<br />
    {"              "}{"WHERE s.nr_matricol=n.nr_matricol AND nume='Archip')"}<br />
    {"    "}ORDER BY nume, prenume;<br />
        <span className="text-slate-400">
        --ce returneaza interogarea de mai sus?
        </span>
    </pre>
            </div>
            <p>{"Dacă subinterogarea returnează o singură linie rezultat, operatorul poate fi unul standard precum >, =, >=, <, <>, <=. Dacă subinterogarea returnează mai multe linii rezultat se utilizează operatori specifici precum IN, ALL, ANY, SOME."}</p>
            <p>Într-o interogare pot fi utilizate si mai multe subinterogări:</p>
             <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT DISTINCT nume, prenume <br />
    {"    "}FROM studenti s, note n<br /> 
    {"    "}WHERE s.nr_matricol=n.nr_matricol and valoare{">"}<br />
    {"          "}{"(SELECT MAX(valoare)"}<br />
    {"              "}FROM studenti s, note n<br />
    {"              "}{"WHERE s.nr_matricol=n.nr_matricol AND nume='Archip')"}<br />
    {"      "}AND grupa=<br />
    {"          "}(SELECT grupa FROM studenti WHERE nume='Archip')<br />
    {"    "}ORDER BY nume, prenume;<br />
        <span className="text-slate-400">
        --ce returneaza interogarea de mai sus?<br />
        --ce s-ar intampla daca am avea doi studenti cu numele Archip, in grupe diferite?
        </span>
    </pre>
            </div>
            <p>Subinterogările pot returna mai multe coloane, caz în care condiția e formulată la nivel de tuplu de valori:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT DISTINCT an, grupa, nume, prenume, valoare <br />
    {"    "}FROM studenti s, note n<br /> 
    {"    "}WHERE s.nr_matricol=n.nr_matricol and (grupa,an,valoare) IN<br />
    {"          "}{"(SELECT grupa, an, MAX(valoare)"}<br />
    {"              "}FROM studenti s, note n<br />
    {"              "}WHERE s.nr_matricol=n.nr_matricol<br />
    {"              "}{"GROUP BY grupa, an)"}<br />
    {"    "}ORDER BY nume, prenume;<br />
        <span className="text-slate-400">
        --ce returneaza interogarea de mai sus?
        </span>
    </pre>
            </div>
            <h2 className="text-2xl text-blue-500">Limitarea numărului de înregistrări: pseudocoloana ROWNUM</h2>
            <p>Uneori este necesară limitarea numărului de linii returnate de o interogare. Exemplul clasic general este realizarea unor clasamente de tipul "<span className="italic">top n</span>". Pentru baza noastră de date un exemplu specific ar fi "<span className="italic">Care sunt primii trei studenți în ordinea descrescătoare a mediilor?</span>"</p>
            <p>În unele sisteme acest lucru se realizează utilizând cuvântul cheie LIMIT. În Oracle însă putem limita numărul de linii cu ajutorul pseudocoloanei ROWNUM.</p>
            <p>ROWNUM este o coloană generată dinamic în momentul procesării interogării. Pentru a o putea însă utiliza corect în interogări trebuie înțeles exact momentul în care valorile atributului ROWNUM sunt asignate. Pentru o interogare complexă în care apar toate clauzele și opțiunile învățate, ordinea procesării acestora este următoarea:</p>
            <ul className="list-disc pl-5">
                <li>înregistrările sunt aduse din tabelele specificate în clauza FROM și sunt filtrate conform clauzei WHERE (ce corespunde operatorului de selecție);</li>
                <li>ROWNUM este asignat pentru o primă linie și apoi incrementat;</li>
                <li>operatorul de proiecție corespunzător listei SELECT este aplicat;</li>
                <li>se creează grupurile conform GROUP BY;</li>
                <li>se filtrează conform HAVING;</li>
                <li>se ordonează conform ORDER BY.</li>
            </ul>
            <p>Astfel se explică de ce</p>
             <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM studenti WHERE ROWNUM>1;`}
    </pre>
            </div>
            <p>nu returnează nici o linie și</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM studenti WHERE ROWNUM<4 ORDER BY nume, prenume;`}
    </pre>
            </div>
            <p>nu returnează primii trei studenți în ordine alfabetică, așa cum ne-am fi gândit la început.</p>
            <p>Modalitatea corectă prin care putem obține primii trei studenți în ordine alfabetică a numelui și prenumelui este ca mai întâi să asigurăm efectuarea sortării și abia apoi limitarea numărului de linii:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM <br />
    {"      "}{"(SELECT * FROM studenti ORDER BY nume, prenume)"}<br /> 
    {"    "}WHERE ROWNUM{"<"}4;<br />
    </pre>
            </div>
            <p>Observatie: pot manipula pozitia in care apar valorile de null intr-o ordonare prin intermediul cuvintelor cheie "nulls first" sau "nulls last" scrise dupa clauza order by.</p>
        </div>
    );
};

export default Course7;