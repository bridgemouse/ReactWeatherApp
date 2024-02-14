// next.config.mjs (ES module syntax)
export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
      }
    ]
  }
};