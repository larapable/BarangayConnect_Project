import './PaymentRem.css';
import Header from '../Header';
import { Button } from '@mui/material';

function PaymentRem() {
  return (
    <div>

      <div>
        <Header />
      </div>

      <div className='payment-grid2'>
      <div className='payment-con'>
        <div className='payment-rem'>
          <p className='payment-para2'>R E M I N D E R S</p>
            <p className='payment-para'>The requesting of documents has a fee of P30.00 
               peso for each documents. And for others, additional 
               P5.00 will be charge.</p>
        </div>
    </div>

    <div className='payment-img'>
    <div style={{backgroundImage: 'url("/tisa_logo.png")',
                backgroundSize:'cover',
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat',
                position:'relative',
                height:'1000px',
                width:'100%'}}>

    <div className='payment-center-con'>
      
        <div>
        <p className='payment-stmt'>YOUR  REQUEST HAS BEEN SUCCESSFULLY SUBMITTED!</p>
        </div>

        <div>
       <p className='payment-stmt2'>NOTE: The payment will be processed onsite as well as the releasing 
          of the requested documents. An email will be sent for the 
          released schedule so make sure you enter an active email or you
          can track your documents in the system. Kindly bring a valid ID 
          for identification verification.
       </p>
       </div>

       <div className='payment-btn'>
        <Button variant='contained' style={{fontSize:'20px',
                                            backgroundColor:'green',
                                            fontWeight:'bold',
                                            }}>PROCEED</Button>
     </div>
    </div>


    </div>

      </div>
     </div>
    </div>
  );
}

export default PaymentRem;
