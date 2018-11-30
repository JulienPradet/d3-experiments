#!/bin/bash

mkdir -p data/json
wget -O data/json/collections.json https://data.toulouse-metropole.fr/explore/dataset/inventaire-collections-augustins/download/?format=json&timezone=Europe/Berlin
wget -O data/json/prets.json https://data.toulouse-metropole.fr/explore/dataset/20-ans-de-prets-des-collections-du-musee-des-augustins/download/?format=json&timezone=Europe/Berlin
wget -O data/json/oeuvres.json https://data.toulouse-metropole.fr/explore/dataset/inventaire-des-oeuvres-deposees-au-musee-des-augustins/download/?format=json&timezone=Europe/Berlin