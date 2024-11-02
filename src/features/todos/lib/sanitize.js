const div = document.createElement('div');

const escapedCharacters = [
    ['&', '&amp;'],
    ['<', '&lt;'],
    ['>', '&gt;'],
    ['"', '&quot;'],
    ["'", '&#39;'],
];

export function sanitizeText(text) {
    div.innerHTML = text
        // Handle special case when user adds "<>" to the body, saves, edits, then saves again
        .replace(/<>/g, '&lt;&gt;')

        // Make each <div>'s content into a separate line
        .replace(/<div.*?>(.+?)<\/div>/g, '\n$1')

        // Remove other tags and spaces
        .replace(/(<.+?>|&nbsp;)/g, '')
        .trim();

    return div.textContent;
}

export function unsanitizeText(text) {
    return (
        text
            // Wrap each line in a <div>
            .replace(/\n(.+)/g, (match, content) => {
                return `<div>${content}</div>`;
            })

            // Convert remaining newlines into <br>
            .replace(/\n/g, '<div><br></div>')
    );
}

export function escapeText(text) {
    for (const [character, escaped] of escapedCharacters) {
        text = text.replace(new RegExp(character, 'g'), escaped);
    }
    return text;
}

export function unescapeText(text) {
    for (const [character, escaped] of escapedCharacters) {
        text = text.replace(new RegExp(escaped, 'g'), character);
    }
    return text;
}
