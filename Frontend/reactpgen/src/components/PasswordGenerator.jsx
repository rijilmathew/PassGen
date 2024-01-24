import React, { useEffect, useState } from 'react';
import './PasswordGenerator.css';
import copyIcon from '../assets/copy-icon.svg'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
React


const PasswordGenerator = () => {
    const [password, setPassword] = useState('fggdfgdfg');
    const [lowerCase, setLowerCase] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [passwordLength, setPasswordLength] = useState(4);
    
   


    const generatePassword = async ()=>{
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/generate/generate-password/',{
                lowerCase,
                upperCase,
                numbers,
                symbols,
                passwordLength,
            });
            

            setPassword(response.data.password);

        }catch (error){
            if (error.response && error.response.data && error.response.data.error) {
                toast.warning(`Error:${error.response.data.error}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    
                });
        
        }else{
            console.error('Error Fetching password from backend:', error.message);
        }
        }
    };


    useEffect(()=>{
        generatePassword() 
    },[passwordLength])



    const copyPassword = async ()=>{
        const copiedText = await navigator.clipboard.readText();
        if(password.length && copiedText!=password){
            navigator.clipboard.writeText(password)
            toast.success('Password copied to clipboard', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                
            });
        }

    }

  return (
    <>
   
    <div className='container'>
        <h2 className='title'>Strong Password Generator</h2>
        <div className='password-wrapper'>
            <div className='password-area'>
                <div className='password'>
                    <input type="text" value={password}disabled placeholder='Click on the Generate Password '/>
                    <img src={copyIcon} alt='copyIcon' className='copyIcon' onClick={copyPassword}/>
                </div>
            </div>
        </div>
        <div className='setting'>
            <h3>Customize Your Password</h3>
            <div className='customize'>
                <div className='checkboxes'>
                    <div className='left'>
                        <div className='checkboxe-field'>
                            <input type="checkbox" name="lower" id="lower" checked={lowerCase} onChange={()=>setLowerCase(!lowerCase)}/>
                            <label htmlFor="lower">Include Lower Case(a-z)</label>
                        </div>
                        <div className='checkboxe-field'>
                            <input type="checkbox" name="upper" id="upper" checked={upperCase} onChange={()=>setUpperCase(!upperCase)} />
                            <label htmlFor="upper">Include Upper Case(A-Z)</label>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='checkboxe-field'>
                            <input type="checkbox" name="numbers" id="numbers"  checked={numbers} onChange={()=>setNumbers(!numbers)}/>
                            <label htmlFor="numbers">Include Numbers(0-9)</label>
                        </div>
                        <div className='checkboxe-field'>
                            <input type="checkbox" name="symbols" id="symbols"  checked={symbols} onChange={()=>setSymbols(!symbols)} />
                            <label htmlFor="symbols">Include Symbols(&-#)</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="password-length">
            <h3>Password Length</h3>
            <div className="slider">
                <p className="rangeValue">{passwordLength}</p>
                <div className="range">
                    <input type="range" min={10} max={40} defaultValue={passwordLength} onChange={(event)=> setPasswordLength(event.currentTarget.value)}/>
                </div>
            </div>
        </div>
        <div className="buttons">
            <button type='button' onClick={copyPassword}>Copy Password</button>
            <button type='button' onClick={generatePassword}>Generate Password</button>
        </div>
       
    </div>
    <ToastContainer />
    </>
  )
}

export default PasswordGenerator