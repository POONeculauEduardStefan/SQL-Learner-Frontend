import React from 'react';

const Course6 = () => {
    return (
        <div className="flex flex-col gap-3">
            <p>Tematică:</p>
            <ul className="list-disc pl-5">
                <li>gruparea înregistrărilor</li>
                <li>aplicarea funcțiilor de agregare</li>
            </ul>
            <h2 className="text-2xl text-blue-500">Funcţii de agregare în SQL</h2>
            <p>Funcţiile de agregare sunt funcţii care, utilizate în interogări, returnează o singură linie rezultat pe baza unui grup de linii. Pot fi utilizate în cadrul listei de câmpuri ce trebuie returnate de comanda SELECT, în clauzele ORDER BY şi HAVING.</p>
            <p>ATENȚIE: nu utilizați funcțiile de agregare în clauza WHERE !!!</p>
            <p>Funcţiile de agregare pot accepta clauzele</p>
            <ul className="list-disc pl-5">
                <li>DISTINCT – specifică luarea în considerare doar a valorilor distincte de către funcţie</li>
                <li>ALL – este implicit, determină funcţia de agregare sa calculeze rezultatul pe baza tuturor valorilor</li>
            </ul>
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
                    <td className="text-left pr-4 border">{"COUNT ({ *|[DISTINCT|ALL] expr})"}</td>
                    <td className="text-left pr-4 border">Returnează numărul de linii. Dacă argumentul este * se numără şi valorile NULL, altfel se numără doar valorile nenule. Argumentul poate lua tipul CHAR, VARCHAR2, NUMBER, DATE.</td>
                    <td className="text-left pr-4 border">SELECT COUNT(*) AS "Total studenti" FROM studenti;<br />SELECT COUNT(NVL(bursa,0)) AS "Total studenti" FROM studenti;<br />SELECT COUNT(bursa) AS "Studenti bursieri" FROM studenti;<br />SELECT COUNT(DISTINCT bursa) AS "Variante bursa" FROM studenti;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">AVG ([DISTINCT|ALL]n)</td>
                    <td className="text-left pr-4 border">Returnează media valorilor. Argumentul trebuie să fie numeric.</td>
                    <td className="text-left pr-4 border">SELECT AVG(valoare) FROM note;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">MAX ([DISTINCT|ALL]expr)</td>
                    <td className="text-left pr-4 border">Returnează valoare maximă. Argumentul poate lua tipul CHAR, VARCHAR2, NUMBER, DATE</td>
                    <td className="text-left pr-4 border">SELECT MAX(bursa) FROM studenti;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">MIN ([DISTINCT|ALL]expr)</td>
                    <td className="text-left pr-4 border">Returnează valoare minimă. Argumentul poate lua tipul CHAR, VARCHAR2, NUMBER, DATE</td>
                    <td className="text-left pr-4 border">SELECT MIN(bursa) FROM studenti;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">STDDEV ([DISTINCT|ALL]x)</td>
                    <td className="text-left pr-4 border">Returnează deviatia standard a valorilor. Argumentul trebuie să fie numeric.</td>
                    <td className="text-left pr-4 border">SELECT STDDEV(bursa) AS "Deviatie standard" FROM studenti;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">VARIANCE ([DISTINCT|ALL]x)</td>
                    <td className="text-left pr-4 border">Returnează varianţa valorilor. Argumentul trebuie să fie numeric.</td>
                    <td className="text-left pr-4 border">SELECT VARIANCE(bursa) AS "Varianta" FROM studenti;</td>
                </tr>
                <tr>
                    <td className="text-left pr-4 border">SUM([DISTINCT|ALL]n)</td>
                    <td className="text-left pr-4 border">Returnează suma valorilor. Argumentul trebuie să fie numeric.</td>
                    <td className="text-left pr-4 border">SELECT SUM(bursa) FROM studenti;</td>
                </tr>
                </tbody>
            </table>
            <p>Toate funcţiile de agregare ignoră valorile NULL. Excepţie face funcţia COUNT cu argumentul * care va considera NULL ca fiind o valoare distinctă. Pentru ca valoarea NULL să fie luată în considerare se poate utiliza NVL în cadrul funcţiei de agregare pentru a substitui NULL cu o valoare anume (ex. 0).</p>  
            <p>Dacă setul de date nu conţine linii sau conţine doar linii cu valori NULL ca argumente a funcţiilor de agregare, funcţia va returna NULL. Excepţie face COUNT care returnează 0 sau un alt număr.</p> 
            <h3 className="text-xl text-blue-500">Gruparea datelor</h3>
            <p>Toate exemplele ilustrate anterior aplică funcțiile de agregare asupra intregului conținut al tabelului, rezultatul interogării fiind alcătuit dintr-o singură linie.</p>
            <p>Funcțiile de agregare sunt însa utilizate în general împreună cu clauza GROUP BY care specifică împărţirea liniilor tabelului interogat în mai multe grupuri; Oracle aplică funcţiile de agregare fiecărui astfel de grup returnând un singur rezultat pentru fiecare grup.</p>
            <p>Reamintim sintaxa interogării în Oracle:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {'SELECT [DISTINCT | ALL] {* | [expresie_coloana [AS nume_nou]] [,...] }'} <br />
    {"   "}FROM nume_tabel [alias] [, ...]<br /> 
    {"   "}[WHERE conditie]<br />
    {"   "}[GROUP BY expresie [HAVING conditie] ]<br />
    {"   "}[ORDER BY expresie1 [ASC|DESC][,…]]
    </pre>
            </div>
            <p>Exemplu:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT MAX(valoare) FROM note GROUP BY nr_matricol;{" "}
        <span className="text-slate-400">
        --Câte linii sunt returnate? Ce reprezintă fiecare linie?
        </span>
    </pre>
            </div>
            <p>Valori individuale nu pot fi utilizate în lista select decât dacă în clauză GROUP BY este specificată coloana individuală. Deci toate câmpurile din lista select care nu sunt utilizate în cadrul funcţiilor de agregare trebuie să apară în clauza GROUP BY.</p>
            <p>Exemplu:</p>
             <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT MAX(valoare), id_curs FROM note GROUP BY nr_matricol;{" "}
        <span className="text-slate-400">
        --De ce nu merge?
        </span>
    </pre>
            </div>
            <p>Grupurile pot fi create și pe baza mai multor atribute:</p>
            <p>Exemplu:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT an, count(*) FROM cursuri GROUP BY an;{" "}
        <span className="text-slate-400">
        --Cate grupuri?
        </span>
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT credite, count(*) FROM cursuri GROUP BY credite;{" "}
        <span className="text-slate-400">
        --Cate grupuri?
        </span>
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT an, credite, count(*) FROM cursuri GROUP BY an, credite ORDER BY an, credite;{" "}
        <span className="text-slate-400">
        --Cate grupuri?
        </span>
    </pre>
            </div>
            <p>Nu este obligatoriu ca atributele utilizate in clauza GROUP BY să apară în lista select; este însă indicată includerea acestora pentru ca înregistrările rezultat să poată fi interpretate.</p>
            <h3 className="text-xl text-blue-500">Filtrarea grupurilor</h3>
            <p>Clauza WHERE elimină valori individuale (linii) înainte de a avea loc gruparea.</p>
            <p>Clauza HAVING este utilizată doar în conjuncţie cu clauza GROUP BY având rolul de a elimina unele grupuri pe baza rezultatului funcţiilor de agregare şi nu a valorilor individuale ale liniilor.</p>
            <p>Exemplu:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT id_curs, COUNT(valoare) FROM note GROUP BY id_curs;{" "}
        <span className="text-slate-400">
        --Cate grupuri?
        </span>
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT id_curs, COUNT(valoare) FROM note WHERE valoare{">"}8 GROUP BY id_curs;{" "}
        <span className="text-slate-400">
        --Cate grupuri? De ce?
        </span>
    </pre>
            </div>
             <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT id_curs, COUNT(valoare) FROM note GROUP BY id_curs HAVING COUNT(valoare){">"}8;{" "}
        <span className="text-slate-400">
        --Cate grupuri? De ce?
        </span>
    </pre>
            </div>
        </div>
    );
};

export default Course6;