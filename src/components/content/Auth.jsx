import logo from '../../assets/cat-logo.png'
import front from '../../assets/front-social.png'
import '../style/Auth.css'

function LogInForm() {

    return (
        <>
            <p>Log in to Catstagram</p>
            <form className='authForm' action="/log-in" method="POST">
                <div className='input-container'>
                    <input className='authInput' type="text" name="username" placeholder=' '/>
                    <label className='authLabel' htmlFor="username">Username or email address</label>
                </div>
                <div className='input-container'>
                    <input className='authInput' type="text" name="password" placeholder=' ' />
                    <label className='authLabel' htmlFor="password">Password</label>
                </div>
                <button className='form-button' href="">Log in</button>
            </form>
            <button className='form-button'>Forgot password?</button>
            <button className='form-button' href="/sign-up">Create new account</button>
        </>
    );
}
function SignUpForm() {
    return (
        <>
            <p>Sign Up to Catstagram</p>
            <form className='authForm' action="/sign-up" method="POST">
                <input className='authInput' type="text" name="username" />
                <input className='authInput' type="text" name="password" placeholder='Password' />
                <button>Sign Up</button>
            </form>
            <a href="/log-in">Sign Up</a>
        </>
    )
}

function LogInPage() {

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

export default LogInPage
export {LogInForm , SignUpForm }