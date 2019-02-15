## SCSS Foundation

Styles are split up into five modules: `base`, `components`, `helpers`, `pages`, and `plugins`.

##### Base
Includes the foundational styles for the site.

* `fonts/` – Local font files
* `_baseline.scss` – Baseline styles for common/global HTML elements
* `_reset.scss` – Meyer style CSS reset
* `_typography.scss` – Base typography styles

##### Components
Styles for foundational components (e.g. `button`, `icons`, `video`, and `close`). (_not plugin components included via `repolist.txt`_)

##### Helpers
Variables, mixins, functions and utility classes.

##### Pages
Page-specific styles (e.g. `home`, `about`, or `contact`).

##### Plugins
Import core styles for Wagtail Foundation packages included via `repolist.txt`, and any overrides to these core styles. _(If you just need to override a package's variables, do that in `variables/_plugin-overrides.scss`.)_