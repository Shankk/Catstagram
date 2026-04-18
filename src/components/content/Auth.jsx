import logo from '../../assets/cat-logo.png'
import front from '../../assets/front-social.png'
import '../style/Auth.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser, signUpUser } from "../../services/authService";
import CustomDropdown from "../utility/CustomDropdown";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

function LogInForm() {
    const navigate = useNavigate();
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await loginUser({ email, password});
            navigate('/');
            window.location.reload();
        } catch (err) {
            console.error('Login failed: ', err);
        }
    }

    return (
        <>
            <p>Log in to Catstagram</p>
            <form className='authForm' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <input className='authInput' type="email" name="email" placeholder=' ' 
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label className='authLabel' htmlFor="email">Email address</label>
                </div>
                <div className='input-container'>
                    <input className='authInput' type="password" name="password" placeholder=' '
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className='authLabel' htmlFor="password">Password</label>
                </div>
                <button className='form-button' type="submit">Log in</button>
            </form>
            <button className='form-button'>Forgot password?</button>
            <button className='form-button' onClick={() => navigate('/sign-up')}>Create new account</button>
        </>
    );
}

function SignUpForm() {
    const navigate = useNavigate();
    const [email, setEmail ] = useState('');
    const [firstname, setFirstname ] = useState('');
    const [lastname, setLastname ] = useState('');
    const [day, setDay ] = useState('');
    const [month, setMonth ] = useState('');
    const [year, setYear ] = useState('');
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [code, setCode ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const monthIndex = months.indexOf(month);
        const birthdate = new Date(year, monthIndex, day);

        try{
            await signUpUser(email,firstname, lastname, birthdate, username, password, code);
            navigate('/log-in');
            window.location.reload();
            //console.log('Sign up Good!', data.message);
        } catch (err) {
            console.error('Sign up failed: ', err);
        }
    }

    return (
        <>
            <p>Sign Up to Catstagram</p>
            <form className='authForm' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <input className='authInput' type="text" name="email" placeholder=' '
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label className='authLabel' htmlFor="email">Email address</label>
                </div>
                <div className='input-container'>
                    <input className='authInput' type="password" name="password" placeholder=' ' 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label className='authLabel' htmlFor="password">Password</label>
                </div>
                <div className='input-container'>
                    <input className='authInput' type="text" name="username" placeholder=' '
                    value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label className='authLabel' htmlFor="username">Username</label>
                </div>
                <div className='input-row'>
                    <CustomDropdown label="Day" options={days} value={day} onChange={setDay} />
                    <CustomDropdown label="Month" options={months} value={month} onChange={setMonth} />
                    <CustomDropdown label="Year" options={years} value={year} onChange={setYear} />
                </div>
                <div className='input-row'>
                   <div className='input-container'>
                        <input className='authInput' type="text" name="firstname" placeholder=' '
                        value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                        <label className='authLabel' htmlFor="firstname">First name</label>
                    </div>
                    <div className='input-container'>
                        <input className='authInput' type="text" name="lastname" placeholder=' '
                        value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                        <label className='authLabel' htmlFor="lastname">Last name</label>
                    </div> 
                </div>
                
                <div className='input-container'>
                    <input className='authInput' type="text" name="sign-up-code" placeholder=' ' 
                    value={code} onChange={(e) => setCode(e.target.value)}/>
                    <label className='authLabel' htmlFor="sign-up-code">Code</label>
                </div>
                <button className='form-button' type="submit">Sign up</button>
            </form>
            <button className='form-button' onClick={() => navigate('/log-in')}>Have an account already?</button>
        </>
    );
}

function LoginPage() {

    return (
        <div className='auth-page'>
            <div className='auth-content'>
                <div className="left-side">
                    <div className="container">
                        <img className="logo" src={logo} alt="" />
                    </div>
                    <div className="container">
                        <p className='front-text'>See everyday moments from your <span className='fancy-text'>close friends</span>.</p>
                    </div>
                    <div className="container">
                        <img className='front' src={front} alt="" />
                    </div>
                </div>
                <div className="right-side">
                    <LogInForm ></LogInForm>
                </div>
            </div>
            <div className='footer'>
                <p>2026 Catstagram</p>
            </div>
            
        </div>
    )
}

function SignupPage() {

    return (
        <div className='auth-page'>
            <div className='auth-content'>
                <div className="left-side">
                    <div className="container">
                        <img className="logo" src={logo} alt="" />
                    </div>
                    <div className="container">
                        <p className='front-text'>See everyday moments from your <span className='fancy-text'>close friends</span>.</p>
                    </div>
                    <div className="container">
                        <img className='front' src={front} alt="" />
                    </div>
                </div>
                <div className="right-side">
                    <SignUpForm ></SignUpForm>
                </div>
            </div>
            <div className='footer'>
                <p>2026 Catstagram</p>
            </div>
            
        </div>
    )
}

export default LoginPage
export {LogInForm , SignUpForm, SignupPage , LoginPage}