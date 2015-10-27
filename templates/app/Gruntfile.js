module.exports = function (grunt) {

    var path = require('path');

    // Carregando os plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    var arquivosJS = {
        app: [
            'app/app.js',
            'app/app.modulos.js',
            'app/app.componentes.js'
        ],
        modulos: [
            'app/modulos/*/src/*.js',
            'app/modulos/*/src/*/*.js',
            'app/modulos/*/src/Models/*.js',
            'app/modulos/*/src/Controllers/*.js',
            'app/modulos/*/diretivas/*/*.js',
            'app/modulos/*/modulo.config.js'
        ],
        componentes: [
            'app/componentes/*/src/*.js',
            'app/componentes/*/src/*/*.js',
            'app/componentes/*/diretivas/*/*.js',
            'app/componentes/*/modulo.config.js'
        ]
    };

    var DESTINO_BASE_DEPLOY = '../deploy/PontoDeVenda';

    // Configurando as tarefas
    grunt.initConfig({

        // Concatenação dos arquivos js
        concat: {
            task: {
                options: {
                    separator: '\n\n'
                },
                src: arquivosJS.modulos.concat(
                    arquivosJS.componentes,
                    arquivosJS.app
                ),
                dest: 'assets/js/concatenado.js'
            }
        },

        // Minificar o arquivo concatenado
        uglify: {
            dev: {
                options: {
                    report: 'gzip',
                    compress: false,
                    mangle: false,
                    sourceMap: false,
                    beautify: true
                },
                files: {
                    'assets/js/main.min.js': ['assets/js/concatenado.js']
                }
            },
            dist: {
                options: {
                    report: 'gzip',
                    compress: true,
                    mangle: false,
                    sourceMap: true

                },
                files: {
                    'assets/js/main.min.js': ['assets/js/concatenado.js']
                }
            }
        },

        // Compilar SASS
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        // Observando alterações
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: arquivosJS.modulos.concat(
                    arquivosJS.componentes,
                    arquivosJS.app
                ),
                tasks: ['concat', 'uglify:dev']
            },
            html: {
                files: [
                    '*.html',
                    'app/modulos/*/view/*.html',
                    'app/modulos/*/diretivas/*/partial/*.html',
                    'app/componentes/*/diretivas/*/partial/*.html'
                ]
            },
            sass: {
                files: [
                    'assets/sass/*.scss',
                    'assets/sass/*/*.scss',
                    'assets/sass/helpers/*.scss',
                    'assets/sass/modulos/*/*.scss',
                    'assets/sass/componentes/*/*.scss'
                ],
                tasks: ['compass']
            }
        },

        // Usado para geração de deploy
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'assets/css', src: ['**'], dest: DESTINO_BASE_DEPLOY + '/assets/css'},
                    {expand: true, cwd: 'assets/img', src: ['**'], dest: DESTINO_BASE_DEPLOY + '/assets/img'},
                    {expand: true, cwd: 'assets/icones', src: ['**'], dest: DESTINO_BASE_DEPLOY + '/assets/icones'},
                    {expand: true, cwd: 'assets/js', src: ['main.min.js'], dest: DESTINO_BASE_DEPLOY + '/assets/js'},
                    {
                        expand: true,
                        cwd: 'assets/vendor',
                        src: ['**', '!angular-i18n/**'],
                        dest: DESTINO_BASE_DEPLOY + '/assets/vendor'
                    },
                    {
                        expand: true,
                        cwd: 'assets/vendor/angular-i18n',
                        src: ['angular-locale_pt-br.js'],
                        dest: DESTINO_BASE_DEPLOY + '/assets/vendor/angular-i18n'
                    },

                    {expand: true, src: ['app/modulos/**/*.html'], dest: DESTINO_BASE_DEPLOY},

                    {expand: true, src: ['app/componentes/**/*.html'], dest: DESTINO_BASE_DEPLOY},

                    {expand: true, cwd: '', src: ['index.html'], dest: DESTINO_BASE_DEPLOY},
                    {expand: true, cwd: '', src: ['manifest.json'], dest: DESTINO_BASE_DEPLOY},
                    {expand: true, cwd: '', src: ['background.js'], dest: DESTINO_BASE_DEPLOY}
                ]
            }
        },

        // Criando um servidor
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: ".",
                    hostname: "0.0.0.0",
                    livereload: true,
                    open: {
                        target: 'http://localhost:8000'
                    }
                }
            }
        }

    });

    // Registrando tarefas
    grunt.registerTask('default', ['concat', 'uglify:dev', 'connect', 'watch']);
    grunt.registerTask('nancy', ['concat', 'uglify:dev', 'watch']);
    grunt.registerTask('deploy', ['concat', 'uglify:dist', 'copy']);
    grunt.registerTask('bower', ['bower']);
};