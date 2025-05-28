# @nestjs-utils/clean-architecture-cli

Un outil en ligne de commande pour générer du code et des fichiers utilitaires.

## Installation

```bash
npm install -g @nestjs-utils/clean-architecture-cli
```

## Utilisation

La commande principale de génération est `generate` (ou son alias `g`).

### Générer un fichier Lorem Ipsum

```bash
nutils generate lorem
# ou avec l'alias
nutils g lorem

# Options:
# -o, --output <path>       Chemin du fichier de sortie (par défaut: "lorem-ipsum.txt")
# -p, --paragraphs <number> Nombre de paragraphes (par défaut: 3)
```

Exemples :
```bash
# Générer avec les options par défaut
nutils g lorem

# Spécifier un chemin de sortie personnalisé
nutils generate lorem -o ./content/text.txt

# Générer 5 paragraphes
nutils g lorem -p 5

# Combiner les options
nutils generate lorem -o ./content/long-text.txt -p 5
```

## Commandes disponibles

```bash
nutils generate --help     # Affiche l'aide pour les commandes de génération
nutils g --help           # Idem avec l'alias
```

## Développement

```bash
# Installation des dépendances
npm install

# Compilation du projet
npm run build

# Exécution en mode développement
npm run dev
``` 