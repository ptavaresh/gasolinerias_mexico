class UI {
    constructor() {

         
         //instananciar API
         this.api = new API();
         //crar los markrs con layer group
         this.markers = new L.LayerGroup();
         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }

    mostrarEstablecimientos() {
        this.api.obtenerDatos()
            .then(datos => {
                const resultado = datos.respuestaJSON.results;
                //ejecutar funcion para mostrar los pines
                this.mostrarPines(resultado);
            })
    }

    mostrarPines(datos) {
        //limpia los markers al iniciar la app
        this.markers.clearLayers();
        //recorrer los establecimeintos
        datos.forEach(dato => {
            //hacemos destructuring al objeto dato 
            const {latitude, longitude, calle, regular, premium} = dato;
            //crear pop up
            const opcionesPopUp = L.popup()
                .setContent(`<p>Calle: ${calle}</>
                             <p><b>Regular: </b> $ ${regular}</p>
                             <p><b>Premium: </b> $ ${premium}</p>
                `);

            //agregar el PIN
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
                //adjuntar el popUp al marker
            ]).bindPopup(opcionesPopUp);

            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa)
    }

    //buscador
    obtenerSugerencias(busqueda) {
        this.api.obtenerDatos()
            .then(datos => {
                //obtener los datos
                const resultados = datos.respuestaJSON.results;

                //enviar el json y la busqueda para el filtrado
                this.filtrarSugerencias(resultados, busqueda);
            })
    }
    //filtra las sgerencias
    filtrarSugerencias(resultado, busqueda) {
        //filtrar con .filter
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
        //mostrar pines
        this.mostrarPines(filtro)
    }
}