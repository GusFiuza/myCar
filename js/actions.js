function getDataFromAPI() {
    let requestHTTP = new XMLHttpRequest()
    let link = `https://6588253990fa4d3dabf982d3.mockapi.io/onix`
    requestHTTP.open('GET', link, true)
    requestHTTP.onload = function (e) {
        if (requestHTTP.readyState === 4 & requestHTTP.status === 200) {
            let APIData = JSON.parse(requestHTTP.responseText)
            if (APIData.length != 0) {
                for (i = 0; i < APIData.length; i++) {
                    document.getElementById("l2").textContent = "Data: " + APIData[i].Date
                    document.getElementById("l3").textContent = "Odômetro: " + APIData[i].Odometer.toLocaleString('pt-BR', { style: 'decimal' })
                    document.getElementById("l4").textContent = "Valor do litro: " + APIData[i].Price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    document.getElementById("l5").textContent = APIData[i].Liters.toFixed(2).toLocaleString().replace('.', ',') + " litros"
                    if (i > 0) {
                        day = parseInt(APIData[i-1].Date.substring(0,2)) + 1
                        if (day < 10) {
                            day = '0' + day.toString()
                        } else {
                            day = day.toString()
                        }
                        month = APIData[i-1].Date.substring(3,5)
                        year = APIData[i-1].Date.substring(6,10)
                        dateOne = new Date(year + '-' + month + '-' + day)

                        day = parseInt(APIData[i].Date.substring(0,2)) + 1
                        if (day < 10) {
                            day = '0' + day.toString()
                        } else {
                            day = day.toString()
                        }
                        month = APIData[i].Date.substring(3,5)
                        year = APIData[i].Date.substring(6,10)
                        dateTwo = new Date(year + '-' + month + '-' + day)
                        
                        timeDiff = Math.abs(dateTwo.getTime() - dateOne.getTime());
                        diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        
                        document.getElementById("l6").textContent = "Consumo: " + ((APIData[i].Odometer-APIData[i-1].Odometer)/APIData[i].Liters).toFixed(2) + " km/l"
                        document.getElementById("l7").textContent = "Média de " + ((APIData[i].Odometer-APIData[i-1].Odometer)/diffDays).toFixed() + "km por dia"

                    }
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

function editData() {
    if ( document.getElementById('view').hidden ) {
        document.getElementById('edit').setAttribute('hidden', '')
        document.getElementById('view').removeAttribute('hidden')
    } else {
        document.getElementById('view').setAttribute('hidden', '')
        document.getElementById('edit').removeAttribute('hidden')
    }
}