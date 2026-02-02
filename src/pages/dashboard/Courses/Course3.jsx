import React from 'react';

const Course3 = () => {
    return (
        <div className="flex flex-col gap-3">
            <p className="font-bold">Obiective</p>
            <ul className="list-disc pl-5">
                <li>Lucrul cu funcții linie în SQL</li>
            </ul>
            <h2 className="text-2xl text-blue-500">Funcții linie</h2>
            <p>Funcţiile de tip linie sunt funcţii care, utilizate în interogări, sunt apelate pentru fiecare linie și returnează un rezultat pe linie pentru tabelul interogat. Argumentul funcțiilor poate fi o simplă constantă dată de utilizator, numele unei variabile, numele unei coloane sau o expresie.</p>
            <p>Pot fi utilizate în cadrul listei SELECT, în clauzele WHERE, ORDER BY.</p>
            <p>Apelate cu argument NULL funcţiile returnează NULL. Excepţie fac CONCAT, NVL, REPLACE şi REGEXP_REPLACE.</p>
            <p>Cele mai multe dintre funcțiile listate în continuare sunt specifice dialectului SQL de la Oracle.</p>
            <h3 className="text-xl text-blue-500">Funcții numerice</h3>
            <p>primesc ca argument şi returnează date de tip numeric</p>
            <table
                className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                    className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Functia</th>
                    <th className="text-left pr-4 border">Descriere</th>
                    <th className="text-left pr-4 border">Exemplu</th>
                </tr>
                </thead>
                <tbody className = "dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">CEIL(n)</td>
                    <td className="text-left pr-4 border">Rotunjeşte superior pe n</td>
                    <td className="text-left pr-4 border">SELECT CEIL(51.3) FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">FLOOR(n)</td>
                    <td className="text-left pr-4 border">Rotunjeşte inferior pe n</td>
                    <td className="text-left pr-4 border">SELECT FLOOR(51.3) FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">ROUND(n [,m])</td>
                    <td className="text-left pr-4 border">Rotunjeşte pe n la m zecimale. Implicit m este 0, echivalent cu rotunjirea la cel mai apropiat întreg. m poate fi şi negativ.</td>
                    <td className="text-left pr-4 border">SELECT ROUND(21.365,2) AS "Rotunjire - pozitiv", ROUND (21.665,-1) AS " Rotunjire - negativ " FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">TRUNC(n [,m])</td>
                    <td className="text-left pr-4 border">Trunchează pe n la m zecimale; implicit m e 0; m poate fi şi negativ.</td>
                    <td className="text-left pr-4 border">SELECT TRUNC(21.365,2) AS "Trunchiere - pozitiv", TRUNC(21.665,-1) AS " Trunchiere - negativ" FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="align-top pr-4 border">MOD(m, n)</td>
                    <td className="text-left pr-4 border">Returnează restul împărţirii lui m la n</td>
                    <td className="text-left pr-4 border">SELECT MOD (26,11) AS "Mod" FROM DUAL;</td>
                </tr>
                </tbody>
            </table>
            <p>La acestea se mai adaugă funcţiile trigonometrice uzuale (COS(n), ACOS(n), SIN(n), ASIN(n), TAN(n), ATAN(n)), funcţiile de calcul de logaritmi (LN(n), LOG(base, n)), ridicarea la putere (EXP(n), POWER(m,n)), rădăcina pătrată (SQRT(n)).</p>
            <h2 className="text-2xl text-blue-500">Funcţii ce iau ca argument date caracter şi returnează valori numerice</h2>
            <table
                className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                    className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Functia</th>
                    <th className="text-left pr-4 border">Descriere</th>
                    <th className="text-left pr-4 border">Exemplu</th>
                </tr>
                </thead>
                <tbody className = "dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">LENGTH(char)</td>
                    <td className="text-left pr-4 border">Returneză lungimea şirului char.</td>
                    <td className="text-left pr-4 border">SELECT LENGTH('cuvant') AS "Lungime cuvant" FROM DUAL; <br />SELECT prenume, LENGTH(prenume) FROM profesori WHERE UPPER(TRIM(prenume))='COSMIN'; -- de ce 10?</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">ASCII(char)</td>
                    <td className="text-left pr-4 border">Returnează codul ASCII al primului character din şir</td>
                    <td className="text-left pr-4 border">SELECT ASCII('A') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">INSTR(char1, char2 [, n [, m ]])</td>
                    <td className="text-left pr-4 border">Caută a m-a apariţie a şirului char2 în şirul char1 începând căutarea de la poziţia n; returnează poziţia în char1 a primului caracter din subşirul identificat. Implicit n şi m sunt 1. Dacă nu se identifică nici o apariţe rezultatul este 0.</td>
                    <td className="text-left pr-4 border">SELECT INSTR('CORPORATE FLOOR','OR',3,2) AS "Instring" FROM DUAL;<br />SELECT nume, INSTR(nume,'ra') FROM profesori;</td>
                </tr>
                </tbody>
            </table>

            <h2 className="text-2xl text-blue-500">Funcţii ce iau ca argument date caracter și returnează date de tip caracter</h2>

            <table
                className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                    className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Functia</th>
                    <th className="text-left pr-4 border">Descriere</th>
                    <th className="text-left pr-4 border">Exemplu</th>
                </tr>
                </thead>
                <tbody className = "dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">INITCAP(char)</td>
                    <td className="text-left pr-4 border">Prima literă a fiecărui cuvânt e transformată în majusculă.</td>
                    <td className="text-left pr-4 border">SELECT INITCAP('prima litera majuscula') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">UPPER(char)</td>
                    <td className="text-left pr-4 border">Returnează şirul char rescris cu majuscule</td>
                    <td className="text-left pr-4 border">SELECT UPPER('Stefan') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">LOWER(char)</td>
                    <td className="text-left pr-4 border">Returnează şirul char rescris cu litere mici</td>
                    <td className="text-left pr-4 border">SELECT LOWER('LOWER') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">REVERSE(char)</td>
                    <td className="text-left pr-4 border">Returnează şirul char rescris de la coadă la cap</td>
                    <td className="text-left pr-4 border">SELECT REVERSE('OREZ') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">CONCAT(char1, char2)</td>
                    <td className="text-left pr-4 border">Concatenează şirurile argument echivalent cu operatorul de concatenare</td>
                    <td className="text-left pr-4 border">SELECT CONCAT( CONCAT(nume, ' este student in anul '), an) FROM studenti;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">SUBSTR(char, m [, n ])</td>
                    <td className="text-left pr-4 border">Extrage din şirul char n caractere începând de la poziţia m; omisiunea lui n semnifică finalul şirului; o valoare negativă pentru m semnifică numărarea de la stânga la dreapta</td>
                    <td className="text-left pr-4 border">SELECT SUBSTR('ABCDEFG',3,4) FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">RPAD(char1,n [,char2 ])</td>
                    <td className="text-left pr-4 border">Returnează char1 cu spaţii adăugate la dreapta până la lungimea n, dacă se omite char2; altfel char2 este copiat de oricâte ori e nevoie pentru a completa char1 până la lungimea n</td>
                    <td className="text-left pr-4 border">SELECT RPAD(nume,12,'ab') FROM studenti WHERE nume = 'Popescu';</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">LPAD(char1,n [,char2 ])</td>
                    <td className="text-left pr-4 border">Similar RPAD cu diferenţa că alipirea se face la stânga</td>
                    <td className="text-left pr-4 border">SELECT LPAD('Pagina',15,'*.') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">CHR(n)</td>
                    <td className="text-left pr-4 border">Returnează caracterul corespunzător codului n, ca tip VARCHAR2</td>
                    <td className="text-left pr-4 border">SELECT CHR(68)||CHR(65)||CHR(84)||CHR(69) FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">TRIM(char)</td>
                    <td className="text-left pr-4 border">Elimină spaţiile goale de la inceputul şi sfârşitul textului</td>
                    <td className="text-left pr-4 border">SELECT '-'||TRIM('   test   ')||'-' AS "Fara spatii" FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">LTRIM(char)</td>
                    <td className="text-left pr-4 border">Elimină spaţiile goale de la inceputul textului</td>
                    <td className="text-left pr-4 border">SELECT '-'||LTRIM('   test   ')||'-' AS "Fara spatiile de la inceput" FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">REPLACE(char, search_string [, replacement_string])</td>
                    <td className="text-left pr-4 border">Returnează şirul char în care subşirul search_string este înlocuit de replacement_string; absenţa ultimului reprezintă ştergerea tuturor apariţiilor subşirului căutat</td>
                    <td className="text-left pr-4 border">SELECT REPLACE('Andrei','i','ea') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">TRANSLATE(char, from, to)</td>
                    <td className="text-left pr-4 border">Returnează char modificat astfel: fiecare apariţie a unui character din şirul from este înlocuită de corespondentul (caracterul de pe aceeaşi poziţie) din şirul to; dacă from este mai lung decât to, caracterele fără corespondent sunt şterse</td>
                    <td className="text-left pr-4 border">SELECT TRANSLATE('48KLM980', '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', '9999999999XXXXXXXXXXXXXXXXXXXXXXXXXX') "COD" FROM DUAL;</td>
                </tr>
                </tbody>
            </table>
            <p>Funcțiile care schimbă case-ul literelor (transformă textul în litere mici sau în majuscule) sunt frecvent utilizate în clauza WHERE pentru a regăsi text. De exemplu, dacă dorim identificarea datelor despre studentul Andrei și nu avem garanția că prenumele acestuia a fost inserat în baza de date cu toate litere majuscule sau doar cu prima literă majusculă, vom procesa atributul prenume aducându-l la forma dorită pentru testare:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM studenti WHERE prenume = 'ANDREI';{" "}
        <span className="text-slate-400">
        -- returnează 0 linii
        </span>
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM studenti WHERE UPPER(prenume) = 'ANDREI';{" "}
        <span className="text-slate-400">
        -- returneaza înregistrările dorite
        </span>
    </pre>
            </div>
            <p>De asemenea funcția TRIM are o largă utilizare pentru regăsirea datelor atunci cand atributele sunt declarate de tip CHAR:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM profesori WHERE UPPER(nume) = 'BREABAN';{" "}
        <span className="text-slate-400">
        -- returneaza 0 linii
        </span>
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM profesori WHERE TRIM(UPPER(nume)) = 'BREABAN';{" "}
        <span className="text-slate-400">
        -- returneaza înregistrările dorite
        </span>
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT TRIM('1' FROM '1test1') FROM dual;{" "}
        <span className="text-slate-400">
        -- elimina caracterul de la inceput si de la sfarsit din "1test1"
        </span>
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT TRIM(LEADING '0' FROM '00010230') FROM dual;{" "}
        <span className="text-slate-400">
        -- Elimina zerourile de la inceput
        </span>
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT TRIM(TRAILING '1' FROM 'Tech1') FROM dual;{" "}
        <span className="text-slate-400">
        -- elimina caracterele '1' de la sfarsit
        </span>
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT TRIM(BOTH '1' FROM '123Tech111') FROM dual;{" "}
        <span className="text-slate-400">
        -- elimina caracterele '1' de la inceput si de la sfarsit
        </span>
    </pre>
            </div>

            <h2 className="text-2xl text-blue-500">Funcţii pentru tipul DATE (date calendaristice)</h2>
            <p>Formatul implicit pentru datele calendaristice pe un server de baze de date Oracle este derivat pe baza parametrilor NLS_DATE_FORMAT si NLS_DATE_LANGUAGE. Cei mai multi veti descoperi probabil dupa instalarea serverului pe calculatoarele personale ca formatul implicit este "DD-MON-YY" (ex: '10-JUN-15'), însă acesta poate fi modificat de către utilizator (ALTER SESSION SET NLS_DATE_FORMAT....). Pentru a depăși problemele de incompatibilitate, este recomandat ca lucrul cu constante de tip date calendaristice să facă apel la funcția TO_DATE (descrisă în secțiunea următoarea) care va specifica formatul acesteia.</p>

            <table
                className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                    className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Functia</th>
                    <th className="text-left pr-4 border">Descriere</th>
                    <th className="text-left pr-4 border">Exemplu</th>
                </tr>
                </thead>
                <tbody className = "dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">CURRENT_DATE</td>
                    <td className="text-left pr-4 border">Returnează data curentă relativ la zona de timp (time zone) a sesiunii curente</td>
                    <td className="text-left pr-4 border">SELECT CURRENT_DATE FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">CURRENT_TIMESTAMP</td>
                    <td className="text-left pr-4 border">Returnează data, ora si fusul orar curente relative la zona de timp (time zone) a sesiunii curente</td>
                    <td className="text-left pr-4 border">SELECT CURRENT_TIMESTAMP FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">SYSDATE</td>
                    <td className="text-left pr-4 border">Returnează data curentă a sistemului (dar contine si ora care de obicei nu este afisata)</td>
                    <td className="text-left pr-4 border">SELECT SYSDATE FROM DUAL; <br />SELECT TO_CHAR(SYSDATE, 'DD-MM-YYYY HH:MI') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">MONTHS_BETWEEN(d1, d2)</td>
                    <td className="text-left pr-4 border">Numărul de luni dintre d1 şi d2</td>
                    <td className="text-left pr-4 border">SELECT MONTHS_BETWEEN(TO_DATE('02-02-2015','MM-DD-YYYY'),TO_DATE('01-01-2015','MM-DD-YYYY') ) AS "Months" FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">ADD_MONTHS(d, n)</td>
                    <td className="text-left pr-4 border">Adauga un numar de luni la data calendaristca.</td>
                    <td className="text-left pr-4 border">SELECT data_nastere, ADD_MONTHS(data_nastere,1) FROM studenti WHERE nume= 'Popescu';</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">NEXT_DAY(d, char)</td>
                    <td className="text-left pr-4 border">Returnează data calendaristică corespunzătoare zilei lucrătoare specificate de char imediat urmatoare datei d</td>
                    <td className="text-left pr-4 border">SELECT NEXT_DAY('13-OCT-15','TUESDAY') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">LAST_DAY(d)</td>
                    <td className="text-left pr-4 border">Returnează data calendaristică corespunzătoare ultimei zile din luna specificată de d</td>
                    <td className="text-left pr-4 border">SELECT SYSDATE, LAST_DAY(SYSDATE) AS "Last" FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">ROUND(d [, fmt ])</td>
                    <td className="text-left pr-4 border">Rotunjește la cea mai apropiată dată calendaristcă conform formatului dat.</td>
                    <td className="text-left pr-4 border">SELECT ROUND (TO_DATE ('27-OCT-16','DD-MON-YY'),'YEAR')"New Year" FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">TRUNC(d [, fmt ])</td>
                    <td className="text-left pr-4 border">Dacă formatul este omis, trunchiază la cea mai apropiată zi.</td>
                    <td className="text-left pr-4 border">SELECT TRUNC(TO_DATE('27-OCT-16','DD-MON-YY'), 'YEAR')"First day of the current year" FROM DUAL;<br />SELECT TRUNC(TO_DATE('27-OCT-16','DD-MON-YY'), 'MONTH')"First day of the current month" FROM DUAL;</td>
                </tr>
                </tbody>
            </table>    

            <p>Studiaţi formatul fmt la adresa http://download.oracle.com/docs/cd/B19306_01/server.102/b14200/functions230.htm (macar astea sa stiti ce fac: D, DAY, DD, HH, MI, MM, MON, MONTH, SS, YYYY, YY, YEAR)</p>
            <p>Oracle stochează datele într-un format numeric intern reprezentând secolul, anul, luna, ziua, orele minutele și secundele. Fiind stocate în format numeric, datelor calendaristice le pot fi aplicați operatori numerici:</p>

            <ul className="list-disc pl-5">
                <li>adunarea sau scăderea unui număr la/dintr-o dată are ca rezultat o nouă dată:</li>
            </ul>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT SYSDATE + 10 FROM dual;`}
    </pre>
            </div>

            <p>Ce semnifică valoarea adunată? Cum putem adăuga un număr de ore la o data calendaristică?</p>
            <ul className="list-disc pl-5">
                <li>diferența a două date are ca rezultat numărul de zile</li>
            </ul>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT (SYSDATE-data_nastere)/365 FROM studenti;`}
    </pre>
            </div>

            <h2 className="text-2xl text-blue-500">Funcţii de conversie</h2>
            <p>Oracle face implicit următoarele conversii de tipuri:</p>
            <p>VARCHAR2 {"->"} NUMBER</p>
            <p>CHAR {"->"} NUMBER</p>
            <p>VARCHAR2 {"->"} DATE</p>
            <p>CHAR {"->"} DATE</p>
            <p>NUMBER {"->"} VARCHAR2</p>
            <p>DATE {"->"} VARCHAR2</p>
            <p>Pentru alte conversii există funcţiile:</p>

            <table
                className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                    className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Functia</th>
                    <th className="text-left pr-4 border">Descriere</th>
                    <th className="text-left pr-4 border">Exemplu</th>
                </tr>
                </thead>
                <tbody className = "dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">TO_CHAR(char)</td>
                    <td className="text-left pr-4 border">Convertește o valoare de tip char la VARCHAR2</td>
                    <td className="text-left pr-4 border"></td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">TO_CHAR(n [, fmt])</td>
                    <td className="text-left pr-4 border">Converteşte o valoare numerică n la VARCHAR2 conform formatului specificat fmt.</td>
                    <td className="text-left pr-4 border">SELECT TO_CHAR('01110' + 1) FROM dual; <br /> SELECT TO_CHAR(bursa,'$99,999') FROM studenti; </td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">TO_CHAR({ "datetime"} [, fmt ])</td>
                    <td className="text-left pr-4 border">Converteşte datetime la VARCHAR2 conform formatului specificat fmt</td>
                    <td className="text-left pr-4 border">SELECT TO_CHAR (SYSDATE, 'Day, Month, DD, YYYY')"TO_CHAR example" FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">TO_DATE(char [, fmt ])</td>
                    <td className="text-left pr-4 border">Convertește un șir de caractere în dată calendarostică conform formatului specificat. Studiați modul de specificare a formatului la adresa: https://docs.oracle.com/cd/B28359_01/server.111/b28286/sql_elements004.htm#i34924</td>
                    <td className="text-left pr-4 border">SELECT TO_DATE('January 26, 1996, 12:38 A.M.', 'Month dd YYYY HH:MI A.M.') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">TO_NUMBER(char [, fmt ])</td>
                    <td className="text-left pr-4 border">http://docs.oracle.com/cd/B19306_01/server.102/b14200/sql_elements004.htm#i34570</td>
                    <td className="text-left pr-4 border">SELECT TO_NUMBER('100.52','9,999.99') FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">CAST(expr AS type_name)</td>
                    <td className="text-left pr-4 border"></td>
                    <td className="text-left pr-4 border">SELECT CAST(CURRENT_TIMESTAMP AS VARCHAR(50)) FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">CONVERT(char, dest_char_set[, source_char_set ])</td>
                    <td className="text-left pr-4 border">Converteşte şirul char într-o nouă codificare. Codificările uzuale sunt:
                            <ul className="list-disc pl-5">
                        <li>-US7ASCII: US 7-bit ASCII character set</li>
                        <li>-WE8DEC: West European 8-bit character set</li>
                        <li>-F7DEC: DEC French 7-bit character set</li>
                        <li>-WE8EBCDIC500: IBM West European EBCDIC Code Page 500</li>
                        <li>-WE8ISO8859P1: ISO 8859-1 West European 8-bit character set</li>
                        <li>-UTF8: Unicode 4.0 UTF-8 Universal character set, CESU-8 compliant</li>
                        <li>-AL32UTF8: Unicode 4.0 UTF-8 Universal character set</li>
                            </ul>
                    </td>
                    <td className="text-left pr-4 border">SELECT CONVERT('Ä Ê Í Ó Ø A B C D E ', 'US7ASCII', 'WE8ISO8859P1') FROM DUAL;</td>
                </tr>
                </tbody>
            </table>

            <p>Exemple in care data calendaristica (day/month) este tradusa in limba romana:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT 'Este o zi frumoasa de ' TO_CHAR(SYSDATE,'month','NLS_DATE_LANGUAGE = romanian') FROM DUAL;`}
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume, TO_CHAR(data_nastere, 'day', 'nls_date_language=romanian') AS "zi nastere" FROM studenti; `}
    </pre>
            </div>

            <p>Pentru a studia formatarea datelor calendaristice in cadrul functiei to_char studiati materialul de la adresa:</p>
            <p>http://docs.oracle.com/cd/B19306_01/server.102/b14200/sql_elements004.htm#i34924</p>

            <h2 className="text-2xl text-blue-500">Alte funcţii</h2>

            <table
                className="table-auto border-collapse border border-slate-400 w-full bg-slate-50 dark:bg-slate-800">
                <thead
                    className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200">
                <tr>
                    <th className="text-left pr-4 border">Functia</th>
                    <th className="text-left pr-4 border">Descriere</th>
                    <th className="text-left pr-4 border">Exemplu</th>
                </tr>
                </thead>
                <tbody className = "dark:text-slate-200">
                <tr>
                    <td className="text-left pr-4 border">USER</td>
                    <td className="text-left pr-4 border">Returnează numele schemei curente</td>
                    <td className="text-left pr-4 border">SELECT USER FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">NVL(expr1, expr2)</td>
                    <td className="text-left pr-4 border">Dacă expr1 este NULL returnează expr2, altfel returnează expr1</td>
                    <td className="text-left pr-4 border">SELECT nume, NVL(bursa,0) "bursa" FROM studenti;<br />SELECT nume, NVL(TO_CHAR(bursa),'Nu are bursa') "bursa" FROM studenti;</td>

                </tr>
                <tr>
                    <td className="text-left pr-4 border">NULLIF(expr1, expr2)</td>
                    <td className="text-left pr-4 border">Dacă expr1 este egală cu expr2 returnează NULL, altfel returnează expr1</td>
                    <td className="text-left pr-4 border"></td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">DECODE(expr, search1, result1[, search2, result2]...[, default ])</td>
                    <td className="text-left pr-4 border">Compară expr cu fiecare valoare search pe rând. Dacă obţine egalitate returnează valorea result corespunzătoare. Dacă nici o potrivire nu e găsită este returnată valoarea DEFAULT; dacă aceasta nu e precizată returnează NULL. Dacă expr e NULL, se consider egalitate doar dacă search e NULL.</td>
                    <td className="text-left pr-4 border">SELECT DECODE(bursa, 450, 'premiul 1',350, 'premiul 2',250, 'premiul 3', '?') FROM studenti;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">LEAST(expr1[, expr2 ]...)</td>
                    <td className="text-left pr-4 border">Returnează cel mai mic element din listă</td>
                    <td className="text-left pr-4 border">SELECT LEAST('Mihai','Andrei','Anca') "LEAST" FROM DUAL;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">GREATEST (expr1 [, expr2 ]...)</td>
                    <td className="text-left pr-4 border">Returnează cel mai mare element din listă</td>
                    <td className="text-left pr-4 border">SELECT GREATEST('Stefan','Mihai','Andrei','Anca') "GREATEST" FROM DUAL;</td>
                </tr>
                </tbody>
            </table>

            <p>Funcția NVL este deseori utilă pentru a evita rezultatele nule la aplicarea unor operatori/funcții. De exemplu, dacă toți studenții facultății ar fi finanțați cu o sumă dată (de ex. 100), suma totală ridicată de un student nu se poate obține prin</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT 100+bursa FROM studenti;`}
    </pre>
            </div>

            <p>ci prin</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT 100+NVL(bursa,0) FROM studenti;`}
    </pre>
            </div>

        </div>
    );
};

export default Course3;