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
    {`SELECT * FROM studenti; --cate linii sunt returnate?`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM note; --cate linii sunt returnate?`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM studenti, note; --cate linii sunt returnate? de ce?`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM studenti, note WHERE prenume='Andrei'; --cate linii sunt returnate? de ce?`}
    </pre>
            </div>
            <div
                className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
  <pre className="font-mono text-sm text-slate-800 dark:text-slate-200">
    {`SELECT * FROM studenti, note, cursuri; --cate linii sunt returnate? de ce?`}
    </pre>
            </div>
        </div>
    );
};

export default Course4;