import { environment } from './environment';
export class Constants {

    public static CieloSandboxCodes = {
        "4": "Operação realizada com sucesso",
        "6": "Operação realizada com sucesso",
        "05": "Não Autorizada",
        "57": "Cartão Expirado",
        "78": "Cartão Bloqueado",
        "99": "Time Out",
        "77": "Cartão Cancelado",
        "70": "Problemas com o Cartão de Crédito"
    }

    public static CieloProductionCodes = {
        // return code -> return message
        "00": "Transação autorizada com sucesso.",
        "000": "Transação autorizada com sucesso.",
        "01": "Transação não autorizada. Entre em contato com seu banco emissor.",
        "02": "Transação não autorizada. Entre em contato com seu banco emissor.",
        "03": "Não foi possível processar a transação. Entre com contato com a Loja Virtual.",
        "04": "Transação não autorizada. Entre em contato com seu banco emissor.",
        "05": "Transação não autorizada. Entre em contato com seu banco emissor.",
        "06": "Não foi possível processar a transação. Entre em contato com seu banco emissor.",
        "07": "Transação não autorizada. Entre em contato com seu banco emissor",
        "08": "Transação não autorizada. Dados incorretos. Reveja os dados e informe novamente.",
        "09": "Transação cancelada parcialmente com sucesso",
        "11": "Transação autorizada com sucesso.",
        "12": "Não foi possível processar a transação. reveja os dados informados e tente novamente. Se o erro persistir, entre em contato com seu banco emissor.",
        "13": "Transação não autorizada. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.",
        "14": "Não foi possível processar a transação. reveja os dados informados e tente novamente. Se o erro persistir, entre em contato com seu banco emissor.",
        "15": "Não foi possível processar a transação. Entre em contato com seu banco emissor.",
        "19": "Não foi possível processar a transação. Refaça a transação ou tente novamente mais tarde. Se o erro persistir entre em contato com a loja virtual.",
        "21": "Não foi possível processar o cancelamento. Tente novamente mais tarde. Persistindo o erro, entrar em contato com a loja virtual.",
        "22": "Não foi possível processar a transação. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.",
        "23": "Não foi possível processar a transação. Valor da prestação inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.",
        "24": "Não foi possível processar a transação. Quantidade de parcelas inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.",
        "25": "Não foi possível processar a transação. reveja os dados informados e tente novamente. Persistindo o erro, entrar em contato com a loja virtual.",
        "28": "Não foi possível processar a transação. Entre com contato com a Loja Virtual.",
        "30": "Não foi possível processar a transação. Reveja os dados e tente novamente. Se o erro persistir, entre em contato com a loja"

    }

}