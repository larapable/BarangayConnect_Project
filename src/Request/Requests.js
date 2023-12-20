import './Requests.css';
import { Grid, Modal,Button,Paper } from '@mui/material';
import { useState, useEffect} from 'react';
import Header from '../Header';
import { Link, Navigate, useNavigate} from "react-router-dom";



function Requests () {
  const labels = [
    'Indigency',
    'Residency',
    'Certification',
    'Clearance',
    'Medical Assistance',
    'Others',
  ];

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [suffix, setSuffix] = useState();
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [numcopies, setNumcopies] = useState();
  const [purok, setPurok] = useState("");
  const [purpose, setPurpose] = useState("");
  const [doctype, setDoctype] = useState("");
  const [others, setOthers] = useState("");
  const [type, setType] = useState("");
  const [contactnum, setContactNum] = useState("");
  const [email, setEmail] = useState("");
  const [requests, setRequests] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const usser = JSON.parse(localStorage.getItem("user"));

  
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  
  const handlePurokChange = (event) => {
    const selectedValue = event.target.value;
    setPurok(selectedValue);
  };

  const handleGenderChange = (event) => {
    const selectedValue = event.target.value;
    setGender(selectedValue);
  };

  const  handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    setType(selectedValue);
  };


  const handleRadioChange = (value) => {
    setDoctype(value);
  };


  const handleClearRequest = () => {
    setLastname("");
    setFirstname("");
    setMiddlename("");
    setSuffix("");
    setBirthdate("");
    setAge("");
    setGender("");
    setNumcopies("");
    setPurok("");
    setPurpose("");
    setDoctype("");
    setOthers("");
    setType("");
    setContactNum("");
    setEmail("");
  };


  

  const handleRequests = async (event) => {
    const userObj = JSON.parse(localStorage.getItem("user"));
    // Check if required fields are filled
    event.preventDefault();
    console.log("Submitting:", {
      lastname,
      firstname,
      middlename,
      suffix,
      birthdate,
      age,
      gender,
      numcopies,
      purok,
      purpose,
      doctype,
      others,
      type,
      contactnum,
      email,
    });
  
    if (
      !lastname?.trim() ||
      !firstname?.trim() ||
      !middlename?.trim() ||
      !suffix?.trim() ||
      !birthdate?.trim() ||
      !age?.trim() ||
      !gender?.trim() ||
      !numcopies?.trim() ||
      !purok?.trim() ||
      !purpose?.trim() ||
      !doctype?.trim() ||
      !contactnum?.trim() ||
      !email?.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    
  
    try {
     
      const response = await fetch("http://localhost:8080/requests/insertRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastname,
          firstname,
          middlename,
          suffix,
          birthdate,
          age,
          gender,
          numcopies,
          purok,
          purpose,
          doctype,
          others,
          type,
          contactnum,
          email,
          user: userObj
        }),
      });
  
      console.log("Response Status:", response.status);
      console.log("Response Body:", await response.text());
  
      if (response.ok) {
        // Request successful
        console.log("Request successful");
        setShowPopup(true);
        fetchRequests();
        setShowProgress(true);


      } else {
        // Handle error
        const errorMessage = await response.text();
        console.error("Request failed:", errorMessage);
        alert(`An error occurred during request: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error during request:", error.message);
      alert(`An error occurred during request: ${error.message}`);
    }

  };
  const handleClosePopup = () => {
    setShowPopup(false);
    handleClearRequest();
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/requests/getAllRequest`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Request not found');
      }

      const allRequests = await response.json();

      // Filter out requests that are marked as deleted
      const activeRequests = allRequests.filter((request) => !request.isDeleted);
      setRequests(activeRequests);
      setShowProgress(true);

      console.log('Successfully fetched user information');
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  

  useEffect(() => {
    // Fetch requests when the component mounts
    fetchRequests();
  }, []); 

  return (
    <div>
    <div>
      <Header />
    </div>

    <div className='request-grid2'>
    <div className='request-con'>
        <div className='request-rem'>
          <p className='request-para2'>R E M I N D E R S</p>
            <p className='request-para'>The requesting of documents has a fee of P30.00 
               peso for each documents. And for others, additional 
               P5.00 will be charge.</p>
        </div>
        <div>
        {showProgress && requests.length > 0 && (
  <Grid container spacing={2}>
  {requests.map((request) => {
    return (
      <Grid item key={request.id} sm={12}>
        {usser.id !== null && usser.id === request.user.id ? (
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            {console.log("ussseeeer", usser.id)}
            {console.log("req-user", request.user.id)}
            <h2>Request Progress</h2>
            <h3 style={{color:'red',fontStyle:"italic"}}>Document Request: {request.doctype}</h3>
            <h3 style={{color:'blue',fontStyle:"italic"}}>Document Status: {request.track}</h3>
          </Paper>
        ) : (
          <></>
        )}
      </Grid>
    );
  })}
</Grid>

)}



        </div>
    </div>
   
     
    <div className='request-img'>

      <div style={{marginBottom:'50px'}}>
      <Grid container>
        <Grid item className='text-fields-container'>
          <p className='name2'>Fill all the necessary informations and make sure to fill NA for none</p>
        
          <div className='card' style={{backgroundColor: '#f0f0f0', padding: '15px',borderRadius: '8px', marginLeft: '2%', width: '100%', marginBottom: '-2%'}}>

      <p className='card-label' style={{marginBottom: '40px', fontWeight: 'bold', fontSize: '30px', color: '#213555'}}>Personal Information</p>

      <div className='card-content' style={{marginBottom: '50px'}}>
      <input type='text' placeholder='Lastname *'  id="lastname" name="lastname" value={lastname}   onChange={(e) => setLastname(e.target.value)} className='custom-input' required style={{ fontSize: '18px', color: '#000' }}/>
      <input type='text' placeholder='Firstname *'  id = "firstname" name = "firstname" value={firstname}   onChange={(e) => setFirstname(e.target.value)} className='custom-input' required style={{ fontSize: '18px', color: '#000' }} />
      <input type='text' placeholder='Middlename *' id = "middlename" name = "middlename" value={middlename}   onChange={(e) => setMiddlename(e.target.value)} className='custom-input' required style={{ fontSize: '18px', color: '#000' }} />
      <input type='text' placeholder='Suffix *' id = "suffix" name = "suffix" value={suffix}   onChange={(e) => setSuffix(e.target.value)} className='custom-input' required style={{ fontSize: '18px', color: '#000' }}/>
      </div>

      <div style={{marginBottom:'50px'}}>
      <Grid container>
        <Grid item >
          <div>
          <input type='text' placeholder='dd/mm/yyyy *' id = "birthdate" name = "birthdate" value={birthdate}   onChange={(e) => setBirthdate(e.target.value)}  className='custom-input' required style={{ fontSize: '18px', color: '#000' }}/> 
          </div>
        </Grid>
        <Grid item>
          <div>
          <input type='text' placeholder='Age *' id = "age" name = "age" value={age}  onChange={(e) => setAge(e.target.value)} className='custom-input' required style={{ fontSize: '18px', color: '#000' }}/> 
          </div>
        </Grid>
        <Grid item>
           <div>
          <div>
            <select 
            id = "gender"
            value={gender}  
            onChange={handleGenderChange}  
            required 
            style={{ fontSize: '18px', color: '#000' }}
            className='custom-input'>
              <option value="" disabled style={{ display: 'none' }}>Select Gender</option>
              <option value='Male' style={{fontSize:'20px'}}>Male</option>
              <option value='Female' style={{fontSize:'20px'}}>Female</option>
            </select>
          </div> 
          </div>
        </Grid>
        <Grid item>
          <div>
          <div>
          <input type='text' placeholder='Number of Copies *' id = "numcopies" name = "numcopies" value={numcopies}  onChange={(e) => setNumcopies(e.target.value)}className='custom-input' required style={{ fontSize: '18px', color: '#000' }}/> 
          </div>
          </div>
        </Grid>
      </Grid>
    </div>
    </div>      
        </Grid>
      </Grid>
    </div>


    <div className='card' style={{backgroundColor: '#f0f0f0', padding: '15px',borderRadius: '8px', marginLeft: '2%', width: '95%'}}>
      <p className='card-label' style={{marginBottom: '40px', fontWeight: 'bold', fontSize: '30px', color: '#213555'}}>Additional Information</p>
    <div style={{marginBottom:'50px'}}>
      <Grid container>
        <Grid item>
          <div>
          <div>
            <select 
            id = "purok"
            value={purok}  
            onChange={handlePurokChange} 
            required 
            style={{ fontSize: '18px', color: '#000' }} 
            className='custom-input2'>
              <option value="" disabled style={{ display: 'none' }}>Select a Purok</option>
              <option value='Mangga' style={{fontSize:'20px'}}>Mangga</option>
              <option value='Upper' style={{fontSize:'20px'}}>Upper</option>
              <option value='Lower' style={{fontSize:'20px'}}>Lower</option>
              <option value='Crossing' style={{fontSize:'20px'}}>Crossing</option>
              <option value='Buenavista' style={{fontSize:'20px'}}>Buenavista</option>
              <option value='Anami Homes' style={{fontSize:'20px'}}>Anami Homes</option>
            </select>
          </div> 
          </div>
        </Grid>
        <Grid item >
         <div>
          <input type='text' id = "purpose" name = "purpose" placeholder='Purpose' value={purpose}  onChange={(e) => setPurpose(e.target.value)} className='custom-input2'  required style={{ fontSize: '18px', color: '#000' }}/> 
          </div>
        </Grid>
      </Grid>
    </div>
    </div>
          

    <div style={{marginBottom:'50px'}}>
    <div style={{marginBottom:'50px'}}>
    <div className='card' style={{backgroundColor: '#f0f0f0', padding: '15px',borderRadius: '8px', marginLeft: '2%', width: '95%', marginTop: '1.5%', height: '90%'}}>
    <Grid container>
    <Grid item>

      <p className='card-label' style={{marginBottom: '40px', fontWeight: 'bold', fontSize: '30px', color: '#213555'}}>Document Information</p>
        <p className='name2'>Please choose the type of document</p>
        <div>
            {labels.map((label, index) => (
              <label key={index} className='custom-checkbox input' htmlFor={`radio-${index}`}>
                <input
                  type='radio'
                  id={`radio-${index}`}
                  required style={{ fontSize: '18px', color: '#000' }}
                  name='doctype' // Ensures only one radio button is selected within this group
                  checked={doctype === label}
                  onChange={() => handleRadioChange(label)}
                />
              <span style={{ fontSize: '20px',marginRight:'40px', fontWeight: '600' , marginLeft: '10px', color: '#213555'}}>{labels[index]}</span>
            </label>
          ))}
        </div>
        </Grid>
    </Grid>
    <br/><br/>
 
    <Grid container>
        <Grid item>
          <div>
       <input type='text' placeholder='Please specify' id = "others" name = "others" value={others}  onChange={(e) => setOthers(e.target.value)}className='custom-input' required style={{ fontSize: '18px', color: '#000' }}/> 
          </div>
        </Grid>
        <Grid item>
          <div>
           <select 
            id = "type"
            value={type}  
            required style={{ fontSize: '18px', color: '#000' }}
            onChange={handleTypeChange}  
            className='custom-input'>
              <option value="" disabled style={{ display: 'none' }}>Select Type</option>
              <option value='A4' style={{fontSize:'20px'}}>A4</option>
              <option value='short' style={{fontSize:'20px'}}>short</option>
              <option value='long' style={{fontSize:'20px'}}>long</option>
            </select>
          </div>
	
        </Grid>

        <Grid item>
          <div>
          <input type='text' placeholder='Contact Number' id = "contactnum" name = "contactnum" value={contactnum}  onChange={(e) => setContactNum(e.target.value)}className='custom-input' required style={{ fontSize: '18px', color: '#000' }}/> 
          </div>
        </Grid>

        <Grid item>
         <div>
          <input type='text' placeholder='Email' id = "email" name = "email" value={email}  onChange={(e) => setEmail(e.target.value)} className='custom-input' required style={{ fontSize: '18px', color: '#000' }}/> 
          </div>
        </Grid>
      </Grid>
    </div>
    </div>

         <div>
       <Grid container className='request-btn' justifyContent='center' spacing={4}>
        <Grid item >
        <button variant='contained' onClick={handleClearRequest} style={{backgroundColor:'#FFFFFF',
                                            color:'#213555',
                                            height:'50px',
                                            width:'300px',
                                            fontSize:'18px',
                                            fontWeight:'bold',
                                            borderRadius:'10px',
                                            border:'1 px solid #213555',
                                            }}>
          CLEAR REQUEST
        </button>
        </Grid>
        <Grid item >
          
        <button variant='contained' onClick={handleRequests}style={{backgroundColor:'#213555',
                                            color:'white',
                                            height:'50px',
                                            width:'300px',
                                            fontSize:'18px',
                                            fontWeight:'bold',
                                            borderRadius:'10px',
                                            border:'none'}}>
          PROCEED
        </button>
            {/* Popup Modal for Verification */}
            <Modal open={showPopup} onClose={handleClosePopup}>
              <div className="popup2">
                {/* Display input values for verification */}
                <h1>Your request has been submitted successfully!</h1>
                <p>
                The payment will be processed onsite as well as the releasing of the requested documents. 
                An email will be sent for the release schedule so make sure you enter an active email or 
                you can track your documents in the system. Kindly bring a valid ID for identification 
                verification.
                  <br></br>
                  <br></br>
                  Thank you for your patience!
                </p>
                <Link to="/requests">
                  {/* Close button */}
                  <Button
                    variant="contained"
                    onClick={handleClosePopup}
                    style={{
                      color: "#FFFFFF",
                      background: "#213555",
                      borderRadius: "10px",
                      width: "150px",
                      fontWeight: "bold",
                      marginTop: "20px",
                    }}
                  >
                    Done
                  </Button>
                </Link>
              </div>
            </Modal>
        </Grid>
       </Grid>
       </div>
       
        </div>
          </div>  
    </div>
    </div>
  );
}

export default Requests;
