# AdGuard Translate

Simple internationalization library with React integration

* [Installation](#installation)
    * [npm](#npm)
    * [Yarn](#yarn)
* [Usage](#usage)
    * [Messages format](#messages-format)
        * [Placeholders](#placeholders)
        * [Tags support](#tags-support)
            * [Default list of tags](#default-list-of-tags)
        * [Plural strings](#plural-strings)
    * [translate](#translate)
        * [createTranslator](#create-translator)
        * [createReactTranslator](#create-react-translator)
    * [validator](#validator)
        * [isTranslationValid](#is-translation-valid)
        * [isPluralFormValid](#is-plural-form-valid)
    * [API](#api)
        * [createTranslator](#api-create-translator)
        * [createReactTranslator](#api-create-react-translator)
        * [isTranslationValid](#api-is-translation-valid)
        * [isPluralFormValid](#api-is-plural-form-valid)
* [Development](#development)
    * [Build](#build)
    * [Lint](#lint)
    * [Test](#test)
    * [Docs](#docs)
    * [TODO](#todo)
* [License](#license)

## <a id="installation"></a> Installation

### <a id="npm"></a> npm

```
npm install @adguard/translate
```

### <a id="yarn"></a> Yarn

```
yarn add @adguard/translate
```

## <a id="usage"></a> Usage

### <a id="messages-format"></a> Messages format

Library supports messages with placeholders, tags and plural forms

#### <a id="placeholders"></a> Placeholders

Placeholders should be wrapped in `%` mark

e.g.

```
"agreement_consent": {
    "message": "Servers number %count%",
}
```

#### <a id="tags"></a> Tags support

Library supports open/close tags, and their values should be provided in the `translate` method

e.g.

```
<a>link</a> to the text
```

and void tags

e.g.

```
<img src="server.jpg" >
```

##### <a id="default-list-of-tags"></a> Default list of tags

Next tags are not required in the `translate`, because they are provided by default

```
    <b>, <p>, <strong>, <tt>, <s>, <i>,
```

#### <a id="plural-strings"></a> Plural strings

Library supports plural strings translation.

e.g.

```
Нет серверов | %count% сервер | %count% сервера | %count% серверов
```

Plural strings should follow simple rules.

1. Plural forms should be divided by `|`.
2. Plural forms count should correspond to the language plural forms count ([table](https://github.com/translate/l10n-guide/blob/master/docs/l10n/pluralforms.rst)) + 1 (zero form).
3. If first plural form is omitted, for the zero form you'll get empty string

```
| %count% сервер | %count% сервера | %count% серверов
```

### <a id="translate"></a> translate

```
// import library
import { translate } from '@adguard/translate'

// create i18n object which implements I18nInterface:
interface I18nInterface {
    /**
     * Returns message by key for current locale
     * @param key
     */
    getMessage(key: string): string;

    /**
     * Returns current locale code
     * Locale codes should be in the list of Locales
     */
    getUILanguage(): Locales;

    /**
     * Returns base locale message
     * @param key
     */
    getBaseMessage(key: string): string;

    /**
     * Returns base locale code
     */
    getBaseUILanguage(): Locales;
}

// in the browser extension it will be "browser.i18n"

// create translate function
const translator = translate.createTranslator(i18n)

// e.g.
//  string to translate:
//  "agreement_consent": {
//      "message": "You agree to our <eula>EULA</eula>",
//  }
```

#### <a id="create-translator"></a> createTranslator

This method can be used to translate simple strings and Vue template strings

```
const translator = translate.createTranslator(browser.i18n);
const translatedString = translator.getMessage('agreement_consent', {
    eula: (chunks) => `<button class="privacy-link">${chunks}</button>`,
});

console.log(translatedString); // <button class="privacy-link">EULA</button>
```

#### <a id="create-react-translator"></a> createReactTranslator

```
const reactTranslator = translate.createReactTranslator(browser.i18n, React);

<div>
    {reactTranslator.getMessage('agreement_consent', {
        eula: (chunks) => (
            <button
                className="auth__term"
                onClick={handleEulaClick}
            >
                {chunks}
            </button>
        ),
    })}
</div>
```

### <a id="validator"></a> validator

```
// import library
import { validator } from '@adguard/translate'
```

#### <a id="is-translation-valid"></a> isTranslationValid

```
const baseMessage = 'test string <a>has node</a>';
const targetMessage = 'тестовая строка <a>с нодой</a>';

validator.isTranslationValid(baseMessage, targetMessage); // true
```

#### <a id="is-plural-form-valid"></a> isPluralFormValid

```
validator.isPluralFormValid(%count% серверов | %count% сервер | %count% сервера | %count% серверов, 'ru', "servers_count"); // true, all 4 plural forms are provided

validator.isPluralFormValid(%count% сервера | %count% серверов, 'ru', "servers_count"); // false, ru locale awaits for 4 plural forms provided
```

### <a id="api"></a> API

#### <a id="api-create-translator"></a> createTranslator

```
/**
 * Creates translator instance strings, by default for simple strings
 * @param i18n - function which returns translated message by key
 * @param messageConstructor - function that will collect messages
 * @param values - map with default values for tag converters
 */
const createTranslator = (
    i18n: I18nInterface,
    messageConstructor?: MessageConstructorInterface,
    values?: ValuesAny
): Translator
```

#### <a id="api-create-react-translator"></a> createReactTranslator

```
/**
 * Creates translation function for strings used in the React components
 * We do not import React directly, because translator module can be used
 * in the modules without React too
 *
 *
 * @param i18n - object with methods which get translated message by key and return current locale
 * @param React - instance of react library
 */
  const createReactTranslator = (i18n: I18nInterface, React: ReactCustom): Translator
```

#### <a id="api-is-translation-valid"></a> isTranslationValid

```
/**
 * Validates translation against base string by AST (abstract syntax tree) structure
 * @param baseMessage - base message
 * @param translatedMessage - translated message
 */
const isTranslationValid = (baseMessage: string, translatedMessage: string): boolean
```

#### <a id="api-is-plural-form-valid"></a> isPluralFormValid

```
/**
 * Checks if plural forms are valid
 * @param str - message string
 * @param locale - message locale
 * @param key - message key, used for clearer log message
 */
const isPluralFormValid = (str: string, locale: Locales, key: string): boolean => {
```

## <a id="development"></a> Development

Use yarn to build the library

### <a id="build"></a> Build

To build the library run:

```
yarn build
```

Build result would be in the `dist` directory

### <a id="lint"></a> Lint

To check lint errors run in terminal:

```
yarn lint
```

### <a id="test"></a> Test

The library uses jest for running unit-tests. To launch the tests, run the following command in the terminal:

```
yarn test
```

### <a id="docs"></a> Docs

To build documentation, run the following command in the terminal:

```
yarn docs
```

### <a id="todo"></a> TODO

- [ ] Create Vue plugin
- [ ] Add utility to check if code contains unused or redundant translation messages

### <a id="license"></a> License

MIT
