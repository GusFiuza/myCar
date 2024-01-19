function getDataFromAPI() {
    let requestHTTP = new XMLHttpRequest()
    let link = `https://6588253990fa4d3dabf982d3.mockapi.io/onix`
    requestHTTP.open('GET', link, true)
    requestHTTP.onload = function (e) {
        if (requestHTTP.readyState === 4 & requestHTTP.status === 200) {
            let APIData = JSON.parse(requestHTTP.responseText)
            if (APIData.length != 0) {
                document.getElementById("l1").textContent = APIData[0].brand
                document.getElementById("l2").textContent = APIData[0].model
                document.getElementById("l3").textContent = APIData[0].version
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
