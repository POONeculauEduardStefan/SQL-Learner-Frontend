import React from 'react';
import {useTranslation} from "react-i18next";

const HistoryList = ({history, setSelectedHistoryItem}) => {
    const {t} = useTranslation();

    return (
        <>
            {history && history.length > 0 ? history.map((item) => {
                    return <div
                        key={item.id}
                        className="flex flex-col items-center justify-between border border-slate-200 rounded-xl px-4 py-2 mb-3 bg-slate-50 cursor-pointer"
                        onClick={() => {
                            setSelectedHistoryItem(item)
                        }}
                    >
                        <span
                            className={`text-sm font-medium ${
                                item.success ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                                {item.success ? t('common.success') : t('common.failure')}
                            </span>
                        <span className="text-xs text-slate-400">
                                {new Date(item.created_at).toLocaleDateString()}
                        </span>
                    </div>
                })
                : null}
        </>
    );
};

export default HistoryList;