export function removeLeadingAndTrailingSlash(value: string): string {
    // @https://stackoverflow.com/users/224671/kennytm
    // Replace all (/.../g) leading slash (^\/) or (|) trailing slash (\/$) with an empty string.
    return String(value).replace(/^\/|\/$/g, '');
}

export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')?.[1]?.[0] || ''}`,
    };
}
// isUUID
// @https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid-in-javascript
export function isUUID(uuid: string) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}
// getCookies
// @https://stackoverflow.com/questions/4810841/how-can-i-get-a-javascript-cookie-by-name
export function getCookies(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';')[0];
    }
    return undefined;
}
