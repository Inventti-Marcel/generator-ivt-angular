var generators = require('yeoman-generator');
var _ = require('underscore.string');
var path = require('path');
var esprima = require('esprima');
var escodegen = require('escodegen');
var htmlWiring = require("html-wiring");
var stringifyObject = require('stringify-object');

module.exports = generators.Base.extend({
    modulo: function () {
        var done = this.async();
            this.prompt({
            type    : 'input',
            name    : 'nomeModulo',
            message : 'Qual o nome do módulo?'
        }, function (resposta) {
            var nomeModulo = _.camelize(_.humanize(resposta.nomeModulo));

            this._copiarTemplateModulo(nomeModulo);
            this._registrarModulo(nomeModulo);

            done();
        }.bind(this));
    },

    _copiarTemplateModulo: function (nomeModulo) {
        this.sourceRoot(path.join(__dirname, '../templates/'));

        this.fs.copyTpl(
            this.templatePath('modulo/modulo.config.js'),
            this.destinationPath(path.join('app/modulos', nomeModulo, 'modulo.config.js')),
            { nomeModulo: 'modulo.' + nomeModulo }
        );
    },

    _registrarModulo: function (nomeModulo) {
        var pathArquivoModulos = 'app/app.modulos.js';

        var modulosRegistrados = this._carregarModulosRegistrados(pathArquivoModulos);
        var jsonGerado = this._transformarConteudoJavaScriptEmJson(modulosRegistrados);

        var jsonGeradoComNovoModulo = this._obterObjetoComNovoModuloAdicionado(jsonGerado, nomeModulo);
        console.log('jsonGeradoComNovoModulo:', jsonGeradoComNovoModulo);

        var javascriptComNovoModulo = this._transformarJsonEmJavaScript(jsonGeradoComNovoModulo);

        this._escreverArquivoModulos(javascriptComNovoModulo, pathArquivoModulos);
    },

    _carregarModulosRegistrados: function (path) {
        return htmlWiring.readFileAsString(path);
    },

    _transformarConteudoJavaScriptEmJson: function (modulosRegistrados) {
        return esprima.parse(modulosRegistrados);;
    },

    _obterObjetoComNovoModuloAdicionado: function (json, nomeModulo) {
        json.body[0].expression.callee.body.body[1].expression.arguments[1].elements.push({
            "type": "Literal",
            "value": "modulo." + nomeModulo,
            "raw": "'modulo." + nomeModulo + "'"
        });

        return json;
    },

    _transformarJsonEmJavaScript: function (json) {
        return escodegen.generate(json);
    },

    _escreverArquivoModulos: function (javascript, path) {
        htmlWiring.writeFileFromString(javascript, path);
    }
});