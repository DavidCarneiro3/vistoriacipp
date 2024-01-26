const functions = require('firebase-functions');
const admin = require('firebase-admin');
const btoa = require('btoa');
const nodemailer = require('nodemailer');

const Utils = require('./util/utils.js');

// LINK DA AMC DEV
// COD CLIENTE DEV 
const URL_CENTRAL = `https://wszonaazuldsv.centralamc.com.br/transacao`;
const COD_CLIENTE = 62;

// LINK DA AMC PROD
// COD CLIENTE PROD

// const URL_CENTRAL = `https://wszonaazulprd.centralamc.com.br/transacao`;
// const COD_CLIENTE = 82;

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://parkfor-prod.firebaseio.com',
    // databaseURL: 'https://parkfor-prod.firebaseio.com'
});

const TRINTA_MIN = 30 * 60 * 1000;
const VINT25_MIN = 25 * 60 * 1000;
const VINTE_MIN = 20 * 60 * 1000;
const QUINZE_MIN = 15 * 60 * 1000;
const DEZ_MIN = 10 * 60 * 1000;
const CINCO_MIN = 5 * 60 * 1000;
const LIMITE_MIN = (60 * 1000) - 1;
const url_base = `ce/fortaleza/2018`;





const http = require("https");
const cors = require('cors')({ origin: true });

/**
 * URL da requisicao:
 * https://us-central1-parkfor-prod.cloudfunctions.net/requisicao_amc
 * https://us-central1-parkfor-prod.cloudfunctions.net/requisicao_amc?url=1&body=2&headers=3
 * https://us-central1-parkfor-prod.cloudfunctions.net/requisicao_amc?url=https://wszonaazulprd.centralamc.com.br/transacao&body="\n    <transacao>\n      <codigoDistribuidor>82</codigoDistribuidor>\n      <dataEnvio>2019-04-26T19:44:56</dataEnvio>\n      <tipo>1</tipo>\n      <idTransacaoDistribuidor>1540535637</idTransacaoDistribuidor>\n      <cnpj>05591991000148</cnpj>\n      <quantidadeCartoes>1</quantidadeCartoes>\n    </transacao>\n    "&headers={"authorization":"Basic ODI6NTJhMWY1MTljM2M4MjQwODRhNDk1ZTYxZWM2ZTk3ZmI=","content-type":"application/xml"}
 * 
 * https://github.com/mkatsoho/node-rest-client-alt
 * https://medium.com/@lgvalle/as-a-software-engineer-building-android-apps-i-inevitably-run-into-problems-with-server-apis-not-d28b25451507
 * https://ilikekillnerds.com/2017/05/enabling-cors-middleware-firebase-cloud-functions/
 * 
 */
exports.requisicao_amc = functions.https.onRequest((req, res) => {
    const q = req.query;

    if (q) {

        const _url = q.url;
        const _body = q.body;
        const _headers = JSON.parse(q.headers);

        Utils.sendPost(_url, _body, _headers,
            function (response) {
                cors(req, res, () => {
                    res.status(200).send(response)
                });
            }, function (error) {
                cors(req, res, () => {
                    res.status(200).send(error)
                });
            }
        );

    } else {
        const resposta = `
        <?xml version="1.0"?>
        <Resultado>
            <mensagem>ENVIE OS PARAMETROS OBRIGATORIOS</mensagem>
        </Resultado>
        `

        cors(req, res, () => {
            res.status(400).send(resposta.trim())
        });
    }

});


/**
 * Verifica os estacionamentos agendados e faz a requesição para a AMC para estacionar
 * URL DA REQUESIÇÃO => https://us-central1-parkfor-prod.cloudfunctions.net/estacionaAgendado
 */
exports.estacionaAgendado = functions
    .https.onRequest((request, response) => {
        const url_agendamento = `/agendamentos/${url_base}`;
        const auth = btoa(`${COD_CLIENTE}:${Utils.gerarCodigoAcesso(COD_CLIENTE)}`);
        const HEADERS = {
            'authorization': `Basic ${auth}`,
            'content-type': 'application/xml'
        }

        const promise = admin.database()
            .ref(url_agendamento)
            .once('value')

            .then(snapshot => {
                let agendados = [];
                snapshot.forEach(_snapshot => {
                    let item = _snapshot.val()
                    const { sucess } = item
                    if (!sucess) {
                        agendados.push(item);
                    }
                });

                return agendados
            })

            .then(agendados => {
                agendados.forEach(_agendado => {

                    const { hour, now } = Utils.generateDate()
                    // Manda uma requisição se a hora for certa
                    if (_agendado.time == parseInt(hour)) {
                        _agendado.dataEnvio = now;
                        const agendamentoID = _agendado.id;
                        const xml = Utils._makeXML(_agendado)

                        Utils.sendPost(`https://us-central1-parkfor-temp.cloudfunctions.net/requisicao_amc?url=${URL_CENTRAL}&body=${xml}&headers=${encodeURI(JSON.stringify(HEADERS))}`, '',
                            '',
                            function (response) {
                                response = Utils.parseHttpXmlResponse(response)
                                console.log(response)

                                const { sucesso } = response
                                if (sucesso) {

                                    const estacionado = Utils._makeComprovante(response, _agendado);
                                    const _item = { sucess: true }
                                    admin.database()
                                        .ref(`${url_agendamento}/${agendamentoID}`)
                                        .update(_item)


                                    admin.database().ref(`/estacionar/${url_base}/${_agendado.userID}/${estacionado.id}`)
                                        .update(estacionado)

                                } else {
                                    console.log('response false da AMC');
                                }
                            }, function (error) {
                                console.log(`algo deu errado , ${error}`);
                            }
                        )

                    }
                });
            });

        Promise.all([promise])
            .then(respo => {
                response.status(200).send(`Trigger realizando com sucesso`);
            })
            .catch(err => {
                response.status(500).send(`Erro executando a function ${err}`);
            })
    })

/**
 * URL da requisicao:
 * https://us-central1-parkfor-temp.cloudfunctions.net/checaEstacionamento
 * 
 */
exports.checaEstacionamento = functions.https.onRequest((req, res) => {
    const url_estacionar = `/estacionar/${url_base}`;

    const promise1 = admin.database()
        .ref(url_estacionar)
        .once("value")

        .then(snapshot => {
            let arr = [];
            snapshot.forEach(_snapshot => {
                let _item = _snapshot.val();
                Object.keys(_item).forEach(key => _item[key].user_id = _snapshot.key); // salva o id do usuario no obj estacionamento
                arr.push(_item);
            });
            return arr;
        })

        .then(arr => {

            arr.forEach(_dtHoraObj => {
                Object.keys(_dtHoraObj).forEach(key => {
                    let _dtHoraVal = _dtHoraObj[key];

                    if (_dtHoraVal.status === true) { // Somente os veiculos que estao estacionados no momento
                        const offset = -3; // realiza o timezone para obter a hora no brasil
                        const dataHoraRegistro = new Date(Date.now() + (3600000 * offset));
                        const dataHoraFim = new Date(_dtHoraVal.tempoEstacionado + (3600000 * offset));
                        const { user_id, comprovante, tempoComprado, qtd } = _dtHoraVal;
                        let podeRenovar = true

                        console.log('executando checkEstacionamento');
                        podeRenovar = tempoComprado !== 300 && qtd !== 2
                        const renovar = podeRenovar ? ', com a possibilidade de renovação!' : ', sem a possibilidade de renovação!'

                        const diff = dataHoraFim.getTime() - dataHoraRegistro.getTime();


                        if (diff >= TRINTA_MIN && diff <= (TRINTA_MIN + LIMITE_MIN)) {
                            console.log('faltando 30');
                            sendPushNotification(_dtHoraVal.user_id, url_base, '30 minutos restantes', `Faltam 30 minutos para expirar seu tempo de estacionamento ${renovar}`, 30);
                        }
                        else if (diff >= VINT25_MIN && diff <= (VINT25_MIN + LIMITE_MIN)) {
                            console.log('faltando 25');
                            sendPushNotification(_dtHoraVal.user_id, url_base, '25 minutos restantes', `Faltam 25 minutos para expirar seu tempo de estacionamento ${renovar}`, 25);
                        }
                        else if (diff >= VINTE_MIN && diff <= (VINTE_MIN + LIMITE_MIN)) {
                            console.log('faltando 20');
                            sendPushNotification(_dtHoraVal.user_id, url_base, '20 minutos restantes', `Faltam 20 minutos para expirar seu tempo de estacionamento ${renovar}`, 20);
                        }
                        else if (diff >= QUINZE_MIN && diff <= (QUINZE_MIN + LIMITE_MIN)) {
                            console.log('faltando 15');
                            sendPushNotification(_dtHoraVal.user_id, url_base, '15 minutos restantes', `Faltam 15 minutos para expirar seu tempo de estacionamento ${renovar}`, 15);
                        } else if (diff >= DEZ_MIN && diff <= (DEZ_MIN + LIMITE_MIN)) {
                            console.log('faltando 10');
                            sendPushNotification(_dtHoraVal.user_id, url_base, '10 minutos restantes', `Faltam 10 minutos para expirar seu tempo de estacionamento ${renovar}`, 10);

                        } else if (diff >= CINCO_MIN && diff <= (CINCO_MIN + LIMITE_MIN)) {
                            console.log('faltando 5');
                            sendPushNotification(_dtHoraVal.user_id, url_base, '5 minutos restantes', `Faltam 5 minutos para expirar seu tempo de estacionamento ${renovar}`, 5);

                        } else if (diff <= 0) {

                            sendPushNotification(_dtHoraVal.user_id, url_base, 'Tempo encerrado', 'Seu tempo de estacionamento acabou. Retire seu veículo pois ele se encontra em situação irregular e poderá ser autuado', 0);

                            const _item = { status: false };

                            admin.database()
                                .ref(`${url_estacionar}/${_dtHoraVal.user_id}/${key}`)
                                .update(_item);
                        }
                    }
                })
            })

            return arr;
        });

    res.set('Acess-Control-Allow-Origin', '*')
    Promise.all([promise1]).then((response) => {
        res.status(200).send(`Trigger realizada com sucesso ${new Date(Date.now())} `);
    })
        .catch(error => {
            res.status(500).send(`Algo deu errado ${error}`);
        });
});

function request(url) {
    return new Promise(function (fulfill, reject) {
        client.get(url, function (data, response) {
            fulfill(data)
        })
    })
}

function response(res, items, code) {
    res.set('Access-Control-Allow-Origin', '*');
    return res.status(code).send(items);
}

function sendPushNotification(idUser, _url, _title, _body, alerta) {
    const payload = {
        data: {
            title: _title,
            body: _body,
            image: 'icon'
        },
        notification: {
            title: _title,
            body: _body
        },
    };
    return admin.database()
        .ref(`/users/${_url}/${idUser}`)
        .once('value')
        .then(_userData => {
            const _user = _userData.val();

            const { notificationKey, name, configuracao } = _user;

            if (alerta === 30 && configuracao.alerta_30_minutos === true) {
                console.log('notificação de 30 minutos')
                return admin.messaging().sendToDevice(notificationKey, payload)
                    .then(response =>
                        console.log('response de 30 min', JSON.stringify(response))
                    )
                    .catch(err => console.log('erro de 30 min ', JSON.stringify(err)))
            }
            else if (alerta === 25 && configuracao.alerta_25_minutos === true) {
                console.log('notificação de 25 min')
                return admin.messaging().sendToDevice(notificationKey, payload)
                    .then(response =>
                        console.log('response de 25 min', JSON.stringify(response))
                    )
                    .catch(err => console.log('erro de 25 min ', JSON.stringify(err)))
            }
            else if (alerta === 20 && configuracao.alerta_20_minutos === true) {
                console.log('notificacao de 20 min')
                return admin.messaging().sendToDevice(notificationKey, payload)
                    .then(response =>
                        console.log('response de 20 min', JSON.stringify(response))
                    )
                    .catch(err => console.log('erro de 20 min ', JSON.stringify(err)))
            }
            else if (alerta === 15 && configuracao.alerta_15_minutos === true) {
                console.log('Notificacao de 15 minutos')
                return admin.messaging().sendToDevice(notificationKey, payload)
                    .then(response =>
                        console.log('response de 15 min', JSON.stringify(response))
                    )
                    .catch(err => console.log('erro de 15 min ', JSON.stringify(err)))
            } else if (alerta === 10 && configuracao.alerta_10_minutos === true) {
                console.log('notifcação de 10')
                return admin.messaging().sendToDevice(notificationKey ? notificationKey : '', payload)
                    .then(response =>
                        console.log('response de 10 min', JSON.stringify((response)))
                    )
                    .catch(err => console.log('erro de 10 min ', JSON.stringify(err)))

            } else if (alerta === 5 && configuracao.alerta_5_minutos === true) {
                console.log('notificação de 5 min')
                return admin.messaging().sendToDevice(notificationKey ? notificationKey : '', payload)
                    .then(response =>
                        console.log('response de 5 min', JSON.stringify(response))
                    )
                    .catch(err => console.log('erro de 5 min ', JSON.stringify(err)))

            } else if (alerta === 0) {
                return admin.messaging().sendToDevice(notificationKey ? notificationKey : '', payload)
                    .then(response =>
                        console.log('response de 0 min', JSON.stringify(response))
                    )
                    .catch(err => console.log('erro de 0 min ', JSON.stringify(err)))
            }
            return null;
        })
        .catch(e => console.log(e));
}

exports.calculaVagasEstacionadas = functions.database
    .ref('/estacionar/{uf}/{cidade}/{anoEdital}/{userId}/{estacionamentoId}')
    .onWrite((change, context) => {

        const uf = context.params.uf;
        const cidade = context.params.cidade;
        const anoEdital = context.params.anoEdital;

        // Obtem o item (no) atual escrito no firebase
        const original = change.after.val();

        const area_id = original.area_id;
        const setor_id = original.setor_id;

        const childsFromAnoEdital = change.after.ref.parent.parent;

        return childsFromAnoEdital
            .once("value")

            .then(snapshot => {

                const estacionamentoHistoricoObjArr = Utils.snapshotToArr(snapshot);
                const estacionamentoHistoricoArr = Utils.objToArr(estacionamentoHistoricoObjArr);

                const veiculosEstacionadosArr = estacionamentoHistoricoArr
                    .filter(_item => _item.area_id === area_id)
                    .filter(_item => _item.setor_id === setor_id)
                    .filter(_item => _item.status === true);

                const veiculosEstacionadosNormalArr = veiculosEstacionadosArr ?
                    veiculosEstacionadosArr.filter(_item => _item.categoria.toUpperCase() === 'normal'.toUpperCase()) : [];

                const veiculosEstacionadosDeficienteArr = veiculosEstacionadosArr ?
                    veiculosEstacionadosArr.filter(_item => _item.categoria.toUpperCase() === 'deficiente'.toUpperCase()) : [];

                const veiculosEstacionadosIdosoArr = veiculosEstacionadosArr ?
                    veiculosEstacionadosArr.filter(_item => _item.categoria.toUpperCase() === 'idoso'.toUpperCase()) : [];

                const veiculosEstacionadosCargaDescarga = veiculosEstacionadosArr ?
                    veiculosEstacionadosArr.filter(_item => _item.categoria.toUpperCase() === 'carga_descarga'.toUpperCase()) : [];

                const qtdNormalEstacionados = veiculosEstacionadosNormalArr.length;
                const qtdDeficienteEstacionados = veiculosEstacionadosDeficienteArr.length;
                const qtdIdosoEstacionados = veiculosEstacionadosIdosoArr.length;
                const qtdCargaDescargaEstacionados = veiculosEstacionadosCargaDescarga.length;

                const itemUpdate = {
                    qtd_normal_estacionados: qtdNormalEstacionados,
                    qtd_deficiente_estacionados: qtdDeficienteEstacionados,
                    qtd_idoso_estacionados: qtdIdosoEstacionados,
                    qtd_carga_descarga_estacionados: qtdCargaDescargaEstacionados
                };

                return itemUpdate;
            })

            // Atualiza a entidade
            .then(_item => {
                console.log(`/setores/${uf}/${cidade}/${anoEdital}/${area_id}/${setor_id}`, _item);
                return admin.database()
                    .ref(`/setores/${uf}/${cidade}/${anoEdital}/${area_id}/${setor_id}`)
                    .update(_item);
            })

            .catch(e => console.log(e));

    });

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'contatozonafacil@gmail.com',
        pass: 'Z0n@F@cil$3nh@'
    }
})

/**
 * https://us-central1-parkfor-temp.cloudfunctions.net/sendEmail
 * 
 * https://us-central1-parkfor-prod.cloudfunctions.net/sendEmail
 * 
 */
exports.sendEmail = functions.https.onRequest((req, res) => {

    res.set('Access-Control-Allow-Origin', '*') // CrossOrigin Error 

    const data = req.query.data;

    const comprovante = JSON.parse(data);
    const userEmail = comprovante.email;
    const assunto = comprovante.from == 'estacionar' ? "Comprovante de Estacionamento - " : "Comprovante de Pagamento -"

    const emailContent = Utils.makeComprovanteEmail(comprovante)

    console.log('conteudo do email', JSON.stringify(emailContent))

    const emailOptions = {
        from: 'ParkFor <contatozonafacil@gmail.com>',
        to: `${userEmail}`,
        subject: `${assunto} ParkFor`,
        html: `${emailContent}`
    };

    return transporter.sendMail(emailOptions, (err, info) => {
        if (err) {
            console.log('erro que deu ', err.response)
            res.status(200).send('OK')

        }
        res.status(200).send('OK')
    })
})


exports.sendPdv = functions.database
    .ref('/users/{uf}/{cidade}/{anoEdital}/{userId}/{pdvReg}')
    .onCreate((snap, context) => {
        const distribuidorCNPJ = 'CNPJ: 10.213.334/0001-05';
        const distribuidorRazaoSocial = ` PARKFOR ESTACIONAMENTOS SOLUÇÕES E SERVIÇOS EIRELI
        AV DESEMBRAGADOR MOREIRA, 2355, CEP: 60.170-002`;
        const site = 'http://www.parkfor.com.br/';
        const data = snap.val()
        snap.ref.parent.on('value', (snap) => {
            const field = snap.val()
            let html = ''
            html += `<h1>  Inscricao PDV  </h1>`
            html += `<h2>  Dados do Responsável:  </h2>`
            html += `<p>  Nome : ${field.name}  </p>`
            html += `<p>  Email: ${field.email}  </p>`
            html += `<p>  Telefone:${field.phone} </p>`
            html += `<h2>  Dados da Empresa  </h2>`
            html += `<p>  Cep da Empresa: ${data.cep} </p>`
            html += `<p>  Cnpj: ${data.cnpj} </p>`
            html += `<p>  Email da Empresa: ${data.empEmail} </p>`
            html += `<p>  Telefone da Empresa: ${data.empPhone} </p>`
            html += `<p>  Endereco da Empresa ${data.endereco} </p>`
            html += `<p>  Inscricao Municipal: ${data.insMun} </p>`
            html += `<p>  Modalidade escolhida: ${data.modalidade} </p>`
            html += ` <p>  Razao social: ${data.rSocial} </p>`
            html += `<div style='display:flex;flex-direction: row;'>
                        <div> <img  width="100px" height="100px" src="https://firebasestorage.googleapis.com/v0/b/parkfor-temp.appspot.com/o/logo-parkfor.png?alt=media&token=df86deca-9f9d-416a-8944-8aaf4fb21fb3"/> </div>
                        <div style = 'margin: 0 0 25px 5px; width:300px; '> 
                            <p style="margin:5px;">  ${distribuidorRazaoSocial}  </p>
                            <p style="margin:5px;">  ${distribuidorCNPJ}  </p> 
                            <a href="${site}"> ${site} </a>
                        </div>
                    </div>`


            let userHtml = ''
            userHtml += `<div>
                <p> 
                    Estamos enviando esse email confirmando o recebimento dos dados para
                    solicitação para cadastro de PDV. Em breve enviaremos outro email com 
                    a resposta sobre o seu cadastro.

                    Em caso de duvidas entrar em contato conosco pelos seguintes canais:
                </p> 
                <p> 
                    Email: contatozonafacil@gmail.com ou suporte@zonafacil.com.br 
                </p>

                <div style='display:flex;flex-direction: row;'>
                        <div> <img  width="100px" height="100px" src="https://firebasestorage.googleapis.com/v0/b/parkfor-temp.appspot.com/o/logo-parkfor.png?alt=media&token=df86deca-9f9d-416a-8944-8aaf4fb21fb3"/> </div>
                        <div style = 'margin: 0 0 25px 5px; width:300px; '> 
                            <p style="margin:5px;">  ${distribuidorRazaoSocial}  </p>
                            <p style="margin:5px;">  ${distribuidorCNPJ}  </p> 
                            <a href="${site}"> ${site} </a>
                        </div>
                </div>
            
            </div>`


            const emailOptions = {
                from: 'ParkFor <contatozonafacil@gmail.com>',
                to: 'suporte@parkfor.com.br',
                subject: `${"Cadastro PDV"} ParkFor`,
                html: `${html}`,
                attachments: [{ filename: 'doc.jpeg', content: Buffer.from(data.documento.split(",")[1], 'base64') }]
            };

            const UseremailOptions = {
                from: 'ParkFor <contatozonafacil@gmail.com>',
                to: `${field.email}`,
                subject: `${"Cadastro PDV"} ParkFor`,
                html: `${userHtml}`
            }


            transporter.sendMail(emailOptions, (err, info) => {
                if (err) {
                    console.log(error)
                }

                transporter.sendMail(UseremailOptions, (err, info) => {
                    if (err) {
                        console.log(error)
                    }
                })
            })

        })

    })

exports.reportProblem = functions.database
    .ref('/relatos/{uf}/{cidade}/{anoEdital}/{userId}/{relatoId}')
    .onWrite((change, context) => {
        const content = change.after.val()
        // const idRelato = context.params.relatoId
        const user = context.params.userId

        const { subject, message } = content;
        return admin.database().ref(`/users/ce/fortaleza/2018/${user}`)
            .once('value')
            .then(_userInfo => {
                const userDatas = _userInfo.val();
                const { email, name } = userDatas

                const emailOptions = {
                    from: `${name} ${email}`,
                    replyTo: `${email}`,
                    to: `suporte@parkfor.com.br`,
                    subject: `${subject}`,
                    html: `${message}`
                };

                return transporter.sendMail(emailOptions, (err, info) => {
                    err ? console.log('Não foi possivel encaminhar o e-mail') : console.log('Email encaminhado com sucesso', info)

                });
            }).catch(err => {
                console.log('Algo deu errado', err)
            })

    })