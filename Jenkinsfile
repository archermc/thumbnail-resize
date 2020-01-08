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
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: '63716841-9d86-4e7e-bdbe-e6eef3134e56', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh "npx serverless config credentials --provider aws --key ${AWS_ACCESS_KEY_ID} --secret ${AWS_SECRET_ACCESS_KEY}"
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