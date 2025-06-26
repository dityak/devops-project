pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH"
        SONAR_AUTH_TOKEN = credentials('SONAR_AUTH_TOKEN')
    }

    stages {
        stage('Clone') {
            steps {
                git url: 'https://github.com/dityak/daily-question-wall.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Running SonarQube Analysis...'
                withCredentials([string(credentialsId: 'SONAR_AUTH_TOKEN', variable: 'SONAR_AUTH_TOKEN')]) {
                    withSonarQubeEnv('SonarQube') {
                        sh '''
                            sonar-scanner \
                            -Dsonar.projectKey=daily-question-wall \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://192.168.0.182:9001 \
                            -Dsonar.token=$SONAR_AUTH_TOKEN
                        '''
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh 'docker build -t daily-question-wall .'
            }
        }

        stage('Trivy Scan') {
            steps {
                echo '🔎 Running Trivy security scan...'
                sh 'trivy image daily-question-wall || true'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                echo '🚀 Deploying to Netlify...'
                sh 'npm run build'
                sh 'netlify deploy --prod --dir=build'
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
