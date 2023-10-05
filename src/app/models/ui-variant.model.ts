import { SafeUrl } from "@angular/platform-browser";

export class UIVariantModel{
    uiLinkedVariantModel!: UILinkedVariantModel[];
    uiUnlinkedVariantsModel!: UIUnlinkedVariantsModel;
}

export class UILinkedVariantModel {
    description?:string;
    discVariantImage?: SafeUrl;
    manualVariantImage?: SafeUrl;
    frontBoxVariantImage?: SafeUrl;
    backBoxVariantImage?: SafeUrl;
}

export class UIUnlinkedVariantsModel {
    description?: string;
    unlinkedVariants!: UIUnlinkedVariantModel[];
}

export class UIUnlinkedVariantModel {
    variantTypeId!: number;
    image!: SafeUrl;
}