import React, { useState, useEffect } from 'react';

const HelpPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetchamo JSON koji generira tvoj checker.py
        // Putanja ovisi o tome gdje ti server servira statičke datoteke
        fetch('/ai_help.json') 
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Greška pri učitavanju AI podataka:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const isAllGood = data?.diagnostic_report?.includes('✅');

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-10">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className={`p-6 ${isAllGood ? 'bg-green-800' : 'bg-gray-800'}`}>
                        <h1 className="text-2xl font-bold text-white">AI Diagnostic Center</h1>
                        <p className="text-blue-100 text-sm">Status analize sustava u realnom vremenu</p>
                    </div>

                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Analiza logova</h2>
                            <span className="text-xs font-mono bg-gray-200 px-3 py-1 rounded-full text-gray-600">
                                {data?.timestamp || 'N/A'}
                            </span>
                        </div>

                        <div className={`p-6 rounded-xl border-l-8 ${isAllGood ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                {data?.diagnostic_report || "Nema dostupnih podataka."}
                            </p>
                        </div>

                        {!isAllGood && (
                            <div className="mt-8 p-4 bg-blue-50 rounded-lg flex items-start gap-4 border border-blue-100">
                                <span className="text-2xl">💡</span>
                                <div>
                                    <h4 className="font-bold text-blue-800">Preporuka inženjera:</h4>
                                    <p className="text-blue-700 text-sm">
                                        Pratite upute koje je generirao Gemini AI. Ako se status ne promijeni nakon 5 minuta, provjerite error logove na serveru.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                            Powered by Google Gemini 1.5 Flash
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;