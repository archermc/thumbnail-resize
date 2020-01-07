pipeline {
    agent any
    environment {
        SLS_DEBUG = '*'
        AWS_SDK_LOAD_CONFIG = 'true'
    }
    stages {
        stage('Install packages') {
            steps {
                sh 'ls'
                sh "npm ci"
            }
        }
        stage('Deploy application') {
            steps{
                sh "serverless deploy --stage ${params.stage}"
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    }
}