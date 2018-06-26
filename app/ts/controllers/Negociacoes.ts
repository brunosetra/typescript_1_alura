class Negociacoes {

    private _negociacoes : Array<Negociacao> = []

    adiciona(negocicao : Negociacao): void{

        this._negociacoes.push(negocicao)
    }

    paraArray() : Negociacao[]{
        return [].concat(this._negociacoes)
    }

}