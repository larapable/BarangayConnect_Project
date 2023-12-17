import './Requests.css';
import { Grid, Modal,Button,Paper } from '@mui/material';
import { useState, useEffect} from 'react';
import Header from '../Header';
import { Link, Navigate, useNavigate} from "react-router-dom";



function Requests () {

  const [checkboxes, setCheckboxes] = useState(Array(6).fill(false));

  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxes(updatedCheckboxes);
  };
  
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
      !lastname.trim() ||
      !firstname.trim() ||
      !middlename.trim() ||
      !suffix.trim() ||
      !birthdate.trim() ||
      !age.trim() ||
      !gender.trim() ||
      !numcopies.trim() ||
      !purok.trim() ||
      !purpose.trim() ||
      !doctype.trim() ||
      !contactnum.trim() ||
      !email.trim()
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
        {showProgress && requests.length > 0 &&  (
          <Grid item sm={3}>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              {/* Add content for tracking request progress */}
              <h2>Request Progress</h2>
              {/* Assuming requests is an array, you need to map through it */}
              {requests.map((request) => (
                <h3 key={request.id}>Document Status: {request.track}</h3>
              ))}
            </Paper>
          </Grid>
        )}
        </div>
    </div>
   
     
    <div className='request-img'>
    
      <div style={{marginBottom:'50px'}}>
      <Grid container>
        <Grid item className='text-fields-container'>
          <p className='name2' style={{marginTop: '30px'}}>Fill all the necessary informations and make sure to fill NA for none</p>

    <div class='card' style={{backgroundColor: '#f0f0f0', padding: '15px',borderRadius: '8px', marginLeft: '2%', width: '100%', marginBottom: '-2%'}}>
      <p class='card-label' style={{marginBottom: '40px', fontWeight: 'bold', fontSize: '30px', color: '#213555'}}>Personal Information</p>
      <div class='card-content' style={{marginBottom: '50px'}}>
        <input type='text' placeholder='Lastname' class='custom-input' />
        <input type='text' placeholder='Firstname' class='custom-input' />
        <input type='text' placeholder='Middlename' class='custom-input' />
        <input type='text' placeholder='Suffix' class='custom-input' />
      </div>

      <div style={{marginBottom:'50px'}}>
      <Grid container>
        <Grid item >
          <div>
          <input type='text' placeholder='Birthdate (dd/mm/yyyy)' className='custom-input'/> 
          </div>
        </Grid>
        <Grid item>
          <div>
          <input type='text' placeholder='Age' className='custom-input'/> 
          </div>
        </Grid>
        <Grid item>
          <div>
          <input type='text' placeholder='Gender' className='custom-input'/> 
          </div>
        </Grid>
        <Grid item>
          <div>
          <input type='text' placeholder='Contact Number' className='custom-input'/> 
          </div>
        </Grid>
      </Grid>
    </div>

    </div>
        

        </Grid>
      </Grid>
      </div>


      <div class='card' style={{backgroundColor: '#f0f0f0', padding: '15px',borderRadius: '8px', marginLeft: '2%', width: '95%'}}>
      <p class='card-label' style={{marginBottom: '40px', fontWeight: 'bold', fontSize: '30px', color: '#213555'}}>Additional Information</p>
    {/* ===========ADDITIONAL============ */}
    <div style={{marginBottom:'50px'}}>
      <Grid container>
        <Grid item>
          <div>
          <div>
            <select className='custom-input2' required>
            <option value='' disabled selected hidden>Purok</option>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </select>
          </div> 
          </div>
        </Grid>

        <Grid item >
          <div>
          <input type='text' placeholder='Purpose' className='custom-input2'/> 
          </div>
        </Grid>
      </Grid>
    </div>
    </div>
    {/* ======================= */}

    <div style={{marginBottom:'50px'}}>
    
    <div class='card' style={{backgroundColor: '#f0f0f0', padding: '15px',borderRadius: '8px', marginLeft: '2%', width: '95%', marginTop: '1.5%', height: '90%'}}>
    <Grid container>
    <Grid item>
      
      {/* ===========DOCUMENT============ */}
      <p class='card-label' style={{marginBottom: '40px', fontWeight: 'bold', fontSize: '30px', color: '#213555'}}>Document Information</p>
        <p className='name2'>Please choose the type of document</p>
        <div>
          {checkboxes.map((isChecked, index) => (
            <label key={index} className='custom-checkbox input'>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={() => handleCheckboxChange(index)}
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
          <input type='text' placeholder='For others, please specify' className='custom-input'/> 
          </div>
        </Grid>
        <Grid item>
          <div>
            <select className='custom-input' style={{color: '#8a8282'}} required>
              <option value='' disabled selected hidden>Type</option>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </select>
          </div>
	
        </Grid>

        <Grid item>
          <div>
          <input type='text' placeholder='No. of Copies' className='custom-input'/> 
          </div>
        </Grid>

        <Grid item>
          <div>
          <input type='text' placeholder='Email' className='custom-input'/> 
          </div>
        </Grid>
      </Grid>

    </div>
    
      
    </div>
    {/* ======================= */}
       <div>
       <Grid container className='request-btn' justifyContent='center'>
        <Grid item >
        <button variant='contained' style={{backgroundColor:'#FFFFFF',
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
        {/* </div> */}
          </div>  
    </div>
  );
}

export default Requests;
