
# Calcul multipartite sécurisé (MPC)

Le **Calcul multipartite sécurisé (MPC)** est un sous-domaine de la cryptographie qui permet à plusieurs parties de calculer conjointement une fonction à partir de leurs données respectives, tout en gardant ces données privées. Cela signifie que les participants peuvent collaborer pour atteindre un objectif commun sans révéler leurs données individuelles entre eux ni à un tiers.

### Propriétés clés du MPC :

1. **Confidentialité des données d’entrée** : Aucune information sur les données privées détenues par les parties ne peut être déduite des messages échangés durant l’exécution du protocole. La seule information accessible est celle qui pourrait l’être en observant uniquement le résultat final.

2. **Exactitude** : Un sous-ensemble de parties malveillantes (même en collusion) ne peut pas forcer les parties honnêtes à produire un résultat incorrect. L'exactitude peut être garantie de deux manières : soit les parties honnêtes obtiennent toujours le bon résultat (protocole « robuste »), soit elles interrompent l'exécution en cas d’erreur détectée (protocole MPC « avec interruption »).

### Applications du MPC :

Le MPC possède de nombreuses applications pratiques, notamment :

1. **Vote électronique** : Garantir que les votes sont correctement comptabilisés sans révéler les choix individuels.
2. **Intersection d’ensembles privés** : Permettre à deux parties de découvrir les éléments communs à leurs jeux de données sans révéler les autres éléments.
3. **Analyse de données confidentielles** : Permettre à plusieurs organisations d’analyser des données ensemble sans exposer d’informations sensibles.

### Exemple simple :

Imaginez trois amis — Alice, Bob et Charlie — qui souhaitent connaître le salaire le plus élevé entre eux sans révéler combien chacun gagne. Grâce au MPC, ils peuvent calculer ensemble le salaire maximum sans que personne ne découvre les salaires des autres.

### Applications dans les portefeuilles de cryptomonnaies :

Dans le contexte des portefeuilles crypto, le MPC améliore la sécurité en répartissant le contrôle des clés privées entre plusieurs parties. Ainsi, aucune entité unique ne détient la clé complète, ce qui réduit considérablement les risques de vol ou de perte.

Par exemple, un portefeuille MPC peut diviser une clé privée en plusieurs fragments, et n'autoriser une transaction que si un nombre minimum de fragments est utilisé ensemble. Même si un fragment est compromis, il ne suffit pas à autoriser une transaction non autorisée.

En exploitant le MPC, les portefeuilles de cryptomonnaies peuvent offrir un niveau de sécurité supérieur, les rendant plus résistants aux piratages et aux accès frauduleux.

