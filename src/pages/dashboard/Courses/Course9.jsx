import React from 'react';

const Course9 = () => {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl text-blue-500">Subinterogări corelate</h2>
            <p>Aşa cum am văzut, valorile returnate de o subinterogare sunt în general utilizate de către interogarea principală pentru a filtra informaţiile selectate. Din acest motiv, subinterogarea este executată o singura dată la început.</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * <br />
    {"  "}FROM studenti NATURAL JOIN note<br /> 
    {"  "}WHERE s.nr_matricol=n.nr_matricol and (grupa,an,valoare) IN<br />
    {"  "}WHERE valoare {">="}<br />
    {"        "}{"(SELECT ROUND(AVG(valoare))"}<br />
    {"           "}FROM note<br />
    {"        "}{");"}<br />
    </pre>
            </div>
            <p>In acest caz, este suficient ca subinterogarea să fie executată o singură dată pentru a se afla media tuturor notelor. Odată aflată, această medie este utilizată în interogarea principală pentru a filtra notele şi a le afişa doar pe cele ce depăşesc această valoare.</p>
            <p>In cazul subinterogărilor corelate, subinterogarea este evaluată pentru fiecare rând generat de interogarea principală. De această dată, la fiecare rulare, subinterogarea utilizează o valoare generată de interogarea principală.</p>
            <p>Să considerăm interogarea următoare:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT nume, prenume, bursa, an <br />
    {"   "}FROM studenti s1<br /> 
    {"   "}WHERE bursa {">="}<br />
    {"         "}{"(SELECT AVG(bursa)"}<br />
    {"             "}FROM studenti s2<br />
    {"                "}GROUP BY an HAVING s1.an = s2.an<br />
    {"         "}{");"}<br />
    </pre>
            </div>
            <p>Această interogare va returna toţi studenţii care au bursă mai mare sau cel puţin egală cu media burselor date în anul lor (deci nu media burselor din toţi anii ci doar media burselor studenţilor din acelaşi an cu ei).</p>
            <p>Să considerăm prima linie returnată: Antonie Ioana are bursa egală cu 450 care este mai mare sau egală cu media burselor studenţilor din anul 3. Această medie a putut fi obţinută numai din subinterogarea în care am ţinut cont că media trebuie să fie calculată doar pentru anul 3 (în interogarea interioară am utilizat utilizat valoarea s1.an).</p>
            <p>A doua procesare poate este facuta pentru studentul Pintescu Andrei (sa presupunem) care este in anul 1. El nu apare in rezultatul final deoarece bursa lui este de 250 in timp ce media burselor studentilor din anul sau este 300. Este important sa retinem ca subinterogarea este executata chiar si pentru randurile care nu sunt afisate - acestea nefiind afisate tocmai din cauza ca valoarea returnata de subinterogare nu satisface conditia din clauza WHERE.</p>
            <p>Linia următoare este pentru un student din anul 2. Deoarece puţin mai înainte subinterogarea a întors media burselor studenţilor din anul 1, aceasta trebuie recalculată pentru studenţii din anul 2 - deci subinterogarea va fi executată din nou. Procesul continuă şi, pentru fiecare linie ce ar putea fi returnată în cadrul interogării principale, este calculată media studenţilor din acelaşi an cu studentul din linia curentă. Linia curentă este apoi filtrată în funcţie de criteriul stabilit (vor fi considerate doar liniile în care bursa este mai mare sau egală cu această medie).</p>
            <p>În cazul interogărilor corelate, interogarea principală preia unul câte unul toate randurile şi de fiecare dată le compară cu valorile ce sunt returnate de către subinterogare. Subinterogarea va returna (de obicei) date diferite</p>
            <p>în funcţie de valoarea unui câmp din interogarea principală (în exemplul anterior, valoarea câmpului an).</p>
            <p>Oracle tratează subinterogarea ca şi corelată de fiecare dată când aceasta utilizează valoarea unei coloane returnată de interogarea principală.</p>
            <h2 className="text-2xl text-blue-500">EXISTS</h2>
            <p>Uneori, nu ne interesează efectiv valoarea returnată de subinterogare ci doar dacă aceasta returnează măcar un rând. Spre exemplu, am putea fi interesaţi să afişăm toţi studenţii care au în grupă măcar un bursier. Deoarece grupa este identificată atât prin an cât şi prin grupă, ambele câmpuri vor fi utilizate în subinterogare. Dacă subinterogarea returnează măcar un rând (de fapt, în subinterogare vom selecta count(*) şi vom ţine cont ca valoarea să fie strict mai mare ca 0) atunci înseamnă că studentul din rândul curent are în grupă măcar un bursier:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT nume, prenume, bursa, grupa, an <br />
    {"   "}FROM studenti s1<br /> 
    {"   "}WHERE {"("}<br />
    {"       "}SELECT COUNT(*)<br />
    {"          "}FROM studenti s2<br />
    {"          "}WHERE bursa IS NOT NULL AND<br />
    {"                "}s1.an = s2.an AND<br />
    {"          "}s1.grupa=s2.grupa<br />
    {"        "}{") > 0;"}<br />
    </pre>
            </div>
            <p>Operaţia count în acest caz este destul de costisitoare: chiar dacă s-a găsit că există un student bursier, tabelul studenti este parcurs în continuare de către subinterogare pentru a-i găsi şi pe alţi eventuali studenţi care sunt în aceeaşi grupă şi au bursă). Cu alte cuvinte, nu ne interesează foarte tare dacă operaţia de numărare returnează 1,2 sau mai mulţi bursieri aflaţi în aceeaşi grupă ci doar că acolo există măcar unul.</p>
            <p>Un operator important în cazul interogărilor corelate este operatorul exists. Să adaptăm interogarea anterioară în felul următor:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT nume, prenume, bursa, grupa, an<br />
    {"   "}FROM studenti s1<br /> 
    {"   "}WHERE EXISTS {"("}<br />
    {"       "}SELECT *<br />
    {"          "}FROM studenti s2<br />
    {"          "}WHERE bursa IS NOT NULL AND<br />
    {"                "}s1.an = s2.an AND<br />
    {"                "}s1.grupa=s2.grupa<br />
    {"        "}{");"}
    </pre>
            </div>
            <p>De această dată, subinterogarea nu este executată în întregime ci numai până când se găseşte primul student bursier. În acel moment, condiţia este îndeplinită şi nu se încearcă numărarea tuturor studenţilor ce au bursă în acea grupă ci se va trece la următoarea linie din interogarea principală.</p>
            <p>În versiunile anterioare, subinterogările erau materializate chiar şi în cazul lui EXISTS. Acest lucru înseamnă că efectiv erau intoarse randuri de către subinterogare. Pentru a se evita accesul la HDD, ca şi optimizare, se putea cere altceva decât randuri efective din tabel. Spre exemplu, în locul informaţiei se putea trece o constanta:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT nume, prenume, bursa, grupa, an<br />
    {"   "}FROM studenti s1<br /> 
    {"   "}WHERE EXISTS {"("}<br />
    {"          "}SELECT 1<br />
    {"          "}FROM studenti s2<br />
    {"          "}WHERE bursa IS NOT NULL AND<br />
    {"            "}s1.an = s2.an AND<br />
    {"            "}s1.grupa=s2.grupa<br />
    {"       "}{");"}
    </pre>
            </div>
            <p>Probabil că nu veţi sesiza vreo diferenţă în contextul utilizării unor tabele ce conţin puţine înregistrări, dar, în realitate, unde sunt milioane de înregistrări într-o tabelă, orice optimizare este binevenită.</p>
            <p>Întrebare: ce se întâmplă atunci când este utilizat NOT EXISTS (pentru că ne interesează dacă nu avem înregistrări corelate) ? Pentru cât timp este executată subinterogarea ? Când se iese din subinterogare ?</p>
        </div>
    );
};

export default Course9;