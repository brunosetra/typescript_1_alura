import { Negociacao } from "../models/Negociacao";

export class Negociacoes {

    private _negociacoes : Array<Negociacao> = []

    adiciona(negocicao : Negociacao): void{

        this._negociacoes.push(negocicao)
    }

    paraArray() : Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoes)
    }

}