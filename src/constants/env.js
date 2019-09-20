const constants = {
  local: {
    API_URL: 'http://localhost:3001',
    DOMAIN_URL: 'http://localhost:3000'
  },
  development: {
    API_URL: 'https://api-dev.kyleeshairdesigns.com/v1',
    DOMAIN_URL: 'https://dev.kyleeshairdesigns.com'
  },
  production: {
    API_URL: 'https://api.kyleeshairdesigns.com/v1',
    DOMAIN_URL: 'https://kyleeshairdesigns.com'
  }
};

module.exports = constants[process.env.STAGE || 'development'];
