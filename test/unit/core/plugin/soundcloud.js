/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import sinon from "sinon";
import * as plugin from "../../../../src/core/plugin/soundcloud.js";

describe("core/plugin/soundcloud.js", function () {
    describe("generateUrl()", function () {
        it("should return URL with video URL", async function () {
            const label = await plugin.generateUrl(
                new URL("http://foo.com/bar.html"),
            );
            assert.equal(
                label,
                "plugin://plugin.audio.soundcloud/play/" +
                    "?url=http%3A%2F%2Ffoo.com%2Fbar.html",
            );
        });
    });

    describe("extract()", function () {
        it("should return undefined when there isn't 'url' parameter", async function () {
            const url = new URL(
                "plugin://plugin.audio.soundcloud/play/?foo=bar",
            );

            const label = await plugin.extract(url);
            assert.equal(label, undefined);
        });

        it("should return audio label", async function () {
            const stub = sinon.stub(globalThis, "fetch").resolves(
                new Response(
                    `<html><head>
                       <meta property="og:title" content="foo" />
                     </head></html>`,
                ),
            );

            const url = new URL(
                "plugin://plugin.audio.soundcloud/play/" +
                    "?url=http%3A%2F%2Fbar.com%2F",
            );

            const label = await plugin.extract(url);
            assert.equal(label, "foo");

            assert.equal(stub.callCount, 1);
            assert.deepEqual(stub.firstCall.args, [new URL("http://bar.com/")]);
        });

        it("should return undefined when it isn't audio page", async function () {
            const stub = sinon
                .stub(globalThis, "fetch")
                .resolves(new Response("<html><head></head></html>"));

            const url = new URL(
                "plugin://plugin.audio.soundcloud/play/" +
                    "?url=http%3A%2F%2Ffoo.com%2F",
            );

            const label = await plugin.extract(url);
            assert.equal(label, undefined);

            assert.equal(stub.callCount, 1);
            assert.deepEqual(stub.firstCall.args, [new URL("http://foo.com/")]);
        });
    });
});
