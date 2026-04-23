export async function fetchUserSession() {
    try {
        const res = await fetch('http://localhost:3000/verify', {
            method: 'GET',
            credentials: 'include'
        });

        if(!res.ok) throw new Error('Session fetch failed');
        const data = await res.json();
        
        return data;
    } catch (error) {
        console.error('Auth error:', error);
        return null;
    }
}

export async function fetchUserBasic() {
    try {
        const res = await fetch('http://localhost:3000/userbasic', {
            method: 'GET',
            credentials: 'include'
        });

        if(!res.ok) throw new Error('User basic fetch failed');
        const data = await res.json();
        //console.log("fetched-Data: ", data)
        return data.user;
    } catch (error) {
        console.error('Auth error:', error);
        return null;
    }
}

export async function fetchUserProfile(username) {
    try {
        const res = await fetch(`http://localhost:3000/profile/${username}`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!res.ok) throw new Error('User profile fetch failed');
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Auth error:', error);
        return null;
    }
}

export async function followUser(username) {
    try {
        const res = await fetch(`http://localhost:3000/follow/${username}`, {
            method: 'POST',
            credentials: 'include',
        });

        if(!res.ok) throw new Error('User follow fetch failed');
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Follow error:', error);
        return null;
    }
    
}

export async function unfollowUser(username) {
    await fetch(`http://localhost:3000/follow/${username}`, {
        method: 'DELETE',
        credentials: 'include',
    });
}

export async function loginUser({email, password}) {
    const res = await fetch('http://localhost:3000/log-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
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

export async function signUpUser(email, firstname, lastname, dateofbirth, username, password, code) {
    const res = await fetch('http://localhost:3000/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify( { email, firstname, lastname, dateofbirth, username, password, code })
    });

    const data = await res.json();

    if(data.success) {
        console.log("Signup confirmed:", data)
    }
    
    if(!res.ok) {
        throw new Error(data.message || data.errors.forEach((error, index) => { 
        console.log(`${index + 1}. ${error.msg}`) }) || 'Signup failed');
    
    }

    return data;
}