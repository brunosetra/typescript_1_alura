class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    adiciona(negocicao) {
        this._negociacoes.push(negocicao);
    }
    paraArray() {
        return [].concat(this._negociacoes);
    }
}
