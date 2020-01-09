pipeline {
    agent any
    environment {
        SLS_DEBUG = '*'
        AWS_SDK_LOAD_CONFIG = 'true'
    }
    stages {
        stage('Install packages') {
            steps {
              nodejs('Nodejs') {
                  sh "npm ci"
              }
            }
        }
        stage('Deploy application') {
          steps {
            nodejs('Nodejs') {
              sh "mkdir -p ~/.aws && touch ~/.aws/credentials && touch ~/.aws/config"

              withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: '63716841-9d86-4e7e-bdbe-e6eef3134e56', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                  sh "serverless config credentials --provider aws --key ${AWS_ACCESS_KEY_ID} --secret ${AWS_SECRET_ACCESS_KEY} -o"
              }
              withCredentials([string(credentialsId: 'ServerlessAccessKey', variable: 'SERVERLESS_ACCESS_KEY')]) {
                  sh "serverless deploy --stage ${params.stage}"
              }
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