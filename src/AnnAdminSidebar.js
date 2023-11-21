function BLSidebar({ businesses, 
    onAddBusiness, 
    onDeleteBusiness, 
    activeBusiness, 
    setActiveBusiness 
}){

const sortedBusiness = businesses.sort((a, b) => b.date - a.date) //the updated business will be at the top of the list

return <div className="app-sidebar">
<div className="app-sidebar-header">
<h1>Local Businesses</h1>
<button onClick={onAddBusiness}>Add</button>
</div>

<div className="app-sidebar-notes">

{sortedBusiness.map((business) => (

<div className={`app-sidebar-note ${business.id === activeBusiness && "active"}`}
    onClick={() => setActiveBusiness(business.id)}>
        
    <div className="sidebar-note-title">

        <strong>{business.title}</strong>
        <button onClick={() => onDeleteBusiness(business.id)}>Delete</button>

    </div>

    <p>{business.content && business.content.substr(0, 100) + "..."}</p>


    <small className="note-meta">
        Last modified {new Date(business.date).toLocaleDateString("en-GB", {})} {/*date and time*/}
    </small>
</div>
))}

</div>

</div>;

}

export default BLSidebar;