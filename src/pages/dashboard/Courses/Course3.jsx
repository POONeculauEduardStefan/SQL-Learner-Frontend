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
                <tbody>
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
        </div>
    );
};

export default Course3;