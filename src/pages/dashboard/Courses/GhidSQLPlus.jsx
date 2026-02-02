import React from 'react';

const GhidSQLPlus = () => {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl text-blue-500">Utilizarea SQL*Plus</h2>
            <p>Odata cu instalarea serverului Oracle, pe calculator se instaleaza si o aplicatie denumita SQL*Plus (ce va fi uneori gasita ca si Run SQL Command Line). Aceasta constituie consola default a serverului Oracle si va permite sa va conectati utilizand un utilizator deja creat sau, desi ar trebui evitat, contul de SYS (in cazul ca nu aveti deja creat un utilizator).</p>
            <p>Comenzile ce pot fi rulate in SQL*Plus sunt de doua tipuri:</p>
            <ul className="list-disc pl-5">
                <li>comenzi specifice SQL*Plus (ce vor fi rulate direct de catre aplicatie fara a necesita accesul la serverul SQL);</li>
                <li>comenzi SQL (ce vor fi transmise catre serverul SQL ce le va rula dupa care va intoarce rezultatul aplicatiei SQL*Plus ce il va afisa).</li>
            </ul>
            <p>Spre exemplu, comanda de conectare la un server de baze de date este o comanda specifica SQL*Plus.</p>
            <p>Fiecare comanda SQL (ce va fi rulata de serverul SQL) trebuie sa se termine cu simbolul punct si virgula ";". In cazul in care ati apasat tasta Enter (pentru a trimite comanda) dar ati uitat acest simbol, SQL*Plus va considera ca de fapt vreti sa scrieti comanda SQL pe mai multe linii si va astepta sa continuati linia deja inceputa. Puteti sa introduceti doar simbolul punct si virgula si sa apasati din nou tasta Enter.</p>
            <p>Comenzile SQL*Plus pot sa nu se termine cu simbolul punct si virgula (dar nu se va semnala vreo eroare daca se vor termina fara acesta).</p>
            <p>In continuare rulati comanda <span className = "text-[#e53935] font-mono text-sm">CONNECT SYS AS SYSDBA</span> (pentru parola lasati sirul vid).</p>
            <p>Fiecare comanda ce va fi trimisa catre serverul SQL (ce vor fi denumite comenzi SQL) este automat stocata intr-un buffer de catre SQL*Plus. Cele mai multe comenzi SQL*Plus au rolul de a "jongla" cu comanda aflata in acest buffer. In continuare dam o serie de comenzi mai importante:</p>
            <h2 className="text-2xl text-blue-500">Comenzi SQL*Plus</h2>
            <p>Pentru comenzi vom folosi urmatoarea sintaxa:</p>
            <p>- Comanda scrisa fara sa fie pusa in nici un fel de paranteze este obligatorie;</p>
            <p>- Oricare dintre comenzile puse intre acolade pot fi utilizate pentru a obtine rezultatul dorit;</p>
            <p>- Intre paranteze patrate sunt puse optiunile comenzii;</p>
            <p>- Simbolul bara verticala reprezinta o optiune. Atunci cand mai multe optiuni sunt despartite cu acest simbol,</p>
            <p>doar una dintre ele este permis a fi utilizata.</p>
            <p className = "text-blue-500">Comenzi pentru manipularea bufferului</p>
            <ul className="list-disc pl-5">
                <li><span className = "text-[#e53935] font-mono text-sm">{"{RUN | /}"}</span>: re-executa ultima comanda aflata in buffer.</li>
                <li><span className = "text-[#e53935] font-mono text-sm">{"{EDIT | ED}"}</span>: deschide editorul implicit pentru a edita continutul bufferului. Acest editor trebuie inchis pentru a putea rula din nou continutul bufferului (cu RUN sau /);</li>
                <li><span className = "text-[#e53935] font-mono text-sm">APPEND text</span>: adauga textul "text" in buffer, la sfarsit;</li>
            </ul>
            <p className = "text-blue-500">Comenzi pentru lucru cu fisiere</p>
            <ul className="list-disc pl-5">
                <li><span className = "text-[#e53935] font-mono text-sm">SAVE fisier [CREATE | REPLACE | APPEND]</span>: salveaza continutul bufferului in fisierul "fisier"</li>
                <li><span className = "text-[#e53935] font-mono text-sm">GET fisier [LIST | NOLIST]</span>: preia din fisierul "fisier" tot continutul, il incarca in buffer fara a-l executa. Continutul este apoi listat (exceptie facand cazul in care comanda este urmata de optiunea <span className = "text-[#e53935] font-mono text-sm">NOLIST</span>);</li>
                <li><span className = "text-[#e53935] font-mono text-sm">SPOOL [fisier] [CREATE | REPLACE | APPEND][OFF | OUT]</span>: pune in fisierul "fisier" tot continutul ce este afisat si in SQL*Plus. Fisierul nu este efectiv scris pe disc decat dupa executarea comenzii <span className = "text-[#e53935] font-mono text-sm">SPOOL OFF</span>. Pentru trimiterea fisierului la imprimanta se poate utiliza <span className = "text-[#e53935] font-mono text-sm">SPOOL OUT</span>.</li>
                <li><span className = "text-[#e53935] font-mono text-sm">{"{START | @}{fisier.sql | url}"}</span>: executa pe rand toate comenzile din "fisier.sql" sau de la adresa url (unde trebuie sa existe un fisier cu comnezi SQL.)</li>
            </ul>
            <p className = "text-blue-500">Comenzi pentru conectare/deconectarea unui utilizator</p>
            <ul className="list-disc pl-5">
                <li><span className = "text-[#e53935] font-mono text-sm">CONNECT usr[/pass]</span>: permite conectarea utilizatorului ce poate fi autentificat prin parola pass. In cazul in care alt utilizator este deja autentificat, acesta va fi automat deconectat. Daca nu a fost specificata o parola ea va fi ceruta ulterior - in sistemele de operare linux este preferabil ca la conectare sa nu se introduca parola pentru a nu ramane salvata in istoricul de comenzi;</li>
                <li><span className = "text-[#e53935] font-mono text-sm">DISCONNECT</span>: va deconecta utilizatorul curent;</li>
                <li><span className = "text-[#e53935] font-mono text-sm">{"{EXIT | QUIT} [SUCCESS | FAILURE | WARNING | n | variable | :BindVariable] [COMMIT | ROLLBACK]"}</span> va face COMMIT, va deconecta userul curent si va inchide aplicatia SQL*Plus;</li>
            </ul>
            <p className = "text-blue-500">Comenzi pentru lucrul cu ecranul SQL*Plus</p>
            <ul className="list-disc pl-5">
                <li><span className = "text-[#e53935] font-mono text-sm">CLEAR [SCREEN | BUFFER]</span>: sterge ecranul (sau continutul bufferului daca se specifica acest lucru);</li>
                <li><span className = "text-[#e53935] font-mono text-sm">SET LINESIZE n</span>: predefinit, SQL*Plus trece la urmatoarea linie daca aceasta depaseste 80 de caractere. Daca, totusi, dimensiunile ferestrei de tip CMD (in care ruleaza SQL*Plus) au fost modificate (click dreapta pe titlul ferestrei si apoi Properties {"->"} Layout si schimbate valorile Width la 140 spre exemplu), si SQL*Plus ar putea afisa mai multe caractere (140) pe aceeasi linie. Modificati numarul de caractere pe care SQL*Plus le considera ca pot intra pe o linie cu aceasta comanda.</li>
                <li><span className = "text-[#e53935] font-mono text-sm">SET PAGESIZE n</span>: fiecare 14 randuri vor fi considerate de catre SQL*Plus ca fiind o pagina. Modificati aceasta valoare pentru a mari/micsora dimensiunea paginii.</li>
            </ul>
            <p className = "text-blue-500">Observatii</p>
            <p>Tineti cont ca fereastra in care ruleaza SQL*Plus este o fereastra clasica de windows (precum cele deschise cu comanda CMD). Puteti asadar sa modificati dimnesiunile fontului, tipul fontului, culoarea textului sau a fundalului accesand meniul Properties (click dreapta pe bara de sus). Tot dand click dreapta pe bara puteti insera o comanda copiata din alta parte accesand Edit{"->"}Paste (desi, PREFERAM sa scrieti comanda cu propriile degetele). Ca sa impingem confortul mai departe putem face consola editabila dand click dreapta pe bara de sus, Properties, Options si check la Quick Edit Mode. Din acest moment puteti face paste in consola folosind doar right click.</p>
            <p>Incheiem aceasta sectiune prin a va furniza un link ce contine</p>
            <p>[https://docs.oracle.com/database/121/SQPUG/toc.htm lista completa cu comenzi SQL*Plus]. Nu le confundati cu comenzile SQL !</p>
        </div>
    );
};

export default GhidSQLPlus;