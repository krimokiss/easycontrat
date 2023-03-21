export class FactureModel {
    facture_id!: number
    fki_entreprise!: number
    nom_client!: string
    adresse_client!: string
    cp_client!: number
    ville_client!: string
    date_facture!: Date
    description!: string
    tarif!: number
    quantite!: number
    tva!: number
    paiement!: string
    payer!: boolean
}
