const server = require('./server');
const http = require('http');
const assert = require('assert');

console.log("=== Lancement des tests de l'application ===");

// On fait une requête HTTP locale pour vérifier que le serveur répond
http.get('http://localhost:3000', (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            // Test 1 : Le statut doit être 200 OK
            assert.strictEqual(res.statusCode, 200, "Le serveur devrait répondre 200 OK");
            
            // Test 2 : La réponse doit être du JSON valide
            const responseBody = JSON.parse(data);
            
            // Test 3 : On vérifie qu'on reçoit bien un message
            assert.ok(responseBody.message, "L'API doit renvoyer une excuse");
            
            console.log("✅ SUCCÈS : L'application fonctionne correctement et a de bonnes excuses.");
            
            // On ferme le serveur et on quitte proprement (code 0 = succès pour Jenkins)
            server.close();
            process.exit(0);
        } catch (e) {
            console.error("❌ ÉCHEC : ", e.message);
            server.close();
            process.exit(1); // Code 1 = erreur pour Jenkins
        }
    });
}).on('error', (err) => {
    console.error("❌ Erreur de connexion : ", err.message);
    process.exit(1);
});