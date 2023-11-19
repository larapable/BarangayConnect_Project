import './Requests.css';
import { Grid } from '@mui/material';
import { useState } from 'react';
import Header from './Header';



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
            <p className='request-para'>The requesting of documents has a fee of P30.00 
               peso for each documents. And for others, additional 
               P5.00 will be charge.</p>
        </div>
    </div>
    <div className='request-img'>
      <Grid container>
        <Grid item className='text-fields-container'>
        <p className='name'>Name</p>
      <input type='text' placeholder='Lastname' className='custom-input'/>
      <input type='text' placeholder='Firstname'  className='custom-input' />
      <input type='text' placeholder='Middlename'  className='custom-input' />
      <input type='text' placeholder='Suffix'  className='custom-input'/>
        </Grid>
      </Grid>
       
    <div>
      <Grid container>
        <Grid item sm={3}>
          <p className='name'>Birthdate</p>
          <div>
          <input type='text' placeholder='dd/mm/yyyy' className='custom-input'/> 
          </div>
        </Grid>
        <Grid item sm={3}>
          <p className='name'>Age</p>
          <div>
          <input type='text' placeholder='' className='custom-input'/> 
          </div>
        </Grid>
        <Grid item sm={3}>
          <p className='name'>Gender</p>
          <div>
          <input type='text' placeholder='' className='custom-input'/> 
          </div>
        </Grid>
      </Grid>
    </div>

    <div>
      <Grid container>
        <Grid item sm={5}>
        <p className='name'>Purok</p>
          <div>
          <input type='text' placeholder='' className='custom-input2'/> 
          </div>
        </Grid>

        <Grid item sm={5}>
        <p className='name'>Purpose</p>
          <div>
          <input type='text' placeholder='' className='custom-input2'/> 
          </div>
        </Grid>
      </Grid>
    </div>

    <div style={{marginBottom:'20px'}}>
    <Grid container>
    <Grid item>
        <p className='name'>Document Type (Please check the appropriate box)</p>
        <div>
          {checkboxes.map((isChecked, index) => (
            <label key={index} className='custom-checkbox input'>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={() => handleCheckboxChange(index)}
              />
              <span style={{ fontSize: '25px',marginRight:'50px' }}>{labels[index]}</span>
            </label>
          ))}
        </div>
        </Grid>
    </Grid>
    </div>
     
        
    <div>
      <Grid container>
        <Grid item sm={3}>
          <p className='name'>For Others</p>
          <div>
          <input type='text' placeholder='Please specify' className='custom-input'/> 
          </div>
        </Grid>
        <Grid item sm={3}>
          <p className='name'>Type</p>
          <div>
            <select className='custom-select'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </select>
          </div>
        </Grid>
        <Grid item sm={3}>
          <p className='name'>Number of Copies</p>
          <div>
          <input type='text' placeholder='' className='custom-input'/> 
          </div>
        </Grid>
      </Grid>
    </div>

    <div>
      <Grid container>
        <Grid item sm={5}>
        <p className='name'>Email</p>
          <div>
          <input type='text' placeholder='' className='custom-input2'/> 
          </div>
        </Grid>

        <Grid item sm={5}>
        <p className='name'>Contact Number</p>
          <div>
          <input type='text' placeholder='' className='custom-input2'/> 
          </div>
        </Grid>
      </Grid>
    </div>

       <div style={{marginTop:'70px'}}>
       <Grid container>
        <Grid item sm={2.5}>
        <button variant='contained' style={{backgroundColor:'#213555',
                                            color:'white',
                                            height:'50px',
                                            width:'300px',
                                            marginLeft:'10px',
                                            fontSize:'25px',
                                            fontWeight:'bold',
                                            borderRadius:'10px',
                                            border:'none'}}>
          Clear Request
        </button>
        </Grid>
        <Grid item>
        <button variant='contained' style={{backgroundColor:'#213555',
                                            color:'white',
                                            height:'50px',
                                            width:'300px',
                                            marginLeft:'10px',
                                            fontSize:'25px',
                                            fontWeight:'bold',
                                            borderRadius:'10px',
                                            border:'none'}}>
          Proceed to Payment
        </button>
        </Grid>
       </Grid>
       </div>
       
        </div>
          </div>  
    </div>
  );
}

export default Requests;
