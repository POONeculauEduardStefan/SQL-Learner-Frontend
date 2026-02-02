import React from 'react';

const Course13 = () => {
    return (
        <div className="flex flex-col gap-3">
            <p>Obiective:</p>
            <p>Realizarea de exercitii cu:</p>
            <ul className="list-disc pl-5">
                <li>chei</li>
                <li>forme normale</li>
                <li>normalizare</li>
            </ul>
            <h2 className="text-2xl text-blue-500">Exerciții</h2>
            <ol className="list-decimal pl-5">
                <li>Exercitii Forme Normale</li>
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

export default Course13;