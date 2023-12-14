import './Requests.css';
import { Grid } from '@mui/material';
import { useState } from 'react';
import Header from '../Header';



function Requests() {
    
    const [checkboxes, setCheckboxes] = useState(Array(6).fill(false));

    const labels = [
      'Indigency',
      'Residency',
      'Certification',
      'Clearance',
      'Medical Assistance',
      'Others',
    ];

    const handleCheckboxChange = (index) => {
      const updatedCheckboxes = [...checkboxes];
      updatedCheckboxes[index] = !updatedCheckboxes[index];
      setCheckboxes(updatedCheckboxes);
    };

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
    </div>
   
     
    <div className='request-img'>
    
      <div style={{marginBottom:'50px'}}>
      <Grid container>
        <Grid item className='text-fields-container'>
          <p className='name2' style={{marginTop: '30px'}}>Fill all the necessary informations and make sure to fill NA for none</p>

    <div class='card' style={{backgroundColor: '#f0f0f0', padding: '15px',borderRadius: '8px', marginLeft: '2%', width: '100%', marginBottom: '-2%'}}>
      <p class='card-label' style={{marginBottom: '40px', fontWeight: 'bold', fontSize: '30px'}}>Personal Information</p>
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
      <p class='card-label' style={{marginBottom: '40px', fontWeight: 'bold', fontSize: '30px'}}>Additional Information</p>
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
      <p class='card-label' style={{marginBottom: '40px', fontWeight: 'bold', fontSize: '30px'}}>Document Information</p>
        <p className='name2'>Please choose the type of document</p>
        <div>
          {checkboxes.map((isChecked, index) => (
            <label key={index} className='custom-checkbox input'>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={() => handleCheckboxChange(index)}
              />
              <span style={{ fontSize: '20px',marginRight:'40px', fontWeight: '600' , marginLeft: '10px'}}>{labels[index]}</span>
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
                                            marginLeft:'50px',
                                            fontSize:'18px',
                                            fontWeight:'bold',
                                            borderRadius:'10px',
                                            border:'1 px solid #213555',
                                            }}>
          CLEAR REQUEST
        </button>
        </Grid>
        <Grid item>
        <button variant='contained' style={{backgroundColor:'#213555',
                                            color:'white',
                                            height:'50px',
                                            width:'300px',
                                            marginLeft:'10px',
                                            fontSize:'18px',
                                            fontWeight:'bold',
                                            borderRadius:'10px',
                                            border:'none'}}>
          PROCEED
        </button>
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
