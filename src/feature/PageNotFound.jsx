import { useNavigate } from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <h1 className="text-8xl font-extrabold text-blue-600">404</h1>

            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                Page not found
            </h2>

            <p className="mt-2 max-w-md text-gray-500">
                Sorry, the page you’re looking for doesn’t exist or has been moved.
            </p>

            <button
                onClick={() => navigate('/')}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
                Go back home
            </button>
        </div>
    );
}

export default PageNotFound;