/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import * as scraper from "../../../../src/core/scraper/noscript.js";

describe("core/scraper/noscript.js", function () {
    describe("extract()", function () {
        it("shouldn't handle when it's a unsupported URL", async function () {
            const url = new URL("https://foo.com/bar.zip");
            const content = { html: () => Promise.resolve(undefined) };
            const options = { depth: false };

            const file = await scraper.extract(url, content, options);
            assert.equal(file, undefined);
        });

        it("should return undefined when there isn't noscript", async function () {
            const url = new URL("https://foo.com/bar.html");
            const content = {
                html: () =>
                    Promise.resolve(
                        new DOMParser().parseFromString(
                            "<html><body></body></html>",
                            "text/html",
                        ),
                    ),
            };
            const options = { depth: false };

            const file = await scraper.extract(url, content, options);
            assert.equal(file, undefined);
        });

        it("should return undefined when noscript is empty", async function () {
            const url = new URL("https://foo.com/bar.html");
            const content = {
                html: () =>
                    Promise.resolve(
                        new DOMParser().parseFromString(
                            `<html><body>
                               <noscript></noscript>
                             </body></html>`,
                            "text/html",
                        ),
                    ),
            };
            const options = { depth: false };

            const file = await scraper.extract(url, content, options);
            assert.equal(file, undefined);
        });

        it("should return URL from video in noscript", async function () {
            const url = new URL("https://foo.com/bar.html");
            const content = {
                html: () =>
                    Promise.resolve(
                        new DOMParser().parseFromString(
                            `<html><body>
                               <noscript>
                                 <video src="https://baz.org/qux.mp4" />
                               </noscript>
                             </body></html>`,
                            "text/html",
                        ),
                    ),
            };
            const options = { depth: false, incognito: true };

            const file = await scraper.extract(url, content, options);
            assert.equal(file, "https://baz.org/qux.mp4");
        });

        it("should return URL from second noscript", async function () {
            const url = new URL("https://foo.com/bar.html");
            const content = {
                html: () =>
                    Promise.resolve(
                        new DOMParser().parseFromString(
                            `<html><body>
                               <noscript>
                                 <a href="http://baz.org/">link</a>
                               </noscript>
                               <noscript>
                                 <audio src="https://qux.org/quux.mp3" />
                               </noscript>
                             </body></html>`,
                            "text/html",
                        ),
                    ),
            };
            const options = { depth: false, incognito: false };

            const file = await scraper.extract(url, content, options);
            assert.equal(file, "https://qux.org/quux.mp3");
        });
    });
});
