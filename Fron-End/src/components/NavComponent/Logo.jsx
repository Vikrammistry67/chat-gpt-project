import React from 'react'

const Logo = () => {
    const refreshPage = () => { window.location.reload() };
    return (
        <div onClick={refreshPage} className='logoContainer text-3xl flex gap-2 cursor-pointer'><i className="ri-openai-fill"></i>
            <h2 className='text-xs'>VIKRAM'S GPT</h2>
        </div>
    )
}

export default Logo