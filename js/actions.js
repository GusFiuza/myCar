// DOTO: Add total value of each fueling
// DOTO: Add tax information
// DOTO: Add price variation
// DOTO: Add price adding feature
const projectToken = '65bc2b4f52189914b5bda99c'
let PriceData
let FuelingData
let PriceCurrentPosition
let FuelingCurrentPosition

function getDataFromAPI(carId) {
    getCarData(carId)
    getPriceData(carId)
    getFuelingData(carId)
}

function getCarData(carId) {
    fetch(`https://${projectToken}.mockapi.io/car/${carId}`, {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {return res.json()}
      }).then(car => {
        document.body.children[0].children[0].textContent = car.brand
        document.body.children[0].children[1].textContent = car.model
        document.body.children[0].children[2].textContent = car.version
      }).catch(error => {})
}
function getPriceData(carId) {
    fetch(`https://${projectToken}.mockapi.io/car/${carId}/price`, {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {return res.json()}
      }).then(prices => {
        for (i = 0; i < prices.length; i++) {
            PriceData = prices
            PriceCurrentPosition = PriceData.length - 1
            if (PriceData.length != 0) {
                fillPrice(PriceCurrentPosition)
            }
        }
      }).catch(error => {})
}

function getFuelingData(carId) {
    fetch(`https://${projectToken}.mockapi.io/car/${carId}/fueling`, {
        method: 'GET',
        headers: {'content-type':'application/json'},
      }).then(res => {
        if (res.ok) {return res.json()}
      }).then(tasks => {
        for (i = 0; i < tasks.length; i++) {
            FuelingData = tasks
            FuelingCurrentPosition = FuelingData.length - 1
            if (FuelingData.length != 0) {
                fillView(FuelingCurrentPosition)
            }
        }
      }).catch(error => {})
}

function fillPrice(position) {
    document.body.children[0].children[3].textContent = "Valor FIPE em " + PriceData[position].reference.toString().substring(4,6) + "/" + PriceData[position].reference.toString().substring(0,4) + ": " + PriceData[position].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fillView(position) {
    document.getElementById("l1").textContent = "Data: " + FuelingData[position].date
    document.getElementById("l2").textContent = "Odômetro: " + FuelingData[position].odometer.toLocaleString('pt-BR', { style: 'decimal' })
    document.getElementById("l3").textContent = "Valor do litro: " + FuelingData[position].price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    document.getElementById("l4").textContent = FuelingData[position].liters.toFixed(2).toLocaleString().replace('.', ',') + " litros"
    document.getElementById("l7").textContent = "Valor total: " + (FuelingData[position].price * FuelingData[position].liters).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    if (position == 0) {
        document.getElementById("l1").textContent = document.getElementById("l1").textContent + " (Primeiro)"
        document.getElementById("l5").textContent = ""
        document.getElementById("l6").textContent = ""
    } 
    if (position == FuelingData.length -1) {
        document.getElementById("l1").textContent = document.getElementById("l1").textContent + " (Último)"
    }
    if (position > 0) {
        day = parseInt(FuelingData[position-1].date.substring(0,2))
        if (day < 10) {
            day = '0' + day.toString()
        } else {
            day = day.toString()
        }
        month = FuelingData[position-1].date.substring(3,5)
        year = FuelingData[position-1].date.substring(6,10)
        dateOne = new Date(year + '-' + month + '-' + day)
        dateOne.setDate(dateOne.getDate() + 1)

        day = parseInt(FuelingData[position].date.substring(0,2))
        if (day < 10) {
            day = '0' + day.toString()
        } else {
            day = day.toString()
        }
        month = FuelingData[position].date.substring(3,5)
        year = FuelingData[position].date.substring(6,10)
        dateTwo = new Date(year + '-' + month + '-' + day)
        dateTwo.setDate(dateTwo.getDate() + 1)

        timeDiff = Math.abs(dateTwo.getTime() - dateOne.getTime());
        diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        document.getElementById("l5").textContent = "Consumo: " + ((FuelingData[position].odometer-FuelingData[position-1].odometer)/FuelingData[position].liters).toFixed(2) + " km/l"
        document.getElementById("l6").textContent = "Média de " + ((FuelingData[position].odometer-FuelingData[position-1].odometer)/diffDays).toFixed() + "km por dia"
    }
}

function previousData(kind) {
    if (kind == "fueling") {
        if (FuelingCurrentPosition > 0) {
            FuelingCurrentPosition--
            fillView(FuelingCurrentPosition)
        }
    } else {
        if (PriceCurrentPosition > 0) {
            PriceCurrentPosition--
            fillPrice(PriceCurrentPosition)
        }
    }
}

function editData() {
    document.getElementById('view').setAttribute('hidden', '')
    document.getElementById('edit').removeAttribute('hidden')
    today = new Date()
    document.getElementById('edit').children[1].value = today.toLocaleDateString("pt-BR")
    document.getElementById('edit').children[3].value = FuelingData[FuelingData.length-1].odometer.toLocaleString('pt-BR', { style: 'decimal' })
    document.getElementById('edit').children[5].value = FuelingData[FuelingData.length-1].price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function nextData(kind) {
    if (kind == "fueling") {
        if (FuelingCurrentPosition < FuelingData.length-1) {
            FuelingCurrentPosition++
            fillView(FuelingCurrentPosition)
        }
    } else {
        if (PriceCurrentPosition < PriceData.length-1) {
            PriceCurrentPosition++
            fillPrice(PriceCurrentPosition)
        }
    }
}

function confirmData(carId) {
    const onixData = {
        date: `${document.getElementById('edit').children[1].value}`,
        odometer: parseInt(document.getElementById('edit').children[3].value.replace('.','')),
        price: parseFloat(document.getElementById('edit').children[5].value.replace('R$','').replace(',','.')),
        liters: parseFloat(document.getElementById('edit').children[7].value.replace(',','.')),
        carId: parseInt(carId)
    };

    fetch(`https://${projectToken}.mockapi.io/car/${carId}/fueling`, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(onixData)
    }).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(task => {
            getDataFromAPI(1)
        }).catch(error => {
    })
    cancelData()

}

function cancelData() {
    document.getElementById('edit').setAttribute('hidden', '')
    document.getElementById('view').removeAttribute('hidden')
}
