let mapa;
const utld = { lat: 25.50, lng: -103.55 };
const utld1 = { lat: 25.5012087, lng: -103.5512128 }
let pos1 = {lat:null, lng:null};
const icono1 = "https://img.icons8.com/fluency/50/000000/map-pin.png";
var datos = {lat:null, lng:null};

function initMap() {
    mapa = new google.maps.Map(document.getElementById("map"), {
        center: utld,
        zoom: 15,
        disableDoubleClickZoom: true,
    });

    var rpdb = firebase.database().ref('clicks');

    rpdb.on('child_added',
        function(snapshot){
            var snapposiciones = snapshot.val();
            var pos2 = new google.maps.LatLng(snapposiciones.lat, snapposiciones.lng);
            agregapin(pos2);
        });

    mapa.addListener('click', function (e) {
        console.log(e);
        pos1.lat = e.latLng.lat();
        pos1.lng = e.latLng.lng();
        agregapin(pos1);
        agregarDB(pos1);
    })

    function agregarDB(datos) {
        var fb1 = firebase.database().ref("pins").push(datos, function (error) {
            if (error) {
                console.log(error)
            }
        })
    }
    function agregapin(posicion) {
        user = document.getElementById("nombre").value;
        //loc = document.getElementById("location").value;
        const pin1 = new google.maps.Marker({
            position: posicion,
            map: mapa,
            label: user,
            icon: icono1
        })
    }
}
