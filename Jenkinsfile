pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH"
        SONAR_AUTH_TOKEN = credentials('SONAR_AUTH_TOKEN') // ID of secret text in Jenkins
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
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=daily-question-wall \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://localhost:9001 \
                        -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                // Uncomment and replace with actual Docker build command
                // sh 'docker build -t my-app .'
            }
        }

        stage('Trivy Scan') {
            steps {
                echo '🔎 Running Trivy security scan...'
                // Uncomment and replace with actual Trivy scan command
                // sh 'trivy image my-app'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                echo '🚀 Deploying to Netlify...'
                // Uncomment and replace with actual Netlify deploy command
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
