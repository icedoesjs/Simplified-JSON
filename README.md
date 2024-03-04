<h1 align="center">Simplified JSON</h1>
<p align="center">The JSON we all know and love, but variable support built-in</p>

<h2 align ="center">Why?</h2>
<p align="center"><b>Simplified JSON</b> orignally started out when I was creating a JSON validator, but I kept getting my sytnax wrong because of mistypes. I
got tired of quotes and colons, I wanted something more simple. I brainstormed if I made a version of JSON how I would want the sytntax, not only to make it 
easy to write for me but easy to read for people with no experience, they simply want to edit configs. I added support for variables, booleans are now simple
yes and no values and no quotes are needed as type detection is built-in.</p>

<h2 align="center">Usage</h2>
<p align="center">You can see examples over in the <b>examples</b> folder.</p>

<h2 align="center">Syntax</h2>
<p align="center">
  - Comments: !! This is a comment <br>
  - Variable Definitions (non file): *define VarName as VarValue <br>
  - Variable Definitions (TXT file): *define VarName as require('file.txt') <br>
  - Variable Definitions (JS file): *define VarName as require('file.js') <br>
  - Variable Usage: key = *VarName* <br>
  - KV Pairs: key = value <br>
  - Objects: See examples (KV pairs in sections MUST be indented) <br>
  - Arrays (multiple items): key = [ArrayItem1, ArrayItem2] <br>
  - Arrays (single item): key = [ArrayItem1, none] <br>
  - Null values: nill <br>
  - Booleans: yes, no <br>
</p>

<h2 align="center">Notes</h2>
<p align="center">
  - Variables extracted from JS files must share the same name as the one defined. <br>
  - Indentation must be followed. <br>
  - The system will see slowdowns should a large variable definition be present. <br>
</p>

<h2 align="center">Planned features</h2>
<p align="center">
  1. Support for nested objects <br>
  2. Array of Objects support <br>
</p>
