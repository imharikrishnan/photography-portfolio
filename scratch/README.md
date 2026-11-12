# Reusable Verification Test Suites

This directory contains automated, credentials-free end-to-end and regression test scripts for the photography portfolio:

### 1. `test-stage-c-e2e.mjs`
- **Purpose**: Verifies Sanity webhook HMAC-SHA256 signature verification, secret requirement, draft mode bypass cookies, open-redirect neutralization, and Cache-Control headers against a production server.
- **Execution**: `node scratch/test-stage-c-e2e.mjs`
- **Security**: Uses local ephemeral test secret strings for testing HMAC calculations; contains zero real API tokens or secrets.

### 2. `test-lifecycle-revalidation.mjs`
- **Purpose**: Verifies all document mutation events across photograph, collection, and site settings lifecycles (create, update/rename, delete with coalesce, raw before fallback, and draft ignore).
- **Execution**: `node scratch/test-lifecycle-revalidation.mjs`

### 3. `test-stage-d-regression.mjs`
- **Purpose**: Headless Chrome DevTools Protocol (CDP) test verifying visual rendering, navigation, live Sanity image rendering, category filtering, mobile layouts (390×844), and preservation of the monumental `HARI` watermark.
- **Execution**: `node scratch/test-stage-d-regression.mjs`
