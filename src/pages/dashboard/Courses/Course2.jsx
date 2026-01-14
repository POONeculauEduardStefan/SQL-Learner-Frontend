import React from 'react';

const Course2 = () => {
    return (
        <div className="flex flex-col gap-3">
            <p className="font-bold">Obiective</p>
            <ul className="list-disc pl-5">
                <li>Fraza SELECT: Operatori, clauza WHERE si ORDER BY, optiunea DISTINCT</li>
            </ul>
            <h2 className="text-2xl text-blue-500">Comanda SELECT (și clauzele WHERE, ORDER BY)</h2>
            <h3 className="text-xl text-blue-500">Selectarea datelor dintr-un tabel</h3>
            <p>Atunci când se execută o comandă de tip SELECT, pot fi preluate din baza de date un număr de linii (numite si inregistrari), un număr de coloane (numite si campuri sau atribute) sau o combinaţie între cele două.</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM nume_tabel;`}
    </pre>
            </div>
            <p>Exerciţiu: selectaţi toate liniile şi toate coloanele din tabelul studenti.</p>
            <p>Aceasta comanda furnizează, de obicei, mai multe informaţii decât sunt necesare. Pentru a prelua doar anumite coloane, simbolul asterisc va fi inlocuit cu numele coloanelor ce se doresc a fi preluate, despărţite prin virgulă. Un exemplu este preluarea doar a numelor şi prenumelor studenţilor înscrişi la facultate, executând comanda:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume FROM studenti;`}
    </pre>
            </div>
            <p>Atunci când, dintr-un anumit motiv, denumirea coloanei nu este reprezentativă la afișare, aceasta poate fi modificată în timpul exprimării comenzii SELECT prin definirea unui alias. Pentru aceasta se va folosi cuvântul cheie "AS" după numele coloanei ce trebuie redenumită, urmat de numele nou al coloanei. În cazul în care noua denumire este formată din mai multe cuvinte, aceasta trebuie să fie incadrată între simbolurile ghilimele. Spre exemplu, următoarea comandă va redenumi numele coloanei "nume" din tabelul profesori în "Nume Profesor":</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume AS "Nume Profesor" FROM profesori;`}
    </pre>
            </div>
            <p>Observaţie: Cuvântul AS este optional, în cazul în care acesta lipseste se va insera doar un spaţiu între numele vechi al coloanei ce trebuie selectat şi noul nume. Dacă numele nou al coloanei este format doar dintr-un singur cuvânt, ghilimelele pot fi omise (în fapt, ghilimelele sunt utilizate atunci când noul nume conţine spaţii, caractere speciale sau se doreşte a fi afişat case-sensitive - predefinit este afişat cu litere mari). Ca şi exemplu, încercaţi să executaţi comanda:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume profesor FROM profesori;`}
    </pre>
            </div>
            <p>Daca sunt mai multe înregistrări similare, toate acestea vor fi afişate, de exemplu dacă se doreşte aflarea anilor de studiu în care sunt înscrişi studenţii executați interogarea:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT an FROM studenti;`}
    </pre>
            </div>
            <p>Atunci când avem mai mulţi studenţi înmatriculaţi, acest an de studiu va fi afişat pentru fiecare student în parte. Cum nu ne interesează să fie afişat de mai multe ori anul 1 (doar pentru ca avem mai mulţi studenţi înscrişi în primul an), vom utiliza clauza "DISTINCT" în cadrul comenzii SELECT tocmai pentru a restricţiona preluarea din baza de date doar a datelor unice (duplicatele vor fi eliminate). Executaţi aşadar comanda:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT DISTINCT an FROM studenti;`}
    </pre>
            </div>
            <p>Criteriul DISTINCT poate fi utilizat şi pentru mai multe câmpuri selectate simultan. Spre exemplu, următoarea interogare ne va returna doar combinaţiile unice în tabel:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT DISTINCT an, grupa FROM studenti;`}
    </pre>
            </div>
            <p>Echivalent se poate folosi UNIQUE in locul lui DISTINCT:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT UNIQUE an, grupa FROM studenti;`}
    </pre>
            </div>
            <p>Observaţie: Deşi comenzile SQL au fost scrise cu litere mari, limbajul SQL nu este unul case-sensitive. Comenzile poti fi aşadar scrise şi cu litere mici. În cadrul laboratoarelor de baze de date (în această pagină) vom scrie totuşi (sau cel puţin vom încerca) cuvintele cheie cu litere mari tocmai pentru ca voi să le puteţi diferenţia de restul obiectelor (nume de tabele, nume de câmpuri) care nu fac parte din limbaj. Singurul loc în care SQL va face totuşi diferenţa între literele mari şi cele mici este în cadrul şirurilor de caractere din diverse câmpuri ale unui tabel. De exemplu, dacă veţi încerca să executaţi comanda SELECT * FROM cursuri WHERE titlu_curs='LOGICA'; , probabil nu va funcţiona (decât dacă aveţi în tabelă un curs cu denumirea "LOGICA" - scris cu litere mari).</p>
        </div>
    );
};

export default Course2;