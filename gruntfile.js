//npm run grunt //para executar o grunt antes de ter o watch instalado
//npm install --save-dev grunt-contrib-watch //resolve isso
//npm install --save-dev grunt-replace
//npm install --save-dev grunt-contrib-htmlmin //transforma todo o html em uma linha só
//npm run grunt htmlmin:dist
//npm run grunt build
//npm install --save-dev grunt-contrib-clean
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development:{
                files: {
                    'dev/styles/main.css' :'src/styles/main.less'
                }
            },
            production : {
                options: {
                    compress: true,
                },
                files:{
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },
       replace: {
        dev: {
            options: {
                patterns: [
                    {
                        match: 'ENDERECO_DO_CSS',
                        replacement: './styles/main.css'
                    },
                    {
                        match: 'ENDERECO_DO_JS',
                        replacement: '../src/scripts/main.js'
                    }
                ]
            },
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: ['src/index.html'],
                    dest: 'dev/'
                }
            ]
        },
        dist: {
            options: {
                patterns: [
                    {
                        match: 'ENDERECO_DO_CSS',
                        replacement: './styles/main.min.css'
                    },
                    {
                        match: 'ENDERECO_DO_JS',
                        replacement: './scripts/main.min.js'
                    }
                ]
            },
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: ['prebuild/index.html'],
                    dest: 'dist/'
                }
            ]
        }
    },
    htmlmin:{
        dist:{
            options:{
                removeComments: true,
                collapseWhitespace: true,
            },
            files:{
                'prebuild/index.html': 'src/index.html'
            }
        }
    },
    clean:['prebuild'],
    uglify: {
        target: {
            files: {
                'dist/scripts/main.min.js': 'src/scripts/main.js'
            }
        }
    }
});

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('build',['less:production', 'htmlmin:dist', 'uglify', 'replace:dist', 'clean']);
}
