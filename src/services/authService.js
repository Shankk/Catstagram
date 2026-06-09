const API_URL = import.meta.env.VITE_API_URL;

export async function fetchUserSession() {
    const res = await fetch(`${API_URL}/verify`, {
        method: 'GET',
        credentials: 'include'
    });

    if(res.status === 401) {
        const data = await res.json();
        return console.log("Session Fetch Failed:", data.message)
    }
    
    const data = await res.json();
    return data;
}

export async function verifyPassword(password) {
    const res = await fetch(`${API_URL}/account/verify-password`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    return res;
}

export async function deleteAccount() {
    await fetch(`${API_URL}/account/delete`, {
      method: "DELETE",
      credentials: "include"
    });
}

export async function loginUser({email, password}) {
    const res = await fetch(`${API_URL}/log-in`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if(res.status === 500)  {
        const data = await res.json();
        return console.log("Server 500 error:", data.error);
    };
    if(res.status === 401)  {
        const data = await res.json();
        return console.log("Server 401 error:", data.error);
    };

    const data = await res.json();
    return data;
}

export async function logoutUser() {
    try{
        const res = await fetch(`${API_URL}/log-out`, {
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
    const res = await fetch(`${API_URL}/sign-up`, {
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