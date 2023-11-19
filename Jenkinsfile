pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/finkomura/testes-api-cy.git'
            }
        }
                stage('npm install - dependencias') {
            steps {
               bat 'npm install'
            }
        }
        stage('Teste') {
            steps {
                bat 'set TERM=dumb && npm run cy:run'
            }
        }
    }
}
