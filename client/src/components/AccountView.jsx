import userIcon from "../assets/icons/user.png"
function AccountView() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-300">
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
                <img src={userIcon} alt="Ícono de usuario" className="h-40 w-40 mb-4"/>
                <div className="mb-4 text-xl font-medium">Usuario: David Letona</div>
                <button
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default AccountView;
