import logo from '../../assets/cat-logo.png'
import front from '../../assets/front-social.png'
import '../style/Auth.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { loginUser, signUpUser } from "../../services/authService";

function LogInForm() {
    const navigate = useNavigate();
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const {setUser } = useUser();

    const handleSubmit = async(e) => {
        e.preventDefault();

        //console.log('UserContext', context)
        try{

            const data = await loginUser({ username, password});
            console.log('Login Good!', data.user);
            setUser(data.user);
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
                    <input className='authInput' type="text" name="username" placeholder=' ' 
                    value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label className='authLabel' htmlFor="username">Username or email address</label>
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
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [code, setCode ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const data = await signUpUser(username, password, code);
            console.log('Sign up Good!', data.message);
        } catch (err) {
            console.error('Sign up failed: ', err);
        }
    }

    return (
        <>
            <p>Sign Up to Catstagram</p>
            <form className='authForm' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <input className='authInput' type="text" name="username" placeholder=' '
                    value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label className='authLabel' htmlFor="username">Username or email address</label>
                </div>
                <div className='input-container'>
                    <input className='authInput' type="password" name="password" placeholder=' ' 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label className='authLabel' htmlFor="password">Password</label>
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
        <div className='page'>
            <div className='content'>
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
        <div className='page'>
            <div className='content'>
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