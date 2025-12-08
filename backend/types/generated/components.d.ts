import type { Schema, Struct } from '@strapi/strapi';

export interface CommonIncludedFeature extends Struct.ComponentSchema {
  collectionName: 'components_common_included_features';
  info: {
    description: '';
    displayName: 'included-feature';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.included-feature': CommonIncludedFeature;
    }
  }
}
