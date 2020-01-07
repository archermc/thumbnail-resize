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
                sh "npx serverless deploy --stage ${params.stage}"
            }
        }
    }
    post {
        always {
            deleteDir()
        }
    }
}