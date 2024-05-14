const Button = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="h-[33px] px-4 rounded-md border border-gray-600 text-black bg-gray-300 hover:bg-gray-400 transition-colors duration-200"
        >
            {children}
        </button>
    );
};

export default Button;