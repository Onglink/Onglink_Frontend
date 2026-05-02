import axios from "axios";


export type CepResponse = {

    cep: string;
    logradouro?: string;
    bairro?: string;
    localidade: string;
    uf: string;
};

export async function getCepData(cep:string) {
    
    const baseUrl = process.env.NEXT_PUBLIC_VIACEP_URL || 'https://viacep.com.br/ws';
    return(
        await axios.get<CepResponse>(
            `${baseUrl}/${cep.replace("-", "")}/json`
        )
    ).data;
}