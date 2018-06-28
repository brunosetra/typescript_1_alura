export function DOMInject(seletor : string) {

    
    return function(target : any, propertyKey : string) {

        let elemento : JQuery

        const getter = function(){
            if (!elemento){
                elemento = $(seletor)
            }
            return elemento
        }

        Object.defineProperty(target,propertyKey, {
            get : getter
        })



    }

}