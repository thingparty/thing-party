import pluginRss from "@11ty/eleventy-plugin-rss";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // Date display filter: "January 29, 2026"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // Responsive image shortcode
  // Usage: {% image "/images/photo.jpg", "Alt text", "optional-class" %}
  eleventyConfig.addShortcode("image", (src, alt, className = "") => {
    const classAttr = className ? ` class="${className}"` : "";
    return `<img src="${src}" alt="${alt}"${classAttr} loading="lazy" decoding="async">`;
  });

  // Responsive figure shortcode with caption
  // Usage: {% figure "/images/photo.jpg", "Alt text", "Caption text", "optional-class" %}
  eleventyConfig.addShortcode("figure", (src, alt, caption, className = "") => {
    const classAttr = className ? ` class="${className}"` : "";
    return `<figure${classAttr}>
  <img src="${src}" alt="${alt}" loading="lazy" decoding="async">
  <figcaption>${caption}</figcaption>
</figure>`;
  });

  // Video embed shortcode (responsive 16:9)
  // Usage: {% video "https://youtube.com/embed/xxx" %}
  eleventyConfig.addShortcode("video", (src, aspectRatio = "16-9") => {
    const aspectClass = aspectRatio === "4-3" ? " aspect-4-3" : aspectRatio === "1-1" ? " aspect-1-1" : "";
    return `<div class="video-container${aspectClass}">
  <iframe src="${src}" frameborder="0" allowfullscreen loading="lazy"></iframe>
</div>`;
  });

  // Auto-wrap video iframes in responsive container
  eleventyConfig.addTransform("responsiveVideos", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    // Match iframes from YouTube/Vimeo that aren't already wrapped
    return content.replace(
      /<iframe([^>]*src="https?:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|vimeo\.com)[^"]*"[^>]*)><\/iframe>/gi,
      (match, attrs) => {
        // Skip if already inside a video-container
        if (content.indexOf(`<div class="video-container">\n${match}`) !== -1 ||
            content.indexOf(`<div class="video-container">${match}`) !== -1) {
          return match;
        }
        // Remove width/height attributes and wrap
        const cleanAttrs = attrs
          .replace(/\s*width="[^"]*"/gi, '')
          .replace(/\s*height="[^"]*"/gi, '');
        return `<div class="video-container"><iframe${cleanAttrs}></iframe></div>`;
      }
    );
  });

  return {
    pathPrefix: "/thing-party/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
