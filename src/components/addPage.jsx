import React, { useState } from 'react';

const addPage = () => {
    const [popUp, setpopUp] = useState(false);
    return(
        setpopUp(!popUp)
    )
}

export default addPage;