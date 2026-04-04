import { useState, ChangeEvent } from "react";

interface LoginProps{
    onLoginSuccess: (token: string) => void;
}

export const Login = ({onLoginSuccess}: {onLoginSuccess: (t:string) => void}) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 1. using changeEvent for inputs 
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePass = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    //2. ussing the actual submit event 
    const handleSubmit = async (e: SubmitEvent) =>{
        e.preventDefault();

        try{
            const reponse = await fetch('/api/auth/login', {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email, password}),
            });

            const data = await reponse.json();
            if(!reponse.ok) throw new Error(data.message);

            localStorage.setItem('token', data.token);
            onLoginSuccess(data.token);
        }
        catch (err: any){
            alert(err.message);
        }
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={(e) => handleSubmit(e.nativeEvent)}>
                <input type="email" value = {email} onChange={handleEmail} placeholder="Email" required />
                <input type="password" value ={password} onChange={handlePass} placeholder="Passowrd" required />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};
