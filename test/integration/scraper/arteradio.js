/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Arte Radio", function () {
    it("should return audio URL", async function () {
        const url = new URL(
            "https://www.arteradio.com/son/61657661/fais_moi_ouir",
        );
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(
            file,
            "https://download.www.arte.tv/permanent/arteradio/sites/default" +
                "/files/sons/01faismoiouir_hq_fr.mp3",
        );
    });

    it("should return audio URL when protocol is HTTP", async function () {
        const url = new URL(
            "http://www.arteradio.com/son/61657661/fais_moi_ouir",
        );
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(
            file,
            "https://download.www.arte.tv/permanent/arteradio/sites/default" +
                "/files/sons/01faismoiouir_hq_fr.mp3",
        );
    });
});
