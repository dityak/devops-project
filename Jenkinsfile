pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH"
        IMAGE_NAME = "dailywall-app"
        SONAR_AUTH_TOKEN = credentials('SONAR_AUTH_TOKEN')
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install -g netlify-cli' // Install netlify CLI globally
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Installing sonar-scanner...'
                sh 'npm install -g sonar-scanner'

                echo '🔍 Running SonarQube Analysis...'
                withCredentials([string(credentialsId: 'SONAR_AUTH_TOKEN', variable: 'SONAR_AUTH_TOKEN')]) {
                    withSonarQubeEnv('SonarQube') {
                        sh 'sonar-scanner'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy image --exit-code 0 --severity HIGH,CRITICAL $IMAGE_NAME'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                sh 'npm run build'
                withCredentials([string(credentialsId: 'NETLIFY_AUTH_TOKEN', variable: 'NETLIFY_AUTH_TOKEN')]) {
                    sh 'netlify deploy --prod --dir=dist'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check logs.'
        }
    }
}