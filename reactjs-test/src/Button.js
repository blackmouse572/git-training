function Button({icon, label, ...rest}) {
    return(
        <button title={label} className="toggle" {...rest}>
            <img src={`icons/${icon}.png`} alt={label}/>
        </button>
    );
}
export default Button;
