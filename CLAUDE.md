# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an H5P (HTML5 Package) custom content type library for Massey University called "MU Assessment Overview". It creates a styled table widget that displays assessment information (name, learning outcomes, weighting, and due dates) for course pages on Moodle/Stream.

**Key characteristics:**
- Target platform: Massey University's Stream (Moodle) LMS
- Current version: 1.2.19 (defined in [library.json](H5P.MUAssessmentOverview/library.json))
- License: CC BY-SA 4.0
- Dependencies: H5P Framework 1.0+, H5PEditor.VerticalTabs 1.3+

## Repository Structure

```
H5P.MUAssessmentOverview/       # Main H5P library directory
├── mu-assessment-overview.js   # JavaScript implementation (H5P content type)
├── mu-assessment-overview.css  # Styles (including mu-table1-* utilities)
├── semantics.json              # H5P editor field definitions
├── library.json                # Library metadata and version
└── icon.svg                    # Library icon

content/
└── content.json                # Sample/test content instance

h5p.json                        # Package manifest (references main library)
Assessment overview.h5p         # Compiled H5P package file
zip.cmd                         # Build script (see below)
```

## Building the H5P Package

To create the distributable `.h5p` file (which is a specially-structured ZIP):

```cmd
zip.cmd
```

This executes: `wsl zip -0 -rDX "Assessment overview.h5p" content H5P.MUAssessmentOverview h5p.json`

**Requirements:** WSL with `zip` utility installed.

The resulting `.h5p` file can be uploaded to Stream at: https://stream.massey.ac.nz/h5p/libraries.php

## Architecture

### H5P Content Type Pattern

The codebase follows the standard H5P library structure:

1. **semantics.json** ([H5P.MUAssessmentOverview/semantics.json](H5P.MUAssessmentOverview/semantics.json)) - Defines the H5P editor interface:
   - List field for assessments (min 1, max 20)
   - Each assessment has 4 text fields: assessment name, learning outcomes, weighting, due date
   - Uses VerticalTabs widget for multi-item editing
   - Due date field supports HTML widget with limited tags (strong, em, u, a, hr)

2. **JavaScript implementation** ([mu-assessment-overview.js](H5P.MUAssessmentOverview/mu-assessment-overview.js:1-34)) - Content type behavior:
   - Constructor receives `options` (from semantics) and `id`
   - `attach()` method generates HTML table from `this.options.assessments` array
   - Uses template literals to build table rows
   - Applies `.h5p-assessments` container class for styling

3. **CSS styling** ([mu-assessment-overview.css](H5P.MUAssessmentOverview/mu-assessment-overview.css:1-50)) - Visual presentation:
   - Imports Roboto font (weights: 100, 300, 400, 500)
   - Defines `.h5p-assessments` container styles
   - Implements `mu-table1-*` table utilities (based on Bruce MacKay's CoHSS work)
   - Column widths: Assessment (40%), Learning Outcomes (12%), Weighting (12%), Due Date (35%)
   - Supports color variants: `mu-table1-grey` and `mu-table1-yellow`

### Key Implementation Details

- **Table generation**: The JavaScript iterates over `this.options.assessments` to build an HTML table string, then appends it to the H5P container
- **No state management**: This is a simple display widget with no interactivity or user input
- **Styling approach**: Uses both scoped `.h5p-assessments` styles and reusable `mu-table1-*` utilities for consistency with other Massey University content

## Version Management

When making changes that should be deployed:

1. Update version numbers in [library.json](H5P.MUAssessmentOverview/library.json#L5-L6):
   - Increment `patchVersion` for bug fixes
   - Increment `minorVersion` for new features (reset `patchVersion` to 0)
   - Increment `majorVersion` for breaking changes (reset minor/patch to 0)

2. Rebuild the package using [zip.cmd](zip.cmd)

3. Upload to Stream H5P library manager (link in [Notes.md](Notes.md#L6))

## Testing

Sample usage: https://stream.massey.ac.nz/course/view.php?id=76639#section-4

No automated tests are present. Test changes by:
1. Building the `.h5p` file
2. Uploading to Stream
3. Creating/editing content instances in a test course
