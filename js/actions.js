let APIData
let currentPosition
let requestHTTP = new XMLHttpRequest()
let link = `https://6588253990fa4d3dabf982d3.mockapi.io/onix`

function getDataFromAPI() {
    requestHTTP.open('GET', link, true)
    requestHTTP.onload = function (e) {
        if (requestHTTP.readyState === 4 & requestHTTP.status === 200) {
            APIData = JSON.parse(requestHTTP.responseText)
            currentPosition = APIData.length - 1
            if (APIData.length != 0) {
                 fillView(currentPosition)
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

function fillView(position) {
    document.getElementById("l1").textContent = "Data: " + APIData[position].Date
    document.getElementById("l2").textContent = "Odômetro: " + APIData[position].Odometer.toLocaleString('pt-BR', { style: 'decimal' })
    document.getElementById("l3").textContent = "Valor do litro: " + APIData[position].Price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    document.getElementById("l4").textContent = APIData[position].Liters.toFixed(2).toLocaleString().replace('.', ',') + " litros"
    if (position == 0) {
        document.getElementById("l1").textContent = document.getElementById("l1").textContent + " (Primeiro)"
        document.getElementById("l5").textContent = ""
        document.getElementById("l6").textContent = ""
    } 
    if (position == APIData.length -1) {
        document.getElementById("l1").textContent = document.getElementById("l1").textContent + " (Último)"
    }
    if (position > 0) {
        day = parseInt(APIData[position-1].Date.substring(0,2)) + 1
        if (day < 10) {
            day = '0' + day.toString()
        } else {
            day = day.toString()
        }
        month = APIData[position-1].Date.substring(3,5)
        year = APIData[position-1].Date.substring(6,10)
        dateOne = new Date(year + '-' + month + '-' + day)

        day = parseInt(APIData[position].Date.substring(0,2)) + 1
        if (day < 10) {
            day = '0' + day.toString()
        } else {
            day = day.toString()
        }
        month = APIData[position].Date.substring(3,5)
        year = APIData[position].Date.substring(6,10)
        dateTwo = new Date(year + '-' + month + '-' + day)
        
        timeDiff = Math.abs(dateTwo.getTime() - dateOne.getTime());
        diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        document.getElementById("l5").textContent = "Consumo: " + ((APIData[position].Odometer-APIData[position-1].Odometer)/APIData[position].Liters).toFixed(2) + " km/l"
        document.getElementById("l6").textContent = "Média de " + ((APIData[position].Odometer-APIData[position-1].Odometer)/diffDays).toFixed() + "km por dia"
    }
}

function previousData() {
    if (currentPosition > 0) {
        currentPosition--
        fillView(currentPosition)
    }
}

function editData() {
    if ( document.getElementById('view').hidden ) {
        document.getElementById('edit').setAttribute('hidden', '')
        document.getElementById('view').removeAttribute('hidden')
    } else {
        document.getElementById('view').setAttribute('hidden', '')
        document.getElementById('edit').removeAttribute('hidden')
        today = new Date()
        document.getElementById('edit').children[1].value = today.toLocaleDateString("pt-BR")
        document.getElementById('edit').children[3].value = APIData[APIData.length-1].Odometer.toLocaleString('pt-BR', { style: 'decimal' })
        document.getElementById('edit').children[5].value = APIData[APIData.length-1].Price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
}

function nextData() {
    if (currentPosition < APIData.length-1) {
        currentPosition++
        fillView(currentPosition)
    }
}

function confirmData() {
    requestHTTP.open('POST', link, false)
    requestHTTP.send()

    // requestHTTP.open('PUT', link+"/4", false)
    // requestHTTP.send(JSON.parse('{"Date": "27/01/2024","Odometer": 20200,"Price": 3.59,"Liters": 12.345}'))

    // requestHTTP.open('DELETE', link+"/4", false)
    // requestHTTP.send()

    if (requestHTTP.responseText != "") {
        console.log(requestHTTP.status)
    } else {
        console.log(requestHTTP.status)
    }
}

function testing() {
    // console.log(APIData[APIData.length-1].Odometer)
}