import ReactMarkdown from "react-markdown";
import React, { useState } from "react";

function BLMain({ activeBusiness, onUpdateBusiness }){
    const [posted, setPosted] = useState(false);
    const [file, setFile] = useState();

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

    const handleImageUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(URL.createObjectURL(uploadedFile)); //creates temporary URL for the uploaded file

        // Additional logic to handle image file, if needed
    };

    if(!activeBusiness)
        return <div className="no-active-note">No business selected</div>;

    return <div className="app-main">

        <div className="app-main-note-edit">

            <input type="text" id="title" 
            value={activeBusiness.title} 
            onChange={(e) => onEditField("title", e.target.value)} 
            autoFocus />

            {/* Image upload button */}
            <div className="image-upload-button-container">
            <label htmlFor="image-upload" className="image-upload-label"> Upload Image </label>
            <span className="upload-icon">
                <i className="fas fa-upload"></i>
            </span>
            <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" , marginBottom: "10px"}}
            />
            </div>


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

            {/* Display the uploaded image */}
            {file && <img src={file} alt="Uploaded" style={{ maxWidth: "30%", height: "auto" }} />}


        </div>

    </div>;

}

export default BLMain;