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
            steps {
                echo '🔍 Running SonarQube Analysis...'
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner \
                        -Dsonar.projectKey=daily-question-wall \
                        -Dsonar.sources=.
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                // Example:
                // sh 'docker build -t my-app .'
            }
        }

        stage('Trivy Scan') {
            steps {
                echo '🔎 Running Trivy security scan...'
                // Example:
                // sh 'trivy image my-app'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                echo '🚀 Deploying to Netlify...'
                // Example:
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
