import React from 'react'
import'./Home.css'
import Bus from './Bus'
import { Link } from 'react-router-dom'
import Ima from '../Second/Ima'
const Home = () => {
  return (
    <>
    <div>
      
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Tu_2.png/220px-Tu_2.png' alt='tu-logo'/>
        
        
        
        <h1>A Minor Project Final Report<h1/>
        On
IOT Smart Bus System with NFC/RFID GPS Transit</h1>
<Bus/>
<div className='grid'>
<div className='listt'>
    <h1 className='head'>Submitted by</h1>
    <li>Ayush Acharya <span>THA076BEI007</span></li>
    <li>Anupam Himal Bhattrai <span>THA076BEI008</span></li>
    <li>Jagadish  Shrestha <span>THA076BEI010</span></li>
    <li>Mahesh Banjade <span>THA076BEI014</span></li>
    {/* <li>Jagadish  Shrestha <span>THA076BEI010</span></li> */}
</div>
<div >
    <h1 className='submit'>Submitted To:</h1>
    <Link to='https://tcioe.edu.np/'>
    <p>Department of Electronics and Computer Engineering
Thapathali Campus
Kathmandu, Nepal</p>
</Link>
</div>
<div className='special'>
    <h1 className='testing'> Special Thanks to</h1>
    <span className='test'>Our supervisor</span>
    <p className='santa'> Er.Santa Maharjan</p>
    {/* <span>And </span> */}
    <br/>
    <span className='test'>External Examiner</span>
    <p className='santa'> Dr.Ganesh Gautam</p>
    {/* <span>And </span> */}
    <br/>
    <span className='test'>Internal Examiner</span>
    <p className='santa'> Er.Saroj Shakya</p>
    <span>And</span><br/>
    <Link to='https://www.facebook.com/techkeynp/'>
    <p id='madhu'> TechKey Electronics --Sanepa</p>
    </Link>
    <span className='test'> for providing us  with hardware components and help</span>
    
    
    <p></p>
</div>
</div>
{/* <Ima/> */}
<div class="github-link">
   <p className='sc'>you can get  this project source code here</p> 
  <a target={'_blank'}  href="https://github.com/ayush475">
    <i class="fab fa-github"></i>
    ayush475 github
  </a>
  <a target={'_blank'} href="https://github.com/Shresthadev403">
    <i class="fas fa-external-link-alt"></i>
    Shresthadev403 github
  </a>
</div>


    </div>
    </>
  )
}

export default Home