export async function followUser(username) {
    const res = await fetch(`http://localhost:3000/follow/${username}`, {
        method: 'POST',
        credentials: 'include',
    });

    if(!res.ok) throw new Error('User follow fetch failed');
    
    const data = await res.json();
    return data;
}

export async function unfollowUser(username) {
    await fetch(`http://localhost:3000/follow/${username}`, {
        method: 'DELETE',
        credentials: 'include',
    });
}

export async function fetchUser() {
    try {
        const res = await fetch('http://localhost:3000/user', {
            method: 'GET',
            credentials: 'include'
        });

        if(!res.ok) throw new Error('User data fetch failed');
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

export async function fetchUserConversations() {
    const res = await fetch(`http://localhost:3000/conversations`, {
        method: 'GET',
        credentials: 'include',
    })

    if(!res.ok) throw new Error('User Conversations fetch failed');
    
    const data = await res.json();
    return data;
}

export async function createNewConversation(otherUser) {
    const res = await fetch("http://localhost:3000/conversations", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: otherUser.id })
    });

    const conversation = await res.json();
    return conversation;
}

export async function fetchConversation(activeConversationId) {
    const res = await fetch(`http://localhost:3000/conversations/${activeConversationId}`, {
        credentials: "include"
    });
    const data = await res.json();
    return data;
}

export async function fetchConversationMessages(activeConversationId) {
    const res = await fetch(`http://localhost:3000/conversations/${activeConversationId}/messages`, {
        credentials: "include"
    });
    const data = await res.json();
    return data;
}

export async function sendUserMessage(activeConversationId, input) {
    const res = await fetch(`http://localhost:3000/conversations/${activeConversationId}/send-message`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ text: input})
    })

    const newMsg = await res.json();
    return newMsg;
}

export async function sendUserPost(activeConversationId, postId) {
    const res = await fetch(`http://localhost:3000/conversations/${activeConversationId}/send-post`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ postId: postId})
    })

    const newMsg = await res.json();
    return newMsg;
}

export async function fetchUserSearch(search) {
    const res = await fetch(`http://localhost:3000/search-users?query=${search}`, {
        credentials: "include"
    });
    const data = await res.json();
    return data;
}

export async function updateProfile(form) {
    await fetch(`http://localhost:3000/profile`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
    })
}

export async function updateAccount(payload) {
    await fetch(`http://localhost:3000/account`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
}

export async function uploadAvatar(file) {
    const form = new FormData();
    form.append("avatar", file);

    const res = await fetch("http://localhost:3000/profile/avatar", {
        method: "POST",
        credentials: "include",
        body: form
    });

    return res.json();
}

export async function createPost(media, caption) {
    const form = new FormData();
    form.append("post", media);
    form.append("caption", caption);

    await fetch("http://localhost:3000/profile/post", {
        method: "POST",
        credentials: "include",
        body: form
    });
}

export async function getUserPost(id) {
    const post = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "GET",
        credentials: "include"
    });

    return post.json();
}