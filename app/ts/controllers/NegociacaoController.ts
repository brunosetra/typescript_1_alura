import { Negociacao, Negociacoes, NegociacaoParcial } from "../models/index";
import { NegociacoesView,MensagemView } from "../views/index";
import { DOMInject, throttle } from "../helpers/decorators/index";
import { NegociacaoService, ResponseHandler } from "../services/index";

export class NegociacaoController {

    @DOMInject('#data')
    private _inputData: JQuery;
    @DOMInject('#quantidade')
    private _inputQuantidade: JQuery;
    @DOMInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes()

    private _service = new NegociacaoService()

    private _negociacoesView = new NegociacoesView('#negociacoesView')
    private _mensagemView = new MensagemView('#mensagemView')
    
    constructor() {
        this._negociacoesView.update(this._negociacoes)
    }

    @throttle()
    adiciona(event: Event){

        event.preventDefault()
        
        let data = new Date(this._inputData.val().replace(/-/g,','))

        if(!this.isDiaUtil(data)) {
            this._mensagemView.update('Negociações somente em dias uteis, por favor.')
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        )

        this._negociacoes.adiciona(negociacao)

        this._negociacoesView.update(this._negociacoes)
        this._mensagemView.update('Negociação adicionada com sucesso')
   }

   private isDiaUtil(data : Date) : boolean {
       return data.getDay() != DiaDaSemana.SABADO && data.getDay()!= DiaDaSemana.DOMINGO
   }

   @throttle()
   importarDados() {
        const isOk : ResponseHandler = (res: Response)  => {
            if(res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }

        this._service
        .obterNegociacoes(isOk)
        .then(negociacoes => {
            negociacoes.forEach(negociacao => 
                this._negociacoes.adiciona(negociacao));
            this._negociacoesView.update(this._negociacoes);
        }); 

   }

}

enum DiaDaSemana {
    DOMINGO,
    SEGUNDA,
    TERCA,
    QUARTA,
    QUINTA,
    SEXTA,
    SABADO
}