function Info() {
    return (
        <div className="flex flex-col w-full h-screen justify-center items-center bg-gray-300">
            <div className="p-8 bg-white rounded-xl shadow-xl max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-blue-950">Información</h1>

                <div className="mb-4">
                    <span className="font-semibold text-gray-700">Creado por:</span>
                    <span className="ml-2 text-gray-500">David Tech Solutions</span>
                </div>

                <div className="mb-4">
                    <span className="font-semibold text-gray-700">Contacto:</span>
                    <span className="ml-2 text-gray-500">davidtechsolutions@gmail.com</span>
                </div>

                <div className="mb-4">
                    <span className="font-semibold text-gray-700">Ubicación:</span>
                    <span className="ml-2 text-gray-500">Guatemala</span>
                </div>

                <div className="border-t pt-4 mt-4 text-gray-600">
                    En caso de requerir asistencia técnica puedes enviar un correo indicando tu situación, la responderemos lo más pronto posible.
                </div>
            </div>
        </div>
    )
}

export default Info;
