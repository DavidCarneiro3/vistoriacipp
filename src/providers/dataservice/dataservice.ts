import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http/';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http'
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import * as sha512 from 'js-sha512';
import { DatePipe } from '@angular/common';
var request = require('request');

/*
  Generated class for the DataserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataserviceProvider {

  api = 'https://necava.cipetran.com/api/api.php';
  //api = 'http://vivasvistorias.com.br/site/agendamento/api.php';
  key: string;
  time = Math.round((new Date()).getTime() / 1000);
  ApiKey = "eShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+"
  SecretKey = "D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x";
  hash = sha512.sha512(this.SecretKey+'.'+this.time+'.'+this.time);
  constructor(private http: HttpClient, private _platform: Platform, private nativeHttp: HTTP, private angHttp: Http ) { 
    let plat = this._platform.platforms();
      // if(plat[2] == 'ios'){
      //   this.key = 'INTELLIGENTIS';
      // }
      // if(plat[2] == 'android'){
      //   this.key = 'AAANDROID';
      // }
      this.key = 'PuY4bqmlCIS3KGG&wk&a!4Y2Fyv!hyK2'
  }

  getRequests(mytoken: string){
    // return this.http.post(this.api,{acao:7, key_app:this.key},{})
    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 7;
    //body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("token", mytoken);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }
  

  login(user,pass){
    // console.log('Key',this.key)
    
    // return this.nativeHttp.post(this.api,{login:user, senha:pass, key_app:this.key, acao:2}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 1;
    body.append("login", user);
    body.append("senha", pass);
    body.append("key_app", this.key);
    body.append("acao", acao);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  logOut(mytoken: string){
    // console.log('Key',this.key)
    
    // return this.nativeHttp.post(this.api,{login:user, senha:pass, key_app:this.key, acao:2}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 3;
    //body.append("login", user);
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  getSession(mytoken: string){
    // console.log('Mytoken in Session',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken, key_app:this.key, acao:4}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 3;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  getUser(mytoken: string){
    // console.log('Mytoken in GetUser',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken, key_app:this.key, acao:5}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 4;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  getUserData(mytoken: string, cod_user: any){
    // console.log('Mytoken in GetUser',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken, key_app:this.key, acao:5}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 4;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("cod_sys_usuario", cod_user);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  signup(user: any, mytoken: string){
    // console.log('Mytoken in uptUser',mytoken)
    // console.log('User in uptUser',user)
    // return this.nativeHttp.post(this.api,{token:mytoken, key_app:this.key, acao:9, tipo_pessoa: user.prof, cpf_cnpj: user.cpf, nome: user.name, telefone: user.phone, email: user.email, login: user.usuario,senha: user.senha}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 9;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("tipo_pessoa", user.prof);
    body.append("cpf_cnpj", user.cpf);
    body.append("nome", user.nome);
    body.append("telefone", user.phone);
    body.append("email", user.email);
    body.append("login", user.login);
    body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  uptUser(user: any, mytoken: string){
    // console.log('Mytoken in uptUser',mytoken)
    // console.log('User in uptUser',user)
    // return this.nativeHttp.post(this.api,{token:mytoken, key_app:this.key, acao:1, tipo_pessoa: user.prof, cpf_cnpj: user.cpf, nome: user.name, telefone: user.phone, email: user.email}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 1;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("tipo_pessoa", user.prof);
    body.append("cpf_cnpj", user.cpf);
    body.append("nome", user.nome);
    body.append("telefone", user.phone);
    body.append("email", user.email);
    body.append("login", user.login);
    body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  listUnitys(mytoken: string){
    // console.log('Mytoken in ListUnitys',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken, key_app:this.key, acao:10}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 10;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    // body.append("tipo_pessoa", user.prof);
    // body.append("cpf_cnpj", user.cpf);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  listTasks(mytoken: string, idunit: any){
    console.log('Mytoken in ListTasks',mytoken)
    console.log('Id Unit',idunit)
    // return this.nativeHttp.post(this.api,{token:mytoken, cod_unidade_atendimento:idunit, key_app:this.key, acao:14}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 14;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("cod_unidade_atendimento", idunit);
    // body.append("tipo_pessoa", user.prof);
    // body.append("cpf_cnpj", user.cpf);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  saveRequest(mytoken: string, codServUnit: any){
    console.log('Mytoken in ListTasks',mytoken)
    console.log('Id Unit',codServUnit)
    // return this.nativeHttp.post(this.api,{token:mytoken, cod_servico_unidade:codServUnit, key_app:this.key, acao:16}, {
    //   'Content-Type':'application/json'
    // })
    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 16;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("cod_servico_unidade", codServUnit);
    // body.append("cpf_cnpj", user.cpf);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  listRequests(mytoken: string, dt_ini: string, dt_fin: string){
    console.log('Mytoken in ListRequests',mytoken)
    console.log('dt_ini',dt_ini)
    console.log('dt_fin',dt_fin)
    let dtini = '';
    let dtfin = ''
    if(dt_ini !== null){
      let dtini = dt_ini
    }
    if(dt_fin !== null){
      let dtfin = dt_fin
    }
    
    // return this.nativeHttp.post(this.api,{token:mytoken, dt_solicitacao_ini: dtini, dt_solicitacao_fin: dtfin, key_app:this.key, acao:17}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 17;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("dt_solicitacao_ini", dtini);
    body.append("dt_solicitacao_fin", dtfin);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })

  }

  listSchedules(mytoken: string, dt_ini: string, dt_fin: string){
    console.log('Mytoken in ListRequests',mytoken)
    console.log('dt_ini',dt_ini)
    console.log('dt_fin',dt_fin)
    let dtini = '';
    let dtfin = ''
    if(dt_ini !== null){
      dtini = dt_ini
    }
    if(dt_fin !== null){
      dtfin = dt_fin
    }
    
    // return this.nativeHttp.post(this.api,{token:mytoken, dt_solicitacao_ini: dtini, dt_solicitacao_fin: dtfin, key_app:this.key, acao:7}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 7;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("dt_solicitacao_ini", dtini);
    body.append("dt_solicitacao_fin", dtfin);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })

  }

  loadInspect(mytoken: string, cod_sol: any){
    // console.log('Mytoken in ListTasks',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken, cod_solicitacao: cod_sol, key_app:this.key, acao:18}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 100;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
     body.append("nr_os", cod_sol);
    // body.append("dt_solicitacao_fin", dtfin);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  loadTecnicalManager(mytoken: string){
    // console.log('Mytoken in ListTasks',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken, cod_solicitacao: cod_sol, key_app:this.key, acao:18}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 30;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    //  body.append("nr_os", cod_sol);
    // body.append("dt_solicitacao_fin", dtfin);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  cancelSolicitacao(cod_sol: any, mytoken: string){
    console.log('Mytoken in ListTasks',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken, cod_solicitacao: cod_sol, key_app:this.key, acao:21}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 21;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
     body.append("cod_solicitacao", cod_sol);
    // body.append("dt_solicitacao_fin", dtfin);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  finalSolicitacao(cod_sol: any, mytoken: string){
    console.log('Mytoken in ListTasks',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken, cod_solicitacao: cod_sol, key_app:this.key, acao:21}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 31;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
     body.append("cod_solicitacao", cod_sol);
    // body.append("dt_solicitacao_fin", dtfin);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  getDistricts(mytoken: string){
    console.log('Mytoken in getDistricts',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken, cod_solicitacao: cod_sol, key_app:this.key, acao:21}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 23;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    //body.append("cod_solicitacao", cod_sol);
    // body.append("dt_solicitacao_fin", dtfin);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  getCityes(mytoken: string, cod_estado: any){
    console.log('Mytoken in getCityes',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken, cod_solicitacao: cod_sol, key_app:this.key, acao:21}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 25;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("cod_estado", cod_estado);
    // body.append("dt_solicitacao_fin", dtfin);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  getCardHash(card:any){
    // return this.nativeHttp.post('nativeHttps://vivasvistorias.com.br/site/card_hash.php',{name: card.tit, card_num: card.num, month:card.mes,year:card.ano, cvv:card.cvv},{
    //   'Content-Type':'application/json'
    // })
  }

  payment(card: any,adress: any,mytoken: string, cod_sol: number, nome: string){
    console.log('Mytoken in Payment',mytoken)
    let est = adress.uf;
    let cit = adress.cidade;
    let bai = adress.bairro;
    let end = adress.endereco;
    let num = adress.numero;
    let cep = adress.cep;
    let com = adress.complemento;
    // return this.nativeHttp.post(this.api,{
    //   token:mytoken, 
    //   cod_solicitacao: cod_sol, 
    //   key_app:this.key, 
    //   acao:22,
    //   nome: nome,
    //   estado: est,
    //   cidade: cit,
    //   bairro: bai,
    //   endereco: end,
    //   complemento: com,
    //   numero: num,
    //   cep: cep,
    //   card_hash: card}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 17;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("nome", nome);
    body.append("estado", est);
    body.append("cidade", cit);
    body.append("bairro", bai);
    body.append("endereco", end);
    body.append("complemento", com);
    body.append("cep", cep);
    body.append("card_hash", card);
    

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  createBoleto(placa: string, cpf: string, mytoken){
    console.log('Mytoken in GetBoletos',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken,cpf_cnpj: cpf, placa_veiculo: placa, key_app:this.key, acao:201}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 202;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("cpf_cnpj", cpf);
    body.append("placa_veiculo", placa);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }

  createInspect(vistoria: any, prestador: any, veiculo: any, mytoken){
    
    //console.log('Mytoken in CreateInspect',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken,cpf_cnpj: cpf, placa_veiculo: placa, key_app:this.key, acao:201}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 205;
    let cred = 31;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("vistoria", JSON.stringify(vistoria));
    body.append("prestador", JSON.stringify(prestador));
    body.append("veiculo", JSON.stringify(veiculo));
    body.append("credenciada", JSON.stringify(cred));
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
  }


  getBoletos(placa: string, cpf: string, mytoken){
    
    console.log('Mytoken in GetBoletos',mytoken)
    // return this.nativeHttp.post(this.api,{token:mytoken,cpf_cnpj: cpf, placa_veiculo: placa, key_app:this.key, acao:201}, {
    //   'Content-Type':'application/json'
    // })

    let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 201;
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
     body.append("cpf_cnpj", cpf);
    body.append("placa_veiculo", placa);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
}

getBolInfo(ref:any, anoRef: any){
  console.log('Ref',ref)
  console.log('Ano Ref',anoRef)
  // return this.nativeHttp.post(this.api,{numero_referencia: ref, ano_referencia: anoRef, key_app:this.key, acao:204}, {
  //   'Content-Type':'application/json'
  // })

  let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 204;
    body.append("numero_referencia", ref);
    body.append("key_app", this.key);
    body.append("acao", acao);
     body.append("ano_referencia", anoRef);
    // body.append("dt_solicitacao_fin", dtfin);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
}

getSchedules(request: any, mytoken: string){
  // console.log('Ref',ref)
  // console.log('Ano Ref',anoRef)
  // return this.nativeHttp.post(this.api,{numero_referencia: ref, ano_referencia: anoRef, key_app:this.key, acao:204}, {
  //   'Content-Type':'application/json'
  // })

  let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 103;
    const datepipe: DatePipe = new DatePipe('en-US')
    let dataini = datepipe.transform(request.dt_ini, 'dd/MM/yyyy')
    let datafin = datepipe.transform(request.dt_fin, 'dd/MM/yyyy')
    body.append("token", mytoken);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("cod_sys_usuario", request.cod_user);
    body.append("status_solicitacao", request.status);
    body.append("dt_solicitacao_ini", dataini);
    body.append("dt_solicitacao_fin", datafin);
    body.append("cod_unidade_atendimento", request.unit);
    body.append("cod_servico_unidade", request.service);
    body.append("tipo_pessoa", request.person);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
}

createSchedule(mytoken: string, data: string, placa: string, cod_sol: any){
  console.log('Data',data)
  console.log('Placa',placa)
  console.log('Solicitacao',cod_sol)
  // return this.nativeHttp.post(this.api,{numero_referencia: ref, ano_referencia: anoRef, key_app:this.key, acao:204}, {
  //   'Content-Type':'application/json'
  // })

  let headers = new Headers();
    headers.append('Content-type' , 'application/x-www-form-urlencoded');

    let options = new RequestOptions({headers: headers});
    let body = new URLSearchParams();
    let acao: any = 6;
    body.append("token", mytoken);
    body.append("placa_veiculo", placa);
    body.append("key_app", this.key);
    body.append("acao", acao);
    body.append("dt_agendada", data);
    body.append("cod_solicitacao", cod_sol);
    // body.append("nome", user.nome);
    // body.append("telefone", user.phone);
    // body.append("email", user.email);
    // body.append("login", user.login);
    // body.append("senha", user.senha);

    return new Promise((resolve,reject) => {this.angHttp.post(this.api, body, options).map(
      (res:Response)  => {
        
        
        return res.json();
      }
    ).subscribe(data => {
        resolve(data);
      }, err => {
          reject(err);
      })
   })
}

}
