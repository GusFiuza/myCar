let dev, devAvatar, t1, t2, t3, t4, t5 = ""

function getDataFromAPI(key) {
    // Adaptação para teste
    key = localStorage.getItem("key")
    if (key != null & key != 10) {
        key++
    } else {
        key = 1
    }
    localStorage.setItem("key", key)
    // Adaptação para teste
    let requestHTTP = new XMLHttpRequest()
    let link = `https://6588253990fa4d3dabf982d3.mockapi.io/data/${key}`
    requestHTTP.open('GET', link, true)
    requestHTTP.onload = function (e) {
        if (requestHTTP.readyState === 4 & requestHTTP.status === 200) {
            let APIData = JSON.parse(requestHTTP.responseText)
            if (APIData.length != 0) {
                dev = APIData.warName
                devAvatar = APIData.avatar
                t1 = `Foram ${APIData.commitsCount}. Você trabalhou duro esse ano, mas 2024 será ainda melhor!`
                t2 = `Você esteve em ${APIData.guildaCount} encontros. Compartilhar conhecimento em comunidade é a chave do sucesso!`
                t3 = `Foram ${APIData.braveCount} acessos. Facilidade todo mundo quer!`
                t4 = `Você abriu ${APIData.issueCount}. Não a nada de errado em pedir ajuda.`
                t5 = `Você contribuiu em ${APIData.seloCount} aplicações com selo. Qualidade é o seu sobrenome!`
                document.getElementById('pageTitle').textContent = `${APIData.warName}, está é sua retrospectiva Cloud 2023`
                if (APIData.commitsCount != 0) {
                    document.getElementById("t1").textContent = t1
                }
                    if (APIData.guildaCount != 0) {
                    document.getElementById("t2").textContent = t2
                }
                if (APIData.braveCount != 0) {
                    document.getElementById("t3").textContent = t3
                }
                if (APIData.issueCount != 0) {
                    document.getElementById("t4").textContent = t4
                }
                if (APIData.seloCount != 0) {
                    document.getElementById("t5").textContent = t5
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

function cloud() {
    if (document.getElementById('text').textContent == "Retrospectiva Cloud 2023") {
        document.getElementById('text').textContent = "Sua retrospectiva Cloud 2023"
        document.getElementById('text').setAttribute("data-text", "Sua retrospectiva Cloud 2023")
        document.getElementById('text').style.setProperty("font-size", "7em")
        document.getElementById('selector').setAttribute("src", "assets/cloud.png")
        document.getElementById('selectorText').children[0].textContent = "Cloud"
        document.getElementById('selectorText').children[1].textContent = "Clique para ver como foi o ano da Cloud"
        document.getElementById("t1").textContent = t1
        document.getElementById("t2").textContent = t2
        document.getElementById("t3").textContent = t3
        document.getElementById("t4").textContent = t4
        document.getElementById("t5").textContent = t5
    } else {
        document.getElementById('text').textContent = "Retrospectiva Cloud 2023"
        document.getElementById('text').setAttribute("data-text", "Retrospectiva Cloud 2023")
        document.getElementById('text').style.setProperty("font-size", "8em")
        document.getElementById('selector').setAttribute("src", devAvatar)
        console.log(document.getElementById('selectorText').children[0].textContent)
        document.getElementById('selectorText').children[0].textContent = dev
        document.getElementById('selectorText').children[1].textContent = "Clique para ver como foi o seu ano na Cloud"
        document.getElementById("t1").textContent = "Foram 134.000 commits realizados"
        document.getElementById("t2").textContent = "A guilda se reuniu 40 vezes este ano"
        document.getElementById("t3").textContent = "O Brave teve 5.346 acessos"
        document.getElementById("t4").textContent = "5239 issues foram abertas e respondidas"
        document.getElementById("t5").textContent = "4789 aplicações terminaram 2023 com Selo Cloud"
    }
}
