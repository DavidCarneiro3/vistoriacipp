import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as sha512 from 'js-sha512';

/*
  Generated class for the EtuforProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EtuforProvider {
  time = Math.round((new Date()).getTime() / 1000);
  ApiKey = "eShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+"
  SecretKey = "D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x";
  hash = sha512.sha512(this.SecretKey+'.'+this.time+'.'+this.time);
  constructor(public http: HttpClient) {
    console.log('Hello EtuforProvider Provider');
  }

  getBoletoInfo(placa: string, cpf: string){
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://apietuforweb.fortaleza.ce.gov.br/etu/lacus-web/placa/'+placa+'/cpf/'+cpf+'/boletos',
      'headers': {
        'ApiKey': this.ApiKey,
        'Hash': this.hash,
        'Nonce': this.time,
        'Timestamp': this.time,
        'Cookie': 'TS01394ec8=014de840e04d0864f3b9c9652ca950f02467309c696711134cb3418eacb9bd6cd99069b348d0fb2531b166ca86f1649cf8345eb63d'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log('Etufor',response.body);
    });

  }
  
  cadastraAgendamento(item: any){
    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'https://apietuforweb.fortaleza.ce.gov.br/etu/lacus-web/cadastrar-vistoria',
      'headers': {
        'ApiKey': this.ApiKey,
        'Content-Type': 'application/json',
        'Hash': this.hash,
        'Nonce': this.time,
        'Timestamp': this.time
      },
      body: JSON.stringify(
        {
          "vistoria":{
             "dataVistoria":"2020-12-31T00:00:00",
             "extintorNumero":1110002,
             "extintorValidade":"2020-12-31T00:00:00",
             "quilometragem":30000,
             "observacoes":"VEICULO ...",
             "situacaoDUT":"REGULAR",
             "plataformas":"Uber; 99Pop",
             "anoReferenciaVistoria":2020,
             "digitador":"0",
             "vistoriador":"0"
            },
            "prestador":{
              "cpf":"12345678900",
              "cnh":"1928374650",
              "nome":"NOME DO PRESTADOR",
              "email":"EMAIL.PRESTADOR@PESTRADOR.COM",
              "dataNascimento":"1999-09-09",
              "telefone":"85999999999",
              "endereco":{
                "logradouro":"RUA X",
                "numero":"S/N",
                "complemento":"BLOCO X",
                "cep":"00000000",
                "bairro":"BAIRRO XYZ",
                "cidade":"FORTALEZA",
                "uf":"CE"
              }
            },
            "veiculo":{
              "placa":"PMI8927",
              "proprietario":"NOME PROPRIETARIO",
              "cpfOuCnpjProprietario":"12345678900",
              "certificadoCrlv":1234,
              "exercicioCrlv":2020,
              "renavan":"31376363223",
              "chassi":"ABCOO0S0A000",
              "combustivel":"ALCOOL/GASOLINA",
              "marcaVeiculo":"XYZ",
              "modeloVeiculo":"ABC",
              "anoFabricacao":2020,
              "anoModelo":2020,
              "municipio":"FORTALEZA",
              "uf":"CE",
              "tipoPintura":"ENVELOPADO",
              "cor":"PRATA",
              "capacidadePassageiros":5,
              "categoria":"AUTOMOVEL",
              "especie":"PASSAGEIRO",
              "tipoVeiculo":"AUTOMOVEL"
            },
            "localCredenciada":0
          })

    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });

  }

}
