import assert from 'node:assert/strict'
import test from 'node:test'
import { SECTION_EXPORTS, getOutputPath } from './export-redrawn-sections.mjs'

test('section export manifest uses stable png names and selectors', () => {
  assert.deepEqual(
    SECTION_EXPORTS.map((section) => section.name),
    [
      '01-hero-showreel-stats.png',
      '02-services.png',
      '04-growth-partner-selected-projects.png',
      '05-academy.png',
      '06-faq.png',
      '07-contact.png',
      '08-footer.png',
    ],
  )

  for (const section of SECTION_EXPORTS) {
    assert.ok(section.selectors.length > 0)
    assert.ok(section.selectors.every((selector) => selector.startsWith('#') || selector.startsWith('[data-export=')))
  }

  assert.equal(
    getOutputPath('design/d1cfc480-redrawn-sections', '02-services.png'),
    'design/d1cfc480-redrawn-sections/02-services.png',
  )
})
