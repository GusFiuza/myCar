function getDataFromAPI() {
    let requestHTTP = new XMLHttpRequest()
    let link = `https://6588253990fa4d3dabf982d3.mockapi.io/onix`
    requestHTTP.open('GET', link, true)
    requestHTTP.onload = function (e) {
        if (requestHTTP.readyState === 4 & requestHTTP.status === 200) {
            let APIData = JSON.parse(requestHTTP.responseText)
            if (APIData.length != 0) {
                for (i = 0; i < 3; i++) {
                    document.getElementById("l2").textContent = "Data: " + APIData[i].Date
                    document.getElementById("l3").textContent = "Odômetro: " + APIData[i].Odometer
                    document.getElementById("l4").textContent = "Valor do litro: " + APIData[i].Price
                    document.getElementById("l5").textContent = APIData[i].Liters.toFixed(2) + " litros"
                }
            } else {
                document.head.title = "Fulano de Tal";
            }
        } else {
            console.log("Diferente de 4 e 200...")
        }
    }
    requestHTTP.onerror = function (e) {
        console.log("Erro...");
    }
    requestHTTP.send()
}
