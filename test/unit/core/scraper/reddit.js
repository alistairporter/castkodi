/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import * as scraper from "../../../../src/core/scraper/reddit.js";

describe("core/scraper/reddit.js", function () {
    describe("extract()", function () {
        it("shouldn't handle when it's a unsupported URL", async function () {
            const url = new URL("https://www.reddit.com/");

            const file = await scraper.extract(url);
            assert.equal(file, undefined);
        });

        it("should return undefined when it isn't a video", async function () {
            const url = new URL("https://www.redditmedia.com/mediaembed/foo");
            const content = {
                html: () =>
                    Promise.resolve(
                        new DOMParser().parseFromString(
                            "<html><body></body></html>",
                            "text/html",
                        ),
                    ),
            };

            const file = await scraper.extract(url, content);
            assert.equal(file, undefined);
        });

        it("should return video URL", async function () {
            const url = new URL("https://www.redditmedia.com/mediaembed/foo");
            const content = {
                html: () =>
                    Promise.resolve(
                        new DOMParser().parseFromString(
                            `<html><body>
                               <div data-hls-url="https://bar.com/baz.m3u8" />
                             </body></html>`,
                            "text/html",
                        ),
                    ),
            };

            const file = await scraper.extract(url, content);
            assert.equal(file, "https://bar.com/baz.m3u8");
        });
    });
});
