import React from 'react';

const Course1 = () => {
    return (
        <div className="flex flex-col gap-3">
            <p className="font-bold">Obiective</p>
            <ul className="list-disc pl-5">
                <li>Înțelegerea modelului relațional al bazelor de date</li>
                <li>Realizarea unei imagini de ansamblu asupra limbajului SQL</li>
            </ul>
            <h2 className="text-2xl text-blue-500">Modelul relațional.</h2>
            <ul className="list-disc pl-5">
                <li>este un model simplu, cu implementări foarte eficiente şi un limbaj de interogare (SQL) descriptiv
                    simplu si expresiv;
                </li>
                <li>propus in anii '70 de catre Edgar Frank Codd, se regaseste in cele mai populare sisteme de gestiune
                    de baze de date: http://db-engines.com/en/ranking_trend
                </li>
            </ul>
            <p>Elemente:</p>
            <ul className="list-disc pl-5">
                <li>Baza de date constă dintr-o multime de tabele/relaţii</li>
                <li>Fiecare tabel/relaţie are un nume unic in baza de date şi conţine un set de
                    coloane/atribute/câmpuri
                </li>
                <li>Fiecare atribut are un nume unic in tabelul la care aparţine si are asociat tip/domeniu din care
                    poate lua valori
                </li>
                <li>Fiecare linie/înregistrare/tuplu din tabel conţine valori pentru toate atributelee</li>
                <li>Ordinea liniilor/tuplelor nu are semnificaţi</li>
            </ul>
            <p><span className="font-bold">Schema bazei de date relaţionale</span> reprezintă descrierea structurală a
                tabelelor în baza de date.</p>
            <p><span className="font-bold">Instanţa bazei de date</span> reprezintă conţinutul bazei de date la un
                anumit moment</p>
            <p><span className="font-bold">NULL</span> – este o valoare specială utilizată când nu se cunoaşte (sau e
                nedefinită) valoarea unui atribut
                pentru o înregistrare.</p>
            <p><span className="font-bold">Cheie candidat</span> – un atribut care are valori unice pentru fiecare
                înregistrare</p>
            <p>- sau un set de atribute ale căror valori combinate sunt unice, minimală în raport cu această proprietate
                (nici o submulţime nu e cheie); dacă nu este îndeplinită proprietatea de mulţime minimală avem de a face
                cu o supercheie</p>
            <p><span className="font-bold">Cheie primară</span> – una dintre cheile candidat aleasă pentru a identifica
                în mod unic înregistrările din
                tabel; nici un atribut implicat nu poate avea valoarea NULL</p>
            <p><span className="font-bold">Cheie alternativă</span> – cheie candidat care nu a fost aleasă drept cheie
                primară</p>
            <p><span className="font-bold">Cheie străină</span> – un atribut sau un set de atribute dintr-o relaţie care
                are corespondent o cheie candidat
                a altei relaţii ( sau chiar a relaţiei curente, caz în care o numim cheie străină recursivă).</p>
            <p>Obţinerea de informaţii din baza de date se realizează cu ajutorul interogărilor SQL. Rezultatul unei
                interogări este un nou tabel</p>
            <p className="font-bold">Algebra relaţională</p>
            <ul className="list-disc pl-5">
                <li>Un limbaj formal</li>
                <li>Operatorii de bază din algebra relaţională: selecţie, proiecţie, produs cartezian, intersecţie,
                    diferenţă, redenumire
                </li>
                <li>Bazată pe mulţimi (duplicatele se elimină)</li>
            </ul>
            <h2 className="text-2xl text-blue-500">Limbajul SQL</h2>
            <p>SQL - Structured Query Language</p>
            <ul className="list-disc pl-5">
                <li>limbajul utilizat în manipularea bazelor de date relaţionale</li>
                <li>un limbaj esenţial declarativ; exprimă ce se doreşte de la baza de date, nu şi cum se obţine
                    rezultatul
                </li>
                <li>un limbaj implementat cu fundamente în algebra relaţională (semantica este definită cu ajutorul
                    algebrei relaţionale), bazat pe multi-seturi (nu se elimină duplicatele)
                </li>
                <li>deşi considerat un limbaj de programare non-procedural, majoritatea SGBD-urilor relaţionale oferă şi
                    extensii procedurale.
                </li>
            </ul>
            <p>Limbajul SQL a fost pentru prima dată standardizat de către Organizaţia Internaţională pentru
                Standardizare (ISO) în anul 1987. De atunci limbajul a suferit modificări/îmbunătăţiri în mai multe
                rânduri, ultima versiune stabilă fiind SQL:2016.</p>
            <p>Deşi standardizat la nivel internaţional, fiecare dezvoltator de baze de date a modificat şi a extins
                versiunea standard pentru a exploata avantajele oferite de implementarea particulară a produsului
                propriu. Datorită dimensiunii mari şi a complexităţii standardului cei mai mulţi dezvoltatori nu l-au
                implementat în totalitate. Vice-versa, standardul nu specifică comportamentul bazei de date în anumite
                situaţii, decizille ramânând la latitudinea dezvoltatorilor. Se vorbeşte astfel de dialecte SQL.
                Rezultatul este apariţia de incompatibilităţi între SGBD-uri relaţionale diferite. Unele
                incompatibilităţi sunt intenţionat păstrate de dezvoltatori cu scopul de fidelizare a clienţilor.</p>
            <p>Declaraţia de conformitate Oracle cu standardul ISO SQL:2008 poate fi studiată la adresa</p>
            <p>https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/Oracle-and-Standard-SQL.html#GUID-330DEBBB-006E-4B35-A516-5C0AEFFE06B9</p>
            <p>În continuare sunt listate în forma Backus-Naur cele mai uzuale comenzi SQL. Convenţiile de sintaxă în
                acest format sunt următoarele:</p>
            <ul className="list-disc pl-5">
                <li>{'<>'} reprezintă o variabilă de substituţie</li>
                <li>| reprezintă disjuncţia</li>
                <li>[…] reprezintă elemente opţionale</li>
                <li>{'{…|…|…}'} reprezintă exact un element din listă</li>
            </ul>
            <h2 className="text-2xl text-blue-500">Comenzi DDL (de definire a datelor)</h2>
            <h3 className="text-xl text-blue-500">Crearea tabelelor</h3>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`CREATE [{GLOBAL | LOCAL} TEMPORARY] TABLE
        <nume_tabel>
            (<nume_coloană1> data_type [constrângeri]
            [,<nume_coloana2> data_type [constrângeri]]
            […]
            )
            [ ON COMMIT { DELETE | PRESERVE } ROWS ]`}
    </pre>
            </div>
            <p>Opţiunea TEMPORARY specifică crearea unui tabel temporar, care îşi păstrează conţinutul doar pe durata
                unei tranzacţii (până la apariţia comenzii COMMIT) sau pe parcursul unei sesiuni (opţiunea ON COMMIT
                PRESERVE ROWS). În Oracle există doar varianta GLOBAL a tabelelor temporare: definiţia tabelului
                temporar este vizibilă din toate sesiunile de lucru însă accesul la date este privat (datele inserate
                intr-o sesiune pot fi accesate doar din sesiunea respectivă).</p>
            <h3 className="text-xl text-blue-500">Ştergerea unui tabel</h3>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`DROP TABLE <nume_tabel> [CASCADE CONSTRAINTS]`}
    </pre>
            </div>
            <p>CASCADE permite ştergerea unui tabel care e referenţiat de un VIEW sau de chei străine şi şterge view-ul
                şi restricţia de tip cheie străină.</p>
            <p>În Oracle sintaxa pentru ştergerea tabelelor este:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`DROP TABLE <nume_tabel> [CASCADE CONSTRAINTS] [PURGE]`}
    </pre>
            </div>
            <p>În Oracle tabelele şterse sunt reciclate dacă nu este specificată opţiunea PURGE, ele putând fi
                recuperate cu comanda:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`FLASHBACK TABLE <nume_tabel>   TO 
     { { SCN | TIMESTAMP } expr 
     [ { ENABLE | DISABLE } TRIGGERS ] | 
     BEFORE DROP [ RENAME TO  ]} `}
    </pre>
            </div>
            <h2 className="text-2xl text-blue-500">Comenzi DML (de manipulare a datelor)</h2>
            <h3 className="text-xl text-blue-500">Inserarea înregistrărilor</h3>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`INSERT INTO <nume_tabel> 
            [ (lista_coloane) ]
            VALUES (lista_valori)`}
    </pre>
            </div>
            <h3 className="text-xl text-blue-500">Actualizarea valorilor</h3>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`UPDATE <nume_tabel>
      SET <nume_coloana1> = valoare1
          [, <nume_coloana2> = valoare2...]
          [WHERE conditie]`}
    </pre>
            </div>
            <h3 className="text-xl text-blue-500">Ştergerea înregistrărilor</h3>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`DELETE FROM <nume_tabel> 
      [WHERE conditie]`}
    </pre>
            </div>
            <h3 className="text-xl text-blue-500">Interogarea bazei de date</h3>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT [DISTINCT | ALL] {* | [expresie_coloana [AS ]] [,...] }
       FROM <nume_tabel> [alias] [, ...]
       [WHERE conditie]
       [GROUP BY lista_coloane] [HAVING conditie]
       [ORDER BY exp1 [ASC/DESC] [,exp2...]]`}
    </pre>
            </div>
            <h2 className="text-2xl text-blue-500">Tipuri de date (în Oracle)</h2>
            <table
            className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Tip</th>
                    <th className="text-left pr-4 border">Proprietăţi</th>
                </tr>
                </thead>
                <tbody className = "dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">CHAR(n)</td>
                    <td className="text-left pr-4 border">Şiruri de lungime fixă n (1 caracter e stocat pe 1 octet). Dacă valorile introduse au mai puţine caractere se adaugă blanks (spaţii) la sfarşit ; dacă valorile introduse conţin mai multe caractere apare eroare (VALUE_ERROR)</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">VARCHAR2(n)</td>
                    <td className="text-left pr-4 border">Şiruri de lungime variabilă, n este lungimea maximă. Este indicat a fi folosit cand valorile pentru un atribut diferă ca lungime fiindcă se consumă un număr de octeţi egal cu numărul de caractere din şir</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">NUMBER</td>
                    <td className="text-left pr-4 border">Corespunde numerelor în virgulă fixă şi mobilă. Numere în intervalul (-10<sup>126</sup>, 10<sup>126</sup>), infinit (pozitiv şi negativ)</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">NUMBER(n1, n2)</td>
                    <td className="text-left pr-4 border">Numere ce conţin în total n1 zecimale semnificative, n2 precizând numărul de cifre de la punctual zecimal până la cea mai puţin semnificativă cifră. n2 poate lua valori negative, caz în care se face rotunjirea pe numărul de poziţii specificate în stânga punctului zecimal. Ex. pentru tipul NUMBER(5,-2), introducerea valorii 12345 generează valoarea 12300 iar pentru 12399 generează 12400</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">DATE</td>
                    <td className="text-left pr-4 border">Reprezintă un moment de timp stocând anul, luna, ziua, orele minutele şi secundele</td>
                </tr>
                <tr>
                    <td className="align-top pr-4 border">LOB (large object):
                        BLOB, CLOB, NCLOB, BFILE</td>
                    <td className="align-top pr-4 border">Permit stocarea în format binar sau caracter a datelor nestructurate precum text, imagini, videoclipuri…</td>
                </tr>
                </tbody>
            </table>
            <p>Pentru compatibilitate cu alte sisteme, Oracle suportă şi tipuri precum: decimal, integer, smallint, real; reprezentarea lor internă este însă definită de formatul tipului number.</p>
            <p>O listă completă găsiți la adresa: http://download.oracle.com/docs/cd/B19306_01/server.102/b14200/sql_elements001.htm sau la https://docs.oracle.com/cd/E11882_01/appdev.112/e25519/predefined.htm#LNPLS2047</p>
            <p><span className="font-bold">{'NULL'}</span> este o valoare specială care semnifică lipsa informaţiei. Ambele teste {'NULL'}={'NULL'} şi {'NULL'}{'<>'}{'NULL'} returnează FALSE. Verificarea (in)egalităţii cu {'NULL'} se face utilizând IS [NOT] {'NULL'}.</p>
            <h2 className="text-2xl text-blue-500">Schema bazei de date - studiu de caz</h2>
            <p>Fiecare facultate a unei universităţi are nevoie să-şi facă managementul intern al studenţilor pe care îi are. Spre exemplu, un aspect important în cadrul secretariatului este cunoaşterea notelor pe care studenţii le-au luat la diversele materii pe care le-au studiat. Pe baza acestor informaţii, se poate decide dacă studentul va avea sau nu bursă, dacă va primi sau nu cazare în anul ce urmează sau daca va trebui să repete o anumită materie. Deşi aceste informaţii sunt disponibile în format clasic, în cataloage, este mult mai uşor de lucrat cu un număr mare de studenţi atunci când aceştia sunt stocaţi într-o bază de date.</p>
            <p>În afara informaţiilor referitoare la studenţi (nume, prenume, anul în care sunt înmatriculaţi, etc.) ce ar putea forma o tabelă într-o bază de date, şi alte informaţii precum notele sau numele cursurilor la care au participat trebuie să fie stocate. Nu este natural ca aceste informaţii să fie stocate împreună cu informaţiile personale ale studentului (de exemplu din cauză ca participarea la doua cursuri diferite ar presupune introducerea de doua ori - ca şi înregistrari diferite în tabelă - a aceloraşi informaţii privitoare la student) şi din acest motiv sunt necesare tabele suplimentare.</p>
            <p>În cadrul laboratorului de baze de date, vom folosi tabelele studenti, cursuri, note şi profesori, ce au urmatoarele structuri:</p>
            <p>Tabela studenti:</p>
            <ul className="list-disc pl-5">
                <li>nr_matricol - câmp alfanumeric de 6 caractere ce nu poate fi null;</li>
                <li>nume - câmp alfanumeric, variabil ca dimensiune dar având maxim 10 caractere ce nu poate fi null;</li>
                <li>prenume - câmp alfanumeric, variabil ca dimensiune dar având maxim 10 caractere;</li>
                <li>an - câmp numeric ce poate reţine numere formate doar dintr-o singură cifră;</li>
                <li>grupa - câmp alfanumeric de 2 caractere;</li>
                <li>bursa - câmp numeric ce poate ţine minte valori reale formate din 4 cifre înainte de virgulă şi două cifre după;</li>
                <li>data_nastere - câmp de tip dată calendaristică.</li>
            </ul>
            <p>Tabela cursuri:</p>
            <ul className="list-disc pl-5">
                <li>id_curs - câmp alfanumeric de 4 caractere ce nu poate fi null;</li>
                <li>titlu_curs - câmp alfanumeric, variabil ca dimensiune dar având maxim 10 caractere ce nu poate fi null;</li>
                <li>an - câmp numeric ce poate reţine numere formate doar dintr-o singură cifră;</li>
                <li>semestru - câmp numeric ce poate reţine o cifra;</li>
                <li>credite - câmp numeric ce poate reţine numere formate din două cifre.</li>
            </ul>
            <p>Tabela note:</p>
            <ul className="list-disc pl-5">
                <li>nr_matricol - câmp alfanumeric de 6 caractere ce nu poate fi null;</li>
                <li>id_curs - câmp alfanumeric de 4 caractere ce nu poate fi null;</li>
                <li>valoare - câmp numeric ce poate reţine numere formate din două cifre;</li>
                <li>data_notare - câmp de tip dată calendaristică.</li>
            </ul>
            <p>Tabela profesori:</p>
            <ul className="list-disc pl-5">
                <li>id_curs - câmp alfanumeric de 4 caractere ce nu poate fi null;</li>
                <li>nume - câmp alfanumeric, fix ca dimensiune având 10 caractere ce nu poate fi null;</li>
                <li>prenume - câmp alfanumeric, fix ca dimensiune având 10 caractere;</li>
                <li>grad_didactic - câmp alfanumeric, variabil ca dimensiune dar având maxim 5 caractere.</li>
            </ul>
            <p>Tabela didactic</p>
            <ul className="list-disc pl-5">
                <li>id_prof - câmp alfanumeric de 4 caractere ce nu poate fi null;</li>
                <li>id_curs - câmp alfanumeric de 4 caractere ce nu poate fi null.</li>
            </ul>
            
            <p className="text-[#0f9d58]">1. Creaţi aceste tabele utilizând contul student.</p>
            <p className="text-[#0f9d58]">2. Inseraţi în baza de date nou creată un student Popescu Ionut, 
                proaspat înmatriculat în anul 2 care a luat nota 10 la 
                materia Logica pentru informatica 
                predata de Cristian Masalagiu în primul semestru din anul 1.</p>
            <p className="text-[#0f9d58]">3. Executaţi comanda de mai jos pentru a rula un script de creare care are rolul de a 
                    crea toate tabelele de mai sus şi de a le popula cu date. Studiati continutul scriptului.</p>
            
            <p>Executaţi comanda:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
                <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    {`@ C:/temp/facultate.sql`}
                </pre>
            </div>

            <p>Pentru a vedea care sunt tabelele unui utilizator se va executa:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
                <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    {`SELECT table_name FROM user_tables;`}
                </pre>
            </div>

            <p>Pentru a vedea care este structura unei tabele (în cazul în care aţi uitat spre exemplu din cate litere poate fi format numele de familie 
                al unui student), puteti executa comanda SQL*Plus describe:</p>
            
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
                <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
                    {`DESCRIBE nume_tabel`}
                </pre>
            </div>

        </div>
    );
};

export default Course1;