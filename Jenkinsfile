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
<<<<<<< HEAD
                checkout scm   // ✅ Uses Jenkins' default checkout mechanism
=======
                git url: 'https://github.com/dityak/devops-project.git'

>>>>>>> Fix: Install sonar-scanner via npm in Jenkins pipeline
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }code Jenkinsfile

        }

<<<<<<< HEAD
    stage('SonarQube Analysis') {
    steps {
        echo '🔍 Installing sonar-scanner...'
        sh 'npm install -g sonar-scanner'  // ✔ install sonar-scanner inside Jenkins step
=======
        stage('SonarQube Analysis') {
    steps {
        echo '🔍 Installing sonar-scanner...'
        sh 'npm install -g sonar-scanner'  // ✅ install the CLI temporarily
>>>>>>> Fix: Install sonar-scanner via npm in Jenkins pipeline

        echo '🔍 Running SonarQube Analysis...'
        withCredentials([string(credentialsId: 'SONAR_AUTH_TOKEN', variable: 'SONAR_AUTH_TOKEN')]) {
            withSonarQubeEnv('SonarQube') {
                sh '''
                    sonar-scanner \
<<<<<<< HEAD
                    -Dsonar.projectKey=devops-project \
=======
                    -Dsonar.projectKey=daily-question-wall \
>>>>>>> Fix: Install sonar-scanner via npm in Jenkins pipeline
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://192.168.0.182:9001 \
                    -Dsonar.token=$SONAR_AUTH_TOKEN
                '''
            }
        }
    }
}

<<<<<<< HEAD

=======
>>>>>>> Fix: Install sonar-scanner via npm in Jenkins pipeline

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
