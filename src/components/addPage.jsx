import React, { useState } from 'react';

const AddPage = () => {

    const [pageName, setPageName] = useState("");
    const [pageURL, setPageURL] = useState("");

    const handleAddPage = async (e) => {
        e.preventDefault();
        if(!pageName.trim() || !pageURL.trim()) {
            alert("Please fill in all fields");
        }

        try{
            const response = await fetch('/api/add-site', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: pageName,
                    url: pageURL
                })
            });

            if(response.ok) {
                alert("Page added successfully");
                setPageName("");
                setPageURL("");

            } else {
                alert("Failed to add page");
            }
        } catch (error) {
            console.error("Error adding page:", error);
            alert("An error occurred while adding the page"
            )
        }
    }

    return(
        <div className='fixed top-0 left-0 bg-black/70 w-full h-full flex items-center justify-center z-50'>
            <div className='bg-white rounded-2xl w-120 h-110 px-8 py-8 relative'>
                <form>
                    <h1 className='text-2xl font-bold text-center'>
                        Add new page - Wizard
                    </h1>
                    <label className='block font-bold mt-8' htmlFor="pageName">
                        Page Name
                    </label>
                    <input className='border-2 border-gray-800 rounded-2xl p-3 w-full mt-4' id="pageName" placeholder='Enter your page name..' type="text" value={pageName} onChange={(e) => setPageName(e.target.value)}></input>
                    <label className='block font-bold mt-8' htmlFor="pageURL">
                        Page URL
                    </label>
                    <input className='border-2 border-gray-800 rounded-2xl p-3 w-full mt-4' id="pageURL" placeholder='Enter your page URL..' type="text" value={pageURL} onChange={(e) => setPageURL(e.target.value)}></input>
                    <div className='flex flex-row justify-end gap-4'>
                        <button className='bg-red-800 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl mt-8 cursor-pointer'>
                        Exit
                    </button>
                    <button onClick={handleAddPage} className='bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-2xl mt-8 cursor-pointer'>
                        Add page
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPage;