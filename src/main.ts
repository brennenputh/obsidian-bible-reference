import { Notice, Plugin } from 'obsidian'
import {
  APP_NAMING,
  BibleReferencePluginSettings,
  DEFAULT_SETTINGS,
} from './data/constants'
import { BibleReferenceSettingTab } from './ui/BibleReferenceSettingTab'
import { VerseEditorSuggester } from './suggesetor/VerseEditorSuggester'
import { VerseModalSuggester } from './suggesetor/VerseModalSuggester'
import { autoMigrate, migrateSettings } from './utils/SettingsMigration'

export default class BibleReferencePlugin extends Plugin {
  settings: BibleReferencePluginSettings
  suggestModal: VerseModalSuggester

  async onload() {
    console.log('loading plugin -', APP_NAMING.appName)

    await this.loadSettings()
    this.suggestModal = new VerseModalSuggester(this.app, this.settings)
    this.addSettingTab(new BibleReferenceSettingTab(this.app, this))
    this.registerEditorSuggest(new VerseEditorSuggester(this, this.settings))
    this.addCommand({
      id: 'obr-lookup',
      name: 'Verse Lookup',
      callback: () => {
        this.suggestModal.open()
      },
    })

    // Migration of old settings to templates
    this.addCommand({
      id: 'obr-settings-migration',
      name: 'Migrate Old Settings To Templates',
      callback: () => {
        migrateSettings(this.settings)
      }
    })
    this.addCommand({
      id: 'obr-settings-automigration',
      name: 'Auto Migrate Old Settings To Templates',
      callback: () => {
        autoMigrate(this.settings)
      }
    })
    if(this.settings.autoMigrate) {
      autoMigrate(this.settings)
    }
  }

  onunload() {
    console.log('unloading plugin', APP_NAMING.appName)
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
    console.debug(this.settings)
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}
