const div = document.createElement('div');

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
                div.textContent = content;
                return `<div>${div.innerHTML}</div>`;
            })

            // Convert remaining newlines into <br>
            .replace(/\n/g, '<div><br></div>')
    );
}
