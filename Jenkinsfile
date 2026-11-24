pipeline {
    agent any

    environment {
        IMAGE = 'jaysurieya/todoapp_sample_frontend'
    }

    stages {
        stage('Install, Test & Build') {
            agent { docker { image 'node:20-alpine'; reuseNode true; args '-e HOME=/tmp' } }
            steps {
                sh 'npm ci'
                sh 'npm test --if-present'
                sh 'npm run build'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t ${IMAGE}:${BUILD_NUMBER} -t ${IMAGE}:latest .'
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub',
                        usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                      echo $PASS | docker login -u $USER --password-stdin
                      docker push ${IMAGE}:${BUILD_NUMBER}
                      docker push ${IMAGE}:latest
                    '''
                }
            }
        }

        stage('Trigger Deploy') {
            when { branch 'main' }
            steps {
                build job: 'todo-deploy', wait: false
            }
        }
    }

    post {
        always { sh 'docker logout || true' }
    }
}