pipeline {
    agent any

    environment {
        SONARQUBE = 'MySonar'                  // Configure in Jenkins later
        DOCKER_IMAGE = 'daily-wall-image'      // Docker image name
    }

    stages {
        stage('Clone') {
            steps {
                git credentialsId: 'github-dityak-creds', url: 'https://github.com/dityak/daily-question-wall.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonar') {
                    sh 'npx sonar-scanner'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy image $DOCKER_IMAGE'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                sh 'npm run build'
                sh 'npx netlify deploy --prod --dir=build --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID'
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline execution complete.'
        }
    }
}
