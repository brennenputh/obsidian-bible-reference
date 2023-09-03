## Obsidian Bible Reference

[![CodeQL](https://github.com/tim-hub/obsidian-bible-reference/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/tim-hub/obsidian-bible-reference/actions/workflows/codeql-analysis.yml) [![Build](https://github.com/tim-hub/obsidian-bible-reference/actions/workflows/build.yml/badge.svg)](https://github.com/tim-hub/obsidian-bible-reference/actions/workflows/build.yml)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/tim-hub)

> These will be very appreciate for the project development. 👍
>
> - 👉 `Star` the Project
> - ☕️ **Buy me a coffee** @[Github Sponsor](https://github.com/sponsors/tim-hub)
> - ❤️ Provide Feedback in [`Issues`](https://github.com/tim-hub/obsidian-bible-reference/issues) or on [`Twitter`](https://twitter.com/TechTim42)

---

## About

- Taking Bible Study note in Obsidian.md application easily.
- Automatically suggesting Bible Verses as references.

![obsidian bible reference demo](https://raw.githubusercontent.com/tim-hub/obsidian-bible-reference/master/docs/obsidian-bible-reference-demo.gif)

## How to use

1. Open a note in Obsidian.md application
2. In a note, for example type `--John1:1`
3. Select the suggestion

![obsidian bible reference demo](https://raw.githubusercontent.com/tim-hub/obsidian-bible-reference/master/docs/obsidian-bible-reference-demo-setting.gif)

### How to Change Bible Version

1. Open `Settings`
2. Click `Bible Version` in Plugin Options section
3. Select the Bible Version you want to use
   1. Formatting in `Paragraph` or `Single Line`
   2. Verse Number Formatting

### Formatting Strings

These are special substitutions used in the formatting settings.

| Template String          | Substitution                 |
|--------------------------|------------------------------|
| {{bible_version}}        | Current Bible version        |
| {{book}}                 | Name of the quoted book      |
| {{chapter}}              | Number of the quoted chapter |
| {{verse_range}}          | Range of quoted verses       |
| {{verse_reference_link}} | Link to the API reference    |
| {{content}}              | The verse content            |

## How to install

1. On the Obsidian's `Settings`
2. Browse the Community plugins and search `Bible Reference`
3. Then install and enable it

## Others

> This plugin Bible Verse Query Functionality is currently powered by Public Bible API,
> Here is about the APIs used here, and what Bible version are supported
>
> - [Bible API and Bible Versions](docs/bible-api-and-source.md)

- [Making contributions](CONTRIBUTING.md) All kinds of Contributing is appreciated,
  - maintaining the project code base,
  - improving the documentation,
  - testing, feedback and feature requests,
  - localization,
  - and so on
- [Issues or Feature Requests of Obsidian Bible Reference](https://github.com/tim-hub/obsidian-bible-reference/issues)
- [Discussion about Obsidian Bible Reference](https://github.com/tim-hub/obsidian-bible-reference/discussions)
  - This is [a discussion](https://github.com/tim-hub/obsidian-bible-reference/discussions/77) from Jeremy(@JPT62089) regarding Svelte, Localization and other features

### Credits

| Name           |               Github Username                | Note                                                                        |
| :------------- | :------------------------------------------: | --------------------------------------------------------------------------- |
| Tim Morgan     |    [@seven1m](https://github.com/seven1m)    | For the open source bible-api project and the maintenance of bible-api.com. |
| Bolls Life API | [@bpavlisinec](mailto:bpavlisinec@gmail.com) | For the free public bible API.                                              |

> [**All Contributors**](https://github.com/tim-hub/obsidian-bible-reference/graphs/contributors) 👍🙏
