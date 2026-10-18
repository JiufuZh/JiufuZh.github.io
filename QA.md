# Verification

Checked October 17, 2026. The simpler personal-page revision passed local checks and is live.

| Check | Result |
|---|---|
| English content, employment, education, data counts | Pass. Reviewed against resume and user-confirmed project attribution. |
| Private disclosure boundary | Pass. No private source, report metrics, phone, address or original resume in public files. |
| Chess evidence | Pass. Actual local app captures; legal sample PGN, Stockfish analysis, candidate comparison and solved training position verified. No live LLM request. |
| FOW evidence | Pass. Conceptual workflow labeled; no performance chart or unverified GRU claim. |
| Local assets and section links | Pass. All referenced files and nonempty anchors resolve. |
| Script syntax | Pass for both JavaScript files. |
| Responsive layout | Pass at 320, 390, 768 and 1280 CSS-pixel widths; no horizontal overflow. Desktop, phone and tablet visually inspected. |
| Chess controls | Pass. Stage selection, animation start/stop, full-size dialog, next/previous stages, Escape and close behavior. |
| FOW controls | Pass. Four tabs, arrow/Home/End navigation. Keyboard focus pauses playback; fixed an autoplay/focus mismatch found by independent review. |
| Browser console | Pass. No warnings or errors during interaction checks. |
| Reduced motion | Pass. Emulated reduced motion: both demos static, smooth scrolling disabled. Emulation restored afterward. |
| GitHub publication | Pass. GitHub Pages reported built for website commit `1218018`. Live HTTPS page renders with portrait, Chess capture and four FOW stages. |

Screenshots are kept in ignored `.qa/`. Original research and reproduction details are kept in ignored `.research/`. Automated analysis does not establish user-perceived performance or WCAG conformance; no such certification is claimed.

## Personal-page revision

Removed promotional headings, decorative chrome and repeated benefit columns. Reviewed new copy against the same source facts. Checked desktop and phone screenshots, 320/390/768px overflow, stage selection, Chess playback and full-size dialog, FOW keyboard navigation and focus-triggered pause. Both scripts pass syntax checks; the browser reports no errors or warnings. Existing media and disclosure boundaries are unchanged. GitHub Pages built `491dfbc`; the live page shows the revised name heading and project sections.
