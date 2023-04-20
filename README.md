<h1 align="center">Simplified JSON</h1>
<p align="center">The JSON we all know and love but neat and support for variables.</p>

<h2 align ="center">Why?</h2>
<p align="center"><b>Simplified JSON</b> orignally started out when I was creating a JSON validator, but I kept getting my sytnax wrong because of mistypes. I
got tires of quotes and colons, I wanted something more simple. I brainstormed if I made a version of JSON how I would want the sytntax, not only to make it 
easy to write for me but easy to read for people with no experience, but they simply want to edit configs. I added support for variables, booleans are now simple
yes and no values and no quotes are needed as type detection is built-in.</p>

<h2 align="center">Usage</h2>
<p align="center">You can see examples over in the <b>examples</b> folder.</p>

<h2 align="center">Syntax</h2>
<p align="center">
  - Comments: !! This is a comment
  - Variable Definitions (non file): *define VarName as VarValue
  - Variable Definitions (file): *define VarnName as require('file.txt')
  - Variable Usage: key = *VarName*
  - KV Pairs: key = value
  - Objects: See examples (KV pairs in sections MUST be indented)
  - Arrays (multiple items): key = [ArrayItem1, ArrayItem2]
  - Arrays (single item): key = [ArrayItem1, none]
  - Null values: nill
  - Booleans: yes, no
</p>

<h2 align="center">Planned features</h2>
<p align="center">
  1. Support for variable extraction from JS files
  2. Support for nested objects
  3. Type detection in arrays
</p>
