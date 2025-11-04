export async function getStateAndCitiesByDdd(ddd) {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
        const info = await response.json();

        let data = {
            result: null,
            success: null,
            message: null
        };

        if (response.status === 200) {
            data.result = info;
            data.success = true;
            data.message = "DDD localizado com sucesso";
        } else if (response.status === 404) {
            data.result = null;
            data.success = false;
            data.message = info.message;
        } else if (response.status === 500) {
            data.result = null;
            data.success = false;
            data.message = info
        } else if (response.status === 400) {
            data.result = null;
            data.success = false;
            data.message = info.message
        }

        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function getAddressByCep(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const info = await response.json();

        let data = {
            result: null,
            success: null,
            message: null
        };

        if (response.status === 200) {
            data.result = info;
            data.success = true;
            data.message = "CEP localizado com sucesso";
        } else if (response.status === 400) {
            data.result = null;
            data.success = false;
            data.message = info.message;
        }
        
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function getCepByAddress(address) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${address.estado}/${address.cidade}/${address.rua}/json/`);
        const info = await response.json();

        let data = {
            result: null,
            success: null,
            message: null
        };

        if (response.status === 200) {
            data.result = info;
            data.success = true;
            data.message = "CEP localizado com sucesso";
        } else if (response.status === 400) {
            data.result = null;
            data.success = false;
            data.message = info.message;
        }
        
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}