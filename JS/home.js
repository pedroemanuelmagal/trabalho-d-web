import { getStateAndCitiesByDdd, getAddressByCep, getCepByAddress } from "./sistema.js";

window.onload = loadHistory();

const botaoDdd = document.getElementById("botao-buscar-ddd");
botaoDdd.onclick = () => {
    const ddd = document.getElementById("input-ddd");
    getStateAndCities(parseInt(ddd.value));
    ddd.value = "";
};

const botaoCep = document.getElementById("botao-buscar-cep");
botaoCep.onclick = () => {
    let cep = document.getElementById("input-cep");
    getAddress(parseInt(cep.value.split("-").join("")));
    cep.value = "";
};

const botaoEndereco = document.getElementById("botao-buscar-endereco");
botaoEndereco.onclick = () => {
    let rua = document.getElementById("input-rua");
    let cidade = document.getElementById("input-cidade");
    let estado = document.getElementById("input-estado");
    const dados = {
        rua: rua.value,
        cidade: cidade.value,
        estado: estado.value
    }
    getCep(dados);
    rua.value = "";
    cidade.value = "";
    estado.value = "";
};

async function getStateAndCities(ddd) {
    insertLastItem("Buscas por DDD", ddd);
    const response = await getStateAndCitiesByDdd(ddd);
    if (response.success) insertDddSearch(ddd);
    const resultDiv = document.querySelector(".result-container-ddd");
    let itens = response.result.cities.map(city => {
        return `<li>${city}</li>`
    })

    resultDiv.innerHTML = `
    <div class="result-ddd">
    <p>Resultado:</p> 
    <p>Estado - ${response.result.state}</p>
    <p>Cidades:</p>
    <ul>
      ${itens.join("")}  
    </ul>
    </div>
    `
}

async function getAddress(cep) {
    insertLastItem("Buscas por CEP", cep);
    insertCepSearch();
    const response = await getAddressByCep(cep);
    const resultDiv = document.querySelector(".result-container-cep");
    resultDiv.innerHTML = `
        <div class="result-cep">
            <p>Resultado:</p>
            <div>
            <p>Estado: ${response.result.uf}</p>
                <p>Cidade: ${response.result.localidade}</p>
                <p>Bairro: ${response.result.bairro}</p>
                <p>Rua: ${response.result.logradouro}</p>
                <p>CEP: ${response.result.cep}</p>
            </div>
        </div>
    `
}

async function getCep(address) {
    let addressString = `Rua: ${address.rua} / Cidade: ${address.cidade} / Estado: ${address.estado}`;
    insertLastItem("Buscas por endereço", addressString);
    insertAddressSearch();
    const response = await getCepByAddress(address);
    console.log(response);
    const resultDiv = document.querySelector(".result-container-address");

    let itens = response.result.map(cep => {
        return `<li>${response.result.length > 1 ? cep.cep + " - " + cep.logradouro + " " + cep.complemento : cep.cep + " - " + cep.logradouro}</li>`
    })

    resultDiv.innerHTML = `
    <div class="result-address">
    <p>Resultado:</p>
    <p>Cidade - ${address.cidade}</p> 
    <p>Estado - ${response.result[0].estado}</p>
    <p>CEPS:</p>
    <ul>
      ${itens.join("")}  
    </ul>
    </div>
    `
}

function insertLastItem(storage, lastItem) {
    let storageArray;
    let storageValues = localStorage.getItem(storage);
    if (storageValues) {
        console.log(typeof storageValues)
        storageArray = storageValues.split(",");
    }

    if (!storageValues) {
        localStorage.setItem(storage, lastItem);
    } else if (storageValues && storageArray.length < 3) {
        storageArray.push(lastItem);
        localStorage.setItem(storage, storageArray);
    } else if (storageValues && storageArray.length === 3) {
        storageArray.shift();
        storageArray.push(lastItem);
        localStorage.setItem(storage, storageArray);
    }
}

function loadHistory() {
    const dddSubcontainer = document.querySelector(".ddd-subcontainer");
    const cepSubcontainer = document.querySelector(".cep-subcontainer");
    const addressSubcontainer = document.querySelector(".address-subcontainer");

    const dddSearches = localStorage.getItem("Buscas por DDD");
    const cepSearches = localStorage.getItem("Buscas por CEP");
    const addressSearches = localStorage.getItem("Buscas por endereço");
    let dddSearchesArray;
    let cepSearchesArray;
    let addressSearchesArray;
    if (dddSearches) {
        dddSearchesArray = dddSearches && dddSearches.includes(",") ? dddSearches.split(",") : dddSearches.split();
    }
    
    if (cepSearches) {
      cepSearchesArray = cepSearches && cepSearches.includes(",") ? cepSearches.split(",") : cepSearches.split();  
    }

    if (addressSearches) {
        addressSearchesArray = addressSearches && addressSearches.includes(",") ? addressSearches.split(",") : addressSearches.split();
    }

    if (dddSearchesArray)
    dddSearchesArray.forEach(search => {
        dddSubcontainer.innerHTML += `<p>- DDD: ${search}</p>`;
    });

    if (cepSearchesArray)
    cepSearchesArray.forEach(search => {
        cepSubcontainer.innerHTML += `<p>- CEP: ${search}</p>`;
    });

    if (addressSearchesArray)
    addressSearchesArray.forEach(search => {
        addressSubcontainer.innerHTML += `<p>- ${search}</p>`;
    });
    
}

function insertDddSearch() {
    const dddSubcontainer = document.querySelector(".ddd-subcontainer");
    dddSubcontainer.innerHTML = "";
    const dddSearches = localStorage.getItem("Buscas por DDD");
    const dddSearchesArray = dddSearches.split(",");
    
    dddSearchesArray.forEach(search => {
        dddSubcontainer.innerHTML += `<p>- DDD: ${search}</p>`;
    });
    
}

function insertCepSearch() {
    const cepSubcontainer = document.querySelector(".cep-subcontainer");
    cepSubcontainer.innerHTML = "";
    const cepSearches = localStorage.getItem("Buscas por CEP");
    const cepSearchesArray = cepSearches.split(",");
    
    cepSearchesArray.forEach(search => {
        cepSubcontainer.innerHTML += `<p>- DDD: ${search}</p>`;
    });
    
}

function insertAddressSearch() {
    const addressSubcontainer = document.querySelector(".address-subcontainer");
    addressSubcontainer.innerHTML = "";
    const adrressSearches = localStorage.getItem("Buscas por endereço");
    const addressSearchesArray = adrressSearches.split(",");
    
    addressSearchesArray.forEach(search => {
        addressSubcontainer.innerHTML += 
        `<p>
            <span>${search}</span>
        </p>`;
    });
    
}