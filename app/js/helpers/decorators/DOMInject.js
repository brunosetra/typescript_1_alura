System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function DOMInject(seletor) {
        return function (target, propertyKey) {
            let elemento;
            const getter = function () {
                if (!elemento) {
                    elemento = $(seletor);
                }
                return elemento;
            };
            Object.defineProperty(target, propertyKey, {
                get: getter
            });
        };
    }
    exports_1("DOMInject", DOMInject);
    return {
        setters: [],
        execute: function () {
        }
    };
});
