import { IBibleVersion } from '../interfaces/IBibleVersion'
import { BibleAPIDotComProvider } from './BibleAPIDotComProvider'
import { BaseBibleAPIProvider } from './BaseBibleAPIProvider'
import { BibleAPISourceCollection } from '../data/BibleApiSourceCollection'
import { BollyLifeProvider } from './BollyLifeProvider'

/**
 * A factory for Bible API providers.
 * To create provider instance and decide which provider to use.
 */
export class ProviderFactory {
  // define a single instance of BibleAPIFactory
  private static _instance: ProviderFactory

  // private constructor
  private constructor() {
    if (ProviderFactory._instance) {
      throw new Error(
        'Error: Instantiation failed: Use BibleAPIFactory.Instance instead of new.'
      )
    }
    ProviderFactory._instance = this
  }

  // get instance of BibleAPIFactory
  public static get Instance(): ProviderFactory {
    if (
      ProviderFactory._instance === null ||
      ProviderFactory._instance === undefined
    ) {
      ProviderFactory._instance = new ProviderFactory()
    }
    return ProviderFactory._instance
  }

  /**
   * Get the bible api provider from bible version selected
   * @param bibleVersion
   * @constructor
   */
  public BuildBibleVersionAPIAdapterFromIBibleVersion(
    bibleVersion: IBibleVersion
  ): BaseBibleAPIProvider {
    switch (bibleVersion.apiSource) {
      case BibleAPISourceCollection.bibleApi: {
        return new BibleAPIDotComProvider(bibleVersion)
      }
      case BibleAPISourceCollection.bollsLife: {
        return new BollyLifeProvider(bibleVersion)
      }
      default: {
        return new BibleAPIDotComProvider(bibleVersion)
      }
    }
  }
}
