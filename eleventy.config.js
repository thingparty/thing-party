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
