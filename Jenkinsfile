pipeline {
    agent any

    environment {
        IMAGE_NAME = "opencart-playwright"
        CONTAINER_NAME = "opencart-test"
        GIT_REPO = "https://github.com/xiaodie304/opencart-playwright.git"
        GIT_BRANCH = "main"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "$GIT_BRANCH", url: "$GIT_REPO"
            }
        }

        stage('Prepare .env') {
            steps {
                withCredentials([file(credentialsId: 'ENV_FILE', variable: 'ENV_PATH')]) {
                    sh 'cp "$ENV_PATH" .env && cat .env'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Run Tests') {
            steps {
                sh "docker run --name $CONTAINER_NAME $IMAGE_NAME"
            }
        }
    }

    post {
        always {
            sh "docker rm -f $CONTAINER_NAME || true"
            sh "docker rmi $IMAGE_NAME || true"
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}