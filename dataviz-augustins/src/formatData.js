export default data =>
  data.map(element => ({
    id: element.recordid,
    modeAquisition: element.fields.mode_aquisition,
    category: element.fields.domaine,
    info: {
      auteurs: [
        element.fields.auteur_1,
        element.fields.auteur_2,
        element.fields.auteur_3
      ]
        .filter(Boolean)
        .join(", "),
      datation: [element.fields.datation_1, element.fields.datation_2],
      designations: [
        element.fields.designation_1,
        element.fields.designation_2,
        element.fields.designation_3,
        element.fields.matiere,
        element.fields.technique
      ]
        .filter(Boolean)
        .join(" - "),
      domaine: element.fields.domaine,
      modeAquisition: element.fields.mode_aquisition,
      aquisDe: element.fields.donateur_vendeur,
      aquisA: element.fields.prov_geo,
      image: {
        ...element.fields.image,
        credit: element.fields.credit_photo
      },
      numeroInventaire: element.fields.num_inventaire,
      numeroAquisition: element.fields.numero_aquisition
    }
  }));
