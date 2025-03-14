/**
 * @module
 * @license MIT
 * @see https://kodi.wiki/view/Add-on:SoundCloud
 * @author Sébastien Règne
 */
/* eslint-disable require-await */

import * as labeller from "../labeller/soundcloud.js";
import { matchPattern } from "../tools/matchpattern.js";

/**
 * L'URL de l'extension pour lire des musiques issues de SoundCloud.
 *
 * @type {string}
 */
const PLUGIN_URL = "plugin://plugin.audio.soundcloud/play/?url=";

/**
 * Génère l'URL d'une musique dans l'extension SoundCloud.
 *
 * @param {URL} audioUrl L'URL de la musique SoundCloud.
 * @returns {Promise<string>} Une promesse contenant le lien du
 *                            <em>fichier</em>.
 */
export const generateUrl = async function ({ href }) {
    return PLUGIN_URL + encodeURIComponent(href);
};

/**
 * Extrait le titre d'un son SoundCloud.
 *
 * @param {URL} url L'URL utilisant le plugin de SoundCloud.
 * @returns {Promise<string|undefined>} Une promesse contenant le titre ou
 *                                      <code>undefined</code>.
 */
const action = async function ({ searchParams }) {
    if (searchParams.has("url")) {
        const href = decodeURIComponent(searchParams.get("url"));
        return labeller.extract(new URL(href));
    }
    return undefined;
};
export const extract = matchPattern(
    action,
    "plugin://plugin.audio.soundcloud/play/*",
);
