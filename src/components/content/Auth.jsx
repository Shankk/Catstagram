

function LogInForm() {

    return (
        <>
            <p>Log in to Catstagram</p>
            <form action="/log-in" method="POST">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" />
                <button>Log in</button>
            </form>
            <a href="/sign-up">Sign Up</a>
        </>
    );
}
function SignUpForm() {
    return (
        <>
            <p>Sign Up to Catstagram</p>
            <form action="/sign-up" method="POST">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" />
                <button>Sign Up</button>
            </form>
            <a href="/log-in">Sign Up</a>
        </>
    )
}

function LogInPage() {

    return (
        <div>
            <div className="left-side">
                <div className="container">
                    <img className="logo" src="" alt="" />
                </div>
                <div className="container">
                    <p>See everyday moments from your close friends.</p>
                </div>
                <div className="container">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="right-side">
                <LogInForm></LogInForm>
            </div>
        </div>
    )
}

export default LogInPage
export {LogInForm , SignUpForm }