/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import * as scraper from "../../../../src/core/scraper/lepoint.js";

describe("core/scraper/lepoint.js", function () {
    describe("extract()", function () {
        it("shouldn't handle when it's a unsupported URL", async function () {
            const url = new URL("https://moncompte.lepoint.fr/");

            const file = await scraper.extract(url);
            assert.equal(file, undefined);
        });

        it("should return undefined when it isn't a video", async function () {
            const url = new URL("https://www.lepoint.fr/foo");
            const content = {
                html: () =>
                    Promise.resolve(
                        new DOMParser().parseFromString(
                            `<html><body>
                               <blockquote></blockquote>
                             </body></html>`,
                            "text/html",
                        ),
                    ),
            };
            const options = { depth: false, incognito: false };

            const file = await scraper.extract(url, content, options);
            assert.equal(file, undefined);
        });

        it("should return URL", async function () {
            const url = new URL("https://www.lepoint.fr/foo");
            const content = {
                html: () =>
                    Promise.resolve(
                        new DOMParser().parseFromString(
                            `<html><body>
                               <blockquote class="video-dailymotion-unloaded"
                                           data-videoid="bar"></blockquote>
                             </body></html>`,
                            "text/html",
                        ),
                    ),
            };
            const options = { depth: false, incognito: true };

            const file = await scraper.extract(url, content, options);
            assert.equal(
                file,
                "plugin://plugin.video.dailymotion_com/?mode=playVideo&url=bar",
            );
        });
    });
});
