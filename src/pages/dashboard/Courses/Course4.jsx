import React from 'react';

const Course4 = () => {
    return (
        <div className="flex flex-col gap-3">
            <p className="font-bold">Obiective</p>
            <ul className="list-disc pl-5">
                <li>JOIN - afișarea informațiilor din mai multe tabele</li>
            </ul>
            <h2 className="text-2xl text-blue-500">Produsul cartezian a două tabele</h2>
            <p>Pentru a pune împreună informația din mai multe tabele avem la dispoziție două modalități:</p>
            <ul className="list-disc pl-5">
                <li>utilizarea operatorilor pe mulțimi (gen reuniune, intersecție, diferență) care pun împreună rezultatele a două sau a mai multor interogări - discutați la laboratorul 2</li>
                <li>utilizarea produsului cartezian si, derivat, a joinului.</li>
            </ul>
            <p>Toate frazele SELECT din cadrul laboratoarelor anterioare au utilizat în cadrul clauzei FROM o singură tabelă. Încercați însă, pe rand, următoarele interogări:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM studenti;{" "}
        <span className="text-slate-400">
        --cate linii sunt returnate?
        </span>
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM note;{" "}
        <span className="text-slate-400">
        --cate linii sunt returnate?
        </span>
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM studenti, note;{" "}
        <span className="text-slate-400">
        --cate linii sunt returnate? de ce?
        </span>
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM studenti, note WHERE prenume='Andrei';{" "}
        <span className="text-slate-400">
        --cate linii sunt returnate? de ce?
        </span>
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM studenti, note, cursuri;{" "}
        <span className="text-slate-400">
        --cate linii sunt returnate? de ce?
        </span>
    </pre>
            </div>

            <p>Dacă în cadrul clauzei FROM sunt utilizate mai multe tabele, rezultatul este produsul cartezian al tuturor tabelelor. Numarul de linii returnate este produsul numarului de linii ale tabelelor.</p>
            <p>Interogările de mai sus în care în clauza FROM se află o listă de tabele este specifică Oracle. Pentru a realiza însă produsul cartezian și în alte SGBD-uri relaționale, se utilizează următoarea sintaxă care este standard limbajului SQL (valabilă și pentru Oracle, testati-o):</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM studenti CROSS JOIN note`}
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM studenti CROSS JOIN note WHERE prenume='Andrei';`}
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM studenti CROSS JOIN note CROSS JOIN cursuri;`}
    </pre>
            </div>

            <h2 className="text-2xl text-blue-500">Joinul natural a două tabele</h2>
            <p>Înregistrările dintr-o tabelă își găsesc corespondentul în alt(e) tabel(e) prin intermediul unui atribut ce joacă rol de cheie străină trimițând la un atribut cu rol de cheie (proprietate de identificare unică) în tabela referențiată. De exemplu, în tabela <span className = "italic">note</span> atributul <span className = "italic">nr_matricol</span> are rolul de a identifica studentul din tabela <span className = "italic">studenti</span> iar atributul <span className = "italic">id_curs</span> identifică înregistrarea corespunzătoare din tabelul <span className = "italic">cursuri</span>.</p>
            <p>Pentru a identifica notele unui anumit student nu este suficient să solicităm informația din ambele tabele - studenti si note (vezi exemplul anterior unde solicitând notele lui Andrei s-a realizat de fapt un produs cartezian conducând la un rezultat incorect), ci trebuie să specificăm și condiția de join - și anume atributul care joacă rol de cheie străină să fie egal cu atributul care joaca rol de identificare unică în tabelul referențiat:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM studenti, note WHERE studenti.nr_matricol = note.nr_matricol ORDER BY nume;<br />
        {"   "}
        <span className="text-slate-400">
        --cate linii sunt returnate? de ce?
        </span>
    </pre>
            </div>
            <p>Din nou, formularea anterioară este specifică Oracle. Operația care s-a efectuat a fost joinul intern a două tabele, păstrându-se în rezultat acele linii din produsul cartezian care satisfac condiția impusă de clauza WHERE (pentru a înțelege operația de join este util să priviți joinul ca un produs cartezian urmat de selecție; în realitate sistemul tratează operația cu unul dintre algoritmii dedicați joinului - care vor fi explicati la curs). Versiunea admisă însă de standardul SQL și la care aderă cele mai multe sisteme de baze de date relaționale utilizează explicit cuvintele cheie JOIN...ON, după cum urmează:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM studenti JOIN note ON studenti.nr_matricol = note.nr_matricol ORDER BY nume;`}
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM studenti JOIN note ON studenti.nr_matricol = note.nr_matricol WHERE prenume='Andrei'<br />
        {"   "}
        <span className="text-slate-400">
        --cate inregistrari au fost returnate? de ce?
        </span>
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM studenti JOIN note ON studenti.nr_matricol = note.nr_matricol WHERE prenume='Ioana';<br />
        {"   "}
        <span className="text-slate-400">
        --cate inregistrari au fost returnate? de ce?
        </span>
    </pre>
            </div>

            <p>Fiindcă numele atributului cu rol de cheie străină și numele atributului cu rol de identificare unică referențiat coincid în exemplul prezentat, ele au fost prefixate de numele tabelului la care aparțin.</p>
            <p>Ca alternativă, atunci când numele coloanei după care se face JOIN este identic în ambele tabele, condiţia de egalitate a acestora poate fi omisă dacă se foloseşte operaţia de Join natural:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume, valoare FROM studenti NATURAL JOIN note WHERE prenume='Ioana';`}
    </pre>
            </div>

            <h2 className="text-2xl text-blue-500">Alias pentru tabele</h2>
            <p>De fiecare dată când într-o interogare apar mai multe tabele și ele conțin atribute cu același nume, orice referire la astfel de atribute trebuiesc prefixate de numele tabelei din care se dorește a fi citită valoarea.</p>
            <p>Încercați pe rand</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT nume, prenume, valoare, nr_matricol FROM studenti JOIN note <br />
    {"   "}ON studenti.nr_matricol=note.nr_matricol WHERE prenume = 'Ioana';<br /> 
        {"   "}
        <span className="text-slate-400">
        --de ce nu functioneaza ?
        </span>
    </pre>
            </div>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT nume, prenume, valoare, studenti.nr_matricol FROM studenti JOIN note <br />
    {"   "}ON studenti.nr_matricol = note.nr_matricol WHERE prenume = 'Ioana';<br /> 
    </pre>
            </div>

            <p>In cazul joinului natural, SGBD-ul ştie că între cele două coloane oricum se aplică operatorul de egalitate. In acest caz nu mai trebuie să prefixaţi numele coloanei cu numele tabelei:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume, valoare, nr_matricol FROM studenti NATURAL JOIN note WHERE prenume='Ioana';`}
    </pre>
            </div>

            <p>Orice utilizare a unui atribut a cărui nume se regăsește în mai multe tabele referențiate în interogare trebuie prefixat de numele tabelei (exceptie fac tabelele implicate în join natural). Dacă însă numele tabelelor este incomod a fi repetat, putem să dăm aliasuri simple acestora - specificate în clauza FROM imediat dupa numele tabelei. Identificarea atributelor în acest caz se face utilizand aliasul ca și prefix:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume, valoare, s.nr_matricol FROM studenti s JOIN note n ON s.nr_matricol = n.nr_matricol;`}
    </pre>
            </div>

            <p>ATENȚIE: introducerea de aliasuri pentru numele tabelelor necesită utilizarea acestora oriunde e necesar în cadrul interogării.</p>
            <p>Încercați:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT nume, prenume, valoare, studenti.nr_matricol FROM studenti s JOIN note n ON s.nr_matricol = n.nr_matricol;`}
    </pre>
            </div>

            <h2 className="text-2xl text-blue-500">Join extern</h2>
            <p>Să afișăm în mod distinct numele studenților din joinul între tabelele <span className = "italic">studenti</span> și <span className = "italic">note</span>:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT DISTINCT nume FROM studenti s NATURAL JOIN note n;`}
    </pre>
            </div>

            <p>Câte înregistrări au fost returnate? Și câte nume distincte sunt în tabela studenti de fapt? De unde diferența?</p>
            <p>Sunt cazuri în care nu toate înregistrările dintr-o tabelă au corespondent în altă tabelă. În exemplul anterior, nu toți studenții au note. În cadrul joinului anterior s-a văzut cum înregistrările fără corespondent nu fac parte din mulțimea rezultat.</p>
            <p>In cazul în care se doreşte realizarea unui join între tabelele studenţi şi note, se poate observa că există studenţi care nu au încă note (fiind primul semestru, ei sunt înscrişi la cursurile din anul întâi dar nu au primit încă note). Spunem despre tabela note că este deficitară în informaţii deoarece nu conţine toate numerele matricole existente în tabela studenţi. Dacă se doreşte ca în rezultat să se regăsească şi studenţii fără note, se va utiliza un join extern.</p>
            <p>Joinul extern poate fi de mai multe tipuri:</p>
            <ul className="list-disc pl-5">
                <li>LEFT OUTER JOIN este utilizat atunci când se doreşte preluarea tuturor informaţiilor din tabela din stânga operatorului join (deci join in acest caz nu este comutativ) şi, eventual, aceste informaţii să fie completate (dacă se poate) cu informaţii din tabela deficitară în informaţii aflată în dreapta operatorului join. De exemplu: <span className = "text-[#e53935] font-mono text-sm">SELECT DISTINCT nume FROM studenti s LEFT OUTER JOIN note n ON s.nr_matricol = n.nr_matricol;</span></li>
                <li>RIGHT OUTER JOIN este similar dar de aceasta dată tabela deficitară în informaţii se va afla în stanga. Se vor prelua toate informaţiile din tabela din dreapta şi se vor completa (atunci când se poate) cu informaţii din tabela din stânga. Ca şi exemplu putem schimba ordinea tabelelor din LEFT OUTER JOIN-ul anterior: <span className = "text-[#e53935] font-mono text-sm">SELECT DISTINCT nume FROM note n RIGHT OUTER JOIN studenti s ON s.nr_matricol = n.nr_matricol;</span></li>
            </ul>
            <p>Cele două versiuni de join extern se pot realiza în Oracle și cu următoarea sintaxă:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT DISTINCT nume FROM studenti s, note n WHERE s.nr_matricol = n.nr_matricol(+);`}
    </pre>
            </div>

            <p>Simbolul (+) se adaugă pe ramura deficitară în informații.</p>
            <ul className="list-disc pl-5">
                <li>FULL OUTER JOIN este reuniunea celor de mai sus: sunt afişate toate informaţiile şi completate (eventual) cu informaţii din cealalta tabelă.</li>
            </ul>

            <p>Ce valori primesc în urma unui join extern înregistrările care nu au corespondent?</p>

            <h2 className="text-2xl text-blue-500">Joinul mai multor tabele</h2>

            <p>În interogările anterioare am identificat notele tuturor studenților utilizând un join între două tabele - studenti și note. Cum aflăm însă la ce discipline au fost puse notele? Adăugăm în interogare un al treilea tabel, împreună cu condiția de join necesară:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT nume, prenume, titlu_curs, valoare<br />
    {"   "}FROM studenti s<br /> 
    {"              "}JOIN note n ON s.nr_matricol=n.nr_matricol<br />
    {"              "}JOIN cursuri c ON c.id_curs=n.id_curs;
    </pre>
            </div>

            <h2 className="text-2xl text-blue-500">Self-joinul - joinul unei tabele cu ea insăși</h2>

            <p>Uneori, modul în care este structurată informația în tabele ne pune în situația de a căuta corespondentul unor înregistrări chiar în același tabel. În cazul de față, un exemplu este determinarea colegilor de grupă pentru un anumit student. Oricând suntem în situația de a apela de două ori la un tabel într-o singură interogare, spunem că realizăm un self-join. În cazul unui self join tabela în cauză este apelată de două ori cu aliasuri distincte, ca și când ar exista două instanțe identice ale aceluiași tabel.</p>
            <p>Exemplu:</p>

            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT s.nume||' '||s.prenume||' este coleg cu '||colegi.nume||' '||colegi.prenume AS "Colegi de grupa" <br />
    {"    "}FROM studenti s JOIN studenti colegi ON s.grupa=colegi.grupa AND s.an=colegi.an<br /> 
    {"    "}WHERE s.prenume='Andrei';
    </pre>
            </div>

            <p>Cum eliminăm înregistrarea în care studentul apare coleg cu el însuși?</p>
            
        </div>
    );
};

export default Course4;