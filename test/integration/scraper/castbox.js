/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Castbox", function () {
    it("should return URL when it isn't an audio", async function () {
        const url = new URL(
            "https://castbox.fm/channel/Par-Jupiter-!-id1018326",
        );
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(file, url.href);
    });

    it("should return audio URL [audio]", async function () {
        const url = new URL(
            "https://castbox.fm/episode/'Ultramoderne'-id1018326-id255945951",
        );
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.ok(file?.endsWith(".mp3"), `"${file}"?.endsWith(...)`);
    });
});
