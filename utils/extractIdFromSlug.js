function extractSlugAndId(fullSlug) {
    const parts = fullSlug.split("-");
    const idStr = parts.pop();
    const id = Number(idStr)
    const slug = parts.join("-");
    return { slug, id };
}

module.exports = extractSlugAndId
