import React, {useState} from 'react';
import {ChevronRight, DatabaseZap} from "lucide-react";
import Course1 from "./Course1.jsx";
import {useTranslation} from "react-i18next";
import Course2 from "./Course2.jsx";
import Course4 from "./Course4.jsx";
import Course3 from "./Course3.jsx";
import SchemaModal from "./SchemaModal.jsx";
import Course5 from './Course5.jsx';
import Course6 from './Course6.jsx';
import Course7 from './Course7.jsx';
import Course8 from './Course8.jsx';
import Course9 from './Course9.jsx';
import Course11 from './Course11.jsx';
import Course12 from './Course12.jsx';
import Course13 from './Course13.jsx';
import Course14 from './Course14.jsx';
import Instalare from './Instalare.jsx';
import GhidSQLPlus from './GhidSQLPlus.jsx';
import Course10 from './Course10.jsx';


const Courses = () => {
    const {t} = useTranslation();
    const courseList = Array.from({length: 16}).map((_, index) => ({
        id: index + 1,
        title: `${t('courses.course')} ${index + 1}`,
        filename: `Course${index + 1}`
    }));
    const COURSE_COMPONENTS = {
        'Course1': Course1,
        'Course2': Course2,
        'Course3': Course3,
        'Course4': Course4,
        'Course5': Course5,
        'Course6': Course6,
        'Course7': Course7,
        'Course8': Course8,
        'Course9': Course9,
        'Course10': Course10,
        'Course11': Course11,
        'Course12': Course12,
        'Course13': Course13,
        'Course14': Course14,
        'Course15': Instalare,
        'Course16': GhidSQLPlus
    };

    const [selectedCourse, setSelectedCourse] = useState({
        id: 1,
        title: `${t('courses.course')} 1`,
        filename: 'Course1'
    });
    const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
    const ActiveCourseComponent = COURSE_COMPONENTS[selectedCourse.filename];
    const handleSelectCourse = (id, title, filename) => {
        setSelectedCourse({
            id: id,
            title: title,
            filename: filename
        });
    };

    const onCloseSchemaModal = () => {
        setIsSchemaModalOpen(false);
    }

    return (
        <div className="mt-6 w-[90%] mx-auto">
            <div className="flex items-center gap-10">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{t('courses.title')}</h1>
                    <p className="text-slate-600 mb-6">{t('courses.description')}</p>
                </div>
                <button
                    onClick={() => setIsSchemaModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <DatabaseZap className="w-5 h-5"/>
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <div
                        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 h-[400px] flex flex-col gap-3 overflow-y-auto"
                        style={
                            {scrollbarWidth: "none"}
                        }
                    >
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 px-2">
                            {t('courses.subtitle')}
                        </h2>
                        {
                            courseList.map((course, index) => (
                                <div
                                    key={course.id}
                                    className={`group relative rounded-xl transition-all ${
                                        selectedCourse.id === course.id
                                            ? 'bg-blue-50 border-2 border-blue-200'
                                            : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                                    }`}
                                >
                                    <button
                                        onClick={() => {
                                            handleSelectCourse(
                                                course.id,
                                                course.title,
                                                course.filename
                                            )
                                        }}
                                        className="w-full text-left p-3"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className={`font-semibold text-sm truncate ${
                                                    selectedCourse.id === course.id ? 'text-blue-900' : 'text-slate-900'
                                                }`}>
                                                    {course.title}
                                                </p>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 flex-shrink-0 ml-2 ${
                                                selectedCourse.id === course.id ? 'text-blue-600' : 'text-slate-400'
                                            }`}/>
                                        </div>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div
                    className="flex flex-col gap-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-3 lg:col-span-3 mb-2">
                    <h2
                        className="text-lg font-bold text-slate-900 mb-2"
                    >
                        {selectedCourse.title ? `${t('common.lessons_for')}: ${selectedCourse.title}` : t('common.chose_course')}
                    </h2>
                    <div className="flex flex-col gap-4 h-[550px] overflow-y-auto">
                        {ActiveCourseComponent && <ActiveCourseComponent/>}
                    </div>
                </div>
            </div>
            <SchemaModal
                isOpen={isSchemaModalOpen}
                onClose={onCloseSchemaModal}
            />
        </div>
    );
};

export default Courses;

