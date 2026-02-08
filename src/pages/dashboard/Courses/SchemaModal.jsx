import {Loader2, X} from 'lucide-react';
import React, {useEffect, useState} from "react";
import mermaid from "mermaid";

export default function SchemaModal({isOpen, onClose}) {
    const [loading, setLoading] = useState(false);
    const [mouseDownTarget, setMouseDownTarget] = useState(null);
    useEffect(() => {
        mermaid.initialize({startOnLoad: true});
        mermaid.contentLoaded();
    }, [isOpen]);

    const schemaCode = `
erDiagram
    STUDENTI ||--o{ NOTE : "primeste"
    CURSURI ||--o{ NOTE : "inregistreaza"
    CURSURI ||--o{ DIDACTIC : "este predat"
    PROFESORI ||--o{ DIDACTIC : "preda"

    STUDENTI {
        CHAR(6) nr_matricol PK
        VARCHAR2(10) nume
        VARCHAR2(10) prenume
        NUMBER(1) an
        CHAR(2) grupa
        NUMBER(6_2) bursa
        DATE data_nastere
    }

    CURSURI {
        CHAR(4) id_curs PK
        VARCHAR2(15) titlu_curs
        NUMBER(1) an
        NUMBER(1) semestru
        NUMBER(2) credite
    }

    NOTE {
        CHAR(6) nr_matricol FK
        CHAR(4) id_curs FK
        NUMBER(2) valoare
        DATE data_notare
    }

    PROFESORI {
        CHAR(4) id_prof PK
        CHAR(10) nume
        CHAR(10) prenume
        VARCHAR2(5) grad_didactic
    }

    DIDACTIC {
        CHAR(4) id_prof FK
        CHAR(4) id_curs FK
    }
  `;

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    const handleBackdropMouseDown = (e) => {
        setMouseDownTarget(e.target);
    };

    const handleBackdropMouseUp = (e) => {
        if (mouseDownTarget === e.currentTarget && e.target === e.currentTarget && !loading) {
            handleClose();
        }
        setMouseDownTarget(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4"
             onMouseDown={handleBackdropMouseDown}
             onMouseUp={handleBackdropMouseUp}>
            <div className="bg-white rounded-2xl shadow-xl min-w-[90%] overflow-y-auto overflow-x-auto">
                <div
                    className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <X className="w-5 h-5 text-slate-600"/>
                    </button>
                </div>

                <div className="mermaid">
                    {schemaCode}
                </div>
            </div>
        </div>
    );
}