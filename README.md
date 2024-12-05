# LoopQA Playwright Data-Driven
[![Playwright Tests](https://github.com/orieken/loopqa-playwright-data-driven/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/orieken/loopqa-playwright-data-driven/actions/workflows/playwright.yml) 
[Github Pages Latest Report](https://orieken.github.io/loopqa-playwright-data-driven/)

# Dependencies


# Getting Started
* Clone the project
* Ensure nodejs is installed (install via nvm, nodejs.org, or your favorite package manager)
* Run `npm install` to install the project deps
* Run `npx install playwright` to install the browsers
* Run `npm test` to execute the playwright tests

# Framework Concept
* Data-Driven Testing Framework
  * Data for the specs is being loaded from [data/test-cases.json](https://github.com/orieken/loopqa-playwright-data-driven/tree/main/data/test-cases.json)
  * Specs are dynamically generated from [specs/project-board.spec.ts](https://github.com/orieken/loopqa-playwright-data-driven/blob/main/specs/project-board.spec.ts)
* Page Object Framework
  * Follows the Site, Page, Element, Flow pattern from Taza
