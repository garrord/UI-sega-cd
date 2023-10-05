// export class VariantModel {
//     description?:string;
//     variantTypeId!:number;
//     game!:string;
//     byteArray!:string;
//     isLinked!:boolean;
// }

import { SafeUrl } from "@angular/platform-browser";

export class VariantsModel {
    linkedVariants!: LinkedVariantModel[];
    unlinkedVariants!: UnlinkedVariants;
}

export class LinkedVariantModel {
    description?:string;
    discVariantBase64?: string;
    manualVariantBase64?: string;
    frontBoxVariantBase64?: string;
    backBoxVariantBase64?: string;
}

export class UnlinkedVariants {
    description?: string;
    unlinkedVars!: UnlinkedVariant[];
}

export class UnlinkedVariant {
    variantTypeId!: number;
    imageBase64!: string;
}