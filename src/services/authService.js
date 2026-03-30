export async function fetchUserSession() {
    try {
        const res = await fetch('http://localhost:3000/verify', {
            method: 'GET',
            credentials: 'include'
        });

        if(!res.ok) throw new Error('Session fetch failed');
        const data = await res.json();
        //console.log("isUserAuthed?: ", data)
        return data;
    } catch (error) {
        console.error('Auth error:', error);
        return null;
    }
}

export async function loginUser({username,password}) {
    const res = await fetch('http://localhost:3000/log-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if(!res.ok) throw new Error(data.error || 'Login failed');

    return data;
}

export async function logoutUser() {
    try{
        const res = await fetch('http://localhost:3000/log-out', {
            method: 'POST',
            credentials: 'include',
        });

        if(!res.ok) throw new Error('Logout failed');
        return true;

    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
}

export async function signUpUser(username, password, code) {
    const res = await fetch('http://localhost:3000/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify( {username, password, code })
    });

    const data = await res.json();

    //console.log("oldInput: " , data.oldInput);
    
    if(!res.ok) {
        throw new Error(data.message || data.errors.forEach((error, index) => { 
        console.log(`${index + 1}. ${error.msg}`) }) || 'Signup failed');
    
    }

    return data;
}