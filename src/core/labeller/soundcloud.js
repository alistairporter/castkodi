/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * Extrait le titre d'une musique SoundCloud.
 *
 * @param {URL} audioUrl L'URL de la musique SoundCloud.
 * @returns {Promise<string|undefined>} Une promesse contenant le titre ou
 *                                      <code>undefined</code>.
 */
export const extract = async function (audioUrl) {
    const response = await fetch(audioUrl);
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, "text/html");
    const meta = doc.querySelector('meta[property="og:title"]');
    return meta?.content;
};
