export function removeLeadingAndTrailingSlash(value: string): string {
    // @https://stackoverflow.com/users/224671/kennytm
    // Replace all (/.../g) leading slash (^\/) or (|) trailing slash (\/$) with an empty string.
    return String(value).replace(/^\/|\/$/g, '');
}
