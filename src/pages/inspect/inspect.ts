import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the InspectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-inspect",
  templateUrl: "inspect.html",
})
export class InspectPage {
  r_transmissao_embreagem: any;
  r_transmissao_pedal_embreagem: any;
  r_transmissao_pedal_acelerador: any;
  r_direcao_direcao: any;
  r_direcao_sem_vazamento: any;
  r_suspensao_amortecedores: any;
  r_suspensao_bolsa_ar: any;
  r_suspensao_feixes_molas: any;
  r_suspensao_parafuso_v: any;
  r_suspensao_eixos: any;
  r_motor_carter: any;
  r_motor_lancamento_fumaca: any;
  r_motor_estrangulador: any;
  r_alimentacao_entrada_ar: any;
  r_alimentacao_comb_sem_vazamento: any;
  r_refrigeracao_radiador: any;
  r_refrigeracao_temperatura: any;
  r_eletrica_limpador: any;
  r_eletrica_contagiro: any;
  r_eletrica_partida: any;
  r_eletrica_alternador: any;
  r_eletrica_luzes_salao: any;
  r_eletrica_setas: any;
  r_eletrica_luzes_painel: any;
  r_eletrica_farol_alto: any;
  r_eletrica_farol_baixo: any;
  r_eletrica_buzina: any;
  r_eletrica_luzes_freio: any;
  r_eletrica_campainha: any;
  r_eletrica_luz_itinerario: any;
  r_rodagem_pneus_dimensoes: any;
  r_rodagem_pneus_bom_estado: any;
  r_rodagem_rodas_bom_estado: any;
  r_rodagem_stepe_bom_estado: any;
  r_freios_compressor: any;
  r_freios_sem_vazamento: any;
  r_freios_estacionamento: any;
  r_freios_reserv_oleo: any;
  r_freios_pedal: any;
  r_freios_comp_discos: any;
  r_layout_tacografo: any;
  r_layout_nome_motorista: any;
  r_layout_preco_passagens: any;
  r_layout_cap_lotacao: any;
  r_layout_telefone_arce: any;
  r_layout_origem_destino: any;
  r_layout_nr_ordem: any;
  r_layout_pintura_padronizada: any;
  r_layout_logotipo_arce: any;
  r_layout_letreiro_tur_contratante: any;
  r_layout_ar_condicionado: any;
  r_layout_banheiro: any;
  r_layout_saida_emergencia: any;
  r_layout_martelo_emergencia: any;
  r_layout_extintor: any;
  r_layout_wifi: any;
  r_carroceria_retrovisores: any;
  r_carroceria_degraus: any;
  r_carroceria_janelas: any;
  r_carroceria_poltronas: any;
  r_carroceria_mec_poltrona: any;
  r_carroceria_tranca_bagagem: any;
  r_carroceria_para_choques: any;
  r_carroceria_para_brisas: any;
  r_carroceria_laterais: any;
  r_carroceria_dianteira_traseira: any;
  r_carroceria_descanso_pes: any;
  r_carroceria_porta_trancando: any;
  r_carroceria_puxador_emergencia: any;
  r_carroceria_quebra_sol: any;
  r_carroceria_porta_embrulhos: any;
  r_carroceria_cortina_divisoria: any;
  r_carroceria_macaco: any;
  r_carroceria_chave_rodas: any;
  r_carroceria_triangulo: any;
  r_carroceria_vidraca_lateral: any;
  r_carroceria_cinto_motorista: any;
  r_carroceria_cinto_passageiro: any;
  r_carroceria_luz_placa: any;
  r_carroceria_luz_freio: any;
  r_acessibilidade_rampa: any;
  r_acessibilidade_cadeira_transbordo: any;
  r_acessibilidade_letreiro: any;
  r_acessibilidade_plataforma: any;
  r_acessibilidade_espaco_cadeirante: any;
  r_cobranca_catraca: any;
  r_cobranca_validador: any;
  langForm;
  cod_sol: any;
  token: string;
  requestData: any;
  name: string;
  place;
  managers: [];
  foto_frente: any;
  foto_traseira: any;
  foto_leteral1: any;
  foto_lateral2: any;
  foto_interna1: any;
  foto_interna2: any;
  prestador = {
    nome: "",
    cpf: "",
    cnh: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    endereco: {
      uf: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      numero: "",
      complemento: "",
      cep: "",
    },
  };
  obj_vistoria = {
    aliquota: "",
    aliquota_cofins: "",
    aliquota_csl: "",
    aliquota_ir:  "",
    aliquota_pis : "",
    nr_os:"",
    veiculo_tipo:"",
    transportadora_nome:"",
    transportadora_cnpj:"",
    placa:"",
    nr_ordem:"",
    renavam:"",
    chassi:"",
    cor:"",
    combustivel:"",
    area_livre:"",
    pass_em_pe:"",
    pass_sentados:"",
    capacidade_total_pass:"",
    fabricante_modelo_chassi:"",
    fabricante_modelo_carroceria:"",
    ano_modelo:"",
    pot_cil:"",
    ano_encarrocamento:"",
    servico_complementar:"",
    area_operacao:"",
    tacografo_ano:"",
    tacografo_modelo:"",
    tacografo_marca:"",
    tacografo_numero:"",
    foto_veiculo_frente:"",
    foto_veiculo_traseira:"",
    foto_veiculo_lateral1:"",
    foto_veiculo_lateral2:"",
    foto_veiculo_interna1:"",
    foto_veiculo_interna2:"",
    r_transmissao_embreagem:"",
    r_transmissao_pedal_embreagem:"",
    r_transmissao_pedal_acelerador:"",
    r_direcao_direcao:"",
    r_direcao_sem_vazamento:"",
    r_suspensao_amortecedores:"",
    r_suspensao_bolsa_ar:"",
    r_suspensao_feixes_molas:"",
    r_suspensao_parafuso_v:"",
    r_suspensao_eixos:"",
    r_motor_carter:"",
    r_motor_lancamento_fumaca:"",
    r_motor_estrangulador:"",
    r_alimentacao_entrada_ar:"",
    r_alimentacao_comb_sem_vazamento:"",
    r_refrigeracao_radiador:"",
    r_refrigeracao_temperatura:"",
    r_eletrica_limpador:"",
    r_eletrica_contagiro:"",
    r_eletrica_partida:"",
    r_eletrica_alternador:"",
    r_eletrica_luzes_salao:"",
    r_eletrica_setas:"",
    r_eletrica_luzes_painel:"",
    r_eletrica_farol_alto:"",
    r_eletrica_farol_baixo:"",
    r_eletrica_buzina:"",
    r_eletrica_luzes_freio:"",
    r_eletrica_campainha:"",
    r_eletrica_luz_itinerario:"",
    r_rodagem_pneus_dimensoes:"",
    r_rodagem_pneus_bom_estado:"",
    r_rodagem_rodas_bom_estado:"",
    r_rodagem_stepe_bom_estado:"",
    r_freios_compressor:"",
    r_freios_sem_vazamento:"",
    r_freios_estacionamento:"",
    r_freios_reserv_oleo:"",
    r_freios_pedal:"",
    r_freios_comp_discos:"",
    r_layout_tacografo:"",
    r_layout_nome_motorista:"",
    r_layout_preco_passagens:"",
    r_layout_cap_lotacao:"",
    r_layout_telefone_arce:"",
    r_layout_origem_destino:"",
    r_layout_nr_ordem:"",
    r_layout_pintura_padronizada:"",
    r_layout_logotipo_arce:"",
    r_layout_letreiro_tur_contratante:"",
    r_layout_ar_condicionado:"",
    r_layout_banheiro:"",
    r_layout_saida_emergencia:"",
    r_layout_martelo_emergencia:"",
    r_layout_extintor:"",
    r_layout_wifi:"",
    r_carroceria_retrovisores:"",
    r_carroceria_degraus:"",
    r_carroceria_janelas:"",
    r_carroceria_poltronas:"",
    r_carroceria_mec_poltrona:"",
    r_carroceria_tranca_bagagem:"",
    r_carroceria_para_choques:"",
    r_carroceria_para_brisas:"",
    r_carroceria_laterais:"",
    r_carroceria_dianteira_traseira:"",
    r_carroceria_descanso_pes:"",
    r_carroceria_porta_trancando:"",
    r_carroceria_puxador_emergencia:"",
    r_carroceria_quebra_sol:"",
    r_carroceria_porta_embrulhos:"",
    r_carroceria_cortina_divisoria:"",
    r_carroceria_macaco:"",
    r_carroceria_chave_rodas:"",
    r_carroceria_triangulo:"",
    r_carroceria_vidraca_lateral:"",
    r_carroceria_cinto_motorista:"",
    r_carroceria_cinto_passageiro:"",
    r_carroceria_luz_placa:"",
    r_carroceria_luz_freio:"",
    dt_inspecao:"",
    dt_vencimento:"",
    responsavel_tecnico:"",
    art_vinculada:"",
    r_acessibilidade_rampa:"",
    r_acessibilidade_cadeira_transbordo:"",
    r_acessibilidade_letreiro:"",
    r_acessibilidade_plataforma:"",
    r_acessibilidade_espaco_cadeirante:"",
    r_cobranca_catraca:"",
    r_cobranca_validador:"",
  };
  vistoria = {
    r_transmissao_embreagem: true,
    r_transmissao_pedal_embreagem: true,
    r_transmissao_pedal_acelerador: true,
    cod_transportadora: null,
    cnpj_transportadora: "",
    transportadora_nome:"",
    aliquota: "",
    aliquota_cofins: "",
    aliquota_csl: "",
    aliquota_ir: "",
    aliquota_pis: "",
    ano_fabricacao: "",
    ano_fabricacao_carroceria: "",
    ano_modelo: "",
    ano_modelo_carroceria: "",
    ano_os: "",
    atestado_qualidade: "",
    bairro: "",
    capac_volumetrica_cilindro: "",
    capacidade_carga: "",
    carroceria: "",
    celular: "",
    cep: "",
    chassi: "",
    cilindrada: "",
    cipp_aplic_revest_interno: "",
    cipp_apto_transp_tanque_carga: "",
    cipp_apto_transportar: "",
    cipp_codigo_niev: "",
    cipp_data_construcao: "",
    cipp_data_inspecao: "0000-00-00",
    cipp_data_proxima_inspecao: "0000-00-00",
    cipp_data_rnc: null,
    cipp_data_vencimento: "0000-00-00",
    cipp_doc_inspecao: "",
    cipp_dt_inspecao: "0000-00-00",
    cipp_dt_proxima_inspecao: "0000-00-00",
    cipp_dt_venc_tanque_carga: "0000-00-00",
    cipp_dt_vencimento: "0000-00-00",
    cipp_esp_minima: null,
    cipp_fabr_equipamento: "",
    cipp_familia_tanque_carga: "",
    cipp_nome_inspetor: "",
    cipp_nome_resp_tecnico: "",
    cipp_nr: null,
    cipp_nr_cert_descontaminacao: "",
    cipp_nr_cert_inspecao_civ: "",
    cipp_nr_cipp_anterior: "",
    cipp_nr_compartimentos: "",
    cipp_nr_ctpp: "",
    cipp_nr_equip_tanque_carga: "",
    cipp_nr_equipamento: "",
    cipp_nr_lacre: "",
    cipp_nr_rnc: "",
    cipp_ocp: "",
    cipp_tipo_equipamento: "",
    cmt: "",
    cod_empresa: "",
    cod_escopo_sinav: "",
    combustivel: "",
    convertedora: "",
    cor: "",
    cpf_cgc_proprietario: "",
    cpf_solicitante: "",
    crlv: "",
    area_livre:"",
    area_operacao:"",
    data_abertura: "",
    data_cadastro_civ: null,
    data_cadastro_csv_denatran: null,
    data_cadastro_csv_inmetro: null,
    data_cadastro_csv_sinav: null,
    data_cadastro_oficio: null,
    data_comissao: "",
    data_desconto: null,
    data_inspecao_recebimento: null,
    data_pagamento: "",
    data_pagamento_pm: null,
    data_quitacao: null,
    data_termino: null,
    desc_lista_inspecao: "",
    descricao_escopo: "",
    dt_abertura: "",
    dt_desconto: null,
    dt_fabricacao_cilindro: "",
    dt_fabricacao_cilindro2: "",
    dt_fabricacao_cilindro3: "",
    dt_fabricacao_cilindro4: "",
    dt_termino: null,
    email: "",
    escopo: "",
    especie: "",
    externo: "",
    fone_solicitante: "",
    forma_pagamento: "",
    forma_pg_comissao: "",
    hr_abertura: "",
    hr_cadastro_civ: null,
    hr_cadastro_csv_denatran: null,
    hr_cadastro_csv_inmetro: null,
    hr_cadastro_csv_sinav: null,
    hr_cadastro_oficio: null,
    hr_desconto: null,
    hr_inspecao_recebimento: null,
    hr_pagamento: "",
    hr_painel: "",
    hr_quitacao: null,
    hr_termino: null,
    id_desconto_autorizado: null,
    id_despachante: "",
    id_escopo_servico: "",
    id_inspecao_recebimento: null,
    id_pagamento: "",
    id_tipo_servico: "",
    id_usu_desconto: null,
    id_usuario: "",
    id_usuario_inspecao: null,
    id_usuario_recebimento: null,
    info_painel: "",
    inscricao_estadual: "",
    inscricao_municipal: "",
    inspecao_maquina: "",
    inspecao_napro: "",
    login_abertura: null,
    logradouro: "",
    marca_carroceria: "",
    marca_cilindro1: "",
    marca_cilindro2: "",
    marca_cilindro3: "",
    marca_cilindro4: "",
    marca_modelo: "",
    mes_os: "",
    municipio: "",
    nc_obs_geral: null,
    nf_servico: "",
    servico_complementar: "",
    nome_despachante: "",
    nome_proprietario: "",
    nome_solicitante: "",
    nota_fiscal: "",
    nr_cilindro1: "",
    nr_cilindro2: "",
    nr_cilindro3: "",
    nr_cilindro4: "",
    nr_civ: null,
    nr_cri: "",
    nr_csv_denatran: null,
    nr_csv_inmetro: null,
    nr_csv_sinav: null,
    nr_lista_inspecao: "",
    nr_oficio_detran: null,
    nr_ordem: "",
    nr_os: "",
    nr_os_empresa: null,
    nr_prisma: "",
    num_carroceria: "",
    numero: "",
    obs_cancelamento: null,
    obs_desconto: null,
    obs_recebimento: null,
    obs_retorno: "",
    observacao: "",
    painel: "",
    pbt: "",
    placa_classificada: "",
    placa_nf: "",
    potencia: "",
    preferencial: "",
    protocolo_detran: null,
    qtd_atendimento: "",
    qtd_passageiros: "",
    red_marca: "",
    red_numero: "",
    renavam: "",
    restricao: "",
    reter_aliquota: "",
    reter_aliquota_cofins: "",
    reter_aliquota_csl: "",
    reter_aliquota_ir: "",
    reter_aliquota_pis: "",
    sequencial_cilindro1: "",
    sequencial_cilindro2: "",
    sequencial_cilindro3: "",
    sequencial_cilindro4: "",
    status: "",
    taco_aro: "",
    taco_marca: "",
    taco_modelo: "",
    taco_nr_serie: "",
    taco_pneu: "",
    tel_cel_despachante: "",
    tipo: "",
    tipo_alteracao: null,
    tipo_carroceria: "",
    tipo_inspecao: "",
    tipo_inspecao_desc: "",
    tipo_os: "",
    tipo_servico: "",
    uf: "",
    valor_comissao_fixo: "",
    valor_comissao_pg: "",
    valor_desconto: null,
    valor_desconto_pg: "",
    valor_inmetro: "",
    valor_promissoria_pg: "",
    valor_servico: "",
    valor_servico_pg: "",
    valor_total: "",
    valor_total_pg: "",
    vr_aliquota: "",
    vr_aliquota_cofins: "",
    vr_aliquota_csl: "",
    vr_aliquota_ir: "",
    vr_aliquota_pis: ""
  };
  veiculo = {
    placa: "",
    municipio: "",
    combustivel: "",
    tipoPintura: "",
    exercicioCrlv: "",
    certificadoCrlv: "",
    capacidadePassageiros: "",
  };
  service: any;
  num_requ: any;
  dt_requ: string;
  serv_value: any;
  status_req: any;
  hr_req: any;
  ufs: any;
  cityes: any;
  constructor(
    private storage: Storage,
    private dataservice: DataserviceProvider,
    public loading: LoadingController,
    public alert: AlertController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera
  ) {
    this.cod_sol = this.navParams.get("cod");
    console.log("request", this.cod_sol);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad InspectPage");
    this.storage.get("token").then((val) => {
      this.token = val;
      console.log("request Inspect Token", this.token);
      this.loadMangers(this.token);
      this.getRequest(this.token, this.cod_sol);
      this.getDistricts(this.token);
    });
  }

  getDistricts(token) {
    this.dataservice.getDistricts(token).then((data) => {
      let parse: any = data;
      console.log("UFs", parse);
      this.ufs = parse.RDATA;
    });
  }

  getRequest(token, cod) {
    const loader = this.loading.create({
      content: "Carregando...",
    });
    loader.present();
    this.dataservice.loadInspect(token, cod).then((data) => {
      let parse: any = data;
      console.log("Parse", parse);
      this.vistoria = Object.assign(parse.RDATA);
      console.log("Parse", this.vistoria);
      this.obj_vistoria.aliquota = this.vistoria.aliquota;
      this.obj_vistoria.aliquota_cofins = this.vistoria.aliquota_cofins;
      this.obj_vistoria.aliquota_csl = this.vistoria.aliquota_csl;
      this.obj_vistoria.aliquota_ir = this.vistoria.aliquota_ir;
      this.obj_vistoria.aliquota_pis = this.vistoria.aliquota_pis;
      this.obj_vistoria.ano_modelo = this.vistoria.ano_modelo;
      this.obj_vistoria.pot_cil = this.vistoria.potencia+"/"+this.vistoria.cilindrada;
      this.obj_vistoria.placa = this.vistoria.placa_nf;
      this.obj_vistoria.veiculo_tipo = this.vistoria.tipo;
      this.obj_vistoria.nr_ordem = this.vistoria.nr_ordem;
      this.obj_vistoria.renavam = this.vistoria.renavam;
      this.obj_vistoria.chassi = this.vistoria.chassi;
      this.obj_vistoria.cor = this.vistoria.cor;
      this.obj_vistoria.combustivel = this.vistoria.combustivel;
      this.obj_vistoria.combustivel = this.vistoria.combustivel;

      loader.dismiss();
    });
  }

  onChangeHandler(event: string) {
    console.log(event);
  }

  loadMangers(token){
    this.dataservice.loadTecnicalManager(token).then((data) => {
      let parse: any = data;
      console.log("Parse managers", parse);
      this.managers = parse.RDATA;
      console.log("Parse managers data", parse.RDATA);
    })
  }

  showManger(token){
    this.dataservice.loadTecnicalManager(token).then((data) => {
      let parse: any = data;
      console.log("Parse managers", parse);
      this.managers = parse.RDATA;
      console.log("Parse managers data", parse.RDATA);
    })
  }

  onChange(opt) {
    console.log(opt);
    this.dataservice.getCityes(this.token, opt.cod_estado).then((data) => {
      let parse: any = data;
      this.cityes = parse.RDATA;
      console.log("Cidades", this.cityes);
    });
  }

  itemReview(item){
    console.log("item",item);
  }

  sendInspect(prestador, veiculo, vistoria) {
    console.log("Prestador", prestador);
    console.log("Veículo", veiculo);
    console.log("Vistoria", vistoria);
    this.dataservice
      .createInspect(vistoria, prestador, veiculo, this.token)
      .then((data) => {
        let parse: any = data;
        console.log(parse);
      });
  }

  openFrente() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Envie sua imagem',
      buttons: [
        {
          text: 'Tirar Foto',
          
          handler: () => {
            this.openCamera()
            console.log('Destructive clicked');
          }
        },{
          text: 'Buscar na Galeria',
          handler: () => {
            this.openGallery()
            console.log('Archive clicked');
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_frente = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_frente = 'data:image/jpeg;base64,' + imageData;
     console.log('foto_frente',this.foto_frente)
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openTraseira() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Envie sua imagem',
      buttons: [
        {
          text: 'Tirar Foto',
          
          handler: () => {
            this.openCameraTraseira()
            console.log('Destructive clicked');
          }
        },{
          text: 'Buscar na Galeria',
          handler: () => {
            this.openGalleryTraseira()
            console.log('Archive clicked');
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCameraTraseira(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_traseira = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGalleryTraseira(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_traseira = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openLateral1() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Envie sua imagem',
      buttons: [
        {
          text: 'Tirar Foto',
          
          handler: () => {
            this.openCameraLateral1()
            console.log('Destructive clicked');
          }
        },{
          text: 'Buscar na Galeria',
          handler: () => {
            this.openGalleryLateral1()
            console.log('Archive clicked');
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCameraLateral1(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_leteral1 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGalleryLateral1(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_leteral1 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openLateral2() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Envie sua imagem',
      buttons: [
        {
          text: 'Tirar Foto',
          
          handler: () => {
            this.openCameraLateral2()
            console.log('Destructive clicked');
          }
        },{
          text: 'Buscar na Galeria',
          handler: () => {
            this.openGalleryLateral2()
            console.log('Archive clicked');
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCameraLateral2(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_lateral2 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGalleryLateral2(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_lateral2 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openInterna1() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Envie sua imagem',
      buttons: [
        {
          text: 'Tirar Foto',
          
          handler: () => {
            this.openCameraInterna1()
            console.log('Destructive clicked');
          }
        },{
          text: 'Buscar na Galeria',
          handler: () => {
            this.openGalleryInterna1()
            console.log('Archive clicked');
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCameraInterna1(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_interna1 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGalleryInterna1(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_interna2 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openInterna2() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Envie sua imagem',
      buttons: [
        {
          text: 'Tirar Foto',
          
          handler: () => {
            this.openCameraInterna2()
            console.log('Destructive clicked');
          }
        },{
          text: 'Buscar na Galeria',
          handler: () => {
            this.openGalleryInterna2()
            console.log('Archive clicked');
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCameraInterna2(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_interna2 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGalleryInterna2(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_interna2 = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  
}
