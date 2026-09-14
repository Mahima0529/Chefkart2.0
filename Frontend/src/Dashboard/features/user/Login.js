import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputText from '../../components/Input/InputText';
import ErrorText from '../../components/Typography/ErrorText';
import { loginUser } from '../../app/api';

function Login({ onLoginSuccess }) {
    const INITIAL_LOGIN_OBJ = {
        email: 'admin@chefkart.com',
        password: 'Admin@123'
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        const { email, password } = loginObj;

        if (!email.trim()) return setErrorMessage('Email is required!');
        if (!password.trim()) return setErrorMessage('Password is required!');

        setLoading(true);
        
        try {
            const result = await loginUser(email, password);
            
            if (result.status) {
                if (onLoginSuccess) {
                    onLoginSuccess(result);
                }
                navigate('/dashboard');
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            setErrorMessage(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-8 px-4">
            <div className="card mx-auto w-full max-w-md shadow-2xl bg-base-100 rounded-2xl overflow-hidden border border-base-300">
                <div className='p-8'>
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-3">
                            <span className="text-2xl font-black">👨‍🍳</span>
                        </div>
                        <h2 className='text-2xl font-bold text-base-content'>Chefkart Admin Portal</h2>
                        <p className="text-xs text-gray-500 mt-1">Sign in with administrator credentials</p>
                    </div>

                    <form onSubmit={submitForm}>
                        <div className="space-y-4">
                            <InputText
                                defaultValue={loginObj.email}
                                type="email"
                                updateType="email"
                                containerStyle=""
                                labelTitle="Email Address"
                                updateFormValue={updateFormValue}
                            />
                            <div className="relative">
                                <InputText
                                    defaultValue={loginObj.password}
                                    type={showPassword ? "text" : "password"}
                                    updateType="password"
                                    containerStyle=""
                                    labelTitle="Password"
                                    updateFormValue={updateFormValue}
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 text-sm text-gray-500 hover:text-gray-700"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {errorMessage && (
                            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn mt-6 w-full bg-orange-500 hover:bg-orange-600 border-none text-white font-semibold ${
                                loading ? "loading" : ""
                            }`}
                        >
                            {loading ? "Authenticating..." : "Sign In to Dashboard"}
                        </button>

                        <div className="mt-6 p-3 bg-base-200 rounded-lg text-xs text-gray-600 border border-base-300">
                            <p className="font-semibold text-gray-700 mb-1">🔑 Default Administrator Credentials:</p>
                            <p><strong>Email:</strong> admin@chefkart.com</p>
                            <p><strong>Password:</strong> Admin@123</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
