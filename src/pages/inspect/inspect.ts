import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormControl } from '@angular/forms';
import { ControlPage } from '../control/control';
import { Geolocation } from '@ionic-native/geolocation';

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
  // addTextToImage(text: string) {
  //   const canvas: HTMLCanvasElement = this.canvas.nativeElement;
  //   const context = canvas.getContext('2d');

  //   const image = new Image();
  //   image.src = this.capturedImage.toString();
  //   image.onload = () => {
  //     canvas.width = image.width;
  //     canvas.height = image.height;

  //     // Desenha a imagem
  //     context.drawImage(image, 0, 0);

  //     // Adiciona texto
  //     context.font = '20px Arial';
  //     context.fillStyle = 'white';
  //     context.fillText(text, 20, 40); // Ajuste a posição conforme necessário
  //   };
  // }
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
  foto_lateral1: any;
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
    ano_encarrocamento:"",
    servico_complementar:"",
    area_operacao:"",
    art_vinculada:"",
    taco_ano:"",
    taco_modelo:"",
    tacografo_marca:"",
    tacografo_numero:"",
    foto_veiculo_frente:"",
    foto_veiculo_traseira:"",
    foto_veiculo_lateral1:"",
    foto_veiculo_lateral2:"",
    foto_veiculo_interna1:"",
    foto_veiculo_interna2:"",
    r_transmissao_embreagem:"SIM",
    r_transmissao_pedal_embreagem:"SIM",
    r_transmissao_pedal_acelerador:"SIM",
    r_direcao_direcao:"SIM",
    r_direcao_sem_vazamento:"SIM",
    r_suspensao_amortecedores:"SIM",
    r_suspensao_bolsa_ar:"SIM",
    r_suspensao_feixes_molas:"SIM",
    r_suspensao_parafuso_v:"SIM",
    r_suspensao_eixos:"SIM",
    r_motor_carter:"SIM",
    r_motor_lancamento_fumaca:"SIM",
    r_motor_estrangulador:"SIM",
    r_alimentacao_entrada_ar:"SIM",
    r_alimentacao_comb_sem_vazamento:"SIM",
    r_refrigeracao_radiador:"SIM",
    r_refrigeracao_temperatura:"SIM",
    r_eletrica_limpador:"SIM",
    r_eletrica_contagiro:"SIM",
    r_eletrica_partida:"SIM",
    r_eletrica_alternador:"SIM",
    r_eletrica_luzes_salao:"SIM",
    r_eletrica_setas:"SIM",
    r_eletrica_luzes_painel:"SIM",
    r_eletrica_farol_alto:"SIM",
    r_eletrica_farol_baixo:"SIM",
    r_eletrica_buzina:"SIM",
    r_eletrica_luzes_freio:"SIM",
    r_eletrica_campainha:"SIM",
    r_eletrica_luz_itinerario:"SIM",
    r_rodagem_pneus_dimensoes:"SIM",
    r_rodagem_pneus_bom_estado:"SIM",
    r_rodagem_rodas_bom_estado:"SIM",
    r_rodagem_stepe_bom_estado:"SIM",
    r_freios_compressor:"SIM",
    r_freios_sem_vazamento:"SIM",
    r_freios_estacionamento:"SIM",
    r_freios_reserv_oleo:"SIM",
    r_freios_pedal:"SIM",
    r_freios_comp_discos:"SIM",
    r_layout_tacografo:"SIM",
    r_layout_nome_motorista:"SIM",
    r_layout_preco_passagens:"SIM",
    r_layout_cap_lotacao:"SIM",
    r_layout_telefone_arce:"SIM",
    r_layout_origem_destino:"SIM",
    r_layout_nr_ordem:"SIM",
    r_layout_pintura_padronizada:"SIM",
    r_layout_logotipo_arce:"SIM",
    r_layout_letreiro_tur_contratante:"SIM",
    r_layout_ar_condicionado:"SIM",
    r_layout_banheiro:"SIM",
    r_layout_saida_emergencia:"SIM",
    r_layout_martelo_emergencia:"SIM",
    r_layout_extintor:"SIM",
    r_layout_wifi:"SIM",
    r_carroceria_retrovisores:"SIM",
    r_carroceria_degraus:"SIM",
    r_carroceria_janelas:"SIM",
    r_carroceria_poltronas:"SIM",
    r_carroceria_mec_poltrona:"SIM",
    r_carroceria_tranca_bagagem:"SIM",
    r_carroceria_para_choques:"SIM",
    r_carroceria_para_brisas:"SIM",
    r_carroceria_laterais:"SIM",
    r_carroceria_dianteira_traseira:"SIM",
    r_carroceria_descanso_pes:"SIM",
    r_carroceria_porta_trancando:"SIM",
    r_carroceria_puxador_emergencia:"SIM",
    r_carroceria_quebra_sol:"SIM",
    r_carroceria_porta_embrulhos:"SIM",
    r_carroceria_cortina_divisoria:"SIM",
    r_carroceria_macaco:"SIM",
    r_carroceria_chave_rodas:"SIM",
    r_carroceria_triangulo:"SIM",
    r_carroceria_vidraca_lateral:"SIM",
    r_carroceria_cinto_motorista:"SIM",
    r_carroceria_cinto_passageiro:"SIM",
    r_carroceria_luz_placa:"SIM",
    r_carroceria_luz_freio:"SIM",
    dt_inspecao:"",
    dt_vencimento:"",
    responsavel_tecnico:"",
    r_acessibilidade_rampa:"SIM",
    r_acessibilidade_cadeira_transbordo:"SIM",
    r_acessibilidade_letreiro:"SIM",
    r_acessibilidade_plataforma:"SIM",
    r_acessibilidade_espaco_cadeirante:"SIM",
    r_cobranca_catraca:"DIANTEIRA",
    r_cobranca_validador:"DIANTEIRA",
    gps_foto_frente: 0,
    gps_foto_traseira: 0,
    gps_foto_lateral1: 0,
    gps_foto_lateral2: 0,
    gps_foto_interna1: 0,
    gps_foto_interna2: 0
  };
  vistoria = {
    r_transmissao_embreagem: "SIM",
    r_transmissao_pedal_embreagem: "SIM",
    r_transmissao_pedal_acelerador: "SIM",
    cod_transportadora: null,
    cnpj_transportadora: "",
    transportadora_nome:"",
    aliquota: "",
    aliquota_cofins: "",
    aliquota_csl: "",
    aliquota_ir: "",
    aliquota_pis: "",
    art_vinculada: "",
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
    passageiros_em_pe: "",
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
    vr_aliquota_pis: "",
    foto_frente: null,
    foto_traseira: null,
    foto_lateral1: null,
    foto_lateral2: null,
    foto_interna1: null,
    foto_interna2: null,
    r_direcao_direcao:"SIM",
    r_direcao_sem_vazamento:"SIM",
    r_suspensao_amortecedores:"SIM",
    r_suspensao_bolsa_ar:"SIM",
    r_suspensao_feixes_molas:"SIM",
    r_suspensao_parafuso_v:"SIM",
    r_suspensao_eixos:"SIM",
    r_motor_carter:"SIM",
    r_motor_lancamento_fumaca:"SIM",
    r_motor_estrangulador:"SIM",
    r_alimentacao_entrada_ar:"SIM",
    r_alimentacao_comb_sem_vazamento:"SIM",
    r_refrigeracao_radiador:"SIM",
    r_refrigeracao_temperatura:"SIM",
    r_eletrica_limpador:"SIM",
    r_eletrica_contagiro:"SIM",
    r_eletrica_partida:"SIM",
    r_eletrica_alternador:"SIM",
    r_eletrica_luzes_salao:"SIM",
    r_eletrica_setas:"SIM",
    r_eletrica_luzes_painel:"SIM",
    r_eletrica_farol_alto:"SIM",
    r_eletrica_farol_baixo:"SIM",
    r_eletrica_buzina:"SIM",
    r_eletrica_luzes_freio:"SIM",
    r_eletrica_campainha:"SIM",
    r_eletrica_luz_itinerario:"SIM",
    r_rodagem_pneus_dimensoes:"SIM",
    r_rodagem_pneus_bom_estado:"SIM",
    r_rodagem_rodas_bom_estado:"SIM",
    r_rodagem_stepe_bom_estado:"SIM",
    r_freios_compressor:"SIM",
    r_freios_sem_vazamento:"SIM",
    r_freios_estacionamento:"SIM",
    r_freios_reserv_oleo:"SIM",
    r_freios_pedal:"SIM",
    r_freios_comp_discos:"SIM",
    r_layout_tacografo:"SIM",
    r_layout_nome_motorista:"SIM",
    r_layout_preco_passagens:"SIM",
    r_layout_cap_lotacao:"SIM",
    r_layout_telefone_arce:"SIM",
    r_layout_origem_destino:"SIM",
    r_layout_nr_ordem:"SIM",
    r_layout_pintura_padronizada:"SIM",
    r_layout_logotipo_arce:"SIM",
    r_layout_letreiro_tur_contratante:"SIM",
    r_layout_ar_condicionado:"SIM",
    r_layout_banheiro:"SIM",
    r_layout_saida_emergencia:"SIM",
    r_layout_martelo_emergencia:"SIM",
    r_layout_extintor:"SIM",
    r_layout_wifi:"SIM",
    r_carroceria_retrovisores:"SIM",
    r_carroceria_degraus:"SIM",
    r_carroceria_janelas:"SIM",
    r_carroceria_poltronas:"SIM",
    r_carroceria_mec_poltrona:"SIM",
    r_carroceria_tranca_bagagem:"SIM",
    r_carroceria_para_choques:"SIM",
    r_carroceria_para_brisas:"SIM",
    r_carroceria_laterais:"SIM",
    r_carroceria_dianteira_traseira:"SIM",
    r_carroceria_descanso_pes:"SIM",
    r_carroceria_porta_trancando:"SIM",
    r_carroceria_puxador_emergencia:"SIM",
    r_carroceria_quebra_sol:"SIM",
    r_carroceria_porta_embrulhos:"SIM",
    r_carroceria_cortina_divisoria:"SIM",
    r_carroceria_macaco:"SIM",
    r_carroceria_chave_rodas:"SIM",
    r_carroceria_triangulo:"SIM",
    r_carroceria_vidraca_lateral:"SIM",
    r_carroceria_cinto_motorista:"SIM",
    r_carroceria_cinto_passageiro:"SIM",
    r_carroceria_luz_placa:"SIM",
    r_carroceria_luz_freio:"SIM",
    r_acessibilidade_rampa:"SIM",
    r_acessibilidade_cadeira_transbordo:"SIM",
    r_acessibilidade_letreiro:"SIM",
    r_acessibilidade_plataforma:"DIANTEIRA",
    r_acessibilidade_espaco_cadeirante:"DIANTEIRA",
    r_cobranca_catraca:"SIM",
    r_cobranca_validador:"SIM",
    gps_foto_frente: "",
    gps_foto_traseira: "",
    gps_foto_lateral1: "",
    gps_foto_lateral2: "",
    gps_foto_interna1: "",
    gps_foto_interna2: ""
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
    private geolocation: Geolocation,
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
      content: "Carregando Geolocalização...",
    });
    loader.present();
    this.dataservice.loadInspect(token, cod).then((data: any) => {
      
      console.log("Data", data);
      
      
      if(data.RESULT != 'ERROR'){
        let parse: any = data.RDATA;
        console.log("Parse", parse);
        // this.vistoria = Object.assign(parse.RDATA);
        console.log("Vistoria", this.vistoria);
        this.vistoria.nr_os = parse.nr_os;
        this.vistoria.aliquota = parse.aliquota;
        this.vistoria.aliquota_cofins = parse.aliquota_cofins;
        this.vistoria.aliquota_csl = parse.aliquota_csl;
        this.vistoria.aliquota_ir = parse.aliquota_ir;
        this.vistoria.aliquota_pis = parse.aliquota_pis;
        this.vistoria.ano_modelo = parse.ano_modelo;
        this.vistoria.nr_ordem = parse.nr_ordem;
        this.vistoria.renavam = parse.renavam;
        this.vistoria.chassi = parse.chassi;
        this.vistoria.cor = parse.cor;
        this.vistoria.combustivel = parse.combustivel;
        this.vistoria.combustivel = parse.combustivel;
        this.vistoria.nome_proprietario = parse.nome_proprietario;
        this.vistoria.cnpj_transportadora = parse.cnpj_transportadora;
        this.vistoria.cod_transportadora = parse.cod_transportadora;
        this.vistoria.cep = parse.cep;
        this.vistoria.logradouro = parse.logradouro;
        this.vistoria.bairro = parse.bairro;
        this.vistoria.municipio = parse.municipio;
        this.vistoria.fone_solicitante = parse.fone_solicitante;
        this.vistoria.uf = parse.uf;
        this.vistoria.marca_modelo = parse.marca_modelo
        this.vistoria.potencia = parse.potencia;
        this.vistoria.cilindrada = parse.cilindrada;
        this.vistoria.placa_nf = parse.placa_nf;
        this.vistoria.art_vinculada = parse.art_vinculada;

        loader.dismiss();
      }else{
        this.presentAlert("Erro", data.MSG_ERRO);
        this.navCtrl.pop();
        loader.dismiss();
      }
      
    },
    err => {
      console.log("Erro", err);
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
    // console.log("item",item);
  }

  getPosition1(){
    const loader = this.loading.create({
      content: "Carregando Geolocalização...",
    });
    loader.present();
    const options = {
      enableHighAccuracy: false,
      
      maximumAge: 0,
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log("resp", resp);
      // error((error) => {
      //   console.error('Erro ao obter a localização', error);
      // });
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;

      console.log("latitude", latitude);
      console.log("longitude", longitude);

      this.vistoria.gps_foto_frente = latitude.toString()+','+longitude.toString();
  
      loader.dismiss();
    })
  }
  getPosition2(){
    const loader = this.loading.create({
      content: "Carregando Geolocalização...",
    });
    loader.present();
    const options = {
      enableHighAccuracy: false,
      
      maximumAge: 0,
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log("resp", resp);
      // .catch((error) => {
      //   console.error('Erro ao obter a localização', error);
      // });
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;

      console.log("latitude", latitude);
      console.log("longitude", longitude);

      this.vistoria.gps_foto_interna1 = latitude.toString()+','+longitude.toString();
  
      loader.dismiss();
    })
  }
  getPosition3(){
    const loader = this.loading.create({
      content: "Carregando Geolocalização...",
    });
    loader.present();
    const options = {
      enableHighAccuracy: false,
      
      maximumAge: 0,
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      // .catch((error) => {
      //   console.error('Erro ao obter a localização', error);
      // });
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;

      console.log("latitude", latitude);
      console.log("longitude", longitude);

      this.vistoria.gps_foto_interna2 = latitude.toString()+','+longitude.toString();
  
      loader.dismiss();
    })
  }
  getPosition4(){
    const loader = this.loading.create({
      content: "Carregando Geolocalização...",
    });
    loader.present();
    const options = {
      enableHighAccuracy: false,
      
      maximumAge: 0,
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      // .catch((error) => {
      //   console.error('Erro ao obter a localização', error);
      // });
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;

      console.log("latitude", latitude);
      console.log("longitude", longitude);

      this.vistoria.gps_foto_lateral1 = latitude.toString()+','+longitude.toString();

      loader.dismiss();
    })
  }
  getPosition5(){
    const loader = this.loading.create({
      content: "Carregando Geolocalização...",
    });
    loader.present();
    const options = {
      enableHighAccuracy: false,
      
      maximumAge: 0,
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      // .catch((error) => {
      //   console.error('Erro ao obter a localização', error);
      // });
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;

      console.log("latitude", latitude);
      console.log("longitude", longitude);

      this.vistoria.gps_foto_lateral2 = latitude.toString()+','+longitude.toString();  
      
      loader.dismiss();
    })
  }
  getPosition6(){
    const loader = this.loading.create({
      content: "Carregando Geolocalização...",
    });
    loader.present();
    const options = {
      enableHighAccuracy: false,
      
      maximumAge: 0,
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log("resp traseira", resp);
      // .catch((error) => {
      //   console.error('Erro ao obter a localização', error);
      // });
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;

      console.log("latitude", latitude);
      console.log("longitude", longitude);

      this.vistoria.gps_foto_traseira = latitude.toString()+','+longitude.toString();
  
      loader.dismiss();
    })
  }

  async presentAlert(title: string,msg: string) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      title: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  sendInspect(prestador, vistoria) {
    console.log("Prestador", prestador);
    console.log("Vistoria", vistoria);
    this.dataservice
      .createInspect(vistoria, this.foto_frente, this.foto_traseira, this.foto_lateral1, this.foto_lateral2, this.foto_interna1, this.foto_interna2, this.token)
      .subscribe((data) => {
        let parse: any = data;
        console.log(parse);
        if(parse['RESULT'] == 'SUCESS'){
          this.presentAlert('Sucesso!', 'Vistoria enviada!')
          this.navCtrl.push(ControlPage,{cod: this.cod_sol})
        }else{
          this.presentAlert('Erro!', parse['MSG_ERRO'])
        }
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

  // addTextToImage(text: string) {
  //   const canvas: HTMLCanvasElement = this.canvas.nativeElement;
  //   const context = canvas.getContext('2d');

  //   const image = new Image();
  //   image.src = this.capturedImage.toString();
  //   image.onload = () => {
  //     canvas.width = image.width;
  //     canvas.height = image.height;

  //     // Desenha a imagem
  //     context.drawImage(image, 0, 0);

  //     // Adiciona texto
  //     context.font = '20px Arial';
  //     context.fillStyle = 'white';
  //     context.fillText(text, 20, 40); // Ajuste a posição conforme necessário
  //   };
  // }

  async openCamera(){
    const options: CameraOptions = {
     
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_frente = 'data:image/jpeg;base64,' + imageData;
     this.getPosition1();
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
    
  }
  openGallery(){
    const options: CameraOptions = {
     
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
     this.getPosition1();
    //  console.log('foto_frente',this.foto_frente)
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
            this.openGalleryTraseira();
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
     
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_traseira = 'data:image/jpeg;base64,' + imageData;
     this.getPosition6();
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGalleryTraseira(){
    const options: CameraOptions = {
     
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
     this.getPosition6();
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
     
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_lateral1 = 'data:image/jpeg;base64,' + imageData;
     this.getPosition4();
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGalleryLateral1(){
    const options: CameraOptions = {
     
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_lateral1 = 'data:image/jpeg;base64,' + imageData;
     this.getPosition4();
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
     
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_lateral2 = 'data:image/jpeg;base64,' + imageData;
     this.getPosition5();
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGalleryLateral2(){
    const options: CameraOptions = {
     
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
     this.getPosition5();
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
     
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_interna1 = 'data:image/jpeg;base64,' + imageData;
     this.getPosition2();
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGalleryInterna1(){
    const options: CameraOptions = {
     
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_interna1 = 'data:image/jpeg;base64,' + imageData;
     this.getPosition2();
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
     
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.foto_interna2 = 'data:image/jpeg;base64,' + imageData;
     this.getPosition3();
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  openGalleryInterna2(){
    const options: CameraOptions = {
     
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
     this.getPosition3();
    }, (err) => {
     // Handle error
     console.log('Erro',err)
    });
  }
  
}
