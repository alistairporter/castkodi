/**
 * @module
 * @license MIT
 * @see https://kodi.wiki/view/Add-on:Dumpert
 * @author Sébastien Règne
 */
/* eslint-disable require-await */

import * as labeller from "../labeller/dumpert.js";
import { matchPattern } from "../tools/matchpattern.js";

/**
 * L'URL de l'extension pour lire des vidéos issues de Dumpert.
 *
 * @type {string}
 */
const PLUGIN_URL = "plugin://plugin.video.dumpert/?action=play&video_page_url=";

/**
 * Génère l'URL d'une vidéo dans l'extension Dumpert.
 *
 * @param {URL} videoUrl L'URL de la vidéo Dumpert.
 * @returns {Promise<string>} Une promesse contenant le lien du
 *                            <em>fichier</em>.
 */
export const generateUrl = async function ({ href }) {
    return PLUGIN_URL + encodeURIComponent(href);
};

/**
 * Extrait le titre d'une vidéo Dumpert.
 *
 * @param {URL} url L'URL utilisant le plugin de Dumpert.
 * @returns {Promise<string|undefined>} Une promesse contenant le titre ou
 *                                      <code>undefined</code>.
 */
const action = async function ({ searchParams }) {
    if (searchParams.has("video_page_url")) {
        const href = decodeURIComponent(searchParams.get("video_page_url"));
        return labeller.extract(new URL(href));
    }
    return undefined;
};
export const extract = matchPattern(action, "plugin://plugin.video.dumpert/*");
