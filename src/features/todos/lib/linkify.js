const linkPattern = /(https?:\/\/[^\s]+)/g;

export function linkify(text) {
    return text.replace(linkPattern, '<a href="$1">$1</a>');
}
