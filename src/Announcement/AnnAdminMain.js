import ReactMarkdown from "react-markdown";
import React, { useState } from "react";

function AnnAdminMain({ activeBusiness, onUpdateBusiness }){
    const [posted, setPosted] = useState(false);

    const onEditField = (key, value) => {
        onUpdateBusiness({
            ...activeBusiness,
            [key]: value, //explain
            date: Date.now()
        })
    };

    const onTogglePost = () => {
        setPosted(!posted);
      };


    if(!activeBusiness)
        return <div className="no-active-note">No business selected</div>;

    return <div className="app-main">

        <div className="app-main-note-edit">

            <input type="text" id="title" 
            value={activeBusiness.title} 
            onChange={(e) => onEditField("title", e.target.value)} 
            autoFocus />


            <textarea id="body" 
            placeholder="Write your business here..." 
            value={activeBusiness.content} 
            onChange={(e) => onEditField("content", e.target.value)} />
            
        </div>

        <div className="app-main-note-preview">
            <h1 className="preview-title">{activeBusiness.title}</h1>
            <ReactMarkdown className="markdown-preview">{activeBusiness.content}</ReactMarkdown>
            
            <div className="post-button-container">
                <button className="post-button" // Add the CSS class
                    onClick={onTogglePost} >
                    {posted ? "Submitted" : "Submit"}
                </button>
            </div>


        </div>

    </div>;

}

export default AnnAdminMain;