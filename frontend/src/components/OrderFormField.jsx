// OrderFormField.jsx

function OrderFormField({ label, name, type, value, onChange, required, description, options }) {
    return (
        <div className="form-field">
            <label htmlFor={name}>{label} {required && <span>*</span>}</label>
            {type === 'select' ? (
                <select id={name} name={name} value={value} onChange={onChange} required={required}>
                    <option value="">Select {label}</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ) : (
                <input type={type} id={name} name={name} value={value} onChange={onChange} required={required} />
            )}
            <small>{description}</small>
        </div>
    );
}

export default OrderFormField;
