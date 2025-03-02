
type InputProps = {
    label:string;
    placeholder: string;
    defaultValue:string | undefined;
    type?: string;
    className?:string
}

export default function Input({label, placeholder, defaultValue, type = "text", className}: InputProps) {
  
    return (
    <input
        className={`input-text ${className}`}
        autoComplete='off'
        name={label}
        type={type}
        placeholder={label}
        defaultValue={defaultValue} 
    />
  )
}
