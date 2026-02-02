import React from 'react';

const Course10 = () => {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl text-blue-500">Variabile de substituție SQL*Plus</h2>
            <p>Variabilele de substituție au rolul de a suplini constante, condiții utilizate în clauza WHERE, nume de campuri utilizate în clauza ORDER BY, nume de tabele sau chiar întregi fraze SELECT.</p>
            <p>Variabilele de substituție sunt precedate de simbolul <span className="font-bold">&</span> iar la execuția interogării, SQLPlus va solicita de la utilizator valorile necesare.</p>
            <p>Exemplu 1:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT * FROM studenti<br />
    {"    "}WHERE an=&an AND nume LIKE '&nume'<br /> 
    </pre>
            </div>
            <p>Exemplu 2:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT nume, &camp_afisare<br />
    {"    "}FROM studenti<br /> 
    {"    "}WHERE &conditie2<br />
    {"    "}ORDER BY &camp_sortare;<br />
    </pre>
            </div>
            <p>Executați interogările de mai sus de mai multe ori inserând diverse valori pentru variabilele de substituție. Verificați rezultatul.</p>
            <p>Variabilele de substituție pot fi predefinite și instanțiate, caz în care la execuția interogării nu se mai solicită valoarea:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    DEFINE camp=prenume<br />
    SELECT nume, &camp<br /> 
    {"    "}FROM studenti<br />
    {"    "}ORDER BY {"&camp;"}<br />
    </pre>
            </div>
            <p>Variabila este stocată pe parcursul sesiunii curente până la eliminarea ei cu comanda UNDEFINE sau până la închiderea sesiunii.</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`UNDEFINE camp`}
    </pre>
            </div>
            <p>Comenzile DEFINE si UNDEFINE sunt specifice utilitarului SQL*Plus și nu limbajului SQL.</p>
            <h2 className="text-2xl text-blue-500">Comenzi DML - Modificare date</h2>
            <p>Până acum s-au utilizat în cadrul laboratoarelor doar comenzi de interogarea a datelor - adică fraza SELECT - care sunt parte tot din cadrul componentei DML (Data Manipulation Language) a limbajului SQL.</p>
            <p>În această secțiune exemplificăm comenzile de modificare a datelor.</p>
            <h3 className="text-xl text-blue-500">Afişarea anumitor rânduri</h3>
            <p>Inserarea de noi înregistrări în baza de date se realizează cu ajutorul comenzii INSERT care poate lua două forme:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    INSERT INTO nume_tabel [ (lista_coloane) ]<br /> 
    {"    "}VALUES (lista_valori)<br />
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    INSERT INTO cursuri VALUES(30, 'Inv. automata', 3, 1, 5);<br /> 
    INSERT INTO cursuri (ID_curs, titlu_curs) VALUES(31, 'NoSQL');<br />
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`INSERT INTO nume_tabel [ (lista_coloane) fraza_select`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    INSERT INTO note<br /> 
    SELECT nr_matricol, 30, 10, SYSDATE<br />
    {"  "}FROM studenti<br />
    {"  "}WHERE an=3;
    </pre>
            </div>
            <h2 className="text-2xl text-blue-500">Secvențe</h2>
            <p>De multe ori suntem puși în situația de a crea atribute sintetice care să joace rol de cheie, deci să ia valori unice în cadrul unei tabele. Secvențele sunt obiecte care ne ajută să generăm automat numere întregi unice în momentul inserării înregistrilor.</p>
            <p>Sintaxa creării unei secvențe:</p>
             <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    CREATE SEQUENCE nume_secventa<br />
    {"  "}[INCREMENT BY n]{"               "}<span className="text-slate-400">-- pasul</span><br /> 
    {"  "}[START WITH n1]{"                "}<span className="text-slate-400">-- valoarea de start</span><br />
    {"  "}[MAXVALUE n_max | NOMAXVALUE]{"  "}<span className="text-slate-400">-- valoarea de oprire</span><br />
    {"  "}[MINVALUE n_min | NOMINVALUE]{"  "}<span className="text-slate-400">-- valoarea minima (listele pot fi siruri descrescatoare)</span><br />
    {"  "}[CYCLE | NOCYCLE]{"              "}<span className="text-slate-400">-- valoarea minima (listele pot fi siruri descrescatoare)</span><br />
    </pre>
            </div>
            <p>Comanda NEXTVAL generează următorul număr din șir iar CURRVAL obține valoarea curentă. NEXTVAL trebuie executată înainte ca lista să conțină breun număr.</p>
            <p>CYCLE {"->"} furnizati si optiunea NOCACHE</p>
            <p>Exemplu:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    CREATE SEQUENCE s1<br /> 
    {"  "}INCREMENT BY 2<br />
    {"  "}START WITH 10<br />
    {"  "}MAXVALUE 15;
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    SELECT s1.NEXTVAL FROM DUAL;<span className="text-slate-400">--executati in mod repetat comanda; cand ridica eroare?</span><br /> 
    </pre>
            </div>
            <p>Pentru a elimina secventa se va executa comanda</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`DROP SEQUENCE nume_secventa;`}
    </pre>
            </div>
            <h3 className="text-xl text-blue-500">Exerciții</h3>
            <ol className="list-decimal pl-5">
                <li>Cum poate fi utilizată o secvență la inserare?</li>
                <li>Răspundeți creând o secvență care sa vă ajute sa inserați noi cursuri cu id unic, cu intrari consecutive crescătoare cu pasul 1. Inserati 3 cursuri noi cu id-ul generat de secventa.</li>
            </ol>
            <h2 className="text-2xl text-blue-500">Actualizarea înregistrărilor</h2>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    UPDATE nume_tabel [alias]<br /> 
    {"  "}SET nume_coloana1 = valoare1<br />
    {"    "}[, nume_coloana2 = valoare2...]<br />
    {"    "}[WHERE conditie]
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    UPDATE studenti<br /> 
    {"  "}SET bursa=bursa*0.15 WHERE bursa{"<"}300;<br />
    {"    "}[, nume_coloana2 = valoare2...]<br />
    {"    "}[WHERE conditie]
    </pre>
            </div>
             <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    UPDATE nume_tabel [alias]<br /> 
    {"  "}SET (nume_coloana1 [,nume_coloana2]...) = (subinterogare)<br />
    {"    "}[WHERE conditie]
    </pre>
            </div>
            <h2 className="text-2xl text-blue-500">Ștergerea înregistrărilor</h2>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    DELETE FROM nume_tabel<br /> 
    {" "}[WHERE conditie]<br />
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`DELETE FROM note WHERE valoare < 5;`}
    </pre>
            </div>
            <h2 className="text-2xl text-blue-500">Comenzi DDL - creare/modificare structuri de date</h2>
            <p>Aceste comenzi sunt menite a crea sau a șterge tabele (sau alte tipuri de obiecte), precum și a modifica structura tabelelor (obiectelor) existente. Comenzile necesare fac parte din componenta DDL (Data Definition Language) a limbajului SQL.</p>
            <h2 className="text-2xl text-blue-500">CREATE TABLE AS</h2>
            <p>Comenzile de creare a tabelelor au fost pe larg explicate la curs, cu diversele constrângeri care pot fi impuse asupra datelor la momentul creării. Aici tratăm doar comanda CREATE cu subinterogări.</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`CREATE TABLE nume_tabel [(col1, col2,...)] [AS] fraza_select;`}
    </pre>
            </div>
            <h3 className="text-xl text-blue-500">Exercitii</h3>
            <p>Executati comanda ROLLBACK. Creati apoi o tabelă care să stocheze numele, prenumele, bursa si mediile studentilor.</p>
            <h2 className="text-2xl text-blue-500">ALTER TABLE</h2>
            <p>Structura tabelelor create deja poate fi modificată, chiar dacă tabelul conține deja date. Modificările pot să vizeze adăugarea de noi coloane, ștergerea unor coloane existente, modificarea definiției unei coloane (tipul și constrângerile impuse), redenumirea unei coloane, redenumirea tabelului, adăugarea sau ștergerea de constângeri (chei candidat, chei primare, chei străine, constrângeri NOT NULL, CHECK).</p>
            <p>Găsiți în continuare comenzile necesare:</p>
            <p>Pentru adăugarea unor coloane într-un tabel:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE nume_tabel ADD (col1 definitie_col1 [,col2 definitie_col2....]) `}
    </pre>
            </div>
            <p>Exemplu:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    ALTER TABLE cursuri ADD {"("}abreviere CHAR(2) NULL,<br /> 
    {"                 "}descriere VARCHAR(40) DEFAULT 'curs obligatoriu'{")"};<br />
    </pre>
            </div>
            <p>Pentru eliminearea unor coloane dintr-un tabel:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE nume_tabel DROP COLUMN col`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE cursuri DROP COLUMN descriere;`}
    </pre>
            </div>
            <p>Pentru modificarea tipului unor coloane sau a atributului not null:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE nume_tabel MODIFY (col1 definitie_col1 [,col2 definitie_col2....])`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    ALTER TABLE profesori MODIFY {"("}nume VARCHAR(20),<br /> 
    {"                             "}prenume VARCHAR(20){")"};<br />
    </pre>
            </div>
            <p>Pentru redenumirea unor coloane:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE nume_tabel RENAME COLUMN col_veche TO col_noua`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE note RENAME COLUMN valoare TO nota;`}
    </pre>
            </div>
            <p>Pentru redenumirea tabelului:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE nume_vechi_tabel RENAME TO nume_nou_tabel`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE profesori RENAME TO cadre_didactice;`}
    </pre>
            </div>
            <p>Pentru adăugarea unor constrangeri asupra unei coloane dintr-un tabel (PRIMARY KEY, FOREIGN KEY, CHECK(conditie), UNIQUE(coloana)):</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE nume_tabel ADD CONSTRAINT nume_constrangere definitie_constrangere;`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    ALTER TABLE studenti ADD CONSTRAINT <br /> 
    {"     "}pk_studs PRIMARY KEY (nr_matricol);<br />
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    ALTER TABLE note ADD CONSTRAINT<br /> 
    {"     "}fk_studs FOREIGN KEY (nr_matricol)<br />
    {"     "}REFERENCES studenti(nr_matricol) ON DELETE CASCADE;<br />
    </pre>
            </div>
            <p>Pentru eliminarea unor constrangeri definite de utilizator:</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE nume_tabel DROP CONSTRAINT nume_constrangere;`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ALTER TABLE note DROP CONSTRAINT fk_studs;`}
    </pre>
            </div>
            <h3 className="text-xl text-blue-500">Exercitii</h3>
            <ol className="list-decimal pl-5">
                <li>Executati din nou scriptul de creare de aici: http://profs.info.uaic.ro/~vcosmin/BD/facultate.sql</li>
                <li>Răspundeți creând o secvență care sa vă ajute sa inserați noi cursuri cu id unic, cu intrari consecutive crescătoare cu pasul 1. Inserati 3 cursuri noi cu id-ul generat de secventa.</li>
                <li>Adăugați constrângerile referențiale pentru tabelele Note și Didactic. La ștergerea unui profesor din tabela Profesori, în tabela Didactic id-ul profesorului șters va deveni null. La stergerea unui curs din tabela Cursuri, in tabela Didactic va fi stearsă înregistrarea care referențiază cursul șters. Scrieți comenzi de ștergere înregistrări pentru tabelele referențiate și studiați comportamentul.</li>
                <li>Impuneți constrângerea ca un student să nu aibă mai mult de o notă la un curs.</li>
                <li>Impuneți constrângerea ca valoarea notei să fie cuprinsă între 1 și 10.</li>
            </ol>
            <h3 className="text-xl text-blue-500">Tranzacții</h3>
            <p>O tranzacție reprezintă un grup de comenzi de modificare de date (DML) care trebuie executate împreună, pentru a garanta consistența datelor. Eșuarea oricărei comenzi din cadrul unei tranzacții determină revenirea la starea inițială, dinaintea tranzacției.</p>
            <p>O tranzacție începe de la prima comandă DML executată și se încheie la întâlnirea uneia dintre comenzile COMMIT și ROLLBACK, la întâlnirea unei comenzi DDL, la închiderea sesiunii sau la o eroare a sistemului.</p>
            <p>Comanda ROLLBACK încheie tranzacția readucând baza de date la starea de dinaintea începerii tranzacției. O cădere a sistemului rezultă tot într-o comandă de tip ROLLBACK, adică revenirea la starea de dinaintea începerii tranzacției; este modalitatea prin care este protejată integritatea datelor. Restul situațiilor enumerate mai sus care determină încheierea unei tranzacții, fac ca modificările efectate asupra datelor să fie permanente, fără posibilitatea revenirii la o stare anterioară.</p>
            <p>Imediat ce o tranzacție s-a încheiat, prima comandă DML lansată marchează nceputul uneia noi.</p>
            <p>În cadrul acestui laborator ați executat comanda ROLLBACK înainte de a experimenta cu comanda CREATE TABLE, adică înainte de prima comandă de tip DDL lansată. Rezultatul a fost revenirea bazei de date la starea existentă la începutul sesiunii de lucru. Dacă nu ar fi fost lansată comanda ROLLBACK, modificările efectuate asupra datelor ar fi devenit permanente în momentul executării comenzii DDL (așa cum s-a specificat mai sus, orice comandă DDL încheie tranzacția marcând modificările ca fiind permanente).</p>
            <p>Pe parcursul unei tranzacții pot fi adăugați niște marcatori/indicatori cu ajutorul cărora să putem reveni la stări intermediare. Adăugarea unui indicator se realizează cu ajutorul comenzii</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SAVEPOINT nume_indicator`}
    </pre>
            </div>
            <p>iar revenirea la starea bazei de date din acel moment se realizează cu ajutorul comenzii</p>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`ROLLBACK TO SAVEPOINT nume_indicator`}
    </pre>
            </div>
            <p>Orice comandă DDL este considerată a forma o tranzacție.</p>
            <h2 className="text-2xl text-blue-500">Exerciții</h2>
            <h3 className="text-xl text-blue-500">Exercițiul 1</h3>
            <ol className="list-decimal pl-5">
                <li>Asigurati-va că începeți o nouă tranzacție.</li>
                <li>Ștergeți toate înregistrările din tabela Profesori.</li>
                <li>Inserați un profesor.</li>
                <li>Marcați starea curentă ca 's1'.</li>
                <li>Schimbați numele profesorului inserat.</li>
                <li>Vizualizați datele.</li>
                <li>Reveniți la starea s1.</li>
                <li>Vizualizați datele.</li>
                <li>Reveniția la starea de dinaintea ștergerii.</li>
            </ol>
            <h3 className="text-xl text-blue-500">Exercițiul 2</h3>
            <ol className="list-decimal pl-5">
                <li>Rulați scriptul de creare (pentru a vă asigura că aveți baza de date inițială).</li>
                <li>Deschideți două instanțe de SQL Plus și autentificați-vă în ambele ca student.</li>
                <li>Verificați că în ambele instanțe aveți aceleași date în tabelul student (e firesc să fie așa).</li>
                <li>In instanța A rulați o comandă de modificare a burselor din 250 în 300.</li>
                <li>Verificați că modificarea are loc în instanța A.</li>
                <li>Are loc modificarea în instanța B ? De ce ?</li>
                <li>In instanța B rulați o comanda de modificare a burserlor din 250 în 400 - în instanța B ar fi trebuit să vedeți că există burse de 250, la pasul precedent. Ce se întâmplă și de ce ? (nu vă speriați, nu vi s-a blocat calculatorul).</li>
                <li>Executați comanda commit în instanța A. Ce s-a intamplat cu instanța B și de ce ?</li>
            </ol>
        </div>
    );
};

export default Course10;