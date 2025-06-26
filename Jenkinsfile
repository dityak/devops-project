pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH"
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
            environment {
                SONAR_AUTH_TOKEN = credentials('SONAR_AUTH_TOKEN')
            }
            steps {
                withCredentials([string(credentialsId: 'SONAR_AUTH_TOKEN', variable: 'SONAR_AUTH_TOKEN')]) {
                    echo '🔍 Running SonarQube Analysis...'
                    withSonarQubeEnv('SonarQube') {
                        sh '''
                            sonar-scanner \
                            -Dsonar.projectKey=daily-question-wall \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://192.168.0.182:9001 \
                            -Dsonar.login=$SONAR_AUTH_TOKEN
                        '''
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                // Replace with your Docker command
                // sh 'docker build -t my-app .'
            }
        }

        stage('Trivy Scan') {
            steps {
                echo '🔎 Running Trivy security scan...'
                // Replace with Trivy scan command
                // sh 'trivy image my-app'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                echo '🚀 Deploying to Netlify...'
                // Replace with your Netlify deploy command
                // sh 'netlify deploy --prod --dir=public'
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
