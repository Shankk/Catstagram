import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import '../style/Settings.css';
import { updateAccount, updateProfile, uploadAvatar } from "../../services/userService";
import catpic from '../../assets/cat-profile.webp';
import { deleteAccount, verifyPassword } from "../../services/authService";

function SettingsSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="settings-sidebar">
      <h2>Settings</h2>

      <div className="settings-nav">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

        <button
          className={activeTab === "account" ? "active" : ""}
          onClick={() => setActiveTab("account")}
        >
          Account
        </button>

        <button
          className={activeTab === "danger" ? "active" : ""}
          onClick={() => setActiveTab("danger")}
        >
          Danger Zone
        </button>
      </div>
    </div>
  );
}


function ProfileSettingsForm() {
  const { user } = useUser();
  const [form, setForm] = useState({
      firstname: user.profile.firstname,
      lastname: user.profile.lastname,
      username: user.profile.username,
      bio: user.profile.bio,
      avatar: user.profile.avatar
  });

  const [avatarFile, setAvatarFile] = useState(null);

  async function save() {
    // 1. Upload Avatar if new image was selected
    if(avatarFile) {
      const data = await uploadAvatar(avatarFile);
      
      if(data.avatar) {
        setForm(prev => ({ ...prev, avatar: data.avatar}));
      }
    }
    // 2. Saved profile fields.
    await updateProfile(form);
  }

  return (
    <form className="settings-section">
      
      <h3>Profile Settings</h3>
      {/* Avatar preview */}
      <div className="input-row">
        <div className="input-column" id="left">
          
          <div className="avatar-preview">
            <img src={form.avatar ? `http://localhost:3000${form.avatar}` : catpic} alt="Avatar" className="avatar-img" />
          </div>

        </div>
        <div className="input-column" id="right">
          
          <div className="input-container">
            <div className="upload-text" >Avatar</div>
            <input className="upload-btn"
              type="file" 
              name="image/*" 
              onChange={(e) => setAvatarFile(e.target.files[0])} 
            />
            
          </div>
          <div className="input-container">
            <input
              placeholder=""
              value={form.firstname}
              onChange={e => setForm({ ...form, firstname: e.target.value })}
            />
            <label >First Name</label>
          </div>
          
          <div className="input-container">
            <input
              placeholder=""
              value={form.lastname}
              onChange={e => setForm({ ...form, lastname: e.target.value })}
            />
            <label >Last Name</label>
          </div>

          <div className="input-container">
            <input
              placeholder=""
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
            <label>Username</label>
          </div>
        </div>
        
      </div>

      <textarea className="input-container"
        value={form.bio}
        onChange={e => setForm({ ...form, bio: e.target.value })}
      />

      <button className="save-btn" onClick={save}>Save Changes</button>
    </form>
  );
}

function AccountSettingsForm() {
  const { user } = useUser();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  async function save() {
    const payload = { email, password };
    await updateAccount(payload);
  }

  return (
    <form className="settings-section">
      <h3>Account Settings</h3>

      <div className="input-container">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>Email</label>
      </div>
      
      <div className="input-container">
        <input className="input-password"
          type="password"
          placeholder="Leave blank to keep current password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label>New Password</label>
      </div>
      
      <button className="save-btn" onClick={save}>Save Changes</button>
    </form>
  );
}

function DangerZone() {
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  async function handleVerifyPassword() {
    const res = await verifyPassword(password);
    const data = await res.json();

    if (data.valid) {
      setVerified(true);
      setError("");
    } else {
      setVerified(false);
      setError("Incorrect password");
    }
  }


  async function handleDeleteAccount() {
    await deleteAccount();
  }

  return (
    <div className="settings-section danger-zone">
      <h3>Danger Zone</h3>
      
      {error && <p className="error">{error}</p>}
      <div className="input-row">
        <div className="input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          
        </div>
        
        <button onClick={handleVerifyPassword}>
          Verify Password
        </button>

        
      </div>

      <button className="delete-btn" disabled={!verified} onClick={handleDeleteAccount} >
        Delete Account
      </button>
    </div>
  );
}

export function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile")

    return (
        <div className="settings-page">
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="settings-content">
                {activeTab === "profile" && <ProfileSettingsForm />}
                {activeTab === "account" && <AccountSettingsForm />}
                {activeTab === "danger" && <DangerZone />}
            </div>
        </div>
    )
}

export default SettingsPage