// import the original type declarations
import 'i18next';

import { LocalResources } from './i18n';

// Override the definition for the existing i18n type with the resources
declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom resources type
    resources: LocalResources;
  }
}
