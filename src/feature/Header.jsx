import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    return <>
        <nav className="bg-white border-b shadow-sm">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    <h1 className='text-3xl font-bold'>Expense Tracker</h1>
                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-gray-600 hover:text-blue-600" onClick={() => navigate('/')}>
                            Dashboard
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-600" onClick={() => navigate('/add-expense')}>
                            Add expenses
                        </a>

                        {/* <button className="rounded-lg bg-blue-600 cursor-pointer px-4 py-2 text-white hover:bg-blue-700" onClick={() => navigate('/')}>
                            Login
                        </button> */}
                    </div>

                    {/* Mobile button */}
                    <button
                        className="md:hidden text-gray-600"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t bg-white">
                    <div className="flex flex-col gap-3 px-4 py-4" >
                        <a className="text-gray-600 hover:text-blue-600" href="#" onClick={() => navigate('/dashboard')}>
                            Dashboard
                        </a>
                        <a className="text-gray-600 hover:text-blue-600" href="#">
                            Add expenses
                        </a>
                        {/* <button className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white">
                            Login
                        </button> */}
                    </div>
                </div>
            )}
        </nav >
    </>
}