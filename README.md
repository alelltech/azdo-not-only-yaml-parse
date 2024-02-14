# NOY Parse

**Not Only Yaml Parse** task!

This extension provides 3 tasks!

* `JsonParse`
* `YamlParse`
* `XmlParse`

## Features

* Parse `Yaml` document from **File**, **Raw Text** or an **Variable**.
* Parse `Json` document from **File**, **Raw Text** or an **Variable**.
* Parse `Xml` document from **File**, **Raw Text** or an **Variable**.
* Query across documents and fields using [jsonpath-plus](https://jsonpath-plus.github.io/JSONPath/docs/ts/).
* Extract values from multiple queries to **File**, **echo** or **Variable**.
* **Pipe based** utility functions (only *downcase* and *uppercase* until now).

> You can test our **jsonpath** expressions [here](https://jsonpath-plus.github.io/JSONPath/demo/), but first you must convert your [**yaml-to-json**](https://www.json2yaml.com/convert-yaml-to-json).

## Basic queries syntax

<pre class="language-custom">
<code><span class="hlcl-comment"># Extract results to variables</span>
<span class="hlcl-keyword">var</span> NAME <span class="hlcl-operator">=</span> <span class="hlcl-punctuation">.</span><span class="hlcl-string">metadata</span><span class="hlcl-punctuation">.</span><span class="hlcl-string">name</span> <span class="hlcl-operator">|</span> downcase
<span class="hlcl-keyword">var</span> KIND <span class="hlcl-operator">=</span> <span class="hlcl-punctuation">.</span><span class="hlcl-string">kind</span>

<span class="hlcl-comment"># Just print results</span>
<span class="hlcl-keyword">echo</span> <span class="hlcl-punctuation">.</span><span class="hlcl-string">kind</span>

<span class="hlcl-comment"># Extract results to JSON file</span>
<span class="hlcl-keyword">file</span> <span class="hlcl-string">./bar/annotations.json</span> <span class="hlcl-operator">=</span> <span class="hlcl-punctuation">.</span><span class="hlcl-string">metadata</span><span class="hlcl-punctuation">.</span><span class="hlcl-string">annotations</span>
</code></pre>


## Usage sample

```yaml
- job:
  ...
  steps:
  - task: YamlParse@4
    displayName: "Extract catalog-info.yaml info"
    inputs:
      source: catalog-info.yaml
      sourceType: file
      queries: |
        # Extract results to variables
        var NAME = .metadata.name | downcase
        var KIND = .kind

        # Just print results
        echo .kind

        # Extract results to JSON file
        file ./foo/bar.json = .metadata.annotations

  - task: XmlParse@4
    displayName: Extract pom.xml info
    inputs:
      sourceType: 'file'
      source: 'pom.xml'
      queries: |
        var VERSION = .project.version._text
        var ARTIFACT_ID = .project.artifactId._text
        var GROUP_ID = .project.groupId._text
        var PACKAGING = .project.packaging._text

  - task: JsonParse@4
    displayName: Extract package.json info
    inputs:
      sourceType: 'file'
      source: 'package.json'
      queries: |
        var NAME = .name
        var VERSION = .version

```

## Help us

See []

<style>

/*
https://raw.githubusercontent.com/isagalaev/highlight.js/master/src/styles/vs2015.css
*/
/*
 * Visual Studio 2015 dark style
 * Author: Nicolas LLOBERA <nllobera@gmail.com>
 */


.hlcl-keyword,
.hlcl-literal,
.hlcl-symbol,
.hlcl-name {
	color: #569CD6;
}
.hlcl-link {
	color: #569CD6;
	text-decoration: underline;
}

.hlcl-built_in,
.hlcl-type {
	color: #4EC9B0;
}

.hlcl-number,
.hlcl-class {
	color: #B8D7A3;
}

.hlcl-string,
.hlcl-meta-string {
	color: #D69D85;
}

.hlcl-regexp,
.hlcl-template-tag {
	color: #9A5334;
}

.hlcl-subst,
.hlcl-function,
.hlcl-title,
.hlcl-params,
.hlcl-formula {
	color: #DCDCDC;
}

.hlcl-comment,
.hlcl-quote {
	color: #57A64A;
	font-style: italic;
}

.hlcl-doctag {
	color: #608B4E;
}

.hlcl-meta,
.hlcl-meta-keyword,
.hlcl-tag {
	color: #9B9B9B;
}

.hlcl-variable,
.hlcl-template-variable {
	color: #BD63C5;
}

.hlcl-attr,
.hlcl-attribute,
.hlcl-builtin-name {
	color: #9CDCFE;
}

.hlcl-section {
	color: gold;
}

.hlcl-emphasis {
	font-style: italic;
}

.hlcl-strong {
	font-weight: bold;
}

/*.hlcl-code {
	font-family:'Monospace';
}*/

.hlcl-bullet,
.hlcl-selector-tag,
.hlcl-selector-id,
.hlcl-selector-class,
.hlcl-selector-attr,
.hlcl-selector-pseudo {
	color: #D7BA7D;
}

.hlcl-addition {
	background-color: var(--vscode-diffEditor-insertedTextBackground, rgba(155, 185, 85, 0.2));
	color: rgb(155, 185, 85);
	display: inline-block;
	width: 100%;
}

.hlcl-deletion {
	background: var(--vscode-diffEditor-removedTextBackground, rgba(255, 0, 0, 0.2));
	color: rgb(255, 0, 0);
	display: inline-block;
	width: 100%;
}


/*
From https://raw.githubusercontent.com/isagalaev/highlight.js/master/src/styles/vs.css
*/
/*

Visual Studio-like style based on original C# coloring by Jason Diamond <jason@diamond.name>

*/

.vscode-light .hlcl-function,
.vscode-light .hlcl-params,
.vscode-light .hlcl-number,
.vscode-light .hlcl-class  {
	color: inherit;
}

.vscode-light .hlcl-comment,
.vscode-light .hlcl-quote,
.vscode-light .hlcl-number,
.vscode-light .hlcl-class,
.vscode-light .hlcl-variable {
	color: #008000;
}

.vscode-light .hlcl-keyword,
.vscode-light .hlcl-selector-tag,
.vscode-light .hlcl-name,
.vscode-light .hlcl-tag {
	color: #00f;
}

.vscode-light .hlcl-built_in,
.vscode-light .hlcl-builtin-name {
	color: #007acc;
}

.vscode-light .hlcl-string,
.vscode-light .hlcl-section,
.vscode-light .hlcl-attribute,
.vscode-light .hlcl-literal,
.vscode-light .hlcl-template-tag,
.vscode-light .hlcl-template-variable,
.vscode-light .hlcl-type {
	color: #a31515;
}

.vscode-light .hlcl-selector-attr,
.vscode-light .hlcl-selector-pseudo,
.vscode-light .hlcl-meta,
.vscode-light .hlcl-meta-keyword {
	color: #2b91af;
}

.vscode-light .hlcl-title,
.vscode-light .hlcl-doctag {
	color: #808080;
}

.vscode-light .hlcl-attr {
	color: #f00;
}

.vscode-light .hlcl-symbol,
.vscode-light .hlcl-bullet,
.vscode-light .hlcl-link {
	color: #00b0e8;
}


.vscode-light .hlcl-emphasis {
	font-style: italic;
}

.vscode-light .hlcl-strong {
	font-weight: bold;
}

</style>
