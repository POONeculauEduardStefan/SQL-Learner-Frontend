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
            <p>Pentru a selecta toate liniile şi toate coloanele dintr-un tabel, poate fi executată comanda</p>
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
            <p><span className="text-[#e53935]">Observaţie:</span> Cuvântul AS este optional, în cazul în care acesta lipseste se va insera doar un spaţiu între numele vechi al coloanei ce trebuie selectat şi noul nume. Dacă numele nou al coloanei este format doar dintr-un singur cuvânt, ghilimelele pot fi omise (în fapt, ghilimelele sunt utilizate atunci când noul nume conţine spaţii, caractere speciale sau se doreşte a fi afişat case-sensitive - predefinit este afişat cu litere mari). Ca şi exemplu, încercaţi să executaţi comanda:</p>
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
            <p><span className = "text-[#e53935]">Observaţie:</span> Deşi comenzile SQL au fost scrise cu litere mari, limbajul SQL nu este unul case-sensitive. Comenzile poti fi aşadar scrise şi cu litere mici. În cadrul laboratoarelor de baze de date (în această pagină) vom scrie totuşi (sau cel puţin vom încerca) cuvintele cheie cu litere mari tocmai pentru ca voi să le puteţi diferenţia de restul obiectelor (nume de tabele, nume de câmpuri) care nu fac parte din limbaj. Singurul loc în care SQL va face totuşi diferenţa între literele mari şi cele mici este în cadrul şirurilor de caractere din diverse câmpuri ale unui tabel. De exemplu, dacă veţi încerca să executaţi 
            comanda <span className = "text-[#e53935] font-mono text-sm">SELECT * FROM cursuri WHERE titlu_curs='LOGICA';</span> , probabil nu va funcţiona (decât dacă aveţi în tabelă un curs cu denumirea "LOGICA" - scris cu litere mari).</p>
            <p><span className = "text-[#e53935]">Observaţie:</span> O comanda SQL poate fi scrisă pe mai multe rânduri. Dacă o comandă nu a fost terminată (încă) la apăsarea tastei enter, SQL*Plus va aştepta continuarea comenzii pe rândul următor. Comanda va fi considerată completă la întâlnirea simbolului punct şi virgulă.</p>
            <p>În unele cazuri, datele existente în tabele trebuie să fie modificate înainte de afişare. O serie de operatori simpli v-au fost prezentaţi în secţiunile anterioare (spre exemplu suma, produsul etc.). Dacă, spre exemplu, dorim să afişam numele studenţilor împreună cu bursa pe care aceştia o au, la care au fost adăugaţi 10ron (pentru că au primit o sponsorizare suplimentară), comanda ce va afişa sumele finale pe care studenţii le vor primi este:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume, bursa + 10 FROM studenti;`}
    </pre>
            </div>
            <p><span className = "text-[#e53935]">Observaţie:</span> Precedenţa operatorilor aritmetici este cea cunoscută din matematica de gimnaziu: înmulţirea, împărţirea, adunarea, scăderea. Pentru a schimba ordinea de executare a operaţiilor, ca şi în alte limbaje cunoscute, utilizaţi parantezele rotunde.</p>
            <h3 className="text-xl text-blue-500">Valori NULL</h3>
            <p>Uneori, anumite câmpuri pot fi lăsate fără valoare (de exemplu pentru studenţii care nu au bursă, în loc să trecem valoarea 0, nu va fi trecută nici o valoare - uneori chiar şi valoarea 0 poate avea o semnificaţie interpretabilă: spre exemplu, aceasta ar putea însemna că studentul ia de fapt bursă dar că această bursă nu poate fi acoperită din punct de vedere financiar [insert sad student image here]). Neinserarea unei valori într-un câmp va avea ca efect trecerea în acel câmp a valorii NULL (sau ’’ - şirul vid ce este reprezentat prin două apostroafe). Dacă valoarea unui câmp este nulă şi acest câmp este utilizat într-o expresie aritmetică, rezultatul va fi de asemenea o valoare nulă (se poate observa pentru cazul studenţilor ce nu aveau bursă).</p>
            <h3 className="text-xl text-blue-500">Concatenarea şirurilor de caractere</h3>
            <p>Pentru concatenarea a două şiruri de caractere se va utiliza operatorul || (două bare verticale). Prin intermediul acestuia pot fi concatenate două şiruri de caractere oarecare, un şir de caractere cu un număr, un şir de caractere cu valoarea dintr-o coloană, sau chiar două valori ce se dorește a fi tratate ca și șiruri de caractere (conversia va fi făcută automat prin utilizarea acestui operator). Rezultatul este o nouă coloană. In cazul tipurilor de date de tip char, în baza de date sunt reţinute şi spaţiile necesare ajungerii la un număr de caractere egal cu dimensiunea câmpului (de exemplu dacă într-un câmp de tip char de 10 caractere s-au introdus doar 3 caractere, automat sunt stocate 7 spaţii pentru a completa cele 10 caractere). In cazul datelor de tip varchar2 nu sunt introduse spaţii suplimentare. Să vedem un exemplu:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT 'Studentul '||nume||' '||prenume||' este inmatriculat in anul '|| an ||'.' AS info FROM studenti;`}
    </pre>
            </div>
            <p>Observaţie: Toate şirurile de caractere din SQL sunt scrise între simbolurile apostrof. Singurul loc în care se folosesc ghilimelele, pentru a grupa mai multe caractere, este atunci când dorim să creăm un alias pentru numele unei coloane.</p>
            <h3 className="text-xl text-blue-500">Afişarea anumitor rânduri</h3>
            <p>Deja am filtrat (într-un exemplu anterior) anumite rânduri - duplicatele - utilizând cuvantul cheie DISTINCT. Pentru a restricţiona şi mai mult datele ce vor fi afişate, în cadrul operaţiilor de tip SELECT, se poate utiliza clauza WHERE.</p>
            <p>Clauza WHERE este opţională şi, atunci când va fi utilizată, va fi mereu scrisă după numele tabelului din care se face selecţia şi va fi urmată de o condiţie. Vor fi selectate doar acele rânduri din tabel care satisfac condiţia impusă de clauza WHERE. Spre exemplu, am putea selecta doar studenţii din anul 1 executând comanda:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume FROM studenti WHERE an = 1;`}
    </pre>
            </div>
            <p>Condiţiile ce sunt utilizate în clauza WHERE sunt de fapt expresii booleene. Oricare dintre operatorii de comparare descrişi în secţiunile anterioare pot fi utilizaţi. Următorul exemplu va afişa toţi studenţii bursieri.</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume FROM studenti WHERE bursa IS NOT NULL;`}
    </pre>
            </div>
            <p>Condiţia ce urmează după clauza WHERE poate fi una simplă (ca cele date până acum ca exemplu) sau pot fi compuse din mai multe condiţii simple interconectate cu operatorii logici descrişi în secţiunea anterioară. Spre exemplu, dacă dorim să îi găsim pe acei studenţi din anul 1 care iau bursă, putem executa comanda:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume FROM studenti WHERE bursa IS NOT NULL AND an = 1;`}
    </pre>
            </div>
            <p><span className = "text-[#e53935]">Observaţie:</span> în evaluarea unei expresii logice compuse, precedenţa operatorilor logici este: NOT, AND, OR.</p>
            <p>Atunci când în clauza WHERE se doreşte lucru cu şiruri de caractere, un operator foarte util este operatorul LIKE. Prin intermediul acestuia putem forma expresii regulate care să ne permită selectarea anumitor informaţii chiar dacă acestea nu sunt cunoscute în întregime. În cadrul acestor expresii regulate, caracterul "%" (la sută) are semnificaţia unui grup de caractere, iar caractereul "_" (underscore) semnifică un singur caracter. Spre exemplu, dacă dorim să selectăm toţi studenţii a căror nume se termină în "escu", putem executa comanda:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume FROM studenti WHERE nume LIKE '%escu';`}
    </pre>
            </div>
            <p><span className = "text-[#e53935]">Observaţie:</span> atunci când doriţi să utilizaţi efectiv caracterul % sau caracterul _, acestea vor fi prefixate (escaped) cu caracterul \ (backslash).</p>
            <h3 className="text-xl text-blue-500">Ordonarea rezultatelor</h3>
            <p>Pentru a ordona datele selectate, se va utiliza clauza ORDER BY urmată de numele (sau numarul) câmpului după care se doreşte a fi făcută ordonarea (sau de către o funcţie aplicată unui câmp). Optional, după numele câmpului (funcţiei) poate fi adăugat unul dintre cuvintele cheie ASC, DESC pentru a forţa sortarea în mod ascendent sau descendent (predefinit, sortarea se realizează în mod ascendent).</p>
            <p>Spre exemplu, dacă dorim să sortăm studenţii în ordinea anilor de studiu, se poate executa următoarea comandă:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume, an FROM studenti ORDER BY an ASC;`}
    </pre>
            </div>
            <p>Atunci când sunt mai mulţi studenţi în acelaşi an, am putea dori să îi ordonăm şi după grupa din care fac parte. După clauza ORDER BY putem introduce oricâte câmpuri împreună cu opţiunea ce indică tipul sortării, despărţite prin virgulă. Spre exemplu:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume, an FROM studenti ORDER BY an ASC, grupa DESC;`}
    </pre>
            </div>
            <p>Putem construi interogări care să conţină ambele clauze învăţate azi: WHERE şi ORDER BY. Prima care va fi scrisă va fi clauza WHERE urmată de ORDER BY. Spre exemplu, pentru a selecta toţi studenţii din anul 1 în ordinea grupelor vom executa comanda:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume, grupa FROM studenţi WHERE an=1 ORDER BY grupa ASC;`}
    </pre>
            </div>
            <p>Deoarece numele de familie al studenţilor este al doilea câmp din tabel, ordonarea lor după acesta poate fi facută prin comanda:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM studenti ORDER BY 2;`}
    </pre>
            </div>
            <p>Deși această scriere este conform standardului SQL (și pare mai rapid de scris din cauză că sunt mai puține caractere de scris), nu o recomandăm pentru că, dacă la un moment dat cineva adaugă o coloană îinaintea coloanei a doua, sortarea s-ar putea face după altceva decât vechea coloană.</p>

            <h2 className="text-2xl text-blue-500">Operatori</h2>
            <h3 className="text-xl text-blue-500">Operatori aritmetici uzuali</h3>

            <table
            className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Operator</th>
                    <th className="text-left pr-4 border">Descriere</th>
                    <th className="text-left pr-4 border">Exemplu</th>
                </tr>
                </thead>
                <tbody className = "dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">*</td>
                    <td className="text-left pr-4 border">înmulţire - pt. tipurile numerice</td>
                    <td className="text-left pr-4 border">SELECT valoare * 5 FROM note;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">/</td>
                    <td className="text-left pr-4 border">împărţire - pt. tipurile numerice</td>
                    <td className="text-left pr-4 border">SELECT valoare / 10 FROM note;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">+</td>
                    <td className="text-left pr-4 border">adunare - pt. tipurile numerice şi DATE</td>
                    <td className="text-left pr-4 border">SELECT valoare + 1 FROM note;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">-</td>
                    <td className="text-left pr-4 border">scădere - pt. tipurile numerice şi DATE</td>
                    <td className="text-left pr-4 border">SELECT valoare-1 FROM note;</td>
                </tr>
                </tbody>
            </table>
            <p>Dacă unul dintre operanzi e NULL, rezultatul e NULL</p>
            <h3 className="text-xl text-blue-500">Operatori pentru şiruri</h3>
            <p><span className = "font-bold">||</span> - concatenare</p>
            <p>Exemplu:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT 'Numele studentului este: ' || nume FROM studenti;`}
    </pre>
            </div>
            <p>Dacă exact unul dintre operanzi e NULL, rezultatul e celălalt operand; dacă ambii operanzi sunt NULL rezultatul e NULL.</p>
            <h3 className="text-xl text-blue-500">Operatori de comparare</h3>
            <p>- returnează TRUE sau FALSE, sunt aplicabili pentru toate tipurile de date</p>

            <table
            className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Operator</th>
                    <th className="text-left pr-4 border">Descriere</th>
                    <th className="text-left pr-4 border">Exemplu</th>
                </tr>
                </thead>
                <tbody className = "dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">{"*"}<br />{">"}<br />{">="}<br />{"<"}<br />{"<="}<br />{"<>"}<br />{"!="}</td>
                    <td className="text-left pr-4 border">Operatori binari, semnificaţia uzuală</td>
                    <td className="text-left pr-4 border">SELECT nume AS "Student" FROM studenti WHERE an = 2;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">ANY, SOME</td>
                    <td className="text-left pr-4 border">Operator aplicat unei liste sau rezultatului unei interogări în conjuncţie cu unul din operatorii de comparare uzuali de mai sus, cu semnificaţia următoare: operatorul uzual primeşte ca al doilea operand fiecare din valorile din listă; returnează TRUE dacă pt. cel puţin o valoare din listă rezultatul e TRUE, altfel returnează FALSE.</td>
                    <td className="text-left pr-4 border">SELECT * FROM studenti WHERE an = SOME (2,3);</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">ALL</td>
                    <td className="text-left pr-4 border">Ca şi ANY/SOME, cu diferenţa rezultatul este TRUE doar dacă operatorul uzual returnează TRUE pentru toate valorile din listă.</td>
                    <td className="text-left pr-4 border">SELECT * FROM studenti WHERE an {">="} ALL (1, 2);</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">IN</td>
                    <td className="text-left pr-4 border">Verifică apartenenţa valorii primului operand la mulţimea specificată de al doilea operand. Este echivalent cu „=ANY”</td>
                    <td className="text-left pr-4 border">SELECT * FROM studenti WHERE prenume IN ('Adrian', 'Alex');</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">NOT IN</td>
                    <td className="text-left pr-4 border">Returnează FALSE dacă valoarea primului operand nu face parte din lista specificată de al doilea operand. Este echivalent cu „!=ANY”</td>
                    <td className="text-left pr-4 border">SELECT * FROM studenti WHERE an NOT IN (1,2);</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">BETWEEN x AND y</td>
                    <td className="text-left pr-4 border">Îl putem considera ca pe un operator ternar: returnează TRUE dacă primul operand satisface simultan condiţiile {">="}x şi {"<="}y, unde x şi y reprezentă alţi doi operanzi</td>
                    <td className="text-left pr-4 border">SELECT nume, prenume FROM studenti WHERE an BETWEEN 1 AND 3;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">LIKE</td>
                    <td className="text-left pr-4 border">Operator binar, verifică dacă primul operand este în conformitate cu un şablon specificat de al doilea operand. Şablonul este un şir de caractere, ce poate conţine unul din caracterele speciale:<br />
                                                            <span className="text-[#e53935] font-bold">%</span> semnifică orice şir de caractere, chiar şirul vid (de lungime 0)<br />
                                                            <span className="text-[#e53935] font-bold">_</span> suplineşte un singur caracter
                                                            Dacă cele două simboluri speciale trebuiesc interpretate ca atare se utilizează caracterul ESCAPE: \% şi \_</td>
                    <td className="text-left pr-4 border">SELECT nume, prenume FROM studenti WHERE an BETWEEN 1 AND 3;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">IS [NOT] NULL</td>
                    <td className="text-left pr-4 border">Operator unar. Singurul mod de test pentru null</td>
                    <td className="text-left pr-4 border">SELECT * FROM studenti WHERE bursa IS NOT NULL AND bursa {">"} 200;</td>
                </tr>
                </tbody>
            </table>

            <h3 className="text-xl text-blue-500">Operatori logici</h3>

            <table
            className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Operator</th>
                    <th className="text-left pr-4 border">Descriere</th>
                    <th className="text-left pr-4 border">Exemplu</th>
                </tr>
                </thead>
                <tbody className = "dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">NOT</td>
                    <td className="text-left pr-4 border">Operator unar reprezentând negaţia</td>
                    <td className="text-left pr-4 border">SELECT * FROM studenti WHERE NOT (bursa IS NULL);</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">AND</td>
                    <td className="text-left pr-4 border">Operator binar reprezentând ŞI-ul logic</td>
                    <td className="text-left pr-4 border">SELECT * FROM studenti WHERE an='3' AND bursa IS NOT NULL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">OR</td>
                    <td className="text-left pr-4 border">Operator binar reprezentând SAU-ul logic</td>
                    <td className="text-left pr-4 border">SELECT * FROM studenti WHERE an='3' OR bursa IS NOT NULL;</td>
                </tr>
                </tbody>
            </table>

            <h3 className="text-xl text-blue-500">Operatori logici</h3>

            <table
            className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Operator</th>
                    <th className="text-left pr-4 border">Descriere</th>
                    <th className="text-left pr-4 border">Exemplu</th>
                </tr>
                </thead>
                <tbody className="dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">UNION [ALL]</td>
                    <td className="text-left pr-4 border">Reuniunea specifică mulţimilor. Dacă ALL este specificat duplicatele nu sunt eliminate.</td>
                    <td className="text-left pr-4 border">SELECT nume FROM studenti WHERE an = '2' <br /> UNION <br /> SELECT nume FROM studenti WHERE an = '3';</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">INTERSECT [ALL]</td>
                    <td className="text-left pr-4 border">Intersecţia specifică mulţimilor, duplicatele sunt eliminate.</td>
                    <td className="text-left pr-4 border">SELECT nume FROM studenti WHERE an = 2 <br /> INTERSECT <br /> SELECT nume FROM studenti WHERE bursa IS NOT NULL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">MINUS</td>
                    <td className="text-left pr-4 border">Înregistrările distincte selectate de prima interogare care nu există în a doua interogare.</td>
                    <td className="text-left pr-4 border">SELECT nume FROM studenti WHERE an = 3 <br /> MINUS <br />SELECT nume FROM studenti WHERE bursa IS NULL;</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Course2;