/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Radio", function () {
    it("should return URL when it isn't an audio", async function () {
        const url = new URL("https://www.radio.net/country-selector");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(file, url.href);
    });

    it("should return audio URL", async function () {
        const url = new URL("https://www.radio.net/s/fip");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(file, "https://icecast.radiofrance.fr/fip-hifi.aac");
    });

    it("should return audio URL when protocol is HTTP", async function () {
        const url = new URL("http://www.radio.net/s/franceinter");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(
            file,
            "https://icecast.radiofrance.fr/franceinter-hifi.aac",
        );
    });

    it("should return audio URL when URL has subdomain", async function () {
        const url = new URL("https://br.radio.net/s/antena1br");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(file, "https://antenaone.crossradio.com.br/stream/1/");
    });

    it("should return audio URL from french version", async function () {
        const url = new URL("https://www.radio.fr/s/franceinfo");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.equal(
            file,
            "https://icecast.radiofrance.fr/franceinfo-midfi.mp3",
        );
    });
});
