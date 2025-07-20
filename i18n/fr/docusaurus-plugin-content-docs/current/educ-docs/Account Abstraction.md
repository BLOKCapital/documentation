# ERC 4337 : Abstraction de Compte

L'Abstraction de Compte (ERC-4337) est un cadre qui permet aux portefeuilles de smart contracts d'agir comme des comptes utilisateurs classiques (EOA) en supprimant le besoin de clés privées et en permettant des fonctionnalités programmables avancées.

![Texte alternatif](/img/AA2.png)

### Flux de transaction dans ERC-4337
1. **Initiation** : Un utilisateur crée une UserOperation, spécifiant son intention de transaction (par exemple, transférer des tokens).
2. **Regroupement** : Un Bundler collecte cette UserOperation, ainsi que d'autres, et les regroupe dans une seule transaction.
3. **Soumission** : Le Bundler soumet la transaction groupée au smart contract EntryPoint sur la blockchain.
4. **Vérification** : L'EntryPoint vérifie les UserOperations, utilisant un Agrégateur (si applicable) pour valider efficacement les signatures.
5. **Exécution** : L'EntryPoint transmet chaque UserOperation valide au Smart Contract Account correspondant.
6. **Gestion du gaz** : Si un Paymaster est impliqué, il prend en charge le paiement du gaz (par exemple, sponsoriser les frais ou accepter d'autres tokens).
7. **Achèvement** : Le Smart Contract Account exécute la UserOperation, complétant l'action souhaitée de l'utilisateur.

### Avantages de l'Abstraction de Compte ERC-4337
- **Transactions sans gaz** : Les Paymasters permettent aux utilisateurs d'interagir sans posséder d'actifs crypto pour le gaz, car les frais peuvent être sponsorisés ou payés dans d'autres tokens, améliorant ainsi l'accessibilité.

- **Expérience utilisateur améliorée** : Les utilisateurs peuvent utiliser des portefeuilles de smart contracts avec une logique personnalisée (par exemple, récupération sociale, limites de dépenses), éliminant le besoin d'EOA et de phrases de récupération.

- **Efficacité des transactions** : Les Bundlers regroupent plusieurs UserOperations, réduisant les coûts de gaz et la congestion du réseau, tandis que les Agrégateurs optimisent la validation des signatures. 