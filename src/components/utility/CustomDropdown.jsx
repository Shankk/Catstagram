import { useState, useRef, useEffect } from "react";
import '../style/CustomDropdown.css';

export default function CustomDropdown({ label, options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-selected" onClick={() => setOpen(!open)}>
                {value || " "} <span className="dropdown-arrow">▾</span>
            </div>

            {label && <label className="dropdown-label">{label}</label>}
            {open && (
                <div className="dropdown-wrapper">
                    <ul className="dropdown-list">
                        {options.map((opt) => (
                            <li key={opt} 
                                className="dropdown-item"
                                onClick={() => { onChange(opt); setOpen(false);}}> {opt}
                            </li>
                        ))}
                    </ul>
                </div>
                
            )}
        </div>
    )
}