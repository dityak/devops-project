pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH"
        IMAGE_NAME = "dailywall-app"
        SONAR_AUTH_TOKEN = credentials('SONAR_AUTH_TOKEN')
        NETLIFY_SITE_ID = "69676a72-951c-4074-b3fe-e619729f8ea9"
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
                sh 'npm install -g netlify-cli'
                sh 'npm install -g sonar-scanner'
            }
        }

        stage('SonarQube Analysis') {
    steps {
        echo '🔍 Running SonarQube Analysis...'
        withCredentials([string(credentialsId: 'SONAR_AUTH_TOKEN', variable: 'SONAR_AUTH_TOKEN')]) {
            withSonarQubeEnv('SonarQube') {
                sh "cd ${env.WORKSPACE} && sonar-scanner -Dsonar.projectKey=dailywall-app -Dsonar.projectName='Daily Wall App' -Dsonar.sources=. -Dsonar.sourceEncoding=UTF-8 -Dsonar.host.url=http://192.168.0.182:9001 -Dsonar.token=${SONAR_AUTH_TOKEN}"
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
                    sh 'npx netlify deploy --prod --dir=dist --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID'
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
