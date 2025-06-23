import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [signUp, setsignUp] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
            setsignUp(true);
            setName("");
            setEmail("");
            setPassword("");
            navigate('/preferences')
        } catch (error) {
            let errorCode = "unknown";
            let errorMessage = "An unknown error occurred.";
            if (error && typeof error === "object" && "code" in error && "message" in error) {
                errorCode = (error as { code: string }).code;
                errorMessage = (error as { message: string }).message;
            }
            setError(errorMessage);
            console.error("Error creating user:", errorCode, errorMessage);
        }

        setLoading(false);
    };

    return (
        <div className="LoginSignUp">
            <div className="form">
                <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>
                {error && (
                    <div className="alert alert-danger text-red-600 bg-red-100 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                {signUp && (
                    <div className="alert alert-success">
                        Signup successful! Welcome {name}!
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="name" className="block mb-1 font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="form-control w-full border rounded px-3 py-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="block mb-1 font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control w-full border rounded px-3 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control w-full border rounded px-3 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-block bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                    <p className="mt-3 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}