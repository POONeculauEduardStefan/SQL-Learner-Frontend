import React from 'react';

const Course12 = () => {
    return (
        <div className="flex flex-col gap-3">
            <p>Obiective:</p>
            <p>Realizarea de exercitii cu:</p>
            <ul className="list-disc pl-5">
                <li>operatori în algebra relațională</li>
                <li>dependențe funcționale și multivaluate</li>
            </ul>
            <h2 className="text-2xl text-blue-500">Exerciții</h2>
            <ol className="list-decimal pl-5">
                <li>Exercitii Algebra Relationala</li>
                <li>Exercitiu [Dependente, Inchideri, Chei]</li>
                <li>Pentru primele trei exercitii propuse la laborator determinati dependentele functionale din tabelele obtinute in urma operatiilor de tip JOIN.</li>
                <li>Modificati o tabela (de exemplu profesori) pentru a obtine in cadrul ei dependente multivaluate.</li>
            </ol>
            <h3 className="text-xl text-blue-500">Cursuri necesare acest laborator:</h3>
            <ul className="list-disc pl-5">
                <li>Curs 1</li>
                <li>Curs 2</li>
                <li>Curs 3</li>
                <li>Curs 4</li>
                <li>Curs 5,6</li>
            </ul>
        </div>
    );
};

export default Course12;