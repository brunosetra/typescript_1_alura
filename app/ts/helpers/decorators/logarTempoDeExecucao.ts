export function logarTempoDeExecucao(emSegundos : boolean = false) {
    
    /* 
        target: é aquele que possui uma referência para o elemento cujo método foi decorado por logarTempoDeExecucao
        propertyKey: retorna o nome do método decorado.
        descriptor: Objeto que nos da acesso ao metodo que desejamos modificar sua execução, através de descriptor.value
    */
    return function(target : any, propertyKey : string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value

        // Alterando (sobrescrevendo) o metodo original que sera decorado pela função logarTempoDeExecucao (descriptor.value)
        descriptor.value = function(...args: any[]) {
            let unidade = 'ms'
            let divisor = 1

            if(emSegundos){
                unidade = 's'
                divisor = 1000
            }

            console.log('-------------------------')
            console.log(`O metodo ${propertyKey} está recebendo os parametros: ${JSON.stringify(args)}`)
            const t1 = performance.now()
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now()
            console.log(`O metodo ${propertyKey} está retornando: ${JSON.stringify(retorno)}`)
            console.log(`A execucao do metodo demorou: ${(t2 - t1)/divisor} ${unidade}`)
            return retorno;
        }


        return descriptor
    }

}