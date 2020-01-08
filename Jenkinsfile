pipeline {
    agent any
    environment {
        SLS_DEBUG = '*'
        AWS_SDK_LOAD_CONFIG = 'true'
    }
    stages {
        stage('Install packages') {
            steps {
                sh "npm ci"
            }
        }
        stage('Deploy application') {
            steps{
                withAWS(credentials: '63716841-9d86-4e7e-bdbe-e6eef3134e56') {
                    sh "aws login"
                    sh "npx serverless deploy --stage ${params.stage}"
                }
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    }
}