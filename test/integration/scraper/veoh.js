/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Veoh", function () {
    it("should return URL when there isn't video", async function () {
        const url = new URL("https://www.veoh.com/watch/v52936940QEbxjapF");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(file, url.href);
    });

    it("should return URL when page doesn't exist", async function () {
        const url = new URL("https://www.veoh.com/watch/A1b2C3");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(file, url.href);
    });

    it("should return video URL", async function () {
        const url = new URL("https://www.veoh.com/watch/v141918964qPaACxYC");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.ok(
            file?.startsWith(
                "https://redirect.veoh.com/flash/p/2/v141918964qPaACxYC" +
                    "/h141918964.mp4",
            ),
            `"${file}"?.startsWith(...)`,
        );
    });
});
