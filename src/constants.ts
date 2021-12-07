import { BibleVersionCollection } from './data/BibleLanguageToVersionsCollection';

export const APP_NAMING = {
  appName: 'Bible Reference',
  appAuthor: 'tim-hub',
  appUrl: '',
  defaultStatus: '',
}

export interface BibleReferencePluginSettings {
  // language?: string; // we might not need this todo remove it
  bibleVersion: string;
}

export const LanguageVersionSplitter = '-';

export const DEFAULT_SETTINGS: BibleReferencePluginSettings = {
  bibleVersion: BibleVersionCollection[0].key,
}
