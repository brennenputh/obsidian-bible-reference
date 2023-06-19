import {
  BibleReferencePluginSettings,
  DEFAULT_SETTINGS,
} from './data/constants'
import { BibleVersionCollection } from './data/BibleVersionCollection'
import { IBibleVersion } from './interfaces/IBibleVersion'
import { IVerseSuggesting } from './interfaces/IVerseSuggesting'
import { IVerse } from './interfaces/IVerse'
import { BibleAPIFactory } from './provider/BibleAPIFactory'
import { BibleProvider } from './provider/BibleProvider'
import { BibleVerseReferenceLinkPosition } from './data/BibleVerseReferenceLinkPosition'
import { BibleVerseNumberFormat } from './data/BibleVerseNumberFormat'
import { BibleVerseFormat } from './data/BibleVerseFormat'

const BOOK_REGEX = /[123]*[ ]*[a-zA-Z]{3,}/
const CHAPTER_REGEX = /[123]*[ ]*[a-zA-Z]{3,}[ ]*[0-9]*/


export class VerseSuggesting implements IVerseSuggesting {
  public text: string
  public verses: string
  public bibleVersion: string
  private bibleProvider: BibleProvider

  constructor(
    public settings: BibleReferencePluginSettings,
    public bookName: string,
    public chapterNumber: number,
    public verseNumber: number,
    public verseNumberEnd?: number
  ) {
    this.bookName = bookName
    this.chapterNumber = chapterNumber
    this.verseNumber = verseNumber
    this.verseNumberEnd = verseNumberEnd
    this.bibleVersion = settings.bibleVersion
  }

  /**
   * To get the content of the bible verses
   * @constructor
   */
  public get ReplacementContent(): string {
    let head = `> [!Bible]`
    let bottom = ''
    if (this.settings?.collapsibleVerses) {
      head += '-'
    }
    if (
      this.settings.referenceLinkPosition ===
        BibleVerseReferenceLinkPosition.Header ||
      this.settings.referenceLinkPosition ===
        BibleVerseReferenceLinkPosition.AllAbove
    ) {
      head += this.getVerseReference()
    }
    if (
      this.settings.referenceLinkPosition ===
        BibleVerseReferenceLinkPosition.Bottom ||
      this.settings.referenceLinkPosition ===
        BibleVerseReferenceLinkPosition.AllAbove
    ) {
      bottom += `> \n ${this.getVerseReference()}`
    }

    // backlinks and tags use the BibleReferenceHeader 
    //  and regex to clean book and chapters that will match
    //  across multiple different search queires
    if (this.settings?.bookBacklinking){
      head += ` [[${this.bibleProvider.BibleReferenceHead.match(BOOK_REGEX)![0].replace(/\s+/g, '').toLowerCase()}]]`
    }
    if (this.settings?.chapterBacklinking){
      head += ` [[${this.bibleProvider.BibleReferenceHead.match(CHAPTER_REGEX)![0].replace(/\s+/g, '').toLowerCase()}]]`
    }
    if (
      this.settings?.bibleTagging ||
      this.settings?.bookTagging ||
      this.settings?.chapterTagging) {
      bottom += ' %%'
      bottom += (this.settings?.bibleTagging) ? ' #bible' : ''
      bottom += (this.settings?.bookTagging) ? ` #${this.bibleProvider.BibleReferenceHead.match(BOOK_REGEX)![0].replace(/\s+/g, '').toLowerCase()}` : ''
      bottom += (this.settings?.chapterTagging) ? ` #${this.bibleProvider.BibleReferenceHead.match(CHAPTER_REGEX)![0].replace(/\s+/g, '').toLowerCase()}` : ''
      bottom += ' %%'
    }

    return [head, this.text, bottom].join('\n')
  }

  public async getVerses(): Promise<IVerse[]> {
    console.debug(this.bibleVersion)
    if (this.bibleVersion === DEFAULT_SETTINGS.bibleVersion) {
      console.debug('match to default language plus version')
    }
    const bibleVersion =
      BibleVersionCollection.find(
        (bv: IBibleVersion) => bv.key === this.bibleVersion
      ) ?? BibleVersionCollection[0]
    if (
      !this.bibleProvider ||
      this.bibleProvider.BibleVersionKey !== bibleVersion?.key
    ) {
      // make sure this is only 1 adapter, and it is the same bible version
      this.bibleProvider =
        BibleAPIFactory.Instance.BuildBibleVersionAPIAdapterFromIBibleVersion(
          bibleVersion
        )
    }
    return this.bibleProvider.query(
      this.bookName,
      this.chapterNumber,
      this?.verseNumberEnd
        ? [this.verseNumber, this.verseNumberEnd]
        : [this.verseNumber]
    )
  }

  private formatVerseNumber(verseNumber: number | string) {
    let verseNumberFormatted = ''
    switch (this.settings.verseNumberFormatting) {
      case BibleVerseNumberFormat.Period:
        verseNumberFormatted += verseNumber + '. '
        return verseNumberFormatted
      case BibleVerseNumberFormat.PeriodParenthesis:
        verseNumberFormatted += verseNumber + '.) '
        return verseNumberFormatted
      case BibleVerseNumberFormat.Parenthesis:
        verseNumberFormatted += verseNumber + ') '
        return verseNumberFormatted
      case BibleVerseNumberFormat.Dash:
        verseNumberFormatted += verseNumber + ' - '
        return verseNumberFormatted
      case BibleVerseNumberFormat.NumberOnly:
        verseNumberFormatted += verseNumber + ' '
        return verseNumberFormatted
      case BibleVerseNumberFormat.SuperScript:
        verseNumberFormatted += '<sup> ' + verseNumber + ' </sup>'
        return verseNumberFormatted
      case BibleVerseNumberFormat.SuperScriptBold:
        verseNumberFormatted += '<sup> **' + verseNumber + '** </sup>'
        return verseNumberFormatted
      case BibleVerseNumberFormat.None:
        verseNumberFormatted = ' '
        return verseNumberFormatted
      default:
        verseNumberFormatted += verseNumber + '. '
        return verseNumberFormatted
    }
  }

  public async fetchAndSetVersesText(): Promise<void> {
    // todo add a caching here, this might not be possible with Obsidian limit
    const verses = await this.getVerses()
    let text = ''

    if (this.settings.verseFormatting === BibleVerseFormat.Paragraph) {
      text = '> '
    } else {
      text = ''
    }
    verses.forEach((verse) => {
      const verseNumberFormatted = this.formatVerseNumber(verse.verse)
      if (this.settings.verseFormatting === BibleVerseFormat.Paragraph) {
        text +=
          ' ' + verseNumberFormatted + verse.text.trim().replaceAll('\n', ' ')
      } else {
        text += '> ' + verseNumberFormatted + verse.text.trim() + '\n'
      }
    })
    this.text = text.trim()
  }

  public getVerseReference(): string {
    let bibleReferenceTitle = this.bibleProvider.BibleReferenceHead;

    // The bolls life API returns the book name without any spaces - that doesn't look right.
    if(bibleReferenceTitle.match('^[0-9]\s.*')) {
      bibleReferenceTitle = bibleReferenceTitle[0] + " " + bibleReferenceTitle.slice(1)
    }
    
    return ` [${
      bibleReferenceTitle
    } - ${this.bibleVersion.toUpperCase()}](${this.bibleProvider.VerseLinkURL})`
  }

  /**
   * Render for use in editor/modal suggest
   */
  public renderSuggestion(el: HTMLElement) {
    const outer = el.createDiv({ cls: 'obr-suggester-container' })
    outer.createDiv({ cls: 'obr-shortcode' }).setText(this.text)
  }
}
