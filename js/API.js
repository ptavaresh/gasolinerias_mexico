class API {
    async obtenerDatos() {
        const total = 110;
        //datos desde el api
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);
        //retornar json
        const respuestaJSON = await datos.json();
        //retornar datos
        return {
            respuestaJSON
        }
    }
}