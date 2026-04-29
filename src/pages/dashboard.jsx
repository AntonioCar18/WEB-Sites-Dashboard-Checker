'use client';

import DashboardTCard from '../components/dashboard_tcard'
import DashboardPCard from '../components/dashboard_pcard'
import LogTable from '../components/log_table'
import React, { useState, useEffect } from 'react';
import addPage from '../components/addPage';

const Dashboard = () => {
    // 1. Inicijaliziramo kao objekt {} jer je takav JSON format
    const [pingData, setPingData] = useState({});

    const loadData = () => {
        fetch('/ping_results.json')
            .then(response => response.json())
            .then(data => {
                setPingData(data);
                console.log("Podaci uspješno učitani", data);
            })
            .catch(error => console.error('Error fetching ping data:', error));
    }

    useEffect(() => {
        loadData();
        // Automatsko osvježavanje svake minute
        const interval = setInterval(loadData, 60000);
        return () => clearInterval(interval);
    }, []);

    // --- LOGIKA ZA OBRADU PODATAKA ---
    
    // Lista URL-ova (ključeva iz JSON-a)
    const urls = Object.keys(pingData);

    // Izvlačimo samo zadnji (najsvježiji) unos za svaku stranicu za gornje kartice
    const latestResults = urls.map(url => {
        const history = pingData[url];
        return history[history.length - 1];
    });

    const br_web = urls.length;
    const up_web = latestResults.filter(entry => entry.status === "UP").length;
    const down_web = latestResults.filter(entry => entry.status !== "UP").length;
    
    // Prosječna latencija svih stranica (zadnji ping)
    const avg_latency = br_web > 0 
        ? (latestResults.reduce((sum, entry) => sum + entry.latency, 0) / br_web).toFixed(0) 
        : 0;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header sekcija */}
            <div className='flex flex-row justify-between items-center w-full h-16 mt-8 mb-4'>
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-black ml-16">
                        Monitoring dashboard
                    </h1>
                    <p className='hidden lg:block ml-16 text-gray-500'>
                        {br_web} web sites monitored at the moment
                    </p>
                </div>
                <div>
                    <button 
                        onClick={addPage}
                        className="cursor-pointer bg-gray-800 text-white font-bold py-4 px-8 rounded mr-16 hover:bg-gray-700 transition-all"
                    >
                        Add new page
                    </button>
                </div>
            </div>

            {/* Top Cards (Statistika) */}
            <div className="w-full h-full px-16 mt-4 flex flex-col lg:flex-row gap-8">
                <DashboardTCard icon={<span>✅</span>} title="Sites UP" count={up_web} />
                <DashboardTCard icon={<span>❌</span>} title="Sites DOWN" count={down_web} />
                <DashboardTCard icon={<span>⚠️</span>} title="SSL Expiring" count={0} />
                <DashboardTCard icon={<span>⏱️</span>} title="Avg. latency (ms)" count={avg_latency} />
            </div>

            {/* Search Bar */}
            <div className='relative px-16 mt-8 mb-4'>
                <input 
                    className='border-2 border-gray-300 rounded-2xl p-3 sm:w-full lg:w-1/4 focus:border-gray-800 outline-none transition-all' 
                    placeholder='Search...' 
                    type="text" 
                />
            </div>

            {/* PCards - Dinamički generiramo karticu s grafom za svaku stranicu */}
            <div className="w-full h-full px-16 mt-4 lg:grid grid-cols-4 gap-8">
                {urls.map((url, index) => {
                    const history = pingData[url];
                    const current = history[history.length - 1];

                    return (
                        <DashboardPCard 
                            key={index} 
                            title={url.replace('https://', '').replace('.hr', '')} 
                            web_address={url} 
                            status={current.status} 
                            latency_time={current.latency} 
                            last_checked={current.timestamp} 
                            history={history} // Cijela lista za grafikon
                            uptime={100} 
                        />
                    );
                })}
            </div>

            {/* Log Table - Spajamo sve povijesti u jednu listu za kronološki pregled */}
            <div className='w-full h-full px-16 mt-12 mb-12'>
                <LogTable data={Object.values(pingData).flat().sort((a, b) => b.timestamp.localeCompare(a.timestamp))} />
            </div>
        </div>
    )
}

export default Dashboard;