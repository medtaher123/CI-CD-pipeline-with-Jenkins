pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' 
        IMAGE_NAME = 'medtaher123/mon-app-devops'
    }

    stages {
        stage('Checkout') {
            steps {
                // Récupère le code depuis le SCM configuré dans le job Jenkins
                checkout scm
            }
        }

        stage('Unit Tests') {
            steps {
                // Installation des dépendances définies dans package.json
                sh 'npm install'
                // Exécution du script "test": "node test.js"
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    echo "Construction de l'image avec le build number: ${env.BUILD_NUMBER}"
                    // Construction de l'image taguée avec le numéro de build
                    sh "docker build -t ${IMAGE_NAME}:${env.BUILD_NUMBER} ."
                    // Tag supplémentaire "latest"
                    sh "docker tag ${IMAGE_NAME}:${env.BUILD_NUMBER} ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    // Connexion sécurisée à Docker Hub via les credentials Jenkins
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        // Les guillemets simples '...' disent à Jenkins : "Touche pas à ça, laisse le shell gérer"
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        
                        // Push des deux tags
                        sh "docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                        sh "docker push ${IMAGE_NAME}:latest"
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Nettoyage pour économiser de l'espace disque (optionnel)
            sh "docker logout"
        }
    }
}