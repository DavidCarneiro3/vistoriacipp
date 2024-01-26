import { Injectable } from '@angular/core';
import pagarme from 'pagarme';




@Injectable()
export class PagarmeProvider {

    constructor() {
        
    }

    getCardHash(card){
       return pagarme.client.connect({ encryption_key: 'ek_live_3R4kDuA3hzdsMKs5ZEgkSlJ8IHj1Ed' })
        .then(client => {
        return client.security.encrypt({
            card_number: card.num,
            card_holder_name: card.tit,
            card_expiration_date: card.mes+card.ano,
            card_cvv: card.cvv,
        })
        })
    }

    
}
