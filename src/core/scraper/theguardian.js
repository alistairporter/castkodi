/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import * as plugin from "../plugin/youtube.js";
import { matchPattern } from "../tools/matchpattern.js";

/**
 * Extrait les informations nécessaire pour lire une vidéo sur Kodi.
 *
 * @param {URL}      _url              L'URL d'un article du Guardian.
 * @param {Object}   content           Le contenu de l'URL.
 * @param {Function} content.html      La fonction retournant la promesse
 *                                     contenant le document HTML.
 * @param {Object}   options           Les options de l'extraction.
 * @param {boolean}  options.incognito La marque indiquant si l'utilisateur est
 *                                     en navigation privée.
 * @returns {Promise<string|undefined>} Une promesse contenant le lien du
 *                                      <em>fichier</em> ou
 *                                      <code>undefined</code>.
 */
const actionVideo = async function (_url, content, { incognito }) {
    const doc = await content.html();
    const div = doc.querySelector("div.youtube-media-atom__iframe");
    return null === div
        ? undefined
        : plugin.generateVideoUrl(div.dataset.assetId, incognito);
};
export const extractVideo = matchPattern(
    actionVideo,
    "*://www.theguardian.com/*",
);

/**
 * Extrait les informations nécessaire pour lire un son sur Kodi.
 *
 * @param {URL}      _url         L'URL d'un article du Guardian.
 * @param {Object}   content      Le contenu de l'URL.
 * @param {Function} content.html La fonction retournant la promesse contenant
 *                                le document HTML.
 * @returns {Promise<string|undefined>} Une promesse contenant le lien du
 *                                      <em>fichier</em> ou
 *                                      <code>undefined</code>.
 */
const actionAudio = async function (_url, content) {
    const doc = await content.html();
    const figure = doc.querySelector("figure#audio-component-container");
    return figure?.dataset.source;
};
export const extractAudio = matchPattern(
    actionAudio,
    "*://www.theguardian.com/*",
);
