# Configuration EmailJS - Recyclonet

Ce projet est prêt pour envoyer les formulaires vers l'email du directeur avec EmailJS.

## 1. Adresse de réception

Utiliser l'adresse qui doit recevoir les demandes, par exemple :

- `recyclonet@gmail.com`

## 2. Service EmailJS

Dans EmailJS :

1. Créer ou vérifier le service email connecté
2. Noter l'identifiant du service
3. Dans ce projet, l'identifiant actuellement utilisé est :

- `service_ye8qwrk`

## 3. Template EmailJS

Créer un template qui accepte les variables suivantes :

- `form_name`
- `user_name`
- `user_email`
- `user_phone`
- `user_address`
- `service_type`
- `participant_count`
- `message`
- `submission_source`
- `to_email`

L'identifiant de template actuellement utilisé dans le projet est :

- `template_ksgadah`

## 4. Exemple de contenu du template

Sujet :

`{{form_name}} - {{user_name}}`

Corps :

`Nouvelle demande reçue depuis {{submission_source}}`

`Nom : {{user_name}}`

`Email : {{user_email}}`

`Téléphone : {{user_phone}}`

`Adresse : {{user_address}}`

`Service : {{service_type}}`

`Participants : {{participant_count}}`

`Message : {{message}}`

`Réception : {{to_email}}`

## 5. Formulaires déjà préparés

Le projet contient déjà :

- un formulaire de contact dans `contact.html`
- un formulaire de confirmation de présence dans `events.html`

Les deux envoient via la classe :

- `.emailjs-form`

## 6. Local et production

Cela fonctionnera :

- en local, si le navigateur a Internet
- en production, si le site publié charge bien JavaScript

## 7. Test recommandé

Après configuration :

1. Ouvrir la page contact
2. Envoyer un test
3. Ouvrir la page formations
4. Envoyer un test
5. Vérifier la boîte de réception et le dossier spam
